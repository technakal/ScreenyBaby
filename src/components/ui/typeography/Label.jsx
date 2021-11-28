import { children, splitProps } from 'solid-js';

const Label = props => {
	const c = children(() => props.children);
	const [local, forward] = splitProps(props, ['class']);

	return (
		<label class={`${local.class} font-bold p-2`} {...forward}>
			{c()}
		</label>
	);
};

export default Label;
