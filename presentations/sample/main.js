(function () {

	let es6slider = new ES6Slider('JavaScript do Futuro no Presente');

	let slide1 = new RegularSlide('Slide 1');
	slide1.setBackgroundImage('img/backtothefuture.jpg');
	let text1 = new Text(es6slider.name);
	text1.style.set({
		color : 'rgb(228, 193, 7)',
		fontSize : '2em',
		position : 'absolute',
		paddingLeft : '32px',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		'-webkit-transform' : 'skewX(-16deg)',
		'-moz-transform' : 'skewX(-16deg)',
		'transform' : 'skewX(-16deg)',
		zIndex : '99',
		fontWeight : 'bold'
	});
	slide1.addText(text1);

	let me = new RegularSlide('Jaydson');
	me.style.set({
		backgroundColor : '#09311E'
	});
	let bio = new Text('<span style="font-style:italic;font-size:1.3em;color:#F3EA1A">~Jaydson Gomes~ </span><br> * Entusiasta JavaScript <br> * FrontEnd Engineer no Terra <br> * Curador da BrazilJS Conf/RSJS/FrontInPoa');
	bio.style.set({
		color : '#fff',
		fontSize : '1.3em',
		position : 'absolute',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		zIndex : '99',
		fontWeight : 'bold'
	});
	me.addText(bio);

	let enthusiasm1 = new RegularSlide('enthusiasm');
	enthusiasm1.setBackgroundImage('img/superhtml5.jpeg');

	let enthusiasm2 = new RegularSlide('enthusiasm 2');
	enthusiasm2.setBackgroundImage('img/jesus.jpg');

	let douglas = new RegularSlide('Douglas');
	douglas.setBackgroundImage('img/douglas.jpg');

	let brendan = new RegularSlide('Brendan');
	brendan.setBackgroundImage('img/brendan.jpeg');

	let futurenow = new RegularSlide('futurenow');
	futurenow.setBackgroundImage('img/future-now.gif');

	let cronograma = new RegularSlide('Cronograma');
	cronograma.style.set({
		backgroundColor : '#09311E'
	});
	let list = ['História',
				'Arrows functions',
				'Classes',
				'Template Strings',
				'default/rest/spread params',
				'let + const',
				'modules',
				'promises'];

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

	let historia = new RegularSlide('historia');
	historia.setBackgroundImage('img/senta-que-la-vem-historia.gif');

	let nineties = new RegularSlide('nineties');
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

	let ninetiesECMA3 = new RegularSlide('ninetiesECMA3');
	ninetiesECMA3.style.set({
		backgroundColor : '#09311E'
	});
	let ninetiesECMA3T = new Text(`
		<div style="font-style:italic;font-size:2.2em">~1999 - ES3~</div>
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

	let brendanYoung = new RegularSlide('brendanYoung');
	brendanYoung.setBackgroundImage('img/brendan-young.jpg');

	let ecma262 = new RegularSlide('historia');
	ecma262.style.set({
		backgroundColor : '#09311E'
	});

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

	let ninetiesECMA4 = new RegularSlide('ninetiesECMA4');
	ninetiesECMA4.style.set({
		backgroundColor : '#09311E'
	});
	let ninetiesECMA4T = new Text(`
		<div style="font-style:italic;font-size:2.2em">~2008 - ES4~</div>
		<div>Versão abandonada :(</div>
	`);
	ninetiesECMA4T.style.set({
		color : '#fff',
		fontSize : '1em',
		position : 'absolute',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		zIndex : '99',
		fontWeight : 'bold'
	});
	ninetiesECMA4.addText(ninetiesECMA4T);

	let ninetiesECMA5 = new RegularSlide('ninetiesECMA5');
	ninetiesECMA5.style.set({
		backgroundColor : '#09311E'
	});
	let ninetiesECMA5T = new Text(`
		<div style="font-style:italic;font-size:2.2em">~2009 - ES5~</div>
		<div> Várias melhorias na linguagem</div>
		<div><a target="_blank" href="http://kangax.github.io/es5-compat-table/">es5-compat-table</a> by @kangax</div>
	`);
	ninetiesECMA5T.style.set({
		color : '#fff',
		fontSize : '1em',
		position : 'absolute',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		zIndex : '99',
		fontWeight : 'bold'
	});
	ninetiesECMA5.addText(ninetiesECMA5T);

	let coffee = new RegularSlide('coffee');
	coffee.setBackgroundImage('img/coffeescript.jpg');

	let coruja = new RegularSlide('coruja');
	coruja.style.set({
		backgroundColor : '#000',
		textAlign : 'center',
		padding : '0'
	});
	let imgCoruja = new Image('img/coruja.jpg');
	imgCoruja.style.set({
		minHeight : '100%'
	});
	coruja.addImage(imgCoruja);

	let dart = new RegularSlide('dart');
	dart.setBackgroundImage('img/dart.jpg');

	let gato = new RegularSlide('gato');
	gato.style.set({
		backgroundColor : '#000',
		textAlign : 'center',
		padding : '0'
	});
	let imgGato = new Image('img/gato.gif');
	imgGato.style.set({
		minHeight : '100%'
	});
	gato.addImage(imgGato);

	let type = new RegularSlide('type');
	type.setBackgroundImage('img/typescript.jpg');

	let ape = new RegularSlide('ape');
	ape.style.set({
		backgroundColor : '#000',
		textAlign : 'center',
		padding : '0'
	});
	let imgApe = new Image('img/ape.jpg');
	imgApe.style.set({
		minHeight : '100%'
	});
	ape.addImage(imgApe);

	let fuckometer = new RegularSlide('fuckometer');
	fuckometer.setBackgroundImage('img/fuckometer.gif');

	let ecma6 = new RegularSlide('ecma6');
	ecma6.style.set({
		backgroundColor : '#09311E'
	});

	let ecma6T = new Text(`ES6`);
	ecma6T.style.set({
		fontSize : '10.5em',
		textAlign : 'center',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		fontWeight : 'bold',
		color : '#fff'
	});
	ecma6.addText(ecma6T);

	let jake = new RegularSlide('jake');
	jake.setBackgroundImage('img/jake.gif');

	let arrows = new RegularSlide('arrows');
	arrows.style.set({
		backgroundColor : '#09311E'
	});
	
	let arrowsT = new Text(`Arrows`);
	arrowsT.style.set({
		fontSize : '5.5em',
		textAlign : 'center',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		fontWeight : 'bold',
		color : '#fff'
	});
	arrows.addText(arrowsT);

	let arrowsS = new RegularSlide('arrows-syntax');
	arrowsS.style.set({
		backgroundColor : '#09311E'
	});
	
	let arrowsST = new Text(`=>`);
	arrowsST.style.set({
		fontSize : '10.5em',
		textAlign : 'center',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		fontWeight : 'bold',
		color : '#fff'
	});
	arrowsS.addText(arrowsST);

	let arrowsC = new RegularSlide('arrows-characteristics');
	arrowsC.style.set({
		backgroundColor : '#09311E'
	});
	
	let arrowsCT = new Text(`
		<ul style="font-size:0.8em">
			<li>Lexical this binding</li>
			<li>Not newable</li>
			<li>Can’t change this</li>
			<li>Always anonymus</li>
		</ul>
	`);
	arrowsCT.style.set({
		fontSize : '4.5em',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		fontWeight : 'bold',
		color : '#fff',
		fontSize : '1.2em'
	});
	arrowsC.addText(arrowsCT);

	let arrowsExample = new RegularSlide('arrows-example');
	arrowsExample.style.set({
		backgroundColor : '#09311E',
		padding : '0'
	});
	
	let arrowsExampleT = new Text(`
		<h1>Arrows - Exemplo 1</h1>
		<iframe width="100%" height="100%" frameborder="0" allowfullscreen src="http://localhost:8081/examples/arrows/"></iframe>
	`);
	arrowsExampleT.style.set({
		width : '100%',
		height : '100%'		
	});
	arrowsExample.addText(arrowsExampleT);

	let arrowsExample1 = new RegularSlide('arrows-example1');
	arrowsExample1.style.set({
		backgroundColor : '#09311E',
		padding : '0'
	});
	
	let arrowsExampleT1 = new Text(`
		<h1>Arrows - Exemplo 2</h1>
		<iframe width="100%" height="100%" src="http://jsfiddle.net/bmBAE/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
	`);
	arrowsExampleT1.style.set({
		width : '100%',
		height : '100%'		
	});
	arrowsExample1.addText(arrowsExampleT1);

	let classes = new RegularSlide('classes');
	classes.style.set({
		backgroundColor : '#09311E'
	});
	
	let classesT = new Text(`Classes`);
	classesT.style.set({
		fontSize : '4.5em',
		textAlign : 'center',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		fontWeight : 'bold',
		color : '#fff'
	});
	classes.addText(classesT);

	let classesC = new RegularSlide('classes-characteristics');
	classesC.style.set({
		backgroundColor : '#09311E'
	});
	
	let classesCT = new Text(`
		<ul style="font-size:0.8em">
			<li>OO clássica</li>
			<li>super call</li>
			<li>static methods</li>
			<li>constructors</li>
		</ul>
	`);
	classesCT.style.set({
		fontSize : '4.5em',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		fontWeight : 'bold',
		color : '#fff',
		fontSize : '1.2em'
	});
	classesC.addText(classesCT);

	let classesExample = new RegularSlide('classes-example');
	classesExample.style.set({
		backgroundColor : '#09311E',
		padding : '0'
	});
	
	let classesExampleT = new Text(`
		<h1>Classes - Exemplo</h1>
		<iframe width="100%" height="100%" frameborder="0" allowfullscreen src="http://localhost:8081/examples/classes/"></iframe>
	`);
	classesExampleT.style.set({
		width : '100%',
		height : '100%'		
	});
	classesExample.addText(classesExampleT);

	let classesExample1 = new RegularSlide('classes-example1');
	classesExample1.style.set({
		backgroundColor : '#09311E',
		padding : '0'
	});
	
	let classesExampleT1 = new Text(`
		<h1>Classes - Exemplo</h1>
		<iframe width="100%" height="100%" src="http://jsfiddle.net/AAbm8/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
	`);
	classesExampleT1.style.set({
		width : '100%',
		height : '100%'		
	});
	classesExample1.addText(classesExampleT1);

	let tplstrings = new RegularSlide('template-strings');
	tplstrings.style.set({
		backgroundColor : '#09311E'
	});
	
	let tplstringsT = new Text(`Template Strings`);
	tplstringsT.style.set({
		fontSize : '3.5em',
		textAlign : 'center',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		fontWeight : 'bold',
		color : '#fff'
	});
	tplstrings.addText(tplstringsT);

	let tplStringsC = new RegularSlide('template-strings-characteristics');
	tplStringsC.style.set({
		backgroundColor : '#09311E'
	});
	
	let tplStringsCT = new Text(`
		<ul style="font-size:0.8em">
			<li>Multiline strings</li>
			<li>Basic string formatting</li>
			<li>HTML escaping</li>
			<li>Localization of strings</li>
		</ul>
	`);
	tplStringsCT.style.set({
		fontSize : '4.5em',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		fontWeight : 'bold',
		color : '#fff',
		fontSize : '1.2em'
	});
	tplStringsC.addText(tplStringsCT);

	let tplStringsExample = new RegularSlide('template-strings-example');
	tplStringsExample.style.set({
		backgroundColor : '#09311E',
		padding : '0'
	});
	
	let tplStringsExampleT = new Text(`
		<h1>Template strings - Exemplo</h1>
		<iframe width="100%" height="100%" frameborder="0" allowfullscreen src="http://localhost:8081/examples/template-strings/"></iframe>
	`);
	tplStringsExampleT.style.set({
		width : '100%',
		height : '100%'		
	});
	tplStringsExample.addText(tplStringsExampleT);

	let default_rest_spread = new RegularSlide('Paramaters');
	default_rest_spread.style.set({
		backgroundColor : '#09311E'
	});

	let default_rest_spreadT = new Text(`Paramaters`);
	default_rest_spreadT.style.set({
		fontSize : '3.5em',
		textAlign : 'center',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		fontWeight : 'bold',
		color : '#fff'
	});
	default_rest_spread.addText(default_rest_spreadT);

	let default_rest_spreadC = new RegularSlide('default_rest_spread_characteristics');
	default_rest_spreadC.style.set({
		backgroundColor : '#09311E'
	});
	
	let default_rest_spreadCCT = new Text(`
		<ul style="font-size:0.8em">
			<li>Rest</li>
			<li>Spread</li>
			<li>Default</li>
		</ul>
	`);
	default_rest_spreadCCT.style.set({
		fontSize : '4.5em',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		fontWeight : 'bold',
		color : '#fff',
		fontSize : '1.2em'
	});
	default_rest_spreadC.addText(default_rest_spreadCCT);

	let default_rest_spreadExample = new RegularSlide('default_rest_spreadExample-example');
	default_rest_spreadExample.style.set({
		backgroundColor : '#09311E',
		padding : '0'
	});
	
	let default_rest_spreadExampleT = new Text(`
		<h1>Rest/Spread/Default - Exemplo</h1>
		<iframe width="100%" height="100%" frameborder="0" allowfullscreen src="http://localhost:8081/examples/parameters/"></iframe>
	`);
	default_rest_spreadExampleT.style.set({
		width : '100%',
		height : '100%'		
	});
	default_rest_spreadExample.addText(default_rest_spreadExampleT);

	let block = new RegularSlide('block-scope');
	block.style.set({
		backgroundColor : '#09311E'
	});

	let blockT = new Text(`Block Scope`);
	blockT.style.set({
		fontSize : '3.5em',
		textAlign : 'center',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		fontWeight : 'bold',
		color : '#fff'
	});
	block.addText(blockT);

	let blockC = new RegularSlide('block_characteristics');
	blockC.style.set({
		backgroundColor : '#09311E'
	});
	
	let blockCT = new Text(`
		<ul style="font-size:0.8em">
			<li>let</li>
			<li>const</li>
		</ul>
	`);
	blockCT.style.set({
		fontSize : '4.5em',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		fontWeight : 'bold',
		color : '#fff',
		fontSize : '1.2em'
	});
	blockC.addText(blockCT);

	let blockExample = new RegularSlide('block-example');
	blockExample.style.set({
		backgroundColor : '#09311E',
		padding : '0'
	});

	let blockExampleT = new Text(`
		<h1>Block Scope - Exemplo</h1>
		<iframe width="100%" height="100%" frameborder="0" allowfullscreen src="http://localhost:8081/examples/block-scope/"></iframe>
	`);
	blockExampleT.style.set({
		width : '100%',
		height : '100%'		
	});
	blockExample.addText(blockExampleT);

	let moduleSlide = new RegularSlide('module');
	moduleSlide.style.set({
		backgroundColor : '#09311E'
	});

	let moduleSlideT = new Text(`Module`);
	moduleSlideT.style.set({
		fontSize : '3.5em',
		textAlign : 'center',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		fontWeight : 'bold',
		color : '#fff'
	});
	moduleSlide.addText(moduleSlideT);

	let moduleSlideC = new RegularSlide('module_characteristics');
	moduleSlideC.style.set({
		backgroundColor : '#09311E'
	});
	
	let moduleSlideCT = new Text(`
		<ul style="font-size:0.8em">
			
		</ul>
	`);
	moduleSlideCT.style.set({
		fontSize : '4.5em',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		fontWeight : 'bold',
		color : '#fff',
		fontSize : '1.2em'
	});
	moduleSlideC.addText(moduleSlideCT);

	let viva = new RegularSlide('viva');
	ape.style.set({
		backgroundColor : '#000',
		textAlign : 'center',
		padding : '0'
	});

	let imgViva = new Image('img/viva.jpg');
	imgViva.style.set({
		minHeight : '100%'
	});
	viva.addImage(imgViva);

	let moduleExample = new RegularSlide('module-example');
	moduleExample.style.set({
		backgroundColor : '#09311E',
		padding : '0'
	});

	let moduleExampleT = new Text(`
		<h1>Module - Exemplo</h1>
		<iframe width="100%" height="100%" frameborder="0" allowfullscreen src="http://localhost:8081/examples/module/"></iframe>
	`);
	moduleExampleT.style.set({
		width : '100%',
		height : '100%'		
	});
	moduleExample.addText(moduleExampleT);

	let promiseImage = new RegularSlide('promise-image');
	promiseImage.style.set({
		backgroundColor : '#000',
		textAlign : 'center',
		padding : '0'
	});
	
	let promiseImageSrc = new Image('img/promise.jpg');
	promiseImageSrc.style.set({
		minHeight : '100%'
	});
	promiseImage.addImage(promiseImageSrc);


	let promiseSlide = new RegularSlide('promise');
	promiseSlide.style.set({
		backgroundColor : '#09311E'
	});

	let promiseSlideT = new Text(`Promises`);
	promiseSlideT.style.set({
		fontSize : '3.5em',
		textAlign : 'center',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		fontWeight : 'bold',
		color : '#fff'
	});
	promiseSlide.addText(promiseSlideT);

	let promiseSlideC = new RegularSlide('promises_characteristics');
	promiseSlideC.style.set({
		backgroundColor : '#09311E'
	});
	
	let promiseSlideCT = new Text(`
		<ul style="font-size:0.6em">
			<li>Uma promise representa um valor não necessariamente conhecido no seu tempo de criação</li>
			<li>Promises permitem associar handlers de sucesso ou erro de uma ação assíncrona</li>
			<li>Isso permite que métodos assíncronos retornem valores como métodos ~síncronos~</li>
			<li>Ao invés do valor final, o método assíncrono retorna uma promessa de ter um valor em algum momento no futuro</li>
		</ul>
	`);
	promiseSlideCT.style.set({
		fontSize : '4.5em',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		fontWeight : 'bold',
		color : '#fff',
		fontSize : '1.2em'
	});
	promiseSlideC.addText(promiseSlideCT);

	let promiseExample = new RegularSlide('promise-example');
	promiseExample.style.set({
		backgroundColor : '#09311E',
		padding : '0'
	});

	let promiseExampleT = new Text(`
		<h1>Promises - Exemplo</h1>
		<iframe width="100%" height="100%" frameborder="0" allowfullscreen src="http://localhost:8081/examples/promises/"></iframe>
	`);
	promiseExampleT.style.set({
		width : '100%',
		height : '100%'		
	});
	promiseExample.addText(promiseExampleT);

	let collections = new RegularSlide('collections');
	collections.style.set({
		backgroundColor : '#09311E'
	});

	let collectionsT = new Text(`Collections`);
	collectionsT.style.set({
		fontSize : '3.5em',
		textAlign : 'center',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		fontWeight : 'bold',
		color : '#fff'
	});
	collections.addText(collectionsT);

	let collectionsC = new RegularSlide('collections_characteristics');
	collectionsC.style.set({
		backgroundColor : '#09311E'
	});
	
	let collectionsCT = new Text(`
		<ul style="font-size:0.6em">
			<li>Novos tipos de collections</li>
			<li>Melhor e mais eficiente armazenamento/ordenação</li>
		</ul>
	`);
	collectionsCT.style.set({
		fontSize : '4.5em',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		fontWeight : 'bold',
		color : '#fff',
		fontSize : '1.2em'
	});
	collectionsC.addText(collectionsCT);

	let setExample = new RegularSlide('set-example');
	setExample.style.set({
		backgroundColor : '#09311E',
		padding : '0'
	});

	let setExampleT = new Text(`
		<h1>Set(Lista ordenada sem duplicatas) - Exemplo</h1>
		<iframe width="100%" height="100%" frameborder="0" allowfullscreen src="http://localhost:8081/examples/collections/"></iframe>
	`);
	setExampleT.style.set({
		width : '100%',
		height : '100%'		
	});
	setExample.addText(setExampleT);

	let how = new RegularSlide('how');
	how.style.set({
		backgroundColor : '#09311E'
	});

	let howT = new Text(`Como usar hoje?`);
	howT.style.set({
		fontSize : '3.5em',
		textAlign : 'center',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		fontWeight : 'bold',
		color : '#fff'
	});
	how.addText(howT);

	let caseSlide = new RegularSlide('case');
	caseSlide.style.set({
		backgroundColor : '#09311E'
	});

	let traceur = new RegularSlide('traceur');
	traceur.setBackgroundImage('img/tc.png');

	let traceurLink = new Text(`
		<a href="https://github.com/google/traceur-compiler">https://github.com/google/traceur-compiler</a>
	`);
	traceurLink.style.set({
		position: 'absolute',
		zIndex: '999',
		fontSize: '0.8em',
		marginLeft: '70px',
		textAlign: 'center',
		marginTop: '25px'
	});
	traceur.addText(traceurLink);

	let es6table = new RegularSlide('es6table');
	es6table.style.set({
		backgroundColor : '#09311E'
	});

	let es6tableT = new Text(`
		<h1>Tabela ES6</h1>
		<a href="http://kangax.github.io/es5-compat-table/es6/">http://kangax.github.io/es5-compat-table/es6/</a>
	`);
	es6tableT.style.set({
		fontSize : '1em',
		textAlign : 'center',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		fontWeight : 'bold',
		color : '#fff'
	});
	es6table.addText(es6tableT);

	let caseSlideT = new Text(`Case`);
	caseSlideT.style.set({
		fontSize : '3.5em',
		textAlign : 'center',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		fontWeight : 'bold',
		color : '#fff'
	});
	caseSlide.addText(caseSlideT);

	let end = new RegularSlide('end');
	end.style.set({
		backgroundColor : '#09311E'
	});

	let endT = new Text(`
		<a href="https://github.com/jaydson/js-future-in-the-present">https://github.com/jaydson/js-future-in-the-present</a><br>
		<a href="https://github.com/jaydson/es6slider">https://github.com/jaydson/es6slider</a>
	`);
	endT.style.set({
		fontSize : '1em',
		textAlign : 'center',
		textShadow : '4px 4px 2px rgba(10, 10, 10, 1)',
		fontWeight : 'bold',
		color : '#fff'
	});
	end.addText(endT);

	let jay = new RegularSlide('jay');
	jay.setBackgroundImage('img/jaydson.png');

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
			.addSlide(ecma262)
			.addSlide(ninetiesECMA3)
			.addSlide(ninetiesECMA4)
			.addSlide(ninetiesECMA5)
			.addSlide(coffee)
			.addSlide(coruja)
			.addSlide(dart)
			.addSlide(gato)
			.addSlide(type)
			.addSlide(ape)
			.addSlide(fuckometer)
			.addSlide(ecma6)
			.addSlide(jake)
			.addSlide(arrows)
			.addSlide(arrowsS)
			.addSlide(arrowsC)
			.addSlide(arrowsExample)
			.addSlide(arrowsExample1)
			.addSlide(classes)
			.addSlide(classesC)
			.addSlide(classesExample)
			.addSlide(classesExample1)
			.addSlide(tplstrings)
			.addSlide(tplStringsC)
			.addSlide(tplStringsExample)
			.addSlide(default_rest_spread)
			.addSlide(default_rest_spreadC)
			.addSlide(default_rest_spreadExample)
			.addSlide(block)
			.addSlide(blockC)
			.addSlide(blockExample)
			.addSlide(moduleSlide)
			.addSlide(viva)
			.addSlide(moduleExample)
			.addSlide(promiseImage)
			.addSlide(promiseSlide)
			.addSlide(promiseSlideC)		
			.addSlide(promiseExample)
			.addSlide(collections)
			.addSlide(collectionsC)
			.addSlide(setExample)
			.addSlide(how)
			.addSlide(futurenow)
			.addSlide(traceur)
			.addSlide(es6table)
			.addSlide(caseSlide)
			.addSlide(end)
			.addSlide(jay)
			.render();

	console.log(es6slider);

}());