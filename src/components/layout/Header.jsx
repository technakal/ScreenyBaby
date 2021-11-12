import SubTitleContainer from '../ui/typeography/SubTitle';
import Title from '../ui/typeography/Title';
import { SUBTITLE } from '../../constants';

const Header = () => (
	<header class="header__main mb-6 mt-8 pb-4 pt-10">
		<Title text="Screenie Baby" />
		<SubTitleContainer
			text="A simple way to share your screen with your friends"
			type={SUBTITLE}
		/>
	</header>
);

export default Header;
