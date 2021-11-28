import { createStore } from 'solid-js/store';

const useForm = (formId, initialState = {}) => {
	const [store, setStore] = createStore({ [formId]: initialState });

	const update = e => {
		const { form, id, value, isValid = true, validationMessage } = e.target;
		form.checkValidity();
		setStore(formId, prev => ({
			...prev,
			[id]: { value, error: validationMessage, isValid }
		}));
	};

	const reset = () => {
		setStore(formId, initialState);
	};

	return [store, { reset, update }];
};

export default useForm;
