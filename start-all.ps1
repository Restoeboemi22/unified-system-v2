Write-Host "Starting Session Service (Port 4001)..."
Start-Process powershell -ArgumentList "-NoExit -Command `"cd 'd:\Unified-System-V2'; pnpm run dev:session-service`""
Start-Sleep -Seconds 3

Write-Host "Starting Policy Service (Port 4002)..."
Start-Process powershell -ArgumentList "-NoExit -Command `"cd 'd:\Unified-System-V2'; pnpm run dev:policy-service`""
Start-Sleep -Seconds 3

Write-Host "Starting Tenant School Service (Port 4003)..."
Start-Process powershell -ArgumentList "-NoExit -Command `"title TenantSchoolService; cd services\tenant-school-service; pnpm run dev`""
Start-Process powershell -ArgumentList "-NoExit -Command `"title AcademicDirectoryService; cd services\academic-directory-service; pnpm run dev`""
Start-Process powershell -ArgumentList "-NoExit -Command `"title AttendanceService; cd services\attendance-service; pnpm run dev`""
Start-Sleep -Seconds 4

Write-Host "Starting Web Admin..."
Start-Process powershell -ArgumentList "-NoExit -Command `"cd 'd:\Unified-System-V2'; pnpm run dev:web-admin`""

Write-Host "Semua service POC telah berjalan di jendela terminal terpisah."
Write-Host "Silakan lakukan verifikasi browser dari login sampai students sesuai Prioritas 1."
