"use client";
import React from "react";

import {type User} from "@/shared/types/user";
import {type Session} from "@/modules/auth/lib/session/types";
import useDeleteSession from "@/modules/auth/hooks/useDeleteSession";
import useSession from "@/modules/auth/hooks/useSession";

export interface AuthContext {
  isAuth: boolean;
  user: User | null;
  setSession: (session: Session | null) => void;
  removeSession: () => void;
}

const AuthContext = React.createContext<AuthContext>({} as AuthContext);

export function useAuth() {
  const context = React.useContext(AuthContext);

  if (!Boolean(context)) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export function AuthProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session | null;
}) {
  const [user, setUser] = React.useState<User | null>(null);

  const isAuth = React.useMemo(() => Boolean(user), [user]);

  const {deleteSession} = useDeleteSession();
  const {session: cookieSession} = useSession();

  const setSession = React.useCallback((newSession: Session | null) => {
    setUser(newSession?.user ?? null);
  }, []);

  const removeSession = React.useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    deleteSession();
    setUser(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (session) {
      setUser(session.user);
    } else if (cookieSession) {
      setUser(cookieSession.user);
    } else {
      removeSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, cookieSession]);

  return (
    <AuthContext.Provider value={{isAuth, user, setSession, removeSession}}>
      {children}
    </AuthContext.Provider>
  );
}
