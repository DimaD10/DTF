window.addEventListener("load", windowLoad);

function windowLoad() {
    digitsCountersInit();
}

// FUNCTIONS
function digitsCountersInit(digitsCountersItems) {
    let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");

    if (digitsCounters) {
        digitsCounters.forEach(digitsCounter => {
            digitsCountersAnimate(digitsCounter);
        });
    }
}

function digitsCountersAnimate(digitsCounter) {
    let startTimestamp = null;
    const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 2000;
    const startValue = parseInt(digitsCounter.textContent);
    const startPosition = 0;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}