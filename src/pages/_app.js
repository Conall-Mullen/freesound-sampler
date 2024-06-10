import "@/styles/globals.css";
import { produce } from "immer";
import { create } from "zustand";

export const useStore = create((set) => ({
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
      })
    ),
}));
export default function App({ Component, pageProps }) {
  // const freesoundURI = `https://freesound.org/apiv2/search/text/?query=${searchTerm}&token=${process.env.NEXT_PUBLIC_API_TOKEN}`;
  return <Component {...pageProps} />;
}
