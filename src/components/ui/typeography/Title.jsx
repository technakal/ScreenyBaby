import { TITLE_COLORS } from '../../../constants';

const randomColor = () =>
	TITLE_COLORS[Math.floor(Math.random() * TITLE_COLORS.length)];

const transformText = text => {
	return text.split('').map((char, i) => (
		<span class={randomColor()} key={`${char}-${i}`}>
			{char}
		</span>
	));
};

const Title = props => {
	return (
		<h1 class="font-headline font-bold font-serif uppercase text-stroke text-5xl text-gray-500">
			{transformText(props.text)}
		</h1>
	);
};

export default Title;
