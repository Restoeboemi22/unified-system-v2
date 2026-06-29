import { api } from "./api";
import { useSessionStore } from "@/store/session-store";

export const database = {};
export const edulockDb = {};
export const edulockAuth = { currentUser: { uid: "mock-uid" } } as any;

export const ref = (...args: any[]) => {
  if (args.length === 1) return args[0]; // passing just database returns database
  if (typeof args[1] === "string") return args[1];
  return "root";
};

export const push = (...args: any[]) => {
  const k = Math.random().toString(36).substring(2, 10);
  return { key: k, toString: () => k };
};
export const orderByChild = (...args: any[]) => args[0];
export const equalTo = (...args: any[]) => args[0];
export const dbQuery = (...args: any[]) => args[0];
export const query = (...args: any[]) => args[0];

export const onValue = (path: string, callback: (snapshot: any) => void, errorCallback?: (error: any) => void) => {
  const sessionId = useSessionStore.getState().session?.sessionId;
  if (!sessionId) {
    callback({ val: () => null, exists: () => false });
    return () => {};
  }

  const sendData = (data: any) => {
    callback({ val: () => data, exists: () => !!data });
  };

  if (typeof path !== "string") {
     sendData(null);
     return () => {};
  }

  if (path.startsWith("master_students")) {
    api.getStudents(sessionId).then(res => {
      const dict: any = {};
      res.students.forEach((s: any) => dict[s.id || s.nisn] = s);
      sendData(dict);
    }).catch((err) => errorCallback ? errorCallback(err) : sendData(null));
  } else if (path.startsWith("master_teachers")) {
    sendData({
      "guru-01": { nuptk: "111", name: "Pak Guru", class: "X-A", status: "Aktif", schoolId: "smpn_1_ngawi" }
    });
  } else if (path.startsWith("master_classes")) {
    sendData({
      "smpn_1_ngawi": {
         "X-A": { name: "X-A", level: "10" }
      }
    });
  } else if (path.includes("violations")) {
    api.getEdulockViolations(sessionId).then(res => {
      const dict: any = {};
      res.violations?.forEach((v: any) => dict[v.id] = v);
      sendData(dict);
    }).catch((err) => errorCallback ? errorCallback(err) : sendData(null));
  } else if (path.includes("active_devices") || path.includes("active_sessions")) {
    api.getEdulockSessions(sessionId).then(res => {
      const dict: any = {};
      res.sessions?.forEach((s: any) => dict[s.id || s.studentNisn] = s);
      sendData(dict);
    }).catch((err) => errorCallback ? errorCallback(err) : sendData(null));
  } else if (path.includes("students_device")) {
    api.getEdulockDevices(sessionId).then(res => {
      const dict: any = {};
      res.devices?.forEach((d: any) => dict[d.studentNisn] = d);
      sendData(dict);
    }).catch((err) => errorCallback ? errorCallback(err) : sendData(null));
  } else if (path.includes("lentera/members")) {
    api.getLenteraMembers(sessionId).then(res => {
      const dict: any = {};
      res.members?.forEach((m: any) => dict[m.id || m.nisn] = m);
      sendData(dict);
    }).catch((err) => errorCallback ? errorCallback(err) : sendData(null));
  } else {
    sendData(null);
  }
  return () => {};
};

export const get = async (path: string): Promise<{ val: () => any, exists: () => boolean }> => {
  return new Promise((resolve) => {
    onValue(path, (snapshot) => {
      resolve(snapshot);
    });
  });
};

export const remove = async (path: string) => {
  console.log("[MOCK] remove", path);
};

export const set = async (pathOrRef: any, data: any) => {
  console.log("[MOCK] set", pathOrRef, data);
};

export const update = async (pathOrObj: any, updates?: any) => {
  console.log("[MOCK] update", pathOrObj, updates);
};

export const sendPasswordResetEmail = async (...args: any[]) => {};
export const signOut = async (...args: any[]) => {};
export const updatePassword = async (...args: any[]) => {};
