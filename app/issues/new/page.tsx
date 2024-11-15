"use client";
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="title... " />
      <SimpleMDE placeholder="discription..." />
      <Button>Submit!</Button>
    </div>
  );
};

export default NewIssuePage;
