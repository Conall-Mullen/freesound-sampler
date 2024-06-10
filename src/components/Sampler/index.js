import SamplePad from "../Sample Pad";
import { useStore } from "../../pages/_app.js";

export default function Sampler() {
  const defaultSamples = useStore((state) => state.defaultSamples);

  return (
    <div className="sample-pad-container">
      {defaultSamples.map((sample, index) => (
        <SamplePad key={index} sample={sample} />
      ))}
    </div>
  );
}
