import { createEffect } from 'solid-js';
import ClipContainer from './components/clip/ClipContainer';
import SectionContainer from './components/containers/SectionContainer';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import VideoContainer from './components/video/VideoContainer';
import { MAIN, SITE_TITLE } from './constants';
import useClipStore from './store/useClipStore';

function App() {
	const [clipStore, { addClip, renameClip, removeClip }] = useClipStore([]);

	createEffect(() => console.log(clipStore.clips));

	return (
		<>
			<Header class="mx-auto px-6" title={SITE_TITLE} />
			<SectionContainer type={MAIN} role="main" class="mb-14">
				<VideoContainer addClip={addClip} />
				<ClipContainer
					clips={clipStore.clips}
					renameClip={renameClip}
					removeClip={removeClip}
				/>
			</SectionContainer>
			<Footer />
		</>
	);
}

export default App;
