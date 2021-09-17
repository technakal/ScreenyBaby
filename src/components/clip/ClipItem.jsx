const ClipItem = (props) => (
  <li style={{ cursor: "pointer", "user-select": "none" }}>
    <a href={props.downloadRef} download={props.name}>
      {props.name}
    </a>
    <button onClick={props.removeClip}>x</button>
  </li>
);

export default ClipItem;
