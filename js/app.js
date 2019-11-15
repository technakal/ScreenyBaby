const videoElement = document.querySelector('#viewWindow');
const downloadElement = document.querySelector('#clip-files');
const consoleElement = document.querySelector('#console');
const controlButtonElement = document.getElementsByName('control__button');
const buttons = document.querySelectorAll('button');
buttons.forEach(button =>
  button.addEventListener('click', e => handleClick(e), false)
);
let videoTracks = [];
let mediaRecorder;

const handleClick = e => {
  const button = e.target;
  const buttonId = e.target.id;
  switch (buttonId) {
    case 'record':
    case 'record__button--indicator':
      if (buttonId == 'record') {
        button.id = 'stop';
        button.firstElementChild.id = 'stop__button--indicator';
        util.addClass(button, 'pressed');
      } else {
        const parent = button.parentNode;
        button.id = 'stop__button--indicator';
        parent.id = 'stop';
        util.addClass(parent, 'pressed');
      }
      startCapture();
      break;
    case 'stop':
    case 'stop__button--indicator':
      if (buttonId == 'stop') {
        button.id = 'record';
        button.firstElementChild.id = 'record__button--indicator';
        util.removeClass(button, 'pressed');
      } else {
        const parent = button.parentNode;
        button.id = 'record__button--indicator';
        button.parentNode.id = 'record';
        util.removeClass(parent, 'pressed');
      }
      stopCapture();
      break;
    case 'console__toggle':
      toggleConsole(e.target);
      break;
    case 'console__toggle--knob':
      toggleConsole(e.target.parentNode);
      break;
    default:
      util.console.warn(`Somehow, you pressed a button that doesn't exist.`);
      break;
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

const toggleConsole = toggle => {
  const isOn = toggle.classList.contains('on');
  if (isOn) {
    util.removeClass(toggle, 'on');
    util.removeClass(consoleElement, 'show');
  } else {
    util.addClass(toggle, 'on');
    util.addClass(consoleElement, 'show');
  }
  return true;
};

const displayMediaOptions = {
  video: {
    cursor: 'always',
  },
  audio: false,
};

async function startCapture() {
  try {
    videoElement.srcObject = await navigator.mediaDevices.getDisplayMedia(
      displayMediaOptions
    );
    mediaRecorder = new MediaRecorder(videoElement.srcObject);
    mediaRecorder.mimeType = 'image/gif';
    mediaRecorder.ondataavailable = blob => {
      videoTracks.push(URL.createObjectURL(blob.data));
    };
    mediaRecorder.start();
    util.console.log('Recording...');
  } catch (err) {
    util.console.error(`Error: ${err}`);
    util.console.info(
      "You either denied the request for screen capture, or you're using garbage Internet Explorer."
    );
    util.console.warn(
      "If you're using Internet Explorer, stop. It's made of garbage and it hates you. Stop using it."
    );
  }
}

const stopCapture = e => {
  mediaRecorder.stop();
  util.console.log('Stopped.');
  util.console.log(videoTracks);
  const clipName = prompt('Enter a name for your video.');
  util.console.log(
    `${clipName} successfully recorded. See My Clips to download.`
  );

  try {
    videoTracks.forEach(track => {
      const videoUrl = track;
      const videoUrlElement = document.createElement('a');
      const videoTitleElement = document.createElement('li');
      videoUrlElement.href = videoUrl;
      videoUrlElement.setAttribute('download', clipName.split(' ').join(''));
      videoUrlElement.id = clipName.split(' ').join('');
      videoTitleElement.textContent = clipName;
      videoUrlElement.appendChild(videoTitleElement);
      downloadElement.appendChild(videoUrlElement);
      videoElement.srcObject = null;
    });
    videoTracks = [];
  } catch (err) {
    util.console.error(err);
  }
};

(() => {
  return !navigator.mediaDevices && !navigator.mediaDevices.getDisplayMedia
    ? util.console.error(`getUserMedia is not supported on your device.`)
    : null;
})();
