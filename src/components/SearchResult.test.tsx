import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { SearchResult } from "./SearchResult";

afterEach(cleanup);

describe("SearchResult component", () => {
  it("renders correctly with results", () => {
    const results: any[] = [
      {
        trackId: "Track1",
        artworkUrl100: "http://example.com/image1.jpg",
        trackName: "Track 1",
        artistName: "Artist 1",
        collectionName: "Album 1",
      },
      {
        trackId: "Track2",
        artworkUrl100: "http://example.com/image2.jpg",
        trackName: "Track 2",
        artistName: "Artist 2",
        collectionName: "Album 2",
      },
    ];

    render(<SearchResult results={results} />);

    expect(screen.getByText("Track Name: Track 1")).toBeInTheDocument();
    expect(screen.getByText("Artist Name: Artist 1")).toBeInTheDocument();
    expect(screen.getByText("Album Name: Album 1")).toBeInTheDocument();
    expect(screen.getByText("Track Name: Track 2")).toBeInTheDocument();
    expect(screen.getByText("Artist Name: Artist 2")).toBeInTheDocument();
    expect(screen.getByText("Album Name: Album 2")).toBeInTheDocument();
  });

  it("renders correctly with no results", () => {
    render(<SearchResult results={[]} />);
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });
});
