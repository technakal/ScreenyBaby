const TITLE = 'Screenie Baby'.split('');
const COLORS = ['red', 'teal', 'blue', 'green', 'yellow', 'pink'];

const videoElement = document.querySelector('#viewWindow');
const downloadElement = document.querySelector('#download--files');
const consoleElement = document.querySelector('#console');
const controlButtonElement = document.getElementsByName('control__button');
const buttons = document.querySelectorAll('button');
buttons.forEach(button =>
  button.addEventListener('click', e => handleClick(e), false)
);
let videoTracks = [];
let mediaRecorder;

const displayTitle = (title, colors) => {
  const logoContainer = document.querySelector('.logo__letters');
  const domElements = title.map(letter => {
    const randColor = colors[Math.floor(Math.random() * COLORS.length)];
    const randRotation = Math.floor(Math.random() * 12);
    const randSign = Math.floor(Math.random() * 5) > 2 ? '+' : '-';
    return letter === ' '
      ? `<br class="logo__letter"/>`
      : `<span style="float: left; transform: rotate(${randSign}${randRotation}deg)" class="logo__letter logo__letter--${randColor}">${letter.toUpperCase()}</span>`;
  });
  logoContainer.innerHTML = domElements.join('');
};

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
      const quality = document.querySelector('#videoQuality').value;
      startCapture(quality);
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

async function startCapture(quality) {
  let captureStream = await navigator.mediaDevices.getDisplayMedia(
    displayMediaOptions
  );
  let options = {
    mimeType: 'video/webm; codecs=vp9',
    videoBitsPerSecond: quality,
  };
  try {
    videoElement.srcObject = captureStream;
    mediaRecorder = new MediaRecorder(captureStream, options);
    mediaRecorder.mimeType = 'image/gif';
    mediaRecorder.ondataavailable = blob => {
      videoTracks.push(URL.createObjectURL(blob.data));
    };
    util.console.log(mediaRecorder.mimeType);
    util.console.log(mediaRecorder.videoBitsPerSecond);
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

const stopCapture = () => {
  if (mediaRecorder) {
    mediaRecorder.stop();
    util.console.log('Stopped.');
    const d = new Date();
    const clipName = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}T${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    util.console.log(
      `${clipName} successfully recorded. See My Clips to download.`
    );
    util.console.info('Getting your file ready...');
    setTimeout(() => createFileUri(clipName), 1000);
  }
};

const createFileUri = clipName => {
  const cleanClipName = clipName.split(' ').join('');
  try {
    videoTracks.forEach(track => {
      const videoUrl = track;
      const videoDownloadElement = `<a id="${cleanClipName}" class="button__download" href="${videoUrl}" download="${cleanClipName}">${clipName}</a>`;
      downloadElement.innerHTML += videoDownloadElement;
      videoElement.srcObject = null;
      util.console.log('File added to download library.');
    });
    videoTracks = [];
  } catch (err) {
    util.console.error(err);
  }
};

(() => {
  displayTitle(TITLE, COLORS);
  return !navigator.mediaDevices && !navigator.mediaDevices.getDisplayMedia
    ? util.console.error(`getUserMedia is not supported on your device.`)
    : null;
})();
