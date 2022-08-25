import { useRouter } from "next/router";

export default function useSearch(searchQuery: string) {
  const router = useRouter();

  return () => router.push(`/search?q=${searchQuery}`);
}
