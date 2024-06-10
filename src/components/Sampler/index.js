import SamplePad from "../Sample Pad";
import { useSamplerStore } from "../../../stores/useSamplerStore";

export default function Sampler() {
  const defaultSamples = useSamplerStore((state) => state.defaultSamples);

  return (
    <div className="sample-pad-container">
      {defaultSamples.map((sample, index) => (
        <SamplePad key={index} sample={sample} />
      ))}
    </div>
  );
}
