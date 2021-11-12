import { createSignal } from 'solid-js';
import useToggle from '../../services/useToggle';
import DownLoadIcon from '../icons/DownloadIcon';
import XIcon from '../icons/XIcon';
import Button from '../ui/Button';
import TextInput from '../ui/inputs/TextInput';

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
		<li class="flex flex-row">
			<a href={props.downloadRef} download={props.name}>
				<DownLoadIcon
					class="h-6 w-6"
					classes="pointer"
					fill="rgba(236, 72, 153)"
				/>
			</a>
			{edit() ? (
				<>
					<TextInput
						ref={input}
						type="text"
						value={clipName()}
						onInput={e => setClipName(e.target.value)}
						onKeyUp={e => {
							e.key === 'Enter' ? onEditSave() : null;
						}}
					/>
					<div class="flex flex-row">
						<Button onClick={onEditSave}>Save</Button>
						<Button class="ml-2" onClick={setEdit}>
							Cancel
						</Button>
					</div>
				</>
			) : (
				<p class="pointer" onClick={onEdit}>
					{props.name}
				</p>
			)}
			<XIcon
				class="h-6 w-6"
				classes="pointer"
				fill="rgba(236, 72, 153)"
				onClick={props.removeClip}
			/>
		</li>
	);
};

export default ClipItem;
