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
            
            checkSizes()
            updSizes()
            addDescr('size', `${document.querySelector('.size-check').offsetWidth}cm x ${document.querySelector('.size-check').offsetHeight}cm`);
            document.querySelectorAll('.order-box')[document.querySelectorAll('.order-box').length - 1].querySelector('.order-box__size').textContent = `${document.querySelector('.size-check').offsetWidth}cm x ${document.querySelector('.size-check').offsetHeight}cm`;   
            
            checkSameOrderCount()
            updDimensions(1)
            calcPrice()

            calcTotalPrice()
            editSizeEnter()
        } else if (document.getElementById('artwork-y').checked) {
            let newOrder = `
                <div class="order-box">
                    <div class="order-box__preview">
                        <img src="" alt="">
                        <div class="order-box__overlay">
                            <button class="order-box__rm-btn">
                                <svg class="rm-icon" width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.81628 2.93878C7.23961 1.80925 8.3818 1 9.72442 1C11.0671 1 12.2093 1.80925 12.6326 2.93878" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                                    <path d="M18.0612 4.87756H1" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                                    <path d="M16.0535 14.4403C15.8777 17.0757 15.7898 18.3934 14.9308 19.1967C14.0719 20 12.7507 20 10.1085 20H9.34045C6.69819 20 5.37706 20 4.51808 19.1967C3.6591 18.3934 3.57121 17.0757 3.39546 14.4403L2.93872 7.59186M16.5101 7.59186L16.3115 10.5698" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                                    <path d="M7.2041 9.9184L7.59186 14.9592" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                                    <path d="M12.2449 9.9184L11.4694 14.9592" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <h3 class="order-box__title"></h3>
                    <p class="order-box__size"></p>
                    <div class="counter counter-quantity">
                        <button class="counter__button btn-minus">-</button>
                        <input type="number" class="counter__num" value="1">
                        <button class="counter__button btn-plus">+</button>
                    </div>

                    <div class="counter-price"><span class="counter-price__count" data-price-count="0" data-digits-counter="400">0</span><span class="currency">zł</span></div>    
                </div>
            `;

            checkSizes();
            updSizes()

            // Catching same sizes
            let ourDemensions = `${document.querySelector('.size-check').offsetWidth}cm x ${document.querySelector('.size-check').offsetHeight}cm`;
            let sameEl = '';

            document.querySelectorAll('.order-box').forEach(el => {
                if (el.querySelector('.order-box__size').textContent === ourDemensions) {
                    sameEl = el;
                }
            })

            if (sameEl != '') {
                sameEl.querySelector('.counter__num').value = parseInt(sameEl.querySelector('.counter__num').value) + 1;
            } else {
                document.querySelector('.creator-main__step_quantity .counter-parent').insertAdjacentHTML('beforeend', newOrder);
            }
            /* ------------------------------ */


            if (document.getElementById('upload-by-link-p').checked) {
                document.querySelectorAll('.order-box')[document.querySelectorAll('.order-box').length - 1].querySelector('.order-box__preview img').setAttribute('src', document.querySelector('.prod-preview__roll').getAttribute('src'));
                addDescr('artwork', 'own by link');
                document.querySelectorAll('.order-box')[document.querySelectorAll('.order-box').length - 1].querySelector('.order-box__title').textContent = 'Own file by link';
            } else {
                addDescr('artwork', 'own file');
                document.querySelectorAll('.order-box')[document.querySelectorAll('.order-box').length - 1].querySelector('.order-box__title').textContent = 'Own file';

                if (document.getElementById('own-print-custom').files[0].type === 'application/pdf') {
                    document.querySelectorAll('.order-box')[document.querySelectorAll('.order-box').length - 1].querySelector('.order-box__preview img').setAttribute('src', document.querySelector('.prod-preview__roll').getAttribute('src'));
                } else {
                    document.querySelectorAll('.order-box')[document.querySelectorAll('.order-box').length - 1].querySelector('.order-box__preview img').setAttribute('src', document.querySelector('.prod-preview__print img').getAttribute('src'));
                }
            }

            document.querySelector('.size-check').style.width = `auto`
            document.querySelector('.size-check').style.height = `auto`

            checkSizes()
            updSizes()
            document.querySelectorAll('.order-box')[document.querySelectorAll('.order-box').length - 1].querySelector('.order-box__size').textContent = `${document.querySelector('.size-check').offsetWidth}cm x ${document.querySelector('.size-check').offsetHeight}cm`;   

            updSizes()
            updDimensions(1)
            calcPrice()

            calcTotalPrice()
            editSizeEnter()
        }

    }

    if (e.target.classList.contains('enter-size-pieces__button')) {
        let newOrder = `
            <div class="order-box">
                <div class="order-box__preview">
                    <img src="" alt="">
                    <div class="order-box__overlay">
                        <button class="order-box__rm-btn">
                            <svg class="rm-icon" width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.81628 2.93878C7.23961 1.80925 8.3818 1 9.72442 1C11.0671 1 12.2093 1.80925 12.6326 2.93878" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M18.0612 4.87756H1" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M16.0535 14.4403C15.8777 17.0757 15.7898 18.3934 14.9308 19.1967C14.0719 20 12.7507 20 10.1085 20H9.34045C6.69819 20 5.37706 20 4.51808 19.1967C3.6591 18.3934 3.57121 17.0757 3.39546 14.4403L2.93872 7.59186M16.5101 7.59186L16.3115 10.5698" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M7.2041 9.9184L7.59186 14.9592" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M12.2449 9.9184L11.4694 14.9592" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <h3 class="order-box__title"></h3>
                <p class="order-box__size"></p>
                <div class="counter counter-quantity">
                    <button class="counter__button btn-minus">-</button>
                    <input type="number" class="counter__num" value="1">
                    <button class="counter__button btn-plus">+</button>
                </div>

                <div class="counter-price"><span class="counter-price__count" data-price-count="0" data-digits-counter="400">0</span><span class="currency">zł</span></div>    
            </div>
        `;
        // Catching same sizes
        let ourDemensions = `${document.querySelector('.enter-size-pieces__width .counter__num').value}cm x ${document.querySelector('.enter-size-pieces__height .counter__num').value}cm`;
        let sameEl = '';

        document.querySelectorAll('.order-box').forEach(el => {
            if (el.querySelector('.order-box__size').textContent === ourDemensions) {
                sameEl = el;
            }
        })

        if (sameEl != '') {
            sameEl.querySelector('.counter__num').value = parseInt(sameEl.querySelector('.counter__num').value) + 1;
        } else {
            document.querySelector('.creator-main__step_quantity .counter-parent').insertAdjacentHTML('beforeend', newOrder);
        }
        /* ------------------------------ */


        if (document.getElementById('upload-by-link-p').checked) {
            document.querySelectorAll('.order-box')[document.querySelectorAll('.order-box').length - 1].querySelector('.order-box__preview img').setAttribute('src', document.querySelector('.prod-preview__roll').getAttribute('src'));
            addDescr('artwork', 'own by link');
            document.querySelectorAll('.order-box')[document.querySelectorAll('.order-box').length - 1].querySelector('.order-box__title').textContent = 'Own file by link';
        } else {
            addDescr('artwork', 'own file');
            document.querySelectorAll('.order-box')[document.querySelectorAll('.order-box').length - 1].querySelector('.order-box__title').textContent = 'Own file';

            if (document.getElementById('own-print-custom').files[0].type === 'application/pdf') {
                document.querySelectorAll('.order-box')[document.querySelectorAll('.order-box').length - 1].querySelector('.order-box__preview img').setAttribute('src', document.querySelector('.prod-preview__roll').getAttribute('src'));
            } else {
                document.querySelectorAll('.order-box')[document.querySelectorAll('.order-box').length - 1].querySelector('.order-box__preview img').setAttribute('src', document.querySelector('.prod-preview__print img').getAttribute('src'));
            }
        }

        document.querySelector('.size-check').style.width = `auto`
        document.querySelector('.size-check').style.height = `auto`

        document.querySelector('.size-check').style.width = `${document.querySelector('.enter-size-pieces__width .counter__num').value}px`
        document.querySelector('.size-check').style.height = `${document.querySelector('.enter-size-pieces__height .counter__num').value}px`

        document.querySelectorAll('.order-box')[document.querySelectorAll('.order-box').length - 1].querySelector('.order-box__size').textContent = `${document.querySelector('.size-check').offsetWidth}cm x ${document.querySelector('.size-check').offsetHeight}cm`;   

        updSizes()
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
            document.querySelector('.size-check').style.width = `${parseInt(document.querySelector('.enter-size-gallery .counter__num').value)}px`
            document.querySelector('.size-check').style.height = `auto`

            updSizes()
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