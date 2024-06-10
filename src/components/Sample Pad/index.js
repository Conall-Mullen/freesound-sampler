"use client";
import React from "react";
import { useSamplerStore } from "../../../stores/useSamplerStore.js";
import { produce } from "immer";

export default function SamplePad({ sample }) {
  const audioSamples = useSamplerStore((state) => state.audioSamples);
  const updateSample = useSamplerStore((state) => state.updateSample);

  function playSample(event) {
    const audioPlayer = new Audio(sample);
    audioPlayer.play();
  }
  function handleDragOverSample(event) {
    event.preventDefault();
  }
  function handleDropSample(event, sample) {
    audioSamples.forEach((audioSample, index) => {
      if (audioSample === sample) {
        updateSample(index, event.dataTransfer.getData("name"));
      }
      console.log("updated sample", audioSamples);
    });
  }

  return (
    <>
      <button
        className="sample-pad"
        onClick={playSample}
        onDragOver={(event) => handleDragOverSample(event)}
        onDrop={(event) => handleDropSample(event, sample)}
      >
        {sample}
      </button>
    </>
  );
}
