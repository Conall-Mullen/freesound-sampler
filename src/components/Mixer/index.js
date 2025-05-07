import { useSamplerStore } from "../../../stores/useSamplerStore";
import VolumeFader from "../VolumeFader";
import { Center, Grid } from "@chakra-ui/react";

// TODO: Save state of faders when closed

export default function Mixer() {
  const volume = useSamplerStore((state) => state.sampleVolume);
  const audioSamples = useSamplerStore((state) => state.audioSamples);
  return (
    <Center>
      <Grid templateColumns="repeat(8, 1fr)" gap="11">
        {audioSamples.map((sample, index) => (
          <VolumeFader key={index} sample={sample} />
        ))}
      </Grid>
    </Center>
  );
}
