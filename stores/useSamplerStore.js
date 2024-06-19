import { produce } from "immer";
import { create } from "zustand";
import { useData } from "../utils/useData.js";

export const useSamplerStore = create((set) => ({
  audioSamples: [
    "samples/MR16_BD_02_T1S.wav",
    "samples/MR16_HH_C2A.wav",
    "samples/MR16_Cabasa_X1_st.wav",
    "samples/MR16_Clap_X1.wav",
    "samples/MR16_CongaHigh_T1S.wav",
    "samples/MR16_CongaLow_T1A.wav",
    "samples/MR16_Cow_C2A.wav",
    "samples/MR16_Cym_T1A.wav",
  ],
  updateSample: (index, newSample) =>
    set(
      produce((state) => {
        state.audioSamples[index] = newSample;
        return state;
      })
    ),
  updateAllSamples: (newSamples) => set({ audioSamples: newSamples }),
  convertToBuffer: async (url) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioContext = new AudioContext();
    const decodedData = await audioContext.decodeAudioData(arrayBuffer);
    console.log("decoded data", decodedData);
  },
  sampleVolume: [1, 1, 1, 1, 1, 1, 1, 1],
  updateSampleVolume: (index, volume) =>
    set(
      produce((state) => {
        state.sampleVolume[index] = volume;
        return state;
      })
    ),
  updateAllSamplesVolume: (newVolumes) => set({ sampleVolume: newVolumes }),

  viewSaveButton: false,
  updateViewSaveButton: () =>
    set((state) => ({ viewSaveButton: !state.viewSaveButton })),

  viewSearchBar: false,
  updateViewSearchBar: () =>
    set((state) => ({ viewSearchBar: !state.viewSearchBar })),

  viewMixer: false,
  updateViewMixer: () => set((state) => ({ viewMixer: !state.viewMixer })),
}));
