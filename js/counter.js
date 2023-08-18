

document.addEventListener('click', e => {
    if (e.target.classList.contains('counter__button')) {
        let num = e.target.closest('.counter').querySelector('.counter__num');

        if (e.target.textContent === '-') {
            if (num.textContent >= 2) {
                num.textContent--
                updDimensions(num.textContent)
            } else {
                num.disabled;
            }
        } else if (e.target.textContent === '+') {
            num.textContent++ 
            updDimensions(num.textContent)
        }

        if (e.target.closest('.counter-quantity')) {
            calcPrice();
            calcTotalPrice()
            editSizeEnter()
        }
    }
})



// FUNCTIONS

function calcPrice() {
    document.querySelectorAll('.order-box').forEach(el => {
        let price = el.querySelector('.counter-price__count').getAttribute('data-price-count');

        if (el.querySelector('.counter-price__count').getAttribute('data-price-count') < 1) {
            price = 1;
        } else {
            price = parseInt(el.querySelector('.counter-price__count').getAttribute('data-price-count'));
        }
        el.querySelector('.counter-price__count').textContent = price * parseInt(el.querySelector('.counter__num').textContent);
        //document.querySelector('.total-bill__value-num').textContent = price * times;
    })
}