import { useSamplerStore } from "../../../stores/useSamplerStore";
import { useData } from "../../../utils/useData.js";
import { useState } from "react";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState();
  const { data, isLoading, isError } = useData(
    `https://freesound.org/apiv2/search/text/?query=${searchTerm}&token=${process.env.NEXT_PUBLIC_API_TOKEN}`
  );

  const searchForSounds = async (event) => {
    event.preventDefault();
    setSearchTerm(event.target[0].value);
    event.target.reset();
  };

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
          <li key={data.id}>
            {searchResult ? searchResult.name : "No results"}
          </li>
        ))}
      </ul>
    </>
  );
}
