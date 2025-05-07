import SamplePad from "../Sample Pad";
import { useSamplerStore } from "../../../stores/useSamplerStore";
import { useState, useEffect } from "react";
import { Grid, Center } from "@chakra-ui/react";

export default function Sampler() {
  const audioSamples = useSamplerStore((state) => state.audioSamples);

  return (
    <Center>
      <Grid templateColumns="repeat(4, 1fr)" justifyItems="center" gap="3">
        {audioSamples.map((sample, index) => (
          <div key={index}>
            <SamplePad sample={sample} />
          </div>
        ))}
      </Grid>
    </Center>
  );
}
