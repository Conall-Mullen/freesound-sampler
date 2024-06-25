import { useSamplerStore } from "../../stores/useSamplerStore";
import LoginButton from "../components/LoginButton";
import Mixer from "../components/Mixer";
import Sampler from "../components/Sampler";
import Tabs from "../components/Tabs";
import Image from "next/image";
import { useSession } from "next-auth/react";
import useSWR from "swr";

export default function Home() {
  const { data: session, status } = useSession();

  const viewMixer = useSamplerStore((state) => state.viewMixer);
  const { data, isLoading, mutate } = useSWR(`/api/patches`);

  if (isLoading)
    return (
      <h2>
        Loading{" "}
        <div className="loading-search-results">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 2v4" />
            <path d="m16.2 7.8 2.9-2.9" />
            <path d="M18 12h4" />
            <path d="m16.2 16.2 2.9 2.9" />
            <path d="M12 18v4" />
            <path d="m4.9 19.1 2.9-2.9" />
            <path d="M2 12h4" />
            <path d="m4.9 4.9 2.9 2.9" />
          </svg>
        </div>
      </h2>
    );

  return (
    <>
      <a href="https://freesound.org/">
        <Image
          src="/icons/Freesound_project_website_logo.png"
          alt="freesound-logo"
          width="270"
          height="94"
        ></Image>
      </a>

      {!session && <LoginButton />}
      {session && (
        <div className="home-page-container">
          <LoginButton />

          <Sampler />
          <Tabs />

          {viewMixer ? <Mixer /> : null}
        </div>
      )}
    </>
  );
}
