"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">
          <TrashIcon />
          {/* <Link href={`/issues/${issueId}/delete`}>Delete Issue</Link> */}
          Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you wanna delete this issue? This action can not be
          undone.
        </AlertDialog.Description>
        <Flex gap="4" mt="4">
          <AlertDialog.Cancel>
            <Button variant="soft" color="green">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <Button
            variant="soft"
            color="red"
            onClick={async () => {
              await axios.delete("/api/issues/" + issueId);
              router.push("/issues");
              router.refresh();
            }}
          >
            Delete Issue
          </Button>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
