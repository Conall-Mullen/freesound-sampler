import { useSamplerStore } from "../../../stores/useSamplerStore";
import { useData } from "../../../utils/useData.js";
import { useState } from "react";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState();
  const { data, isLoading, isError } = useData(
    `https://freesound.org/apiv2/search/text/?query=${searchTerm}&token=${process.env.NEXT_PUBLIC_API_TOKEN}`
  );

  async function previewSound(id) {
    console.log("previewData", id);
    const result = await fetch(
      `https://freesound.org/apiv2/sounds/${id}/?token=${process.env.NEXT_PUBLIC_API_TOKEN}`
    );
    const preview = await result.json();
    const previewURL = preview.previews["preview-hq-mp3"];
    const previewPlayer = new Audio(previewURL);
    previewPlayer.play();
    console.log("preview url", previewURL);
  }

  async function searchForSounds(event) {
    event.preventDefault();
    setSearchTerm(event.target[0].value);
    event.target.reset();
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {isError.message}</div>;
  }
  const searchResults = data.results;
  console.log("search results", searchResults);

  return (
    <>
      <form onSubmit={searchForSounds}>
        <input type="text"></input>
        <button>search</button>
      </form>
      <ul>
        {searchResults.map((searchResult) => (
          <>
            <li key={searchResult.id}>
              {searchResult ? searchResult.name : "No results"}
            </li>
            <button
              key={`preview-${searchResult.id}`}
              className="preview-button"
              onClick={() => previewSound(searchResult.id)}
            >
              preview
            </button>
          </>
        ))}
      </ul>
    </>
  );
}
