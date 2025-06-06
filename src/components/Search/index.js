import { Button, Group, Input, Spinner } from "@chakra-ui/react";
import { useSamplerStore } from "../../../stores/useSamplerStore";
import { useData } from "../../../utils/useData.js";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LuLoaderCircle } from "react-icons/lu";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useData(
    `https://freesound.org/apiv2/search/text/?query=${searchTerm}=&token=${process.env.NEXT_PUBLIC_API_TOKEN}`
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
  }

  async function searchForSounds(event) {
    event.preventDefault();
    setSearchTerm(event.target[0].value);
    event.target.reset();
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    console.error("error");
    return;
  }

  function handleDrag(event, id) {
    console.log("result", id);
    event.dataTransfer.setData("id", id);
  }
  function handleScroll(event) {
    console.log("Scroll position:", event.target.scrollTop);
  }

  const searchResults = data.results;

  return (
    <div className="search-container">
      <form onSubmit={searchForSounds}>
        <Group>
          <Input type="text"></Input>
          <Button type="submit">search</Button>
        </Group>
      </form>
      <InfiniteScroll
        dataLength={searchResults.length}
        className="search-results"
      >
        {searchResults.map((searchResult, index) => (
          <>
            <li
              key={index}
              draggable
              onDragStart={(event) => handleDrag(event, searchResult.id)}
            >
              {searchResult.name}
              <button
                className="preview-button"
                onClick={() => previewSound(searchResult.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="preview-icon"
                >
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              </button>
            </li>
          </>
        ))}
      </InfiniteScroll>
    </div>
  );
}
