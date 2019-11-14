const videoElement = document.querySelector('#viewWindow');
const consoleElement = document.querySelector('#console');
const buttons = document.querySelectorAll('button');
buttons.forEach(button =>
  button.addEventListener('click', e => handleClick(e), false)
);

const handleClick = e => {
  const button = e.target;
  const buttonId = e.target.id;
  if (buttonId === 'record') {
    button.id = 'stop';
    document.querySelector('#save').disabled = true;
    util.addClass(button, 'pressed');
    startCapture();
  } else if (buttonId === 'stop') {
    button.id = 'record';
    document.querySelector('#save').disabled = false;
    util.removeClass(button, 'pressed');
    stopCapture();
  } else {
    util.addClass(button, 'pressed');
    setTimeout(() => util.removeClass(button, 'pressed'), 200);
    util.console.log('Saving...');
    // do saving
  }
};

const util = {
  addClass: (elem, className) => {
    return elem.classList.add(className);
  },
  removeClass: (elem, className) => {
    return elem.classList.remove(className);
  },
  console: {
    log: msg =>
      (consoleElement.innerHTML += `<span class="log">${msg}</span><br/>`),
    error: msg =>
      (consoleElement.innerHTML += `<span class="error">${msg}</span><br/>`),
    warn: msg =>
      (consoleElement.innerHTML += `<span class="warn">${msg}</span><br/>`),
    info: msg =>
      (consoleElement.innerHTML += `<span class="info">${msg}</span><br/>`),
  },
};

const displayMediaOptions = {
  video: {
    cursor: 'always',
  },
  audio: false,
};

async function startCapture() {
  util.console.log('Recording...');
  util.console.warn('Save button disabled.');

  try {
    videoElement.srcObject = await navigator.mediaDevices.getDisplayMedia(
      displayMediaOptions
    );
    dumpOptionsInfo();
  } catch (err) {
    util.console.error(`Error: ${err}`);
  }
}

const stopCapture = e => {
  let tracks = videoElement.srcObject.getTracks();

  tracks.forEach(track => track.stop());
  videoElement.srcObject = null;
};

const dumpOptionsInfo = () => {
  const videoTrack = videoElement.srcObject.getVideoTracks()[0];
  console.log(videoTrack);
  util.console.log('Track settings:');
  util.console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
  util.console.log('Track constraints:');
  util.console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
};

(() => {
  return !navigator.mediaDevices && !navigator.mediaDevices.getDisplayMedia
    ? util.console.error(`getUserMedia is not supported on your device.`)
    : null;
})();
