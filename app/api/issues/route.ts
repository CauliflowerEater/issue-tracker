import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../ValidationSchema";

export async function POST(request: NextRequest) {
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
