import {NextResponse, type NextRequest} from "next/server";

import {deleteSession, getSession, saveSession} from "@/modules/auth/lib/session";

export async function POST(request: NextRequest) {
  try {
    const {accessToken} = (await request.json()) as {accessToken: string};

    if (!accessToken) {
      return NextResponse.json({error: "Access token is required"}, {status: 400});
    }

    await saveSession(accessToken);

    return NextResponse.json({message: "Login successful"});
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json({error: errorMessage}, {status: 401});
  }
}

export async function GET() {
  const session = await getSession();

  return NextResponse.json(session);
}

export async function DELETE() {
  await deleteSession();

  return NextResponse.json({message: "Logout successful"});
}
