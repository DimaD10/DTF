document.addEventListener('click', e =>  {
    if (e.target.classList.contains('enter-size-gallery__button')) {
        document.querySelector('.size-check').style.width = `auto`
        document.querySelector('.size-check').style.height = `auto`

        document.querySelector('.size-check').setAttribute('src', document.querySelector('.prod-preview__print img').getAttribute('src'));

        if (document.getElementById('artwork-n').checked) {
            let longSide = parseInt(e.target.closest('.enter-size-gallery').querySelector('.counter__num').value);
            let sameEl = '';

            document.querySelectorAll('.radio-size-p').forEach(el => {
                if (parseInt(el.getAttribute('data-long-side-size')) === longSide) {
                    sameEl = el;
                }
            })

            if (sameEl != '') {
                let points = [...document.querySelectorAll('.radio-size-p')]
                let elPos = points.indexOf(sameEl);
                createNewOrder(`${document.querySelector('.size-check').offsetWidth}cm x ${document.querySelector('.size-check').offsetHeight}cm`, elPos)
            } else {
                createNewOrder(`${document.querySelector('.size-check').offsetWidth}cm x ${document.querySelector('.size-check').offsetHeight}cm`, 'custom')
            }
        }

        checkSizes()
        updSizes()
        addDescr('size', `${document.querySelector('.size-check').offsetWidth}cm x ${document.querySelector('.size-check').offsetHeight}cm`);
        document.querySelectorAll('.order-box')[document.querySelectorAll('.order-box').length - 1].querySelector('.order-box__size').textContent = `${document.querySelector('.size-check').offsetWidth}cm x ${document.querySelector('.size-check').offsetHeight}cm`;   
        
        checkSameOrderCount()
        updDimensions(1)
        calcPrice()

        calcTotalPrice()
        editSizeEnter()
    }

    if (e.target.classList.contains('enter-size-pieces__button')) {
        document.querySelector('.size-check').style.width = `auto`
        document.querySelector('.size-check').style.height = `auto`

        document.querySelector('.size-check').style.width = `${document.querySelector('.enter-size-pieces__width .counter__num').value}px`
        document.querySelector('.size-check').style.height = `${document.querySelector('.enter-size-pieces__height .counter__num').value}px`

        enterSizes()
        updDimensions(1)
        calcPrice()

        calcTotalPrice()
        editSizeEnter()
    }
})


// FUNCTIONS

function checkSizes() {
    if (document.getElementById('cust').checked) {
        if (document.querySelector('.size-check').offsetWidth >= document.querySelector('.size-check').offsetHeight) {
            document.querySelector('.size-check').style.width = `${document.querySelector('.enter-size-gallery .counter__num').value}px`
            document.querySelector('.size-check').style.height = `auto`
        } else {
            document.querySelector('.size-check').style.width = `auto`
            document.querySelector('.size-check').style.height = `${document.querySelector('.enter-size-gallery .counter__num').value}px`
        }
    } else if (document.getElementById('rec').checked) {
        if (document.querySelector('.size-check').offsetWidth >= document.querySelector('.size-check').offsetHeight) {
            document.querySelector('.size-check').style.width = `${document.querySelectorAll('.radio-size-p_current')[document.querySelectorAll('.radio-size-p_current').length - 1].getAttribute('data-long-side-size')}px`
            document.querySelector('.size-check').style.height = `auto`
        } else {
            document.querySelector('.size-check').style.width = `auto`
            document.querySelector('.size-check').style.height = `${document.querySelectorAll('.radio-size-p_current')[document.querySelectorAll('.radio-size-p_current').length - 1].getAttribute('data-long-side-size')}px`
        }
    }
}
function updSizes() {
    document.querySelector('.enter-size-gallery__demensions-width').textContent = `${document.querySelector('.size-check').offsetWidth}cm`
    document.querySelector('.enter-size-gallery__demensions-height').textContent = `${document.querySelector('.size-check').offsetHeight}cm`
}
function enterSizes() {
    addDescr('size', `${document.querySelector('.size-check').offsetWidth}cm x ${document.querySelector('.size-check').offsetHeight}cm`);
    document.querySelector('.order-box__size').textContent = `${document.querySelector('.size-check').offsetWidth}cm x ${document.querySelector('.size-check').offsetHeight}cm`;
}