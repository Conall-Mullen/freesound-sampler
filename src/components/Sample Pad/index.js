import React, { useState } from "react";
import { useSamplerStore } from "../../../stores/useSamplerStore.js";
import { produce } from "immer";

export default function SamplePad({ sample }) {
  const audioSamples = useSamplerStore((state) => state.audioSamples);
  const convertToBuffer = useSamplerStore((state) => state.convertToBuffer);
  const updateSample = useSamplerStore((state) => state.updateSample);
  const sampleIndex = audioSamples.indexOf(sample);
  const sampleVolume = useSamplerStore(
    (state) => state.sampleVolume[sampleIndex]
  );

  async function handleDropSample(event, sample) {
    event.preventDefault();
    const id = event.dataTransfer.getData("id");
    if (!id) {
      console.error("No ID retrieved from dataTransfer");
      return;
    }
    try {
      convertToBuffer(sample);
    } catch (error) {
      console.error("Error fetching or decoding audio data:", error);
    }
  }

  function playSample() {
    if (audioBuffer && audioContext) {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start(0);
      setAudioSource(source);
    }
  }

  async function fetchData(id) {
    const result = await fetch(
      `https://freesound.org/apiv2/sounds/${id}/?token=${process.env.NEXT_PUBLIC_API_TOKEN}`
    );
    const preview = await result.json();
    const previewURL = preview.previews["preview-hq-mp3"];
    return previewURL;
  }

  function handleDragOverSample(event) {
    event.preventDefault();
  }

  return (
    <div>
      <button
        className="sample-pad"
        onClick={playSample}
        onDragOver={(event) => handleDragOverSample(event)}
        onDrop={(event) => handleDropSample(event, sample)}
      ></button>
    </div>
  );
}
