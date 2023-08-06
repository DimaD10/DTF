const price = document.querySelector('.counter-price__count').getAttribute('data-price');

window.addEventListener('load', () => {
    calcPrice(1)
})

document.addEventListener('click', e => {
    if (e.target.classList.contains('counter__button')) {
        let num = e.target.closest('.counter').querySelector('.counter__num');
        let init = false;

        if (e.target.textContent === '-') {
            if (num.textContent >= 2) {
                num.textContent--
                init = true;
            } else {
                num.disabled;
                init = false
            }
        } else if (e.target.textContent === '+') {
            num.textContent++ 
            init = true;
        }

        calcPrice(num.textContent);
        addDescr('Quantity', num.textContent);

        if (init) {
            digitsCountersInit();
        }
    }
})



// FUNCTIONS

function calcPrice(times) {
    document.querySelector('.counter-price__count').textContent = price * times;
    document.querySelector('.total-bill__value-num').textContent = price * times;
}