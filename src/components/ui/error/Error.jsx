import {
	always,
	assoc,
	both,
	compose,
	cond,
	identity,
	map,
	prop,
	T,
	__
} from 'ramda';
import {
	isArray,
	isFunction,
	isNotEmpty,
	isValue
} from '../../../services/util';

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

const Error = props => (
	<div class="text-red-500 text-xl">{executeIfFunction(props.error)}</div>
);

const Errors = compose(
	map(compose(Error, assoc('error', __, {}))),
	prop('error')
);

const ErrorContainer = compose(
	cond([
		[hasErrorArray, Errors],
		[hasError, Error],
		[T, always(null)]
	])
);

export default ErrorContainer;
