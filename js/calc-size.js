document.addEventListener('click', e =>  {
    if (e.target.classList.contains('enter-size-gallery__button')) {
        document.querySelector('.size-check').style.width = `auto`
        document.querySelector('.size-check').style.height = `auto`

        document.querySelector('.size-check').setAttribute('src', document.querySelector('.prod-preview__print img').getAttribute('src'));
        checkSizes()
        updSizes()
        enterSizes()
    }

    if (e.target.classList.contains('enter-size-pieces__button')) {
        document.querySelector('.size-check').style.width = `auto`
        document.querySelector('.size-check').style.height = `auto`

        document.querySelector('.size-check').style.width = `${document.querySelector('.enter-size-pieces__width .counter__num').textContent}px`
        document.querySelector('.size-check').style.height = `${document.querySelector('.enter-size-pieces__height .counter__num').textContent}px`

        enterSizes()
    }
})


// FUNCTIONS

function checkSizes() {
    if (document.getElementById('cust').checked) {
        if (document.querySelector('.size-check').offsetWidth >= document.querySelector('.size-check').offsetHeight) {
            document.querySelector('.size-check').style.width = `${document.querySelector('.enter-size-gallery .counter__num').textContent}px`
            document.querySelector('.size-check').style.height = `auto`
        } else {
            document.querySelector('.size-check').style.width = `auto`
            document.querySelector('.size-check').style.height = `${document.querySelector('.enter-size-gallery .counter__num').textContent}px`
        }
    } else if (document.getElementById('rec').checked) {
        if (document.querySelector('.size-check').offsetWidth >= document.querySelector('.size-check').offsetHeight) {
            document.querySelector('.size-check').style.width = `${document.querySelector('.radio-size-p_current').getAttribute('data-long-side-size')}px`
            document.querySelector('.size-check').style.height = `auto`
        } else {
            document.querySelector('.size-check').style.width = `auto`
            document.querySelector('.size-check').style.height = `${document.querySelector('.radio-size-p_current').getAttribute('data-long-side-size')}px`
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