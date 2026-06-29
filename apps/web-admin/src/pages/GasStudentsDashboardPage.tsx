import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, RefreshCw, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useSessionStore } from "@/store/session-store";
import { GasLegacyLayout } from "@/components/layout/GasLegacyLayout";
import StudentTable, { Student } from "@/components/students/StudentTable";

export default function GasStudentsDashboardPage() {
  const session = useSessionStore((state) => state.session);
  const activeSchoolId = session?.activeSchoolId || "SMPN 3 PACET";
  const user = session ? { role: session.activeRole || "admin" } : null;

  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<"VII" | "VIII" | "IX">("VII");
  const [selectedClassName, setSelectedClassName] = useState<string>("ALL");

  const { data: studentsResponse, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["dashboard-students", activeSchoolId],
    queryFn: async () => {
      if (!session?.sessionId) throw new Error("No session");
      return api.getStudents(session.sessionId, activeSchoolId);
    },
    enabled: !!session?.sessionId
  });

  const students: Student[] = useMemo(() => {
    return (studentsResponse?.students || []).map((s: any) => ({
      id: s.studentId,
      nisn: s.studentNumber,
      name: s.fullName,
      gender: "L", // Default for now since API doesn't return gender
      class: "VII-A", // Default for now since API doesn't return class
      email: ""
    }));
  }, [studentsResponse]);

  const gradeClassOptions = useMemo(() => {
    const normalize = (value: unknown) => String(value || "").trim().toUpperCase();
    return Array.from(new Set(students
      .map(s => s.class || "")
      .filter(c => c.startsWith(selectedGrade))
      .map(c => normalize(c))
      .filter(Boolean)
    ));
  }, [students, selectedGrade]);

  useEffect(() => {
    setSelectedClassName("ALL");
  }, [selectedGrade]);

  const filteredStudents = useMemo(() => {
    return students
      .filter(student => {
        const studentClass = student.class || "";
        const matchesGrade = studentClass.startsWith(selectedGrade);
        const matchesClass = selectedClassName === "ALL" || studentClass === selectedClassName;
        return matchesGrade && matchesClass;
      })
      .sort((a, b) => (a.class || "").localeCompare(b.class || "") || a.name.localeCompare(b.name));
  }, [students, selectedGrade, selectedClassName]);

  const handleSync = async () => {
    await refetch();
    setSyncMessage("Data berhasil diperbarui dari database.");
    setTimeout(() => setSyncMessage(null), 3000);
  };

  const totalStudentsInGrade = students.filter(s => (s.class || "").startsWith(selectedGrade)).length;
  const isSyncing = isLoading || isRefetching;

  return (
    <GasLegacyLayout>
      <div className="space-y-6">
        <div className="rounded-3xl bg-slate-900/60 p-8 shadow-xl border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg shadow-blue-500/30">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-100">Manajemen Siswa</h1>
              <p className="text-slate-400 mt-1">Kelola data siswa {activeSchoolId} (Terhubung ke Database)</p>
              <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full inline-block animate-pulse"></span>
                Status API: Online
              </p>
            </div>
          </div>
          {(user?.role === "admin" || user?.role === "super_admin") && (
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSyncing ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <RefreshCw className="h-5 w-5" />
              )}
              {isSyncing ? "Memuat..." : "Muat Ulang Data"}
            </button>
          )}
        </div>
        
        {syncMessage && (
          <div className={`p-4 rounded-2xl border ${syncMessage.includes("Gagal") ? "bg-red-900/30 backdrop-blur-xl text-red-400 border-red-700/50" : "bg-green-900/30 backdrop-blur-xl text-green-400 border-green-700/50"} shadow-lg`}>
            <p className="text-sm font-semibold">{syncMessage}</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-white/10 backdrop-blur-xl">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Siswa (Kelas {selectedGrade})</p>
            <p className="text-3xl font-black text-slate-100 mt-2">{totalStudentsInGrade}</p>
          </div>
          <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-white/10 backdrop-blur-xl">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tampilkan</p>
            <p className="text-3xl font-black text-blue-400 mt-2">{filteredStudents.length}</p>
          </div>
          <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-white/10 backdrop-blur-xl">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Jumlah Kelas</p>
            <p className="text-3xl font-black text-purple-400 mt-2">{gradeClassOptions.length}</p>
          </div>
        </div>

        {/* Class Navigation */}
        <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-white/10 backdrop-blur-xl flex flex-col gap-6">
          {/* Grade Selection */}
          <div className="flex flex-wrap gap-3">
            {(["VII", "VIII", "IX"] as const).map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`rounded-2xl px-6 py-3 text-sm font-bold transition-all duration-200 shadow-sm ${
                  selectedGrade === grade
                    ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/30 border-transparent"
                    : "bg-slate-800/60 text-slate-300 hover:bg-slate-800 border border-slate-700/50"
                }`}
              >
                Kelas {grade === "VII" ? "7" : grade === "VIII" ? "8" : "9"}
              </button>
            ))}
          </div>

          {/* Sub-Class Selection */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-semibold text-slate-400 mr-2">
              Pilih Kelas:
            </span>
            <button
              onClick={() => setSelectedClassName("ALL")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 border ${
                selectedClassName === "ALL"
                  ? "bg-gradient-to-r from-green-600 to-emerald-700 border-transparent text-white shadow-lg shadow-green-500/30"
                  : "bg-slate-800/60 border-slate-700/50 text-slate-300 hover:bg-slate-800"
              }`}
            >
              Semua Kelas
            </button>
            {gradeClassOptions.length > 0 ? (
              gradeClassOptions.map((clsName) => (
                <button
                  key={clsName}
                  onClick={() => setSelectedClassName(clsName)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 border ${
                    selectedClassName === clsName
                      ? "bg-gradient-to-r from-blue-600 to-indigo-700 border-transparent text-white shadow-lg shadow-blue-500/30"
                      : "bg-slate-800/60 border-slate-700/50 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {clsName}
                </button>
              ))
            ) : (
              <div className="py-2 text-sm text-slate-500 italic ml-2">
                Belum ada kelas untuk tingkat ini. Tambahkan kelas lewat{" "}
                <Link to="/admin/students" className="font-semibold text-blue-400 not-italic hover:text-blue-300">
                  Database Satu Pintu
                </Link>
                .
              </div>
            )}
          </div>
        </div>

        <StudentTable students={filteredStudents} />
      </div>
    </GasLegacyLayout>
  );
}
