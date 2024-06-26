import { useSamplerStore } from "../../../stores/useSamplerStore";

export default function VolumeFader({ sample }) {
  const audioSamples = useSamplerStore((state) => state.audioSamples);
  const updateSampleVolume = useSamplerStore(
    (state) => state.updateSampleVolume
  );
  const sampleVolume = useSamplerStore((state) => state.sampleVolume);
  function moveFader(event) {
    audioSamples.forEach((audioSample, index) => {
      if (audioSample === sample) {
        updateSampleVolume(index, event.target.value / 100);
      }
    });
    console.log(sampleVolume);
  }
  return (
    <>
      <input
        type="range"
        className="volume-fader"
        onChange={moveFader}
        defaultValue="100"
      ></input>
    </>
  );
}
