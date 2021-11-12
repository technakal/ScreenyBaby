import { SECTION_TITLE } from '../../constants';
import SubTitleContainer from '../ui/typeography/SubTitle';
import ClipList from './ClipList';

const ClipContainer = props => (
	<>
		<SubTitleContainer type={SECTION_TITLE} text="My Clips" />
		<ClipList {...props} />
	</>
);

export default ClipContainer;
