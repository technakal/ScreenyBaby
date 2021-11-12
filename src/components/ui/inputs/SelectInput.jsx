import { For } from 'solid-js';

const Options = props => (
	<option value={props.value} selected={props.selected}>
		{props.label}
	</option>
);

const SelectInput = props => (
	<select
		class="border border-gray-400 p-2 rounded-md"
		id={props.id}
		ref={props.ref}
		onChange={props.onChange}>
		<For each={props.options}>
			{opt => <Options selected={props.value === opt.value} {...opt} />}
		</For>
	</select>
);

export default SelectInput;
