/* ES6 Classes */
class ES6Slider {

	constructor(name) {
        this.name = name;
        this.slides = [];
    }

	next () {
        console.log('next');
	}

	prev () {
        console.log('prev');
	}

    addSlide (slide = new Slide()) {
        if (slide instanceof Slide) {
            this.slides.push(slide);
        }
    }
}

/* ES6 Classes */
class Slide {

	constructor(title = 'New slide') { /* ES6 construcor | ES6 default paramaters */
        this.title = title;
        this.image = [];
    	this.text = [];
        this.style = {};
    }

    addImage (image = new Image('img/default.png')) { /* ES6 default paramaters */
        if (image instanceof Image) {
            this.image.push(image);
        } else {
            throw "Invalid image";
        }
    }

    addText (text = new Text('Your text here...')) { /* ES6 default paramaters */
        if (text instanceof Text) {
            this.text.push(text);
        } else {
            throw "Invalid text";
        }
    }

    setStyle (style = { background : '#fff'} ) { /* ES6 default paramaters */
        if (typeof style === 'object') {
            Object.assign(this.style, style); /* ES6 Object.assign merging objects */
        } else if (arguments.length === 2) {
            this.style[arguments[0]] = arguments[1];
        } else {
            throw "Invalid style";
        }
    }
}

/* ES6 Classes */
class RegularSlide extends Slide {
    constructor(title) {
        super(title); /* ES6 super call */
    }
}

/* ES6 Classes */
class MasterSlide extends Slide {
    constructor() {
    }
}

/* ES6 Classes */
class Image {

	constructor(src) {
        this.src = src;
    }
}

/* ES6 Classes */
class Text {

	constructor(str) {
        this.str = str;
    }
}