import { createStore, produce } from "solid-js/store";

const useClipStore = (initial = []) => {
  const [store, setStore] = createStore({ clips: initial });

  const addClip = (clip) =>
    setStore(
      "clips",
      produce((clips) => clips.push(new Clip(...clip)))
    );

  const renameClip = (id, newName) =>
    setStore(
      "clips",
      (clip) => clip.id === id,
      produce((clip) => (clip.name = newName))
    );

  const removeClip = (id) =>
    setStore("clips", (clips) => clips.filter((clip) => clip.id !== id));

  return [store, { addClip, renameClip, removeClip }];
};

export default useClipStore;
