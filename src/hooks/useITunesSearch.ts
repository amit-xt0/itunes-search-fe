import { useEffect, useState } from "react";
import { iTunesResult } from "../types/iTunesResult";

export function useITunesSearch(
  entity: string,
  searchTerm: string,
  page: number
) {
  const [results, setResults] = useState<iTunesResult[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (!searchTerm) return;

    function fetchData() {
      fetch(
        `http://localhost:4000/search?term=${searchTerm}&entity=${entity}&limit=10&offset=${
          page * 10
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          setResults((prevResults) => [...prevResults, ...data.results]);
          if (data.results.length === 0) {
            setHasMore(false);
          } else {
            setHasMore(true);
          }
        })
        .catch((err) => console.log(err));
    }

    fetchData();
  }, [searchTerm, entity, page]);

  function resetSearchTerm(searchInput: string) {
    setResults([]);
  }

  return { results, hasMore, resetSearchTerm };
}
