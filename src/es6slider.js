/* ES6 Classes */
class ES6Slider {

	constructor(name) {
        this.name = name;
        this.slides = [];
        this.currentSlide = 0;
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
        if (this.currentSlide < this.slides.length - 1) {
            document.querySelector('#es6slide_' + this.currentSlide).classList.add('invisible');
            document.querySelector('#es6slide_' + (this.currentSlide + 1)).classList.remove('invisible');            
            let stateObj = { slide : this.currentSlide };
            this.currentSlide += 1;
            history.pushState(stateObj, "Slide " + this.currentSlide, this.currentSlide);            
        }
	}

	prev () {
        if (this.currentSlide > 0) {
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

            slide.texts.forEach(function (text) {
                let DOMElementText = document.createElement('div');
                DOMElementText.setAttribute('class', 'es6slider text');
                DOMElementText.innerHTML = text.str;
                DOMElementSlide.appendChild(DOMElementText);
            });

            slide.images.forEach(function (image) {
                let DOMElementImage = document.createElement('img');
                DOMElementImage.src = image.src;
                DOMElementImage.setAttribute('class', 'es6slider image');
                DOMElementSlide.appendChild(DOMElementImage);
            });

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
class Slide {

	constructor(title = 'New slide') { /* ES6 construcor | ES6 default paramaters */
        this.title = title;
        this.images = [];
    	this.texts = [];
        this.style = {};
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