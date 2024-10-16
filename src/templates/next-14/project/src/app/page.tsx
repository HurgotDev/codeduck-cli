"use client";

import Link from "next/link";

import {useAuth} from "@/modules/auth/context";

export default function Home() {
  const {user} = useAuth();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <section className="mb-4 flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Hello World</h1>
        <p>Welcome, {user?.email}</p>
      </section>
      <section className="flex flex-col gap-4">
        <Link className="text-blue-500 hover:text-blue-600 hover:underline" href="/logout">
          Logout
        </Link>
      </section>
    </div>
  );
}
