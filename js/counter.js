let price = document.querySelector('.counter-price__count').getAttribute('data-price-count');

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
                updDimensions(num.textContent)
                init = true;
            } else {
                num.disabled;
                init = false
            }
        } else if (e.target.textContent === '+') {
            num.textContent++ 
            updDimensions(num.textContent)
            init = true;
        }

        if (e.target.closest('.counter-quantity')) {
            addDescr('Quantity', num.textContent);
            calcPrice(num.textContent);
        }

        if (init) {
            digitsCountersInit();
        }
    }
})



// FUNCTIONS

function calcPrice(times) {
    if (document.querySelector('.counter-price__count').getAttribute('data-price-count') < 1) {
        price = 1;
    } else {
        price = parseInt(document.querySelector('.counter-price__count').getAttribute('data-price-count'));
    }
    document.querySelector('.counter-price__count').textContent = price * times;
    document.querySelector('.total-bill__value-num').textContent = price * times;
}