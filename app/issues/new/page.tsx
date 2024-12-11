"use client";
// import IssueForm from "../_component/IssueForm";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
const IssueForm = dynamic(() => import("@/app/issues/_component/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;

