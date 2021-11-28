import { TITLE_COLORS } from './constant.js';

const title = document.querySelector('#title');

const randomColor = () =>
	TITLE_COLORS[Math.floor(Math.random() * TITLE_COLORS.length)];

const transformText = text => {
	return text
		.split('')
		.map((char, i) => `<span class=${randomColor()}>${char}</span>`);
};

const text = transformText('SCREENIE BABY');
title.innerHTML = text.join('');
