import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const status: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const route = useRouter();
  const searchParams = useSearchParams();

  const selectStatus = (status: string) => {
    const params = new URLSearchParams();
    if (status != "All") params.append("status", status);

    const orderBy = searchParams.get("orderBy");
    if (orderBy) params.append("orderBy", orderBy);

    const order = searchParams.get("order");
    if (order) params.append("order", order);

    const query = params.size ? "?" + params.toString() : "";
    route.push("/issues/list/" + query);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || ""}
      onValueChange={selectStatus}
    >
      <Select.Trigger placeholder="filter by status..." />
      <Select.Content>
        <Select.Group>
          {status.map((status) => (
            <Select.Item key={status.label} value={status.value || "All"}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
