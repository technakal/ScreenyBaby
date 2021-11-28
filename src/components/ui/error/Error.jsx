import {
	__,
	assoc,
	both,
	compose,
	cond,
	identity,
	always,
	T,
	prop,
	map
} from 'ramda';
import {
	isValue,
	isNotEmpty,
	isArray,
	isFunction
} from '../../../services/util';
import { log } from '../../../services/log';

const executeIfFunction = cond([
	[isFunction, v => v()],
	[T, identity]
]);

const hasErrorArray = compose(
	both(isArray, isNotEmpty),
	executeIfFunction,
	prop('error')
);
const hasError = compose(isValue, executeIfFunction, prop('error'));

const Error = props => {
	console.log(props);
	return (
		<div class="text-red-500 text-xl">{executeIfFunction(props.error)}</div>
	);
};

const Errors = compose(
	map(compose(Error, assoc('error', __, {}))),
	prop('error')
);

const ErrorContainer = compose(
	cond([
		[hasErrorArray, Errors],
		[hasError, Error],
		[T, always(null)]
	]),
	log('input')
);

export default ErrorContainer;
