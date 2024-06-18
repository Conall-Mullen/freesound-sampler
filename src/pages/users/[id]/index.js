import { useSession } from "next-auth/react";
import LoginButton from "../../../components/LoginButton";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function User() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, mutate } = useSWR(`/api/users`);

  if (!session || isLoading) return <h2>Loading...</h2>;
  console.log("data", data);
  return (
    <>
      <h1>Welcome {session.user.name}</h1>
      <LoginButton />
    </>
  );
}
