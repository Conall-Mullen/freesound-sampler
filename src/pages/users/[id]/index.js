import { useSession } from "next-auth/react";
import LoginButton from "../../../components/LoginButton";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useSamplerStore } from "../../../../stores/useSamplerStore.js";
import Link from "next/link";
import {
  Button,
  Card,
  Group,
  IconButton,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { LuDelete, LuMenu } from "react-icons/lu";

export default function User() {
  const updateSamples = useSamplerStore((state) => state.updateSamples);
  const updateSampleVolumes = useSamplerStore(
    (state) => state.updateSampleVolumes
  );
  const updateCurrentPatch = useSamplerStore(
    (state) => state.updateCurrentPatch
  );

  const { data: session } = useSession();
  const router = useRouter();

  const { data, isLoading, mutate } = useSWR(`/api/patches`);

  if (isLoading) return <h2>Loading...</h2>;
  const patches = data;
  async function deletePatch(id) {
    await fetch(`/api/patches/${id}`, {
      method: "DELETE",
    });
  }

  return (
    <>
      <h1>Welcome {session.user.name}</h1>
      <LoginButton />

      <VStack width="auto">
        {patches.map((patch, index) => (
          <Card.Root key={index} width="15em">
            <Card.Body
              onClick={() => {
                updateSamples(patches[index].audioSources);
                updateSampleVolumes(patches[index].faderVolume);
                updateCurrentPatch(patch._id);
                router.push("/");
              }}
            >
              {patch.name}
            </Card.Body>
            <IconButton
              onClick={() => {
                deletePatch(patch._id);
              }}
            >
              <LuDelete />
            </IconButton>
          </Card.Root>
        ))}
      </VStack>
      <IconButton className="tab-button-home">
        <Link href="/">
          <LuMenu />
        </Link>
      </IconButton>
    </>
  );
}
