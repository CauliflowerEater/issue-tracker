import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import NewIssueButton from "./NewIssueButton";

export const dynamic = "force-dynamic";

interface props {
  searchParams: Promise<IssueQuery>;
}

const IssuesPage = async ({ searchParams }: props) => {
  const { status, orderBy, order, page } = await searchParams;

  const queryOrder = order === "asc" || order === "desc" ? order : "asc";
  const queryOrderBy = columnNames.includes(orderBy)
    ? { [orderBy]: queryOrder }
    : undefined;

  const statuses = Object.values(Status);

  const queryStatus = statuses.includes(status) ? status : undefined;
  const where = { status: queryStatus };

  const currentPage = parseInt(page) || 1; //because the searchQuery page can be undefined.
  const pageSize = 10;

  //used to count the number of records in the database.
  const issueCount = await prisma.issue.count({
    where,
  });

  const issues = await prisma.issue.findMany({
    where,
    orderBy: queryOrderBy,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  return (
    <Flex direction={"column"} gap="3">
      <NewIssueButton />
      <IssueTable
        searchParams={searchParams}
        issues={issues}
        queryOrder={queryOrder}
      />
      <Pagination
        pageSize={pageSize}
        currentPage={currentPage}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export default IssuesPage;
