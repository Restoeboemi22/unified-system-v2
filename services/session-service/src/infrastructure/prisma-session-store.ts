import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { SessionRecord } from "../domain/session-record";

@Injectable()
export class PrismaSessionStore {
  constructor(private readonly prisma: PrismaService) {}

  async getBySessionId(sessionId: string): Promise<SessionRecord | undefined> {
    const session = await this.prisma.session.findUnique({
      where: { sessionId },
    });
    if (!session) return undefined;
    return {
      sessionId: session.sessionId,
      userId: session.userId,
      identityId: session.identityId,
      activeMembershipId: session.activeMembershipId,
      expiresAt: session.expiresAt.toISOString(),
    };
  }

  async save(session: SessionRecord): Promise<void> {
    await this.prisma.session.upsert({
      where: { sessionId: session.sessionId },
      update: {
        userId: session.userId,
        identityId: session.identityId,
        activeMembershipId: session.activeMembershipId,
        expiresAt: new Date(session.expiresAt),
      },
      create: {
        sessionId: session.sessionId,
        userId: session.userId,
        identityId: session.identityId,
        activeMembershipId: session.activeMembershipId,
        expiresAt: new Date(session.expiresAt),
      },
    });
  }

  async delete(sessionId: string): Promise<void> {
    try {
      await this.prisma.session.delete({
        where: { sessionId },
      });
    } catch (e) {
      // ignore if not found
    }
  }
}
