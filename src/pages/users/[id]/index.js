import { useSession } from "next-auth/react";
import LoginButton from "../../../components/LoginButton";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useSamplerStore } from "../../../../stores/useSamplerStore.js";
import { ReactComponent as YourSvg } from "../../../../public/icons/circle-x.svg";
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
      <ul>
        {patches.map((patch, index) => (
          <li key={index} className="patch-list-item">
            <p
              onClick={() => {
                updateSamples(patches[index].audioSources);
                updateSampleVolumes(patches[index].faderVolume);
                updateCurrentPatch(patch._id);
                router.push("/");
              }}
              className="patch-name"
            >
              {patch.name}
            </p>
            <button
              className="delete-patch-button"
              onClick={() => {
                deletePatch(patch._id);
              }}
            >
              <YourSvg />
              {/* <svgs
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-circle-x"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svgs> */}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
