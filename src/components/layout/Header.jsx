import SubTitleContainer from '../ui/typeography/SubTitle';
import Title from '../ui/typeography/Title';
import { HEADER, SUBTITLE } from '../../constants';
import SectionContainer from '../containers/SectionContainer';

const Header = props => (
	<SectionContainer
		type={HEADER}
		class={`header__main bg-pink-200 mb-6 pb-4 pt-16 ${props.class}`}>
		<div class="container mx-auto p-6 md:w-3/5">
			<Title text={props.title} />
			<SubTitleContainer
				text="A simple way to share your screen with your friends"
				type={SUBTITLE}
			/>
		</div>
	</SectionContainer>
);

export default Header;
