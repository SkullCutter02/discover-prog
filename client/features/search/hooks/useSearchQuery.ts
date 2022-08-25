import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function useSearchQuery() {
  const router = useRouter();
  const initialQuery = router.query.q as string;

  const state = useState<string>("");

  useEffect(() => {
    if (initialQuery) state[1](initialQuery);
  }, [initialQuery]);

  return state;
}
