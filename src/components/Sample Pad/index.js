"use client";
import React from "react";
import { useSamplerStore } from "../../../stores/useSamplerStore.js";
import { produce } from "immer";

export default function SamplePad({ sample }) {
  const audioSamples = useSamplerStore((state) => state.audioSamples);
  const updateSample = useSamplerStore((state) => state.updateSample);
  const sampleVolume = useSamplerStore((state) => state.sampleVolume);

  const audioPlayer = new Audio(sample);
  const sampleIndex = audioSamples.indexOf(sample);
  audioPlayer.volume = sampleVolume[sampleIndex];

  function playSample() {
    audioPlayer.play();
  }
  function handleDragOverSample(event) {
    event.preventDefault();
  }
  async function handleDropSample(event, sample) {
    event.preventDefault();
    const id = event.dataTransfer.getData("id");
    if (!id) {
      console.error("No ID retrieved from dataTransfer");
      return;
    }
    try {
      const newAudio = await fetchData(id);
      console.log("New audio URL:", newAudio);

      audioSamples.forEach((audioSample, index) => {
        if (audioSample === sample) {
          updateSample(index, newAudio);
        }
      });
    } catch (error) {
      console.error("Error fetching new audio:", error);
    }
  }

  async function fetchData(id) {
    const result = await fetch(
      `https://freesound.org/apiv2/sounds/${id}/?token=${process.env.NEXT_PUBLIC_API_TOKEN}`
    );
    const preview = await result.json();
    const previewURL = await preview.previews["preview-hq-mp3"];
    return previewURL;
  }

  return (
    <>
      <button
        className="sample-pad"
        onClick={playSample}
        onDragOver={(event) => handleDragOverSample(event)}
        onDrop={(event) => handleDropSample(event, sample)}
      ></button>
    </>
  );
}
