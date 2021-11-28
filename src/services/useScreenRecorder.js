import { formatISO } from 'date-fns';
import { createSignal } from 'solid-js';
import useToggle from './useToggle';

const displayOptions = {
	audio: false,
	video: {
		cursor: 'always'
	}
};

const getCaptureStream = () => {
	return new Promise((resolve, reject) => {
		try {
			resolve(navigator.mediaDevices.getDisplayMedia(displayOptions));
		} catch (err) {
			reject(err);
		}
	});
};

const useScreenRecorder = addClip => {
	const [error, setError] = createSignal(null);
	const [recording, setRecording] = useToggle(false);
	let mediaRecorder;

	const videoRef = () => document.getElementById('videoStream');

	const start = quality => {
		setRecording(true);
		getCaptureStream()
			.then(_stream => {
				videoRef().srcObject = _stream;
				mediaRecorder = new MediaRecorder(_stream, {
					mimeType: 'video/webm; codecs=vp9',
					videoBitsPerSecond: quality.value
				});
				mediaRecorder.ondataavailable = blob =>
					addClip({
						blob: blob.data,
						name: formatISO(new Date()),
						url: URL.createObjectURL(blob.data)
					});
				mediaRecorder.start();
			})
			.catch(setError);
	};
	const stop = () => {
		setRecording(false);
		if (mediaRecorder) {
			mediaRecorder.stop();
		}
		videoRef().srcObject = null;
	};

	const download = () => {};

	return {
		recording,
		error,
		start,
		stop,
		download
	};
};

export default useScreenRecorder;
