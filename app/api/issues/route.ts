import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  discription: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = createIssueSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });
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
