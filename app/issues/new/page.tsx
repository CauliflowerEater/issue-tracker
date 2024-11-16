"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface IssueForm {
  title: string;
  discription: string;
}

const NewIssuePage = () => {
  const [error, setError] = useState("");

  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-6">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("Unexpected issue occured!");
            console.log(error);
          }
        })}
      >
        <TextField.Root placeholder="title... " {...register("title")} />
        <Controller
          name="discription"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="discription..." {...field} />
          )}
        />

        <Button>Submit!</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
