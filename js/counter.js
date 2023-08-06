const price = document.querySelector('.counter-price__count').getAttribute('data-price');

window.addEventListener('load', () => {
    calcPrice(1)
})

document.addEventListener('click', e => {
    if (e.target.classList.contains('counter__button')) {
        let num = e.target.closest('.counter').querySelector('.counter__num');
        if (e.target.textContent === '-') {
            if (num.textContent >= 2) {
                num.textContent--
            } else {
                num.disabled;
            }
        } else if (e.target.textContent === '+') {
            num.textContent++ 
        }

        calcPrice(num.textContent);
    }
})



// FUNCTIONS

function calcPrice(times) {
    console.log(price);
    document.querySelector('.counter-price__count').textContent = price * times;
    document.querySelector('.total-bill__value-num').textContent = price * times;
}