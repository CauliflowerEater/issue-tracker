"use client";
import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete("/api/issues/" + issueId);
      setLoading(false);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isLoading}>
            Delete Issue
            {isLoading && <Spinner />}
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
            <AlertDialog.Cancel>
              <Button variant="soft" color="red" onClick={onDelete}>
                Delete Issue
              </Button>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted
          </AlertDialog.Description>
          <Button
            color="pink"
            variant="soft"
            onClick={() => setError(false)}
            mt="3"
          >
            OK!
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
