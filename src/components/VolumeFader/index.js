export default function VolumeFader({ sample }) {
  function moveFader(event) {
    console.dir(`set ${sample} volume to ${event.target.value}`);
  }
  return (
    <>
      <input type="range" className="volume-fader" onChange={moveFader}></input>
    </>
  );
}
