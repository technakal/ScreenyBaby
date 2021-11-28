import { compose, converge, isEmpty, isNil, not, or } from 'ramda';

export const isNotValue = converge(or, [isNil, isEmpty]);
export const isValue = compose(not, isNotValue);
