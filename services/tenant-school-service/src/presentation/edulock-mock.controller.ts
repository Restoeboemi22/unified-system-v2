import { Controller, Get, Header, HttpException, Param, Patch, Post, Body, Req } from "@nestjs/common";
import type { Request } from "express";
import { createApiErrorResponse } from "@unified/packages-shared-kernel";

function parseAuthorizationHeader(req: Request): string | null {
  const header = req.header("authorization");
  if (!header) return null;
  return header;
}

// In-memory mock data
const edulockDevices: any[] = [
  { id: "dev-001", studentNisn: "1234567890", name: "Budi Santoso", status: "locked", trustScore: 95, isInsideZone: true, isInternetActive: true, schoolId: "smpn_1_ngawi", lastUpdated: Date.now() - 3600000 },
  { id: "dev-002", studentNisn: "0987654321", name: "Siti Aminah", status: "unlocked", trustScore: 60, isInsideZone: false, isInternetActive: false, schoolId: "sman_2_ngawi", lastUpdated: Date.now() - 7200000 },
];

const edulockSessions: any[] = [
  { id: "sess-001", studentNisn: "1234567890", isOnline: true, isInsideZone: true, isInternetActive: true, schoolId: "smpn_1_ngawi", lastSeen: Date.now() - 300000 },
];

const edulockViolations: any[] = [
  { id: "viol-001", type: "GEOFENCE_EXIT", description: "Keluar dari area sekolah saat jam pelajaran", studentNisn: "0987654321", schoolId: "sman_2_ngawi", createdAt: Date.now() - 7200000 },
];

@Controller("/v1/edulock")
export class EdulockMockController {
  
  @Get("/devices")
  @Header("cache-control", "no-store")
  async getDevices(@Req() req: Request) {
    if (!parseAuthorizationHeader(req)) throw new HttpException(createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"), 401);
    return { devices: edulockDevices };
  }

  @Get("/sessions")
  @Header("cache-control", "no-store")
  async getSessions(@Req() req: Request) {
    if (!parseAuthorizationHeader(req)) throw new HttpException(createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"), 401);
    return { sessions: edulockSessions };
  }

  @Get("/violations")
  @Header("cache-control", "no-store")
  async getViolations(@Req() req: Request) {
    if (!parseAuthorizationHeader(req)) throw new HttpException(createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"), 401);
    return { violations: edulockViolations };
  }

  @Patch("/devices/:id/lock")
  async lockDevice(@Req() req: Request, @Param("id") id: string) {
    if (!parseAuthorizationHeader(req)) throw new HttpException(createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"), 401);
    const dev = edulockDevices.find(d => d.id === id);
    if (!dev) throw new HttpException(createApiErrorResponse("NOT_FOUND", "Device tidak ditemukan"), 404);
    dev.status = "locked";
    return { device: dev };
  }

  @Patch("/devices/:id/unlock")
  async unlockDevice(@Req() req: Request, @Param("id") id: string) {
    if (!parseAuthorizationHeader(req)) throw new HttpException(createApiErrorResponse("UNAUTHENTICATED", "Session tidak valid"), 401);
    const dev = edulockDevices.find(d => d.id === id);
    if (!dev) throw new HttpException(createApiErrorResponse("NOT_FOUND", "Device tidak ditemukan"), 404);
    dev.status = "unlocked";
    return { device: dev };
  }
}
