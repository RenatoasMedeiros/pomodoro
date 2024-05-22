class Timer {
    constructor(durationInput, startButton, pauseButton, repeatButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        this.repeatButton = repeatButton

        // Store initial duration
        this.initialDuration = parseFloat(this.durationInput.value);
        if (isNaN(this.initialDuration)) {
            throw new Error('Initial duration is not a valid number');
        }

        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
        this.repeatButton.addEventListener('click', this.repeat)
    }

    start = () => {
        if (this.onStart) {
            this.onStart(this.timeRemaining);
        }
        this.tick();
        this.interval = setInterval(this.tick, 10);
    };

    pause = () => {
        clearInterval(this.interval);
    };

    //this tick method is responsible to "What to do in each second (can be other metric than just the second)"
    tick = () => {
        if (this.timeRemaining <= 0) {
            this.pause();
            if (this.onComplete) {
                this.onComplete();
            }
        } else {
            this.timeRemaining = this.timeRemaining - .01
            if (this.onTick) {
                this.onTick(this.timeRemaining);
            }

        }
    };

    repeat = () => {
        clearInterval(this.interval);
        // Reset duration to initial value
        this.timeRemaining = this.initialDuration;
        // Reset circle progress
        circle.setAttribute('stroke-dashoffset', perimeter);
        // Re-enable start button
        this.startButton.removeAttribute('disabled');
        // Disable pause button
        this.pauseButton.setAttribute('disabled', true);
        console.log('Timer reset');
    };

    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2);
    }

}