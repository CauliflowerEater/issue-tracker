import LatestIssues from "./LatestIssues";

interface props {
  searchParams: Promise<{ page: string }>;
}

export default async function Home({ searchParams }: props) {
  const { page } = await searchParams;

  return <LatestIssues />;
}
