import { Injectable } from "@nestjs/common";
import { SessionRecord } from "../domain/session-record";

@Injectable()
export class InMemorySessionStore {
  private readonly sessions = new Map<string, SessionRecord>();

  getBySessionId(sessionId: string): SessionRecord | undefined {
    return this.sessions.get(sessionId);
  }

  save(session: SessionRecord): void {
    this.sessions.set(session.sessionId, session);
  }

  delete(sessionId: string): void {
    this.sessions.delete(sessionId);
  }
}
