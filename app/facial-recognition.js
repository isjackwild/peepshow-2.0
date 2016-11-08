const video = document.createElement('video');
video.autoplay = true;
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const dress = document.getElementsByClassName('woman__dress')[0];

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;


export const init = () => {
	// document.body.appendChild(video);
	// document.body.appendChild(canvas);
	navigator.getUserMedia({video:true}, onSuccess, onDenied); 
}

const onSuccess = (stream) => {
	video.src = window.URL.createObjectURL(stream);
	setTimeout(() => {
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
	}, 1111);
	requestAnimationFrame(drawToCanvas);
}

const onDenied = () => {
	console.error('User denied access to camera');
}

const onError = () => {
	console.error('Error connecting to camera');
}

const drawToCanvas = () => {
	ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
	checkFaces();
	requestAnimationFrame(drawToCanvas);
}

const checkFaces = () => {
	const comp = ccv.detect_objects({
		canvas: canvas,
		cascade: cascade,
		interval: 4,
		min_neighbors: 1
	});

	if (comp.length > 0) {
		dress.style.opacity = 1;
	}  else {
		dress.style.opacity = 0;
	}
}



