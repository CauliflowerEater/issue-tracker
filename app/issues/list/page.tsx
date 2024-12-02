import { IssueStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import NewIssueButton from "./NewIssueButton";

export const dynamic = "force-dynamic";

interface props {
  searchParams: Promise<{
    status: Status;
    orderBy: keyof Issue;
    order: "asc" | "desc";
  }>;
}
const IssuesPage = async ({ searchParams }: props) => {
  const { status, orderBy, order } = await searchParams;

  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const statuses = Object.values(Status);

  const queryStatus = statuses.includes(status) ? status : undefined;

  const queryOrder = order === "asc" || "desc" ? order : "asc";

  const queryOrderBy = columns.map((column) => column.value).includes(orderBy)
    ? { [orderBy]: queryOrder }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status: queryStatus },
    orderBy: queryOrderBy,
  });

  return (
    <div>
      <NewIssueButton />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                {order === "asc" ? (
                  <NextLink
                    href={{
                      query: { status, orderBy: column.value, order: "desc" },
                    }}
                  >
                    {column.label}
                  </NextLink>
                ) : (
                  <NextLink
                    href={{
                      query: { status, orderBy: column.value, order: "asc" },
                    }}
                  >
                    {column.label}
                  </NextLink>
                )}

                {column.value === orderBy && order === "asc" && (
                  <ArrowUpIcon className="inline" />
                )}
                {column.value === orderBy && order === "desc" && (
                  <ArrowDownIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
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
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
