import ClipItem from './ClipItem';

const ClipList = props => (
	<ul class="clips__list grid grid-cols-1 gap-6 md:grid-cols-2 px-4 pt-2 pb-4">
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
