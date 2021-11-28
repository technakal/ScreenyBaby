import { SECTION_TITLE } from '../../constants';
import SectionContainer from '../containers/SectionContainer';
import SubTitleContainer from '../ui/typeography/SubTitle';
import ClipList from './ClipList';

const ClipContainer = props => (
	<SectionContainer class="w-full">
		<SubTitleContainer type={SECTION_TITLE} text="My Clips" />
		{props.clips.length ? (
			<ClipList {...props} />
		) : (
			<p class="inline-block mt-4 text-center text-lg text-gray-700">
				You have no clips.
			</p>
		)}
	</SectionContainer>
);

export default ClipContainer;
