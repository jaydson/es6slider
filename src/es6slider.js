/* ES6 Classes */
class ES6Slider {

	constructor(name) {
        this.name = name;
        this.slides = [];
        this.currentSlide = 0;
        document.title = this.name;
    }

    goTo (slideN) {
        if (slideN < this.slides.length - 1 || slideN > 0) {
            let cur = document.location.href.split(/\/+/g).pop().split('.')[0];
            document.querySelector('#es6slide_' + this.currentSlide).classList.add('invisible');
            document.querySelector('#es6slide_' + slideN).classList.remove('invisible');
            this.currentSlide = slideN;
            let stateObj = { slide : cur };
            history.pushState(stateObj, "Slide " + this.currentSlide, this.currentSlide);
        }
    }

	next () {
        let canNext = (x, y) => x < y; /* ES6 arrow functions */

        if (canNext(this.currentSlide, this.slides.length - 1)) {
            document.querySelector('#es6slide_' + this.currentSlide).classList.add('invisible');
            document.querySelector('#es6slide_' + (this.currentSlide + 1)).classList.remove('invisible');            
            let stateObj = { slide : this.currentSlide };
            this.currentSlide += 1;
            history.pushState(stateObj, "Slide " + this.currentSlide, this.currentSlide);            
        }
	}

	prev () {
        let canPrev = x => x > 0; /* ES6 arrow functions */

        if (canPrev(this.currentSlide)) {
            document.querySelector('#es6slide_' + this.currentSlide).classList.add('invisible');
            document.querySelector('#es6slide_' + (this.currentSlide - 1)).classList.remove('invisible');
            let stateObj = { slide : this.currentSlide };
            this.currentSlide -= 1;
            history.pushState(stateObj, "Slide " + this.currentSlide, this.currentSlide);
        }
	}

    addSlide (slide = new Slide()) {
        if (slide instanceof Slide) {
            this.slides.push(slide);
        }
    }

    render () {
        let mainDOMContainer = document.querySelector('#es6slider');
        let _this = this;

        this.slides.forEach(function (slide, index) {
            let DOMElementSlide = document.createElement('div');  /* ES6 Block scoped bindings let */

            DOMElementSlide.id = 'es6slide_' + index;
            DOMElementSlide.setAttribute('class','es6slider slide invisible');
            if (index === 0) {
                DOMElementSlide.classList.remove('invisible');
            }

            let style = slide.style.get();
            if (style) {
                Object.assign(DOMElementSlide.style, style); /* ES6 Object.assign merging objects */
            }

            slide.texts.forEach(function (text) {
                let DOMElementText = document.createElement('div');
                DOMElementText.setAttribute('class', 'es6slider text');
                DOMElementText.innerHTML = text.str;
                let style = text.style.get();
                if (style) {
                    Object.assign(DOMElementText.style, style); /* ES6 Object.assign merging objects */
                }
                DOMElementSlide.appendChild(DOMElementText);
            });

            slide.images.forEach(function (image) {
                let DOMElementImage = document.createElement('img');
                DOMElementImage.src = image.src;
                DOMElementImage.setAttribute('class', 'es6slider image');
                let style = image.style.get();
                if (style) {
                    Object.assign(DOMElementImage.style, style); /* ES6 Object.assign merging objects */
                }
                DOMElementSlide.appendChild(DOMElementImage);
            });
            slide.DOMElement = DOMElementSlide;
            mainDOMContainer.appendChild(DOMElementSlide);
            let stateObj = { slide : 0 };
            //history.replaceState(stateObj, "Slide " + 0, 0);
        });

        document.addEventListener('keydown', function (event) {
            var _evt = event || window.event;
            switch (_evt.keyCode) {
                case 37:
                    _this.prev();
                    break;
                case 39:
                    _this.next();
                    break;
            }
        });

        window.addEventListener('popstate', function (event) {
            if (event.state) {
                console.log(event.state);
                _this.goTo(event.state.slide);
            }
        });
    }
}

/* ES6 Classes */
class Style {

    constructor() { /* ES6 construcor | ES6 default paramaters */
        this.style = {};
    }

    set (style) { /* ES6 default paramaters */
        if (typeof style === 'object') {
            Object.assign(this.style, style); /* ES6 Object.assign merging objects */
        } else if (arguments.length === 2) {
            this.style[arguments[0]] = arguments[1];
        } else {
            throw "Invalid style";
        }
    }

    get () {
        return this.style;
    }
}

/* ES6 Classes */
class Slide {

	constructor(title = 'New slide') { /* ES6 construcor | ES6 default paramaters */
        this.title = title;
        this.images = [];
    	this.texts = [];
        this.style = new Style();
    }

    setBackgroundImage (url) {
        let img = new Image(url);
        img.style.set({
            width : '100%',
            height : '100%',
            position : 'absolute',
            top : '0',
            left : '0',
            margin : '0'
        });
        this.images.push(img);
    }

    addImage (image = new Image('img/default.png')) { /* ES6 default paramaters */
        if (image instanceof Image) {
            this.images.push(image);
        } else {
            throw "Invalid image";
        }
    }

    addText (text = new Text('Your text here...')) { /* ES6 default paramaters */
        if (text instanceof Text) {
            this.texts.push(text);
        } else {
            throw "Invalid text";
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
        this.style = new Style();
    }
}

/* ES6 Classes */
class Text {

	constructor(str) {
        this.str = str;
        this.style = new Style();
    }
}