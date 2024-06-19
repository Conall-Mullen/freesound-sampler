import SamplePad from "../Sample Pad";
import { useSamplerStore } from "../../../stores/useSamplerStore";
import useSWR from "swr";

export default function Sampler() {
  const audioSamples = useSamplerStore((state) => state.audioSamples);

  return (
    <div className="sample-pad-container">
      {audioSamples.map((sample, index) => (
        <SamplePad key={index} sample={sample} />
      ))}
    </div>
  );
}
