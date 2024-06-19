import { useSession } from "next-auth/react";
import LoginButton from "../../../components/LoginButton";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useSamplerStore } from "../../../../stores/useSamplerStore.js";

export default function User() {
  const audioSamples = useSamplerStore((state) => state.audioSamples);
  const updateSample = useSamplerStore((state) => state.updateSamples);
  const updateSampleVolumes = useSamplerStore(
    (state) => state.updateSampleVolumes
  );

  const { data: session } = useSession();
  const router = useRouter();

  const { data, isLoading, mutate } = useSWR(`/api/patches`);

  if (!session || isLoading) return <h2>Loading...</h2>;
  const patches = data;

  async function deletePatch(patchId) {
    // Delete after restructuring
  }
  function handleUpdateSamples(urls) {
    console.log("urls", urls);
    urls.forEach((url, i) => writeUrlToBuffer(url, i));
  }
  async function writeUrlToBuffer(url, i) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioContext = new AudioContext();
    const decodedData = await audioContext.decodeAudioData(arrayBuffer);
    updateSample(i, decodedData);
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
                handleUpdateSamples(patches[index].audioSources);
                updateSampleVolumes(patches[index].faderVolume);
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
                class="lucide lucide-circle-x"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
