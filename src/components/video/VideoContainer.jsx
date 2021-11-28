import { compose, defaultTo, map, path, values } from 'ramda';
import useForm from '../../services/useForm';
import useScreenRecorder from '../../services/useScreenRecorder';
import SectionContainer from '../containers/SectionContainer';
import ErrorContainer from '../ui/error/Error';
import { VIDEO_QUALITY } from './constant';
import VideoControls from './VideoControls';

const videoQuality = compose(
	defaultTo(VIDEO_QUALITY.LOW),
	path(['quality', 'videoQuality', 'value'])
);

const videoQualityOptions = compose(
	map(v => ({ ...v })),
	values
);

const VideoContainer = props => {
	const [store, { update, reset }] = useForm('quality', {
		videoQuality: { value: VIDEO_QUALITY.MEDIUM, error: '', isValid: true }
	});

	const { recording, start, stop, error } = useScreenRecorder(props.addClip);

	const handleRecording = () =>
		recording() ? stopRecording() : startRecording();

	const startRecording = () => {
		start(videoQuality(store));
	};

	const stopRecording = () => {
		stop();
	};

	return (
		<>
			<VideoControls
				recording={recording}
				handleRecording={handleRecording}
				update={update}
				store={store}
				videoQualityOptions={videoQualityOptions(VIDEO_QUALITY)}
			/>
			<SectionContainer>
				<ErrorContainer error={error()} />
				{recording() ? null : (
					<div class="mt-10 mb-20 text-center">
						<p class="text-3xl text-gray-700">Not Recording</p>
					</div>
				)}
				<video
					class={`${recording() ? 'mt-10 mb-20' : 'hidden'}`}
					id="videoStream"
					autoPlay
					playsInline
				/>
			</SectionContainer>
		</>
	);
};

export default VideoContainer;
