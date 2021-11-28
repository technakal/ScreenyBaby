import kofi from '../../assets/ko-fi_icon_RGB_stroke.png';
import Button from '../ui/Button';
import Image from '../ui/Image';

const KoFiWidget = () => {
	return (
		<Button
			class="button button--kofi rounded-full text-sm text-white"
			onClick={() => window.open('https://ko-fi.com/technakal', '_blank')}>
			<Image
				aria-label="Ko-Fi Logo"
				class="w-8 h-8"
				src={kofi}
				alt="Kofi donation icon"
			/>
			Support Me on Ko-Fi
		</Button>
	);
};

export default KoFiWidget;
