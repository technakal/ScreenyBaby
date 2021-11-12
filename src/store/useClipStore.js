import { createStore, produce } from 'solid-js/store';
import Clip from '../models/clip';

const useClipStore = (initial = []) => {
	const [store, setStore] = createStore({ clips: initial });

	const addClip = clip =>
		setStore(
			'clips',
			produce(clips => clips.push(new Clip(...clip)))
		);

	const renameClip = (id, newName) => {
		return setStore(
			'clips',
			clip => clip.id === id,
			'name',
			() => newName
		);
	};

	const removeClip = id => {
		setStore(
			'clips',
			produce(clips => {
				const clipIndex = clips.findIndex(clip => clip.id === id);
				clips.splice(clipIndex, 1);
			})
		);
	};

	return [store, { addClip, renameClip, removeClip }];
};

export default useClipStore;
