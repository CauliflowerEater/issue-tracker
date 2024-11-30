import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../ValidationSchema";
import authOption from "../auth/authOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOption);
  if (!session) return NextResponse.json({}, { status: 401 });

  try {
    const body = await request.json();

    const validation = issueSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });
    const newIssue = await prisma.issue.create({
      data: { title: body.title, discription: body.discription },
    });

    if (newIssue) return NextResponse.json(newIssue, { status: 201 });
  } catch (e) {
    console.error("Error creating issue:", e);
    return NextResponse.json(
      { message: "Failed to create issue" },
      { status: 400 }
    );
  }
}
