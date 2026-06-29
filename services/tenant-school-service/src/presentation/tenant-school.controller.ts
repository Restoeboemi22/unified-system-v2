import { Body, Controller, Get, Header, HttpException, Param, Patch, Post, Req } from "@nestjs/common";
import type { Request } from "express";
import {
  CanonicalSessionPrincipal,
  CreateMembershipRequestSchema,
  GetMembershipResponse,
  GetMyMembershipsResponse,
  GetSchoolResponse,
  GetSchoolsResponse,
  GetSchoolServiceStatusResponse,
  GetUserMembershipsResponse,
  InternalSessionBootstrapRequestSchema,
  InternalSessionContextRequestSchema,
  PatchMembershipRequestSchema,
  PatchSchoolServiceStatusRequestSchema,
  UpdateSchoolSettingsRequestSchema
} from "@unified/packages-tenant-school-contract";
import { createApiErrorResponse } from "@unified/packages-shared-kernel";
import { CAPABILITIES } from "@unified/packages-capability-catalog";
import { z } from "zod";
import { TenantSchoolApplicationService } from "../application/tenant-school-application.service";
import { PolicyClient } from "../infrastructure/policy-client";

function parseAuthorizationHeader(req: Request): string | null {
  const header = req.header("authorization");
  if (!header) return null;
  return header;
}

function badRequest(error: z.ZodError): never {
  throw new HttpException(
    createApiErrorResponse("VALIDATION_ERROR", "Request validation error", {
      issues: error.issues
    }),
    400
  );
}

@Controller()
export class TenantSchoolController {
  constructor(
    private readonly app: TenantSchoolApplicationService,
    private readonly policyClient: PolicyClient
  ) {}

  @Post("/internal/session-bootstrap")
  async bootstrapSession(@Body() rawBody: unknown): Promise<CanonicalSessionPrincipal> {
    const parsed = InternalSessionBootstrapRequestSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);
    return await this.app.bootstrapSession(parsed.data.provider, parsed.data.idToken);
  }

  @Post("/internal/session-context")
  async resolveSessionContext(@Body() rawBody: unknown): Promise<CanonicalSessionPrincipal> {
    const parsed = InternalSessionContextRequestSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);
    return await this.app.resolveSessionContext(
      parsed.data.userId,
      parsed.data.activeMembershipId
    );
  }

  @Get("/v1/schools")
  @Header("cache-control", "no-store")
  async getSchools(@Req() req: Request): Promise<GetSchoolsResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.schoolManage,
      resource: {}
    });
    return await this.app.getSchools(authorization);
  }

  @Get("/v1/schools/:schoolId")
  @Header("cache-control", "no-store")
  async getSchool(@Req() req: Request, @Param("schoolId") schoolId: string): Promise<GetSchoolResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    return await this.app.getSchool(authorization, schoolId);
  }

  @Patch("/v1/schools/:schoolId/settings")
  async updateSchoolSettings(
    @Req() req: Request,
    @Param("schoolId") schoolId: string,
    @Body() rawBody: unknown
  ): Promise<GetSchoolResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    const parsed = UpdateSchoolSettingsRequestSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.schoolManage,
      resource: { schoolId }
    });
    return await this.app.updateSchoolSettings(authorization, schoolId, parsed.data);
  }

  @Get("/v1/schools/:schoolId/service-status")
  @Header("cache-control", "no-store")
  async getServiceStatus(
    @Req() req: Request,
    @Param("schoolId") schoolId: string
  ): Promise<GetSchoolServiceStatusResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    return await this.app.getServiceStatus(authorization, schoolId);
  }

  @Patch("/v1/schools/:schoolId/service-status")
  async patchServiceStatus(
    @Req() req: Request,
    @Param("schoolId") schoolId: string,
    @Body() rawBody: unknown
  ): Promise<GetSchoolServiceStatusResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    const parsed = PatchSchoolServiceStatusRequestSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.serviceStatusManage,
      resource: { schoolId }
    });
    return await this.app.patchServiceStatus(authorization, schoolId, parsed.data);
  }

  @Get("/v1/memberships/me")
  @Header("cache-control", "no-store")
  async getMyMemberships(@Req() req: Request): Promise<GetMyMembershipsResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    return await this.app.getMyMemberships(authorization);
  }

  @Get("/v1/users/:userId/memberships")
  @Header("cache-control", "no-store")
  async getUserMemberships(
    @Req() req: Request,
    @Param("userId") userId: string
  ): Promise<GetUserMembershipsResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.schoolManage,
      resource: {}
    });
    return await this.app.getUserMemberships(authorization, userId);
  }

  @Post("/v1/memberships")
  async createMembership(
    @Req() req: Request,
    @Body() rawBody: unknown
  ): Promise<GetMembershipResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    const parsed = CreateMembershipRequestSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.schoolManage,
      resource: { schoolId: parsed.data.schoolId }
    });
    return await this.app.createMembership(authorization, parsed.data);
  }

  @Patch("/v1/memberships/:membershipId")
  async patchMembership(
    @Req() req: Request,
    @Param("membershipId") membershipId: string,
    @Body() rawBody: unknown
  ): Promise<GetMembershipResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    const parsed = PatchMembershipRequestSchema.safeParse(rawBody);
    if (!parsed.success) badRequest(parsed.error);
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.schoolManage,
      resource: {}
    });
    return await this.app.patchMembership(authorization, membershipId, parsed.data);
  }

  @Post("/v1/memberships/:membershipId/activate")
  async activateMembership(
    @Req() req: Request,
    @Param("membershipId") membershipId: string
  ): Promise<GetMembershipResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.schoolManage,
      resource: {}
    });
    return await this.app.activateMembership(authorization, membershipId);
  }

  @Post("/v1/memberships/:membershipId/suspend")
  async suspendMembership(
    @Req() req: Request,
    @Param("membershipId") membershipId: string
  ): Promise<GetMembershipResponse> {
    const authorization = parseAuthorizationHeader(req);
    if (!authorization) {
      throw new HttpException(
        createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"),
        401
      );
    }
    await this.policyClient.assertAllowed(authorization, {
      action: CAPABILITIES.schoolManage,
      resource: {}
    });
    return await this.app.suspendMembership(authorization, membershipId);
  }
}
