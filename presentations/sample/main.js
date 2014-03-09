(function () {

	let es6slider = new ES6Slider('JavaScript do Futuro no Presente');

	let me = new Slide('Jaydson');
	me.style.set({
		backgroundColor : '#09311E'
	});
	let bio = new Text('<span style="font-style:italic;font-size:1.6em">~Jaydson Gomes~ </span><br> * Entusiasta JavaScript <br> * FrontEnd Engineer no Terra <br> * Curador da BrazilJS Conf/RSJS/FrontInPoa');
	bio.style.set({
		color : '#fff',
		fontSize : '1.5em',
		position : 'absolute',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		zIndex : '99',
		fontWeight : 'bold'
	});
	me.addText(bio);

	let enthusiasm1 = new Slide('enthusiasm');
	enthusiasm1.setBackgroundImage('img/superhtml5.jpeg');

	let enthusiasm2 = new Slide('enthusiasm 2');
	enthusiasm2.setBackgroundImage('img/jesus.jpg');

	let douglas = new Slide('Douglas');
	douglas.setBackgroundImage('img/douglas.jpg');

	let brendan = new Slide('Brendan');
	brendan.setBackgroundImage('img/brendan.jpeg');

	let slide1 = new Slide('Slide 1');
	slide1.setBackgroundImage('img/backtothefuture.jpg');
	let text1 = new Text(es6slider.name);
	text1.style.set({
		color : 'rgb(228, 193, 7)',
		fontSize : '2em',
		position : 'absolute',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		zIndex : '99',
		fontWeight : 'bold'
	});
	slide1.addText(text1);

	let futurenow = new Slide('futurenow');
	futurenow.setBackgroundImage('img/future-now.gif');

	let slide2 = new Slide('ES6');
	let text2 = new Text('ES6 is fu***** awesome!');
	slide2.addText(text2);

	let slide3 = new Slide('Slide 3');
	let text3 = new Text('Look, this is another slide about ES6!');
	slide3.addText(text3);

	es6slider.addSlide(slide1);
	es6slider.addSlide(me);
	es6slider.addSlide(enthusiasm1);
	es6slider.addSlide(enthusiasm2);
	es6slider.addSlide(douglas);
	es6slider.addSlide(brendan);
	es6slider.addSlide(futurenow);
	es6slider.addSlide(slide2);
	es6slider.addSlide(slide3);
	es6slider.render();

	console.log(es6slider);

}());