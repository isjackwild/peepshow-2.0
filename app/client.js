// require('./vendor/face.js');
// require('./vendor/ccv.js');
require('./vendor/modernizr-custom.js');
import { init } from './facial-recognition.js';

const aboutButton = document.getElementsByClassName('about--open')[0];
const closeButton = document.getElementsByClassName('about--close')[0];
const options = [... document.getElementsByClassName('select__option')];
const info = document.getElementsByClassName('info')[0];
const aboutText = document.getElementsByClassName('about-text')[0];
const woman = document.getElementsByClassName('woman')[0];
const dress = document.getElementsByClassName('woman__dress')[0];
// const notSupported = document.getElementsByClassName('not-supported')[0];
// const wrapper = document.getElementsByClassName('wrapper')[0];
let selectedOption = document.getElementsByClassName('select__option--selected')[0];


const kickIt = () => {
	if (!Modernizr.getusermedia) {
		aboutText.style.display = "none";
		closeButton.innerHTML = "Sorry, your browser is not supported";
	}

	// wrapper.classList.add('wrapper--visible')

	init();

	aboutButton.addEventListener('click', () => {
		info.classList.add('info--visible');
	});

	closeButton.addEventListener('click', () => {
		info.classList.remove('info--visible');
		closeButton.innerHTML = "→ Back";
	});

	options.forEach((option) => {
		option.addEventListener('click', (e) => {
			const girl = e.currentTarget.dataset.option;
			e.currentTarget.classList.add('select__option--selected');
			selectedOption.classList.remove('select__option--selected');
			selectedOption = e.currentTarget;
			woman.style.backgroundImage = `url('/assets/images/body--${girl}.jpg')`;
			dress.style.backgroundImage = `url('/assets/images/dress--${girl}.png')`;
		});
	});
}

if (document.addEventListener) {
	document.addEventListener('DOMContentLoaded', kickIt);
} else {
	window.attachEvent('onload', kickIt);
}