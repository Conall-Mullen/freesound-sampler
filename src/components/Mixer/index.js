import { useSamplerStore } from "../../../stores/useSamplerStore";
import VolumeFader from "../VolumeFader";

export default function Mixer() {
  const volume = useSamplerStore((state) => state.sampleVolume);
  const audioSamples = useSamplerStore((state) => state.audioSamples);
  return (
    <div className="volume-fader-container">
      {audioSamples.map((sample, index) => (
        <VolumeFader key={index} sample={sample} />
      ))}
    </div>
  );
}
