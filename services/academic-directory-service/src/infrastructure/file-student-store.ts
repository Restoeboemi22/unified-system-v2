import { Injectable } from "@nestjs/common";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { StudentDto } from "@unified/packages-academic-directory-contract";

type PersistedStudentState = {
  students: StudentDto[];
};

function createDefaultState(): PersistedStudentState {
  const now = new Date().toISOString();

  return {
    students: [
      {
        studentId: "std_001",
        schoolId: "school_001",
        studentNumber: "S-001",
        fullName: "Demo Student",
        status: "active",
        createdAt: now,
        updatedAt: now
      }
    ]
  };
}

@Injectable()
export class FileStudentStore {
  private readonly filePath =
    process.env.ACADEMIC_DIRECTORY_STORE_FILE ??
    resolve(process.cwd(), ".data", "academic-directory-store.json");

  listBySchoolId(schoolId: string): StudentDto[] {
    return this.readState().students.filter((item) => item.schoolId === schoolId);
  }

  getById(schoolId: string, studentId: string): StudentDto | undefined {
    return this.readState().students.find(
      (item) => item.schoolId === schoolId && item.studentId === studentId
    );
  }

  findByStudentNumber(schoolId: string, studentNumber: string): StudentDto | undefined {
    return this.readState().students.find(
      (item) => item.schoolId === schoolId && item.studentNumber === studentNumber
    );
  }

  save(student: StudentDto): void {
    const state = this.readState();
    const nextStudents = state.students.filter((item) => item.studentId !== student.studentId);
    nextStudents.push(student);
    this.writeState({ students: nextStudents });
  }

  private readState(): PersistedStudentState {
    this.ensureFile();
    const raw = readFileSync(this.filePath, "utf8");
    const parsed = JSON.parse(raw) as Partial<PersistedStudentState>;

    return {
      students: Array.isArray(parsed.students) ? parsed.students : []
    };
  }

  private writeState(state: PersistedStudentState): void {
    this.ensureFile();
    writeFileSync(this.filePath, JSON.stringify(state, null, 2), "utf8");
  }

  private ensureFile(): void {
    const folder = dirname(this.filePath);
    if (!existsSync(folder)) {
      mkdirSync(folder, { recursive: true });
    }
    if (!existsSync(this.filePath)) {
      writeFileSync(this.filePath, JSON.stringify(createDefaultState(), null, 2), "utf8");
    }
  }
}
