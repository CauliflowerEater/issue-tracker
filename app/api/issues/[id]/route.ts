import { patchIssueSchema } from "@/app/ValidationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOption from "../../auth/authOptions";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // const session = await getServerSession(authOption);
  // if (!session) return NextResponse.json({}, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { assignedToUserId, title, discription } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });

    if (!user)
      return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  // as an API what should it do when the record doesn't exist, or just ensure it's exist, but its impossible.

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title, discription, assignedToUserId },
  });

  return NextResponse.json(updatedIssue, { status: 201 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOption);
  if (!session) return NextResponse.json({}, { status: 401 });

  const { id } = await params;

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!issue)
    return NextResponse.json({ error: "issue not found" }, { status: 404 });
  const deletedIssue = await prisma.issue.delete({ where: { id: issue.id } });
  return NextResponse.json(deletedIssue);
}
