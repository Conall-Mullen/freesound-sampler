import SamplePad from "../Sample Pad";

export default function Sampler() {
  const samples = [
    "samples/MR16_BD_02_T1S.wav",
    "samples/MR16_HH_C2A.wav",
    "samples/MR16_Cabasa_X1_st.wav",
    "samples/MR16_Clap_X1.wav",
    "samples/MR16_CongaHigh_T1S.wav",
    "samples/MR16_CongaLow_T1A.wav",
    "samples/MR16_Cow_C2A.wav",
    "samples/MR16_Cym_T1A.wav",
  ];
  function handleClick() {
    console.log("click");
  }
  return (
    <div className="sample-pad-container">
      {samples.map((sample, index) => (
        <SamplePad key={index} sample={sample} />
      ))}
    </div>
  );
}
