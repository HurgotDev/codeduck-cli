"use client";
import useLoading from "@/shared/hooks/useLoading";
import {type Session} from "@/modules/auth/lib/session/types";

export default function useSaveSession() {
  const [{loading, loadingRef}, setLoading] = useLoading();

  const saveSession = async (session: Session) => {
    if (loadingRef) {
      return;
    }

    setLoading(true);

    return await fetch("/api/auth/session", {
      method: "POST",
      body: JSON.stringify({
        accessToken: session.accessToken,
      }),
    });
  };

  return {saveSession, loading};
}
