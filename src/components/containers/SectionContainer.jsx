import { children } from 'solid-js';
import { cond, propEq, T } from 'ramda';
import { HEADER, FOOTER, MAIN } from '../../constants';

const isHeader = propEq('type', HEADER);
const isFooter = propEq('type', FOOTER);
const isMain = propEq('type', MAIN);
const HeaderContainer = props => (
	<header class={props.class}>{props.c()}</header>
);
const FooterContainer = props => (
	<footer class={props.class}>{props.c()}</footer>
);
const MainContainer = props => (
	<main role="main" class={`container mx-auto p-6 md:w-3/5 ${props.class}`}>
		{props.c()}
	</main>
);
const ContentContainer = props => <div class={props.class}>{props.c()}</div>;

const render = cond([
	[isHeader, HeaderContainer],
	[isFooter, FooterContainer],
	[isMain, MainContainer],
	[T, ContentContainer]
]);

const SectionContainer = props => {
	const c = children(() => props.children);
	return render({ c, ...props });
};

export default SectionContainer;
