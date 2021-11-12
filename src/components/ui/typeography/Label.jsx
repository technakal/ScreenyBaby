import { children } from 'solid-js';

const Label = props => {
	const c = children(() => props.children);
	return (
		<label class="font-bold p-2" {...props}>
			{c()}
		</label>
	);
};

export default Label;
