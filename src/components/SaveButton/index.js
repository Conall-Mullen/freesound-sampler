import { useSamplerStore } from "../../../stores/useSamplerStore";
import { useData } from "../../../utils/useData";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function SaveButton() {
  const viewSaveButton = useSamplerStore((state) => state.viewSaveButton);

  const updateViewSaveButton = useSamplerStore(
    (state) => state.updateViewSaveButton
  );

  const audioSamples = useSamplerStore((state) => state.audioSamples);
  const sampleVolume = useSamplerStore((state) => state.sampleVolume);
  const currentPatch = useSamplerStore((state) => state.currentPatch);

  const { data: patch, mutate } = useSWR(`/api/patches/${currentPatch}`);

  async function savePatch(event) {
    event.preventDefault();

    const saveData = {
      name: event.target[0].value,
      audioSources: audioSamples,
      faderVolume: sampleVolume,
    };
    console.log(JSON.stringify(saveData));
    console.log("saveData", saveData);
    try {
      const response = await fetch("/api/patches/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveData),
      });
    } catch (e) {
      console.error(e.message);
    }

    event.target.reset();
    updateViewSaveButton(!viewSaveButton);
  }
  async function saveChanges() {
    const saveData = {
      name: patch.name,
      audioSources: audioSamples,
      faderVolume: sampleVolume,
    };

    const response = await fetch(`/api/patches/${currentPatch}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saveData),
    });

    if (response.ok) {
      mutate();
      updateViewSaveButton(!viewSaveButton);
    }
  }
  return !currentPatch ? (
    <>
      <form onSubmit={savePatch} className="save-bar">
        <input type="text" className="text-field"></input>
        <button type="submit" className="submit-button">
          save
        </button>
      </form>
    </>
  ) : (
    <button onClick={saveChanges} className="save-bar submit-button">
      save changes
    </button>
  );
}
