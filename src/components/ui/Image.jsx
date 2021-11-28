import { mergeProps, splitProps } from 'solid-js';

const Image = props => {
	const [local, forward] = splitProps(props, ['class']);
	return <img class={`${local.class} max-w-full`} {...forward} />;
};

export default Image;
