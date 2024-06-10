import { produce } from "immer";
import { create } from "zustand";
import { useData } from "../utils/useData.js";

export const useSamplerStore = create((set) => ({
  defaultSamples: [
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
        state.defaultSamples[index] = newSample;
        return state;
      })
    ),
}));
