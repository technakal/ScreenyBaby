import SelectInput from "./components/ui/inputs/SelectInput";
import Label from "./components/ui/typeography/Label";
import { createEffect, createSignal } from "solid-js";
import Button from "./components/ui/Button";
import ClipList from "./components/Clip/ClipList";
import { createStore, produce } from "solid-js/store";
import useForm from "./services/useForm";
import Clip from "./models/clip";
import useClipStore from "./store/useClipStore";

const testClips = [
  new Clip("Test Clip 1", "#"),
  new Clip("Test Clip 2", "#"),
  new Clip("Test Clip 3", "#"),
  new Clip("Test Clip 4", "#"),
];
function App() {
  const [store, { update, reset }] = useForm("quality");
  const [recording, setRecording] = createSignal(false);
  const [clipStore, { addClip, renameClip, removeClip }] =
    useClipStore(testClips);

  createEffect(() => console.log(recording()));

  return (
    <div>
      <header class="header__main">
        <h1 class="header__main--logo">Screenie Baby</h1>
        <div class="control__main">
          <form class="control__main--group">
            <Label htmlFor="videoQuality">Video Quality</Label>
            <SelectInput
              id="videoQuality"
              value={store.quality.videoQuality}
              onChange={update}
              options={[
                { value: "150000", label: "Low" },
                { value: "500000", label: "Medium" },
                { value: "1000000", label: "High" },
                { value: "2500000", label: "Super High" },
              ]}
            />
          </form>
          <div class="control__main--group">
            <Button
              class="control__main--button"
              name="control-record"
              onClick={() => setRecording((prev) => !prev)}
            >
              Record
            </Button>
          </div>
        </div>
      </header>
      <main role="main">
        <video autoplay />
        <ClipList clips={clipStore.clips} removeClip={removeClip} />
      </main>
      <footer>Made by N. Keener</footer>
    </div>
  );
}

export default App;
