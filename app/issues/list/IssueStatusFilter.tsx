import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const status: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const route = useRouter();
  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status != "All" ? `?status=${status}` : "";
        route.push("/issues/list/" + query);
      }}
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
