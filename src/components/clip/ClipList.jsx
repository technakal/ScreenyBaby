import ClipItem from './ClipItem';

const ClipList = props => (
	<ul class="clips__list">
		<For each={props.clips}>
			{clip => (
				<ClipItem
					renameClip={props.renameClip}
					removeClip={() => props.removeClip(clip.id)}
					{...clip}
				/>
			)}
		</For>
	</ul>
);

export default ClipList;
