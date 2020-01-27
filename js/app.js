const TITLE = 'Screenie Baby'.split('');
const COLORS = ['red', 'teal', 'blue', 'green', 'yellow', 'pink'];

const headerTitle = document.querySelector('#header__title--main');
headerTitle.addEventListener('click', e => displayTitle(TITLE, COLORS));
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

const automateTitlechange = () => {
  displayTitle(TITLE, COLORS);
};

// const titleChangeTimer = window.setInterval(automateTitlechange, 1500);

const handleClick = e => {
  const button = e.target;
  const buttonId = e.target.id;
  switch (buttonId) {
    case 'record':
      button.id = 'stop';
      button.textContent = 'Recording...';
      util.addClass(button, 'pressed');
      displayTitle(TITLE, COLORS);
      const quality = document.querySelector('#videoQuality').value;
      startCapture(quality);
      break;
    case 'stop':
      button.id = 'record';
      button.textContent = 'Record';
      displayTitle(TITLE, COLORS);
      util.removeClass(button, 'pressed');
      stopCapture();
      break;
    case 'console__toggle':
      toggleConsole(e.target);
      break;
    case 'console__toggle--knob':
      toggleConsole(e.target.parentNode);
      break;
    default:
      console.warn(`Somehow, you pressed a button that doesn't exist.`);
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
    mediaRecorder.start();
    console.log('Recording...');
  } catch (err) {
    console.error(`Error: ${err}`);
    console.info(
      "You either denied the request for screen capture, or you're using garbage Internet Explorer."
    );
    console.warn(
      "If you're using Internet Explorer, stop. It's made of garbage and it hates you. Stop using it."
    );
  }
}

const stopCapture = () => {
  if (mediaRecorder) {
    mediaRecorder.stop();
    console.log('Stopped.');
    const d = new Date();
    const clipName = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}T${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    console.log(`${clipName} successfully recorded. See My Clips to download.`);
    console.info('Getting your file ready...');
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
      console.log('File added to download library.');
      autoDownloadFile(cleanClipName);
    });
    videoTracks = [];
  } catch (err) {
    console.error(err);
  }
};

const autoDownloadFile = id => {
  console.log('Beginning download...');
  document.getElementById(id).click();
  console.log('File downloaded.');
};

(() => {
  displayTitle(TITLE, COLORS);
  return !navigator.mediaDevices && !navigator.mediaDevices.getDisplayMedia
    ? console.error(`getUserMedia is not supported on your device.`)
    : null;
})();
