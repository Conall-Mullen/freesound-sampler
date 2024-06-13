import { useSamplerStore } from "../../stores/useSamplerStore";
import LoginButton from "../components/LoginButton";
import Mixer from "../components/Mixer";
import Sampler from "../components/Sampler";
import SaveButton from "../components/SaveButton";
import Search from "../components/Search";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const seen = useSamplerStore((state) => state.seen);
  const updateSeen = useSamplerStore((state) => state.updateSeen);

  return (
    <>
      <h1>Freesound Sampler</h1>
      {!session && <LoginButton />}
      {session && (
        <>
          <LoginButton />
          <button onClick={() => updateSeen(!seen)}>save patch?</button>
          {seen ? <SaveButton /> : null}
          <Sampler />
          <Search />
          <Mixer />
        </>
      )}
    </>
  );
}
