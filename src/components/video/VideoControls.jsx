import SectionContainer from '../containers/SectionContainer';
import Label from '../ui/typeography/Label';
import SelectInput from '../ui/inputs/SelectInput';
import Button from '../ui/Button';
import { VIDEO_QUALITY } from './constant';

const VideoControls = props => {
	return (
		<SectionContainer class="control__main">
			<form class="control__main--group mb-4 py-4 w-full">
				<div>
					<Label class="text-gray-700" htmlFor="videoQuality">
						Video Quality
					</Label>
					<SelectInput
						class="w-full"
						id="videoQuality"
						value={props.store.quality.videoQuality}
						onChange={props.update}
						options={props.videoQualityOptions}
					/>
				</div>
			</form>
			<Button
				class="control__main--button"
				name="control-record"
				onClick={props.handleRecording}>
				{props.recording() ? 'Stop' : 'Record'}
			</Button>
		</SectionContainer>
	);
};

export default VideoControls;
