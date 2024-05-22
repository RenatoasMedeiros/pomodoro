
const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const repeatButton = document.querySelector('#repeat');


const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let duration = 0;

const timer = new Timer(durationInput, startButton, pauseButton, repeatButton, {
    onStart(totalDuration) {
        duration = totalDuration
        console.log('Timer started');
        if (pauseButton.hasAttribute('disabled')) {
            pauseButton.removeAttribute('disabled');
        }
    },
    onTick(timeRemaining) {
        startButton.setAttribute('disabled', true);
        circle.setAttribute('stroke-dashoffset',
            perimeter * timeRemaining / duration - perimeter
        );
    },
    onComplete() {
        console.log('Timer is completed');
        startButton.removeAttribute('disabled');
        pauseButton.setAttribute('disabled', true);
    }
});