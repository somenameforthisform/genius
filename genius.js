const selector = '.search-36MZv-';
const element = document.querySelector(selector);
const coords = element.getBoundingClientRect();

let friction = 0.03;
let velocity = 0.5;

let x = 0;
let y = 0;
let _x = 0;
let _y = 0;
let step = 0;

const pressedKey = [];

const control = (e, task) => {
    if (task === 'keydown') {
        if (e.key === 'w' && !pressedKey.includes(e.key)) {
            pressedKey.push(e.key)
        }
        if (e.key === 'a' && !pressedKey.includes(e.key)) {
            pressedKey.push(e.key)
        }
        if (e.key === 's' && !pressedKey.includes(e.key)) {
            pressedKey.push(e.key)
        }
        if (e.key === 'd' && !pressedKey.includes(e.key)) {
            pressedKey.push(e.key)
        }
    } else {
        if (e.key === 'w' && pressedKey.includes(e.key)) {
            pressedKey.splice(pressedKey.indexOf(e.key), 1)
        }
        if (e.key === 'a' && pressedKey.includes(e.key)) {
            pressedKey.splice(pressedKey.indexOf(e.key), 1)
        }
        if (e.key === 's' && pressedKey.includes(e.key)) {
            pressedKey.splice(pressedKey.indexOf(e.key), 1)
        }
        if (e.key === 'd' && pressedKey.includes(e.key)) {
            pressedKey.splice(pressedKey.indexOf(e.key), 1)
        }
    }

}

const angle = (x1, y1, x2, y2) => Math.atan((y2 - y1) / (x2 - x1)) * 180 / Math.PI;

const moveTo = (x, y) => {
    element.style.left = x + 'px';
    element.style.top = y + 'px';
    if (_x + _y > 0.5 || _x + _y < -0.5) { element.style.transform = `rotate(${angle(x, y, x + _x, y + _y)}deg)` }

}

const init = () => {
    x = coords.left + pageXOffset;
    y = coords.top + pageYOffset;
    friction = coords.width * coords.height / 500000;
    element.style.position = 'fixed';
    window.requestAnimationFrame(init_2)
}

const init_2 = () => {
    element.style.top = '0px';
    element.style.left = '0px';
    window.requestAnimationFrame(init_3)
}

const init_3 = () => {
    element.style.top = coords.top + pageYOffset;
    element.style.left = coords.left + pageXOffset;
    element.style.zIndex = 10000000000;
    window.requestAnimationFrame(render);
}

const render = () => {

    if (pressedKey.includes('w')) {
        _y = _y - velocity;
    };
    if (pressedKey.includes('a')) {
        _x = _x - velocity;
    }
    if (pressedKey.includes('s')) {
        _y = _y + velocity;
    }
    if (pressedKey.includes('d')) {
        _x = _x + velocity;
    }

    x = x + _x;
    y = y + _y;

    moveTo(x, y)




    if (_x < 0) { _x = _x + friction }
    if (_x > 0) { _x = _x - friction }
    if (_y < 0) { _y = _y + friction }
    if (_y > 0) { _y = _y - friction }

    window.requestAnimationFrame(render);
};

window.addEventListener('keydown', (e) => control(e, 'keydown'));
window.addEventListener('keyup', (e) => control(e, 'keyup'));

init()
