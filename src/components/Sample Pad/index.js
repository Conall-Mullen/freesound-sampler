import React, { useState, useEffect } from "react";
import { useSamplerStore } from "../../../stores/useSamplerStore.js";
import { produce } from "immer";

export default function SamplePad({ sample, button }) {
  const audioSamples = useSamplerStore((state) => state.audioSamples);
  const updateSample = useSamplerStore((state) => state.updateSample);

  const [audioBuffer, setAudioBuffer] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [audioSource, setAudioSource] = useState(null);

  const sampleIndex = audioSamples.indexOf(sample);
  const sampleVolume = useSamplerStore(
    (state) => state.sampleVolume[sampleIndex]
  );
  console.log("buttonIndex", button, "key pressed", window.event);

  useEffect(() => {
    async function convertUrlToBuffer() {
      const response = await fetch(sample);
      const arrayBuffer = await response.arrayBuffer();
      const audioContext = new AudioContext();
      const decodedData = await audioContext.decodeAudioData(arrayBuffer);
      setAudioBuffer(decodedData);
      setAudioContext(audioContext);
    }
    convertUrlToBuffer();
  }, [sample]);

  async function handleDropSample(event, sample) {
    event.preventDefault();
    const id = event.dataTransfer.getData("id");
    if (!id) {
      console.error("No ID retrieved from dataTransfer");
      return;
    }
    try {
      const newAudioUrl = await fetchData(id);
      const response = await fetch(newAudioUrl);
      const arrayBuffer = await response.arrayBuffer();
      const audioContext = new AudioContext();
      const decodedData = await audioContext.decodeAudioData(arrayBuffer);
      setAudioBuffer(decodedData);
      setAudioContext(audioContext);
      updateSample(sampleIndex, newAudioUrl);
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
