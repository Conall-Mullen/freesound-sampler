import LoginButton from "../components/LoginButton";
import Sampler from "../components/Sampler";
import Search from "../components/Search";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <>
      <h1>Freesound Sampler</h1>
      {!session && <LoginButton />}
      {session && (
        <>
          <LoginButton />
          <Sampler />
          <Search />
        </>
      )}
    </>
  );
}
