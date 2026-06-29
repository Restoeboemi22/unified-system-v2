import { useState, useMemo } from "react";
import { Printer, Calendar, List, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useSessionStore } from "@/store/session-store";

const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const formatTime = (isoString?: string | null) => {
  if (!isoString) return "-";
  const d = new Date(isoString);
  return d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false }).replace(".", ":");
};

export default function AttendanceReportPage() {
  const session = useSessionStore((state) => state.session);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [viewMode, setViewMode] = useState<'summary' | 'daily'>('daily');
  const [selectedClassId, setSelectedClassId] = useState<string>("");

  // Data Fetching
  const { data: classroomsData } = useQuery({
    queryKey: ["classrooms", session?.activeSchoolId],
    queryFn: () => api.getClassrooms(session!.sessionId, session!.activeSchoolId!),
    enabled: !!session?.activeSchoolId,
  });

  const { data: studentsData } = useQuery({
    queryKey: ["students", session?.activeSchoolId],
    queryFn: () => api.getStudents(session!.sessionId, session!.activeSchoolId!),
    enabled: !!session?.activeSchoolId,
  });

  // Calculate the specific date to query for daily view (default to today if current month/year, else 1st of month)
  const today = new Date();
  const isCurrentMonth = today.getMonth() + 1 === selectedMonth && today.getFullYear() === selectedYear;
  const [dailyDate, setDailyDate] = useState<number>(isCurrentMonth ? today.getDate() : 1);

  const queryDateStr = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(dailyDate).padStart(2, '0')}`;

  const { data: attendanceData, isLoading: isAttendanceLoading } = useQuery({
    queryKey: ["attendance", queryDateStr],
    queryFn: () => api.getDailyAttendance(session!.sessionId, queryDateStr),
    enabled: !!session?.activeSchoolId,
  });

  const classes = classroomsData?.classrooms || [];
  const students = studentsData?.students || [];
  const records = attendanceData?.records || [];

  // Filter students by class
  const classStudents = useMemo(() => {
    if (!selectedClassId) return [];
    // Currently, API doesn't have class assignment in student, we assume all for POC or wait for proper enrollment API.
    // For now, let's just show all students if no class is selected, or pretend they are in the class.
    return students; 
  }, [students, selectedClassId]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center no-print">
        <h1 className="text-2xl font-bold text-slate-100">Laporan Presensi Siswa</h1>
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Printer className="h-4 w-4" />
          Cetak Laporan
        </button>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area { position: absolute; left: 0; top: 0; width: 100%; padding: 20px; background: white; color: black;}
          .no-print { display: none !important; }
          table { border-collapse: collapse !important; width: 100% !important; font-size: 12px; }
          th, td { border: 1px solid black !important; padding: 4px 8px !important; color: black !important; }
        }
      `}</style>

      <div className="glass-effect-dark-card rounded-lg p-6 space-y-6 no-print">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-900 rounded-md p-1 border border-slate-700">
            <button
              onClick={() => setViewMode('daily')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${viewMode === 'daily' ? 'bg-slate-800 text-blue-400' : 'text-slate-400'}`}
            >
              <Calendar className="h-4 w-4" /> Riwayat Harian
            </button>
            <button
              onClick={() => setViewMode('summary')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${viewMode === 'summary' ? 'bg-slate-800 text-blue-400' : 'text-slate-400'}`}
            >
              <List className="h-4 w-4" /> Rekap Bulanan
            </button>
          </div>

          <div className="h-8 w-px bg-slate-700"></div>

          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          >
            <option value="">Semua Siswa</option>
            {classes.map(c => (
              <option key={c.classroomId} value={c.classroomId}>{c.gradeLevel} {c.classroomName}</option>
            ))}
          </select>

          {viewMode === 'daily' && (
            <input 
              type="date"
              value={queryDateStr}
              onChange={(e) => {
                const d = new Date(e.target.value);
                if (!isNaN(d.getTime())) {
                  setSelectedYear(d.getFullYear());
                  setSelectedMonth(d.getMonth() + 1);
                  setDailyDate(d.getDate());
                }
              }}
              className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
            />
          )}

          {viewMode === 'summary' && (
            <>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
              >
                {MONTHS.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
              >
                {[2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </>
          )}
        </div>
      </div>

      <div id="print-area" className="glass-effect-dark-card rounded-lg p-6">
        <div className="hidden print:block text-center mb-6">
          <h2 className="text-xl font-bold uppercase">Laporan Kehadiran Siswa</h2>
          <p>Tanggal: {new Date(queryDateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>

        {isAttendanceLoading ? (
          <div className="text-center py-10 text-slate-400 animate-pulse">Memuat data presensi...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-800/50 text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-semibold border-b border-slate-700">NISN</th>
                  <th className="px-4 py-3 font-semibold border-b border-slate-700">Nama Siswa</th>
                  <th className="px-4 py-3 font-semibold border-b border-slate-700 text-center">Status</th>
                  <th className="px-4 py-3 font-semibold border-b border-slate-700 text-center">Jam Submit</th>
                  <th className="px-4 py-3 font-semibold border-b border-slate-700 text-center">Radius GPS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {classStudents.map(student => {
                  const record = records.find(r => r.studentId === student.studentId);
                  
                  return (
                    <tr key={student.studentId} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-3">{student.studentNumber}</td>
                      <td className="px-4 py-3 font-medium text-slate-100">{student.fullName}</td>
                      <td className="px-4 py-3 text-center">
                        {record ? (
                          <span className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-bold
                            ${record.status === 'PRESENT' ? 'bg-green-900/30 text-green-400 border border-green-700/30' : ''}
                            ${record.status === 'LATE' ? 'bg-orange-900/30 text-orange-400 border border-orange-700/30' : ''}
                            ${record.status === 'ALPHA' ? 'bg-red-900/30 text-red-400 border border-red-700/30' : ''}
                            ${['SICK', 'PERMIT'].includes(record.status) ? 'bg-blue-900/30 text-blue-400 border border-blue-700/30' : ''}
                          `}>
                            {record.status}
                          </span>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center text-slate-400">{formatTime(record?.submittedAt)}</td>
                      <td className="px-4 py-3 text-center text-slate-400">
                        {record?.distanceMeters != null ? `${Math.round(record.distanceMeters)}m` : '-'}
                      </td>
                    </tr>
                  );
                })}
                {classStudents.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                      Tidak ada data siswa.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
