import { Injectable } from "@nestjs/common";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { SessionRecord } from "../domain/session-record";

type PersistedState = {
  sessions: SessionRecord[];
};

@Injectable()
export class FileSessionStore {
  private readonly filePath =
    process.env.SESSION_STORE_FILE ??
    resolve(process.cwd(), ".data", "session-store.json");

  getBySessionId(sessionId: string): SessionRecord | undefined {
    return this.readState().sessions.find((item) => item.sessionId === sessionId);
  }

  save(session: SessionRecord): void {
    const state = this.readState();
    const nextSessions = state.sessions.filter((item) => item.sessionId !== session.sessionId);
    nextSessions.push(session);
    this.writeState({ sessions: nextSessions });
  }

  delete(sessionId: string): void {
    const state = this.readState();
    this.writeState({
      sessions: state.sessions.filter((item) => item.sessionId !== sessionId)
    });
  }

  private readState(): PersistedState {
    this.ensureFile();
    const raw = readFileSync(this.filePath, "utf8");
    const parsed = JSON.parse(raw) as PersistedState;
    return {
      sessions: Array.isArray(parsed.sessions) ? parsed.sessions : []
    };
  }

  private writeState(state: PersistedState): void {
    this.ensureFile();
    writeFileSync(this.filePath, JSON.stringify(state, null, 2), "utf8");
  }

  private ensureFile(): void {
    const folder = dirname(this.filePath);
    if (!existsSync(folder)) {
      mkdirSync(folder, { recursive: true });
    }
    if (!existsSync(this.filePath)) {
      writeFileSync(this.filePath, JSON.stringify({ sessions: [] }, null, 2), "utf8");
    }
  }
}
