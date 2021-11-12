import { children } from 'solid-js';

const Container = props => {
	const c = children(() => props.children);
	return <div className="container mx-auto p-6 w-3/5">{c()}</div>;
};

export default Container;
