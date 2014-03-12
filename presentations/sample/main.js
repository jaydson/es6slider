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

	/* ES6 Template strings (multiline)*/
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

	let historia = new Slide('historia');
	historia.setBackgroundImage('img/senta-que-la-vem-historia.gif');

	let ecma262 = new Slide('historia');
	ecma262.style.set({
		backgroundColor : '#09311E'
	});

	let brendanYoung = new Slide('brendanYoung');
	brendanYoung.setBackgroundImage('img/brendan-young.jpg');

	let ecma262Text = new Text(`ECMA-262`);
	ecma262Text.style.set({
		fontSize : '3.5em',
		textAlign : 'center',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		fontWeight : 'bold',
		color : '#fff',
		marginTop : '1em'
	});
	ecma262.addText(ecma262Text);

	let nineties = new Slide('nineties');
	nineties.style.set({
		backgroundColor : '#09311E'
	});
	let ninetiesT = new Text(`
		<div style="font-style:italic;font-size:3.2em">~1995~</div>
		<div>Mocha</div>
		<div>LiveScript</div>
		<div>JavaScript</div>
		<div>ECMAScript</div>
	`);
	ninetiesT.style.set({
		color : '#fff',
		fontSize : '1em',
		position : 'absolute',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		zIndex : '99',
		fontWeight : 'bold'
	});
	nineties.addText(ninetiesT);

	let ninetiesECMA3 = new Slide('ninetiesECMA3');
	ninetiesECMA3.style.set({
		backgroundColor : '#09311E'
	});
	let ninetiesECMA3T = new Text(`
		<div style="font-style:italic;font-size:3.2em">~1999 - ECMAScript 3~</div>
		<div>Versão suportada na maioria dos browsers</div>
		<div>Introduziu algumas features como expressões regulares, try/catch, entre outras</div>
	`);
	ninetiesECMA3T.style.set({
		color : '#fff',
		fontSize : '1em',
		position : 'absolute',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		zIndex : '99',
		fontWeight : 'bold'
	});
	ninetiesECMA3.addText(ninetiesECMA3T);

	es6slider.addSlide(slide1)
			.addSlide(me)
			.addSlide(enthusiasm1)
			.addSlide(enthusiasm2)
			.addSlide(douglas)
			.addSlide(brendan)
			.addSlide(cronograma)
			.addSlide(historia)
			.addSlide(brendanYoung)
			.addSlide(nineties)
			.addSlide(ninetiesECMA3)
			.addSlide(ecma262)
			.addSlide(futurenow)
			.render();

	console.log(es6slider);

}());