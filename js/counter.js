

document.addEventListener('click', e => {
    if (e.target.classList.contains('counter__button')) {
        let num = e.target.closest('.counter').querySelector('.counter__num');

        if (e.target.textContent === '-') {
            if (num.value >= 2) {
                num.value = num.value - 1;
                updDimensions(num.value)
            } else {
                num.disabled;
            }
        } else if (e.target.textContent === '+') {
            num.value++ 
            updDimensions(num.value)
            //showOrderButton()
        }

        if (e.target.closest('.counter-quantity')) {
            calcPrice();
            calcTotalPrice()
            editSizeEnter()
        }

        if (e.target.closest('.creator-main__step_size')) {
            checkCountSize(num)

            checkSizes();
            updSizes()
            callWarn()
        }
    }
})

document.addEventListener('input', e => {
    if (e.target.classList.contains('counter__num') && e.target.closest('.creator-main__step_quantity')) {
        if (e.target.value === '' || /^0*$/.test(e.target.value)) {
            e.target.value = 0;
            hideOrderButton()
        } else {
            if (e.target.value[0] === "0" && e.target.value > 0) {
                e.target.value = e.target.value.slice(1);
            }
            showOrderButton()
        }
        calcPrice();
        calcTotalPrice();
        editSizeEnter()
    }

    if (e.target.classList.contains('counter__num') && e.target.closest('.creator-main__step_size')) {
        if (e.target.value === '' || /^0*$/.test(e.target.value)) {
            e.target.value = 1;
        } else {
            if (e.target.value[0] === "0" && e.target.value > 0) {
                e.target.value = e.target.value.slice(1);
            }
        }
        checkCountSize(e.target)

        checkSizes();
        updSizes()
        callWarn()
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
        el.querySelector('.counter-price__count').textContent = price * parseInt(el.querySelector('.counter__num').value);
    })
}

function checkCountSize(num) {
    if (document.querySelector('.enter-size-gallery').classList.contains('opened')) {
        if (parseInt(num.value) > 0) {
            document.querySelector('.enter-size-gallery__button').removeAttribute("disabled");
        }
    }
    if (document.querySelector('.enter-size-pieces').classList.contains('opened')) {
        let zero = false;
        document.querySelector('.enter-size-pieces').querySelectorAll('.counter__num').forEach(el => {
            if (parseInt(el.value) === 0) {
                zero = true;
            }
        })

        if (zero) {
            document.querySelector('.enter-size-pieces__button').setAttribute("disabled", true);
        } else {
            document.querySelector('.enter-size-pieces__button').removeAttribute("disabled");
        }
    }
}