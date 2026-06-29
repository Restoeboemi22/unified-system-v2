import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { AppHttpError } from "@unified/packages-shared-kernel";
import {
  CreatePrincipalRequest,
  GetPrincipalResponse,
  ListPrincipalsResponse,
  PrincipalDto,
  UpdatePrincipalRequest
} from "@unified/packages-academic-directory-contract";
import { SessionClient } from "../infrastructure/session-client";
import { PrismaPrincipalStore } from "../infrastructure/prisma-principal-store";

@Injectable()
export class PrincipalApplicationService {
  constructor(
    private readonly sessionClient: SessionClient,
    private readonly principalStore: PrismaPrincipalStore
  ) {}

  async listPrincipals(
    authorizationHeader: string,
    schoolId?: string
  ): Promise<ListPrincipalsResponse> {
    const activeSchoolId = await this.getActiveSchoolId(authorizationHeader);
    const effectiveSchoolId = schoolId ?? activeSchoolId;
    if (effectiveSchoolId !== activeSchoolId) {
      throw new AppHttpError(403, "TENANT_SCOPE_VIOLATION", "Tenant scope violation");
    }
    const principals = await this.principalStore.listBySchoolId(effectiveSchoolId);
    return { principals };
  }

  async getPrincipal(
    authorizationHeader: string,
    principalId: string,
    schoolId?: string
  ): Promise<GetPrincipalResponse> {
    const activeSchoolId = await this.getActiveSchoolId(authorizationHeader);
    const effectiveSchoolId = schoolId ?? activeSchoolId;
    if (effectiveSchoolId !== activeSchoolId) {
      throw new AppHttpError(403, "TENANT_SCOPE_VIOLATION", "Tenant scope violation");
    }
    const principal = await this.principalStore.getById(effectiveSchoolId, principalId);
    if (!principal) {
      throw new AppHttpError(404, "NOT_FOUND", "Kepala sekolah tidak ditemukan");
    }
    return { principal };
  }

  async createPrincipal(
    authorizationHeader: string,
    request: CreatePrincipalRequest
  ): Promise<GetPrincipalResponse> {
    const activeSchoolId = await this.getActiveSchoolId(authorizationHeader);
    if (request.schoolId !== activeSchoolId) {
      throw new AppHttpError(403, "TENANT_SCOPE_VIOLATION", "Tenant scope violation");
    }

    if (request.appointmentCode) {
      const existing = await this.principalStore.findByAppointmentCode(
        request.schoolId,
        request.appointmentCode
      );
      if (existing) {
        throw new AppHttpError(409, "CONFLICT", "Kode pengangkatan kepala sekolah sudah digunakan");
      }
    }

    const now = new Date().toISOString();
    const principal: PrincipalDto = {
      principalId: `prc_${randomUUID()}`,
      schoolId: request.schoolId,
      appointmentCode: request.appointmentCode ?? null,
      fullName: request.fullName,
      status: "active",
      createdAt: now,
      updatedAt: now
    };
    await this.principalStore.save(principal);
    return { principal };
  }

  async updatePrincipal(
    authorizationHeader: string,
    principalId: string,
    request: UpdatePrincipalRequest
  ): Promise<GetPrincipalResponse> {
    const activeSchoolId = await this.getActiveSchoolId(authorizationHeader);
    const existing = await this.principalStore.getById(activeSchoolId, principalId);
    if (!existing) {
      throw new AppHttpError(404, "NOT_FOUND", "Kepala sekolah tidak ditemukan");
    }

    const nextAppointmentCode =
      request.appointmentCode === undefined ? existing.appointmentCode : request.appointmentCode;

    if (nextAppointmentCode) {
      const duplicated = await this.principalStore.findByAppointmentCode(
        activeSchoolId,
        nextAppointmentCode
      );
      if (duplicated && duplicated.principalId !== principalId) {
        throw new AppHttpError(409, "CONFLICT", "Kode pengangkatan kepala sekolah sudah digunakan");
      }
    }

    const updated: PrincipalDto = {
      ...existing,
      appointmentCode: nextAppointmentCode ?? null,
      fullName: request.fullName ?? existing.fullName,
      status: request.status ?? existing.status,
      updatedAt: new Date().toISOString()
    };
    await this.principalStore.save(updated);
    return { principal: updated };
  }

  private async getActiveSchoolId(authorizationHeader: string): Promise<string> {
    const sessionMe = await this.sessionClient.getSessionMe(authorizationHeader);
    const activeSchoolId = sessionMe.session.activeSchoolId;
    if (!activeSchoolId) {
      throw new AppHttpError(409, "CONFLICT", "Tenant belum dipilih");
    }
    return activeSchoolId;
  }
}
