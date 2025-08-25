import { useEffect } from "react";

export function useWarmupBackend() {
  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    if (backendUrl) {
      fetch(`${backendUrl}/vxh`)
        .then(() => console.log("✅ Backend warmed up"))
        .catch((err) => console.error("❌ Health check failed:", err));
    }
  }, []);
}
