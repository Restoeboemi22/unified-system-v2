import { Controller, Get, Header, HttpException, Param, Patch, Post, Body, Req } from "@nestjs/common";
import type { Request } from "express";
import { createApiErrorResponse } from "@unified/packages-shared-kernel";

function parseAuthorizationHeader(req: Request): string | null {
  const header = req.header("authorization");
  if (!header) return null;
  return header;
}

// In-memory mock data
const lenteraMembers: any[] = [
  { id: "mem-001", nisn: "1234567890", name: "Budi Santoso", class: "X-A", gender: "L", schoolId: "smpn_1_ngawi", point: 120, status: "Aktif", createdAt: Date.now() - 86400000 * 10 },
  { id: "mem-002", nisn: "0987654321", name: "Siti Aminah", class: "XI-IPA", gender: "P", schoolId: "sman_2_ngawi", point: 80, status: "Aktif", createdAt: Date.now() - 86400000 * 5 },
];

@Controller("/v1/lentera")
export class LenteraMockController {
  
  @Get("/members")
  @Header("cache-control", "no-store")
  async getMembers(@Req() req: Request) {
    if (!parseAuthorizationHeader(req)) throw new HttpException(createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"), 401);
    return { members: lenteraMembers };
  }

  @Patch("/members/:id/status")
  async updateMemberStatus(@Req() req: Request, @Param("id") id: string, @Body() body: any) {
    if (!parseAuthorizationHeader(req)) throw new HttpException(createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"), 401);
    const member = lenteraMembers.find(m => m.id === id);
    if (!member) throw new HttpException(createApiErrorResponse("NOT_FOUND", "Anggota tidak ditemukan"), 404);
    member.status = body.status;
    return { member };
  }
}
