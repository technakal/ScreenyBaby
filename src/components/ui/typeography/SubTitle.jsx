import { cond, propEq, T } from 'ramda';
import { SUBTITLE, SECTION_TITLE } from '../../../constants';

const isTitleType = propEq('type');
const SectionTitleSmall = props => (
	<h3 class="font-bold text-lg">{props.text}</h3>
);
const SectionTitle = props => (
	<h3 class="font-bold my-2 text-2xl">{props.text}</h3>
);
const SubTitle = props => (
	<h2 class="font-bold font-serif my-2 text-2xl">{props.text}</h2>
);

const SubTitleContainer = cond([
	[isTitleType(SUBTITLE), SubTitle],
	[isTitleType(SECTION_TITLE), SectionTitle],
	[T, SectionTitleSmall]
]);

export default SubTitleContainer;
