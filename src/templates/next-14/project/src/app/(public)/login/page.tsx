"use client";

import React from "react";
import {useRouter} from "next/navigation";

import LoginForm from "@/modules/auth/components/login-form";
import {useAuth} from "@/modules/auth/context";
import useLogin from "@/modules/auth/hooks/useLogin";

export default function LoginPage() {
  const {isAuth, setSession} = useAuth();

  const router = useRouter();

  const {login, loading} = useLogin({
    onSuccess: (user, accessToken) => {
      setSession({user, accessToken});
      router.push("/");
    },
  });

  React.useEffect(() => {
    if (isAuth) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <main className="flex h-screen items-center justify-center">
      <LoginForm
        isSubmitting={loading}
        onSubmit={({email, password}) => {
          login(email, password);
        }}
      />
    </main>
  );
}
