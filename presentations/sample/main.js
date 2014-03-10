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

	let cronograma = new Slide('Cronograma');
	cronograma.style.set({
		backgroundColor : '#09311E'
	});
	let list = ['História',
				'Arrows functions',
				'Classes',
				'Template Strings',
				'default/rest/spread params',
				'let + const',
				'iterators + for..of',
				'generators',
				'comprehensions',
				'modules',
				'map + set + weakmap + weakset',
				'proxies',
				'symbols',
				'promises',
				'math + number + string + object APIs'];

	/* ES6 Template strings */
	let textCronograma = new Text(`<span style="font-style:italic;font-size:1.4em">~Cronograma~ </span><br>
		 							<ul style="font-size:0.8em">
		 								<li>${list[0]}</li>
										<li>${list[1]}</li>
										<li>${list[2]}</li>
										<li>${list[3]}</li>
										<li>${list[4]}</li>
										<li>${list[5]}</li>
										<li>${list[6]}</li>
										<li>${list[7]}</li>
										<li>${list[8]}</li>
										<li>${list[9]}</li>
										<li>${list[10]}</li>
										<li>${list[11]}</li>
										<li>${list[12]}</li>
										<li>${list[13]}</li>
										<li>${list[14]}</li>
									</ul>
								  `);
	textCronograma.style.set({
		color : '#fff',
		fontSize : '0.6em',
		position : 'absolute',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		zIndex : '99',
		fontWeight : 'bold'
	});
	cronograma.addText(textCronograma);

	let slide3 = new Slide('Slide 3');
	let text3 = new Text('Look, this is another slide about ES6!');
	slide3.addText(text3);

	es6slider.addSlide(slide1)
			.addSlide(me)
			.addSlide(enthusiasm1)
			.addSlide(enthusiasm2)
			.addSlide(douglas)
			.addSlide(brendan)
			.addSlide(futurenow)
			.addSlide(cronograma)
			.addSlide(slide3)
			.render();

	console.log(es6slider);

}());