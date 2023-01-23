import { renderHook, act } from "@testing-library/react";
import { useITunesSearch } from "./useITunesSearch";

describe("useSearchResults", () => {
  const entity = "song";
  const searchTerm = "John";
  let page = 0;

  beforeEach(() => {
    page = 0;
  });

  it("should return the correct results and hasMore value", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () =>
        Promise.resolve({
          results: [
            { id: 1, name: "John" },
            { id: 2, name: "John Doe" },
          ],
        }),
    });

    const { result } = renderHook(() =>
      useITunesSearch(entity, searchTerm, page)
    );
    expect(result.current.results).toEqual([]);
    expect(result.current.hasMore).toBe(false);

    await act(async () => {
      result.current.resetSearchTerm(searchTerm);
    });
    expect(result.current.results).toEqual([
      { id: 1, name: "John" },
      { id: 2, name: "John Doe" },
    ]);
    expect(result.current.hasMore).toBe(true);
  });

  it("should return the correct hasMore value when there are no more results", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () =>
        Promise.resolve({
          results: [],
        }),
    });

    const { result } = renderHook(() =>
      useITunesSearch(entity, searchTerm, page)
    );

    await act(async () => {
      result.current.resetSearchTerm(searchTerm);
    });
    expect(result.current.results).toEqual([]);
    expect(result.current.hasMore).toBe(false);
  });

  it("should handle errors when fetching data", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Fetch failed"));

    const { result } = renderHook(() =>
      useITunesSearch(entity, searchTerm, page)
    );

    await act(async () => {
      result.current.resetSearchTerm(searchTerm);
    });
    expect(result.current.results).toEqual([]);
    expect(result.current.hasMore).toBe(false);
  });

  it("should not fetch data when searchTerm is empty", async () => {
    global.fetch = jest.fn();
    const { result } = renderHook(() => useITunesSearch(entity, "", page));
    expect(global.fetch).not.toHaveBeenCalled();
    expect(result.current.results).toEqual([]);
  });
});
