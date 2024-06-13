import { useSamplerStore } from "../../../stores/useSamplerStore";
export default function SaveButton() {
  const seen = useSamplerStore((state) => state.seen);
  const updateSeen = useSamplerStore((state) => state.updateSeen);

  function savePatch(event) {
    event.preventDefault();
    console.log(event.target[0].value);
    event.target.reset();
    updateSeen(!seen);
  }
  return (
    <>
      <form onSubmit={savePatch}>
        <input type="text"></input>
        <button type="submit">save</button>
      </form>
    </>
  );
}
