import { children } from 'solid-js';

const Button = props => (
	<button
		class={`button border px-3 py-2 rounded-md ${props.class}`}
		type={props.type ?? 'button'}
		onClick={props.onClick}
		{...props}>
		{children(() => props.children)}
	</button>
);

export default Button;
