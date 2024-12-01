import { IssueStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import NewIssueButton from "./NewIssueButton";

export const dynamic = "force-dynamic";

interface props {
  searchParams: Promise<{ status: Status }>;
}
const IssuesPage = async ({ searchParams }: props) => {
  const { status } = await searchParams;

  const statuses = Object.values(Status);

  const queryStatus = statuses.includes(status) ? status : undefined;

  const issues = await prisma.issue.findMany({
    where: { status: queryStatus },
  });

  const serializedIssues = issues.map((issue) => ({
    ...issue,
    createdAt: issue.createdAt.toDateString(), //Serialize the time stamp to ISO string
  }));

  return (
    <div>
      <NewIssueButton />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {serializedIssues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
