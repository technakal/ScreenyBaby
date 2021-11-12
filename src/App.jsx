import { createEffect } from 'solid-js';
import ClipList from './components/Clip/ClipList';
import Container from './components/containers/Container';
import Button from './components/ui/Button';
import SelectInput from './components/ui/inputs/SelectInput';
import Label from './components/ui/typeography/Label';
import Clip from './models/clip';
import useForm from './services/useForm';
import useToggle from './services/useToggle';
import useClipStore from './store/useClipStore';
import Header from './components/layout/Header';
import ClipContainer from './components/clip/ClipContainer';

const testClips = [
	new Clip('Test Clip 1', '#'),
	new Clip('Test Clip 2', '#'),
	new Clip('Test Clip 3', '#'),
	new Clip('Test Clip 4', '#')
];
function App() {
	const [store, { update, reset }] = useForm('quality');
	const [recording, setRecording] = useToggle(false);
	const [clipStore, { addClip, renameClip, removeClip }] =
		useClipStore(testClips);

	createEffect(() => console.log(clipStore.clips));

	return (
		<Container>
			<Header />
			<div class="control__main">
				<form class="control__main--group">
					<Label htmlFor="videoQuality">Video Quality</Label>
					<SelectInput
						id="videoQuality"
						value={store.quality.videoQuality}
						onChange={update}
						options={[
							{ value: '150000', label: 'Low' },
							{ value: '500000', label: 'Medium' },
							{ value: '1000000', label: 'High' },
							{ value: '2500000', label: 'Super High' }
						]}
					/>
				</form>
				<div class="control__main--group">
					<Button
						class="control__main--button"
						name="control-record"
						onClick={setRecording}>
						{recording() ? 'Stop' : 'Record'}
					</Button>
				</div>
			</div>
			<main role="main">
				<video autoplay />
				<ClipContainer
					clips={clipStore.clips}
					renameClip={renameClip}
					removeClip={removeClip}
				/>
			</main>
			<footer>Made by N. Keener</footer>
		</Container>
	);
}

export default App;
