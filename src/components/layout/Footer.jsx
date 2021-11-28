import { FOOTER, PRIMARY_PINK } from '../../constants';
import SectionContainer from '../containers/SectionContainer';
import HeartIcon from '../icons/HeartIcon';
import KoFiWidget from '../widgets/kofi/KoFiWidget';

const Footer = () => (
	<SectionContainer
		type={FOOTER}
		class="bottom-0 mt-10 pt-4 pb-6 text-center w-full">
		<KoFiWidget />
		<p class="flex flex-row align-center justify-center pt-6">
			Made with <HeartIcon class="h-6 w-6" fill={PRIMARY_PINK} /> by N. Keener
		</p>
	</SectionContainer>
);

export default Footer;
