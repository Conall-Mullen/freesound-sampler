import SamplePad from "../Sample Pad";
import { useSamplerStore } from "../../../stores/useSamplerStore";
import { useState, useEffect } from "react";

export default function Sampler() {
  const audioSamples = useSamplerStore((state) => state.audioSamples);

  return (
    <div className="sample-pad-container">
      {audioSamples.map((sample, index) => (
        <div key={index}>
          <SamplePad sample={sample} button={index} />
        </div>
      ))}
    </div>
  );
}
