import Pagination from "./components/Pagination";

interface props {
  searchParams: Promise<{ page: string }>;
}

export default async function Home({ searchParams }: props) {
  const { page } = await searchParams;

  return (
    <Pagination itemCount={100} pageSize={10} currentPage={parseInt(page)} />
  );
}
