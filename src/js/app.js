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

/**
 * Turns the supplied title into a fun approximation of the logo of a certain stuffed friend.
 * @param {array} title The website title, ScreenieBaby.
 * @param {array} colors The color scheme to apply to the title.
 */
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

/**
 * A callback function that applies the displayTitle function to the website's title and colors.
 */
const automateTitlechange = () => {
  displayTitle(TITLE, COLORS);
};

// const titleChangeTimer = window.setInterval(automateTitlechange, 1500);

/**
 * Handles the click event.
 * Either starts the recording or stops the recording.
 * @param {event} e The click event
 */
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
    default:
      console.warn(`Somehow, you pressed a button that doesn't exist.`);
      break;
  }
};

/**
 * Utility functions.
 */
const util = {
  /**
   * Adds the class to the elem.
   * @param {HTMLElement} elem The DOMElement to which the new class should be added
   * @param {string} className The class to apply to the element
   */
  addClass: (elem, className) => {
    return elem.classList.add(className);
  },
  /**
   * Removes the class to the elem.
   * @param {HTMLElement} elem The DOMElement to which the new class should be removed
   * @param {string} className The class to remove from the element
   */
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

/**
 * Records the video.
 * Creates the Capture Stream and the MediaRecorder.
 * @param {number} quality The videoBitsPerSecond to record the video in
 */
async function startCapture(quality) {
  let captureStream = await navigator.mediaDevices.getDisplayMedia(
    displayMediaOptions
  );
  let options = {
    mimeType: 'video/webm; codecs=vp9',
    videoBitsPerSecond: quality,
  };
  try {
    videoElement.classList.add('playing');
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

/**
 * Stops the video recording.
 */
const stopCapture = () => {
  if (mediaRecorder) {
    videoElement.classList.remove('playing');
    mediaRecorder.stop();
    console.log('Stopped.');
    const d = new Date();
    const clipName = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}T${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    console.log(`${clipName} successfully recorded. See My Clips to download.`);
    console.info('Getting your file ready...');
    setTimeout(() => createFileUri(clipName), 1000);
  }
};

/**
 * Converts the video data into a downloadable blob.
 * Appends to the DOM.
 * Triggers the auto-download process.
 * @param {string} clipName The name of the clip
 */
const createFileUri = clipName => {
  const cleanClipName = clipName.split(' ').join('');
  try {
    videoTracks.forEach(track => {
      const videoUrl = track;
      const videoDownloadElement = `<a id="${cleanClipName}" class="button button__download" href="${videoUrl}" download="${cleanClipName}">${clipName}</a>`;
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

/**
 * Automatically initiates the file download for the clip with the supplied id
 * @param {string} id The id of the clip to download
 */
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
