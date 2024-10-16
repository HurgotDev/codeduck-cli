"use client";
import React from "react";

import useLoading from "@/shared/hooks/useLoading";
import {type Session} from "@/modules/auth/lib/session/types";

export default function useSession() {
  const [session, setSession] = React.useState<Session | null>(null);

  const [{loading, loadingRef}, setLoading] = useLoading();

  const getSession = async (): Promise<Session | null> => {
    try {
      if (loadingRef) {
        return null;
      }

      setLoading(true);

      const response = await fetch("/api/auth/session");
      const data = (await response.json()) as unknown;

      if (response.ok) {
        setSession(data as Session);

        return data as Session;
      }

      throw new Error((data as {error: string}).error);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("Error getting session:", error);

      return null;
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    session,
    loading,
    refetch: getSession,
  };
}
