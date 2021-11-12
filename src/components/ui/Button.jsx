import { children } from 'solid-js';

const Button = props => (
	<button
		class={`bg-pink-200 border hover:bg-pink-300 transform transition-all px-3 py-2 rounded-md shadow-md w-32 ${props.class}`}
		type={props.type ?? 'button'}
		onClick={props.onClick}
		{...props}>
		{children(() => props.children)}
	</button>
);

export default Button;
