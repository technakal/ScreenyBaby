import { children, mergeProps, splitProps } from 'solid-js';

const Icon = props => {
	const c = children(() => props.children);
	const withDefaultProps = mergeProps(
		{
			class: 'h-5 w-5',
			fill: 'currentColor',
			viewBox: '0 0 20 20'
		},
		props
	);

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class={`${withDefaultProps.class}`}
			viewBox={withDefaultProps.viewBox}
			fill={withDefaultProps.fill}
			{...props}>
			{c()}
		</svg>
	);
};

export default Icon;
