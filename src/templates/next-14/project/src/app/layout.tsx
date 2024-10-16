import type {Metadata} from "next";

import "./globals.css";
import {AuthProvider} from "@/modules/auth/context";
import {getSession} from "@/modules/auth/lib/session";

export const metadata: Metadata = {
  title: "{{projectName}}",
  description: "{{projectDescription}}",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className="h-screen">
        <AuthProvider session={session}>{children}</AuthProvider>
      </body>
    </html>
  );
}
