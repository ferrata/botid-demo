import { checkBotId } from "botid/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_request: NextRequest) {
  const verification = await checkBotId();

  return NextResponse.json(verification, {
    status: verification.isBot ? 403 : 200,
  });
}
