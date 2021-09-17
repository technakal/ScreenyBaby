import ClipItem from "./ClipItem";

const ClipList = (props) => (
  <>
    <h2 class="header__section">Clips</h2>
    <ul class="clips__list">
      <For each={props.clips}>
        {(clip) => (
          <ClipItem removeClip={() => props.removeClip(clip.id)} {...clip} />
        )}
      </For>
    </ul>
  </>
);

export default ClipList;
