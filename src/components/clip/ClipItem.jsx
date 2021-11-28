import { createSignal } from 'solid-js';
import { PRIMARY_PINK } from '../../constants';
import useToggle from '../../services/useToggle';
import DownLoadIcon from '../icons/DownloadIcon';
import XIcon from '../icons/XIcon';
import TextInput from '../ui/inputs/TextInput';
import CheckIcon from '../icons/CheckIcon';
import TrashIcon from '../icons/TrashIcon';

const ClipItem = props => {
	const [edit, setEdit] = useToggle(false);
	const [clipName, setClipName] = createSignal(props.name);

	let input;

	const onEdit = () => {
		setEdit(true);
		input.focus();
		input.select();
	};

	const onEditSave = () => {
		props.renameClip(props.id, clipName());
		setEdit(false);
	};

	return (
		<li class="button flex flex-row align-center justify-between px-2 py-4 shadow-md w-full">
			<a href={props.url} download={props.name}>
				<DownLoadIcon
					aria-label="Download Clip"
					class="h-8 cursor-pointer w-8"
					fill={PRIMARY_PINK}
				/>
			</a>
			{edit() ? (
				<div class="flex flex-row align-center justify-between">
					<TextInput
						ref={input}
						type="text"
						value={clipName()}
						onInput={e => setClipName(e.target.value)}
						onKeyUp={e => {
							e.key === 'Enter' ? onEditSave() : null;
						}}
					/>
					<CheckIcon
						aria-label="Save Changes"
						class="h-8 cursor-pointer w-8"
						fill={PRIMARY_PINK}
						onClick={onEditSave}
					/>
					<XIcon
						aria-label="Cancel Changes"
						class="h-8 cursor-pointer w-8"
						fill={PRIMARY_PINK}
						onClick={setEdit}
					/>
				</div>
			) : (
				<>
					<p
						aria-label="Click to rename clip"
						class="cursor-pointer p-2"
						onClick={onEdit}
						title="rename clip">
						{props.name}
					</p>
					<TrashIcon
						aria-label="Delete Clip"
						class="h-8 cursor-pointer w-8"
						fill={PRIMARY_PINK}
						onClick={props.removeClip}
					/>
				</>
			)}
		</li>
	);
};

export default ClipItem;
