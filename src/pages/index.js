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
        Loading...
       
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
