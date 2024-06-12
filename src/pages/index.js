import LoginButton from "@/components/LoginButton";
import Sampler from "@/components/Sampler";
import Search from "@/components/Search";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <>
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
