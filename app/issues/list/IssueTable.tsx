import { IssueStatusBadge, Link } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";

interface props {
  searchParams: Promise<IssueQuery>;
  issues: Issue[];
  queryOrder: string;
}

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  order: "asc" | "desc";
  page: string;
}

const IssueTable = async ({ searchParams, issues, queryOrder }: props) => {
  const { status, orderBy, order } = await searchParams;

  return (
    <>
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

                {column.value === orderBy && queryOrder === "asc" && (
                  <ArrowUpIcon className="inline" />
                )}
                {column.value === orderBy && queryOrder === "desc" && (
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
    </>
  );
};

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
