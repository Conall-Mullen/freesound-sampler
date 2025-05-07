import { useSamplerStore } from "../../../stores/useSamplerStore";
import { Slider } from "@chakra-ui/react";

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
      <Slider.Root
        height="200px"
        orientation="vertical"
        onChange={moveFader}
        defaultValue={[100]}
      >
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>
    </>
  );
}
