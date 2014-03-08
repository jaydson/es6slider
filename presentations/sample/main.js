(function () {
	let es6slider = new ES6Slider('ES6Slider');
	let slide1 = new Slide('Slide 1');
	let image1 = new Image('img/myimage.png');
	let text1 = new Text('ES6 is awasome!');

	slide1.addImage(image1);
	slide1.addText(text1);
	es6slider.addSlide(slide1);

	console.log(es6slider);
}());