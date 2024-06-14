import { useSamplerStore } from "../../../stores/useSamplerStore";
import { useData } from "../../../utils/useData";
export default function SaveButton() {
  const seen = useSamplerStore((state) => state.seen);
  const updateSeen = useSamplerStore((state) => state.updateSeen);
  const audioSamples = useSamplerStore((state) => state.audioSamples);
  const sampleVolume = useSamplerStore((state) => state.sampleVolume);

  async function savePatch(event) {
    event.preventDefault();
    console.dir(event.target);
    const saveData = {
      name: event.target[0].value,
      audioSources: audioSamples,
      faderVolume: sampleVolume,
    };
    const response = await fetch("/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saveData),
    });

    event.target.reset();
    updateSeen(!seen);
  }
  return (
    <>
      <form onSubmit={savePatch}>
        <input type="text"></input>
        <button type="submit">save</button>
      </form>
    </>
  );
}
