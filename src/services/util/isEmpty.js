import { compose, isEmpty, not } from 'ramda';

export const isNotEmpty = compose(not, isEmpty);
