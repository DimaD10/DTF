const dragndrop = document.querySelectorAll('.dragndrop');
const printList = document.querySelector('.prints');
const previewArea = document.querySelector('.dragndrop__preview');
const colorCloth = document.getElementById('cloth-prod-color');

const orderDescr = document.querySelector('.order-descr');

let ownFile = false;

document.addEventListener('change', e => {
    if (e.target.matches('input[data-open-dragndrop-design]:checked')) {
        document.querySelector('.dragndrop_design').classList.add('opened')
        document.querySelector(".creator-main__step_size").classList.remove('creator-main__step_current')
    } 
    if (e.target.matches('input[data-open-dragndrop-custom]:checked')) {
        document.querySelector('.dragndrop_custom').classList.add('opened')
        document.querySelector(".creator-main__step_size").classList.add('creator-main__step_current')
    } 
    if (e.target.matches('input[data-close-dragndrop-design]:checked')) {
        document.querySelector('.dragndrop_design').classList.remove('opened')
        document.querySelector(".creator-main__step_size").classList.add('creator-main__step_current')
        document.querySelectorAll('.dragndrop__pdf-label').forEach(el => {
            el.classList.remove('active');
            el.style.display = "none";
        })
    }
    if (e.target.matches('input[data-close-dragndrop-custom]:checked')) {
        document.querySelector('.dragndrop_custom').classList.remove('opened')
        document.querySelector(".creator-main__step_size").classList.remove('creator-main__step_current')
    }

    if (e.target.matches('input[data-open-printlist]:checked')) {
        printList.classList.add('opened')
    }
    if (e.target.matches('input[data-close-printlist]:checked')) {
        printList.classList.remove('opened')
    }

    if (e.target.matches('input[data-check-upload]:checked')) {
        document.querySelector(".creator-main__step_upload").classList.add('creator-main__step_current')
        document.querySelector(".creator-main__step_upload").classList.remove('hidden')
        document.querySelector('.prod-preview__cloth').classList.remove('active');
        document.querySelector('.prod-preview__roll').classList.add('active');
        document.querySelector('.prod-preview').classList.remove('active');
        document.querySelector(".creator-main__step_color").classList.remove('creator-main__step_current')

        if (document.getElementById('own-print-custom').files[0]) {
            document.querySelector(".creator-main__step_size").classList.add('creator-main__step_current')
            document.querySelector(".creator-main__step_size").classList.remove('hidden')
        }
    }
    if (e.target.matches('input[data-disable-upload]:checked')) {
        document.querySelector(".creator-main__step_upload").classList.remove('creator-main__step_current')
        document.querySelector(".creator-main__step_upload").classList.add('hidden')
        document.querySelectorAll('.radio-print-p').forEach(el => {
            if (el.classList.contains('radio-print-p_current')) {
                document.querySelector('.prod-preview').classList.add('active');
            }
        })
        document.querySelector('.prod-preview__cloth').classList.add('active');
        document.querySelector('.prod-preview__roll').classList.remove('active');
        document.querySelector(".creator-main__step_color").classList.add('creator-main__step_current')

        document.querySelector(".creator-main__step_quantity").classList.remove('creator-main__step_current');
        document.querySelector(".creator-main__step_quantity").classList.add('hidden')
    }

    if (e.target.classList.contains('radio-size-input')) {
        if (document.getElementById('rec').checked) {
            document.querySelector('.size-list').classList.add('opened')
            document.querySelector('.enter-size-gallery').classList.remove('opened')
            //document.querySelector(".creator-main__step_quantity").classList.remove('creator-main__step_current');
            //document.querySelector(".creator-main__step_quantity").classList.add('hidden')
        } else {
            document.querySelector('.size-list').classList.remove('opened')
            //showOrderButton()
            
            if (document.getElementById('artwork-n').checked) {
                document.querySelector('.enter-size-gallery').classList.add('opened');
                //document.querySelector(".creator-main__step_quantity").classList.remove('creator-main__step_current');
                //document.querySelector(".creator-main__step_quantity").classList.add('hidden')
                //hideOrderButton()

                /*
                document.querySelectorAll('.radio-size-p').forEach(el => {
                    el.classList.remove('radio-size-p_current')
                })*/
            } else {
                document.querySelector('.enter-size-gallery').classList.remove('opened')
            }
        }

        if (document.getElementById('cust').checked) {
            if (document.getElementById('artwork-y').checked) {
                hideOrderButton()
                document.querySelector('.enter-size-pieces').classList.add('opened')
            }
        }
    }

    if (e.target.classList.contains('upload-input')) {
        document.querySelector(".creator-main__step_size").classList.remove('creator-main__step_current')
        document.querySelector(".creator-main__step_size").classList.add('hidden')    
        document.querySelector(".creator-main__step_quantity").classList.remove('creator-main__step_current');
        document.querySelector(".creator-main__step_quantity").classList.add('hidden')
        document.querySelectorAll('.dragndrop__pdf-label').forEach(el => {
            el.classList.remove('active');
        })
        hideOrderButton()

        document.querySelectorAll('.dragndrop__other-way-paste').forEach(el => {
            el.value = '';
        })
        document.querySelectorAll('.checkbox-input').forEach(el => {
            el.checked = false;
        })
        document.querySelectorAll('.dragndrop__other-way').forEach(el => {
            el.classList.remove('active')
        })
    }

    if (e.target.matches('input[data-hide-frames]:checked')) {
        document.querySelector(".creator-main__step_size").classList.add('hidden')
        document.querySelector(".creator-main__step_color").classList.add('hidden')
        document.querySelector(".creator-main__step_quantity").classList.add('hidden')
    }


    if (document.getElementById('design').checked) {
        document.querySelector(".creator-main__step_size").classList.remove('creator-main__step_current');
        document.querySelector('.creator-main__step_size').classList.add('hidden')
    }

    if (e.target === document.getElementById('artwork-n')) {
        document.querySelector('.creator-main__message-quantity').classList.remove('active');
        document.querySelector(".creator-main__step_size").classList.remove('creator-main__step_current')
        document.querySelector(".creator-main__step_size").classList.add('hidden')
        document.querySelector(".creator-main__step_color").classList.remove('creator-main__step_current')
        document.querySelector(".creator-main__step_color").classList.add('hidden')
        document.querySelectorAll('.upload-input').forEach(el => {
            el.checked = false;
        })
        document.querySelector('.dragndrop_custom').classList.remove('opened')
        document.querySelector('.dragndrop_design').classList.remove('opened')
        document.getElementById('rec-l').style.display = 'flex';

        document.getElementById('own-print-custom').value = '';
        document.getElementById('own-print-design').value = '';
        document.querySelectorAll('.upload-input').forEach(el => {
            el.value = ''
            el.files = null;
        })
        document.querySelectorAll('.dragndrop__preview').forEach(el => {
            el.style.display = 'none';
        })
        document.querySelectorAll('.dragndrop__pdf-label').forEach(el => {
            el.style.display = 'none';
        })

        document.querySelector('.enter-size-pieces').classList.remove('opened')

        document.querySelectorAll('.radio-size-p').forEach(el => {
            if (el.classList.contains('radio-size-p_current')) {
                document.querySelector(".creator-main__step_quantity").classList.add('creator-main__step_current');
                document.querySelector(".creator-main__step_quantity").classList.remove('hidden')
            }
        })

        document.getElementById('cust').checked = false;

        document.querySelector(".creator-main__step_quantity").classList.remove('creator-main__step_current')
        document.querySelector(".creator-main__step_quantity").classList.add('hidden')  
        if (document.querySelectorAll('.order-box').length > 0) {
            document.querySelectorAll('.order-box').forEach(el => {
                el.remove()
            })
        }
        document.querySelectorAll('.radio-size-p').forEach(el => {
            el.classList.remove('radio-size-p_current')
        })
        document.querySelectorAll('.radio-print-p').forEach(el => {
            el.classList.remove('radio-print-p_current')
        })
        hideOrderButton()
        addDescr('artwork', '')
        addDescr('size', '')
    }

    if (e.target === document.getElementById('artwork-y')) {
        document.getElementById('rec-l').style.display = 'none';

        document.querySelectorAll('.radio-size-p').forEach(el => {
            if (el.classList.contains('radio-size-p_current')) {
                document.querySelector(".creator-main__step_quantity").classList.remove('creator-main__step_current');
                document.querySelector(".creator-main__step_quantity").classList.add('hidden')
            }
        })
        hideOrderButton()
        addDescr('artwork', '')
        addDescr('size', '')
    }

    if (e.target === document.getElementById('own-print-custom')) {
        if (document.getElementById('own-print-custom').files[0]) {
            document.querySelector(".creator-main__step_size").classList.add('creator-main__step_current')
            document.querySelector(".creator-main__step_size").classList.remove('hidden')

            document.querySelector('.creator-main__message-quantity').classList.remove('active');
        }
    }
    if (e.target === document.getElementById('own-print-design')) {
        if (document.getElementById('own-print-design').files[0]) {
            document.querySelector(".creator-main__step_size").classList.remove('creator-main__step_current')
            document.querySelector(".creator-main__step_size").classList.add('hidden')    
            document.querySelector(".creator-main__step_quantity").classList.add('creator-main__step_current');
            document.querySelector(".creator-main__step_quantity").classList.remove('hidden') 
            showOrderButton()

            document.querySelector('.creator-main__message-quantity').classList.add('active');
        }
    }

    if (e.target === document.getElementById('own-print-design')) {
        showOrderButton()
    }

    if (e.target.matches('input#upload-by-link') || e.target.matches('input#upload-by-link-p')) {
        if (e.target.checked) {
            e.target.closest('.dragndrop__other-way').classList.add('active')
        } else {
            e.target.closest('.dragndrop__other-way').classList.remove('active')  
            e.target.closest('.dragndrop__other-way').querySelector('.dragndrop__other-way-paste').value = '';

            document.querySelector(".creator-main__step_quantity").classList.remove('creator-main__step_current');
            document.querySelector('.creator-main__step_quantity').classList.add('hidden');
        }
    }
})

document.querySelectorAll('.dragndrop__other-way-paste').forEach(el => {
    el.addEventListener('input', e => {
        if (e.target.value !== '') {
            cleanAndAddOrder()
            document.querySelector('.size-list').classList.remove('opened')

            if (document.getElementById('design').checked) {
                document.querySelector(".creator-main__step_quantity").classList.add('creator-main__step_current');
                document.querySelector('.creator-main__step_quantity').classList.remove('hidden');
                showOrderButton();    

                document.querySelectorAll('.radio-size-input').forEach(el => {
                    el.checked = false;
                })
                document.querySelector('.enter-size-pieces').classList.remove('opened')
                document.querySelector('.enter-size-gallery').classList.remove('opened')

                document.querySelector('.creator-main__message-quantity').classList.add('active');

                addDescr('size', '57cm x 100cm (1)');
            } else if (document.getElementById('custom').checked) {
                document.querySelector(".creator-main__step_size").classList.add('creator-main__step_current');
                document.querySelector('.creator-main__step_size').classList.remove('hidden');
                document.getElementById('cust').checked = true;
                document.querySelector('.enter-size-pieces').classList.add('opened')
                document.querySelector('.enter-size-gallery').classList.remove('opened')

                document.querySelector('.creator-main__message-quantity').classList.remove('active');
            }
            document.querySelector('.order-box__preview img').setAttribute('src', document.querySelector('.prod-preview__roll').getAttribute('src'));
    
            document.querySelectorAll('.dragndrop__pdf-label').forEach(el => {
                el.classList.remove('active')
                el.style.display = 'none';
            })

            addDescr('Artwork', 'Own by link')
        } else {
            document.querySelector(".creator-main__step_quantity").classList.remove('creator-main__step_current');
            document.querySelector('.creator-main__step_quantity').classList.add('hidden');
            hideOrderButton();

            document.querySelectorAll('.radio-size-input').forEach(el => {
                el.checked = false;
            })
            document.querySelector(".creator-main__step_size").classList.remove('creator-main__step_current');
            document.querySelector('.creator-main__step_size').classList.add('hidden');
            document.querySelector('.enter-size-pieces').classList.remove('opened')
            document.querySelector('.enter-size-gallery').classList.remove('opened')
        }
    });
})


document.addEventListener('click', e => {
    if (e.target.closest('.radio-print-p')) {
        document.querySelector('.creator-main__message-quantity').classList.remove('active');
        document.querySelector('.dragndrop__pdf-label').style.display = 'none'
        document.querySelector('.dragndrop_custom').classList.remove('opened')
        document.querySelector('.dragndrop_design').classList.remove('opened')
        document.querySelector(".creator-main__step_size").classList.remove('creator-main__step_current')

        document.querySelectorAll('.radio-print-p').forEach(el => {
            el.classList.remove('radio-print-p_current')
        })
        e.target.closest('.radio-print-p').classList.add('radio-print-p_current');
        document.querySelectorAll('.dragndrop__pdf-label').forEach(el => {
            el.style.display = 'none';
        })

        document.querySelectorAll('.dragndrop__preview').forEach(el => {
            el.style.display = 'none';
        })
        document.querySelector('.prod-preview').classList.add('active');
        document.querySelector('.creator-main__step_color').classList.add('creator-main__step_current')
        document.querySelector('.creator-main__step_color').classList.remove('hidden')

        document.querySelectorAll('.upload-input').forEach(el => {
            el.checked = false;
        })

        let label = e.target.closest('.radio-print-p');
        let previewUrl = label.querySelector('.radio-box__preview img').getAttribute('src');
        document.getElementById('preview-print').setAttribute('src', previewUrl);

        let newValue = label.querySelector('.radio-box__label').textContent;
        addDescr('Artwork', newValue);
        
        if (document.querySelectorAll('.order-box').length > 0) {
            document.querySelectorAll('.order-box').forEach(el => {
                el.querySelector('.order-box__preview img').setAttribute('src', document.querySelector('.prod-preview__print img').getAttribute('src'))
            })
        }

        if (document.querySelector('.radio-size-input').checked) {
            document.querySelector(".creator-main__step_quantity").classList.add('creator-main__step_current');
            document.querySelector(".creator-main__step_quantity").classList.remove('hidden')
        } else {
            document.querySelector(".creator-main__step_quantity").classList.remove('creator-main__step_current');
            document.querySelector(".creator-main__step_quantity").classList.add('hidden')
        }

        document.querySelector(".creator-main__step_size").classList.add('creator-main__step_current')
        document.querySelector(".creator-main__step_size").classList.remove('hidden')


        if (document.querySelector('.radio-size-input').checked) {
            document.querySelector(".creator-main__step_quantity").classList.add('creator-main__step_current')
            showOrderButton()
        } else {
            hideOrderButton()
        }
        document.querySelector('.creator-main__step_first').setAttribute('data-choose', 'print')

        document.querySelector('.prod-preview__cloth').classList.add('active');
        document.querySelector('.prod-preview__roll').classList.remove('active');

        document.getElementById('own-print-custom').value = '';
        
        document.querySelector('.enter-size-gallery').classList.remove('opened')

        
        document.querySelectorAll('.order-box').forEach(el => {
            el.remove();
        })
        document.querySelectorAll('.radio-size-p').forEach(el => {
            el.classList.remove('radio-size-p_current');
        })
        document.querySelectorAll('.radio-size-input').forEach(el => {
            el.checked = false;
        })
        document.querySelector('.size-list').classList.remove('opened');
        document.querySelector(".creator-main__step_quantity").classList.remove('creator-main__step_current');
        document.querySelector(".creator-main__step_quantity").classList.add('hidden')
        hideOrderButton()
    }

    if (e.target.closest('.radio-color')) {
        document.querySelectorAll('.radio-color').forEach(el => {
            el.classList.remove('radio-color_current')
        })
        e.target.closest('.radio-color').classList.add('radio-color_current');

        let currentColor = e.target.closest('.radio-color').getAttribute('data-color');

        colorCloth.style.fill = currentColor;
    }

    if (e.target.closest('.radio-size-p')) {
        e.target.closest('.radio-size-p').classList.add('radio-size-p_current');

        //document.querySelector('.order-box__size').textContent = document.querySelector('.radio-size-p_current').querySelector('.radio-box__label').textContent;
        //document.querySelector('.order-box__size').textContent = e.target.closest('.radio-size-p').querySelector('.radio-box__label').textContent;

        document.querySelector(".creator-main__step_quantity").classList.add('creator-main__step_current')
        document.querySelector('.creator-main__step_quantity').classList.remove('hidden')

        if (document.getElementById('rec').checked) {
            addDescr('size', e.target.closest('.radio-size-p').querySelector('.radio-box__label').textContent);
            checkGender()
            checkSizeType()
        }

        showOrderButton()

        document.querySelector('.size-check').setAttribute('src', document.querySelector('.prod-preview__print img').getAttribute('src'));

        let points = [...document.querySelectorAll('.radio-size-p')]
        let elPos = points.indexOf(e.target.closest('.radio-size-p'));
        createNewOrder(`${document.querySelector('.size-check').offsetWidth}cm x ${document.querySelector('.size-check').offsetHeight}cm`, elPos)

        if (document.querySelector('.size-check').offsetWidth >= document.querySelector('.size-check').offsetHeight) {
            document.querySelector('.size-check').style.width = `${e.target.closest('.radio-size-p').getAttribute('data-long-side-size')}px`
            document.querySelector('.size-check').style.height = `auto`
        } else {
            document.querySelector('.size-check').style.width = `auto`
            document.querySelector('.size-check').style.height = `${e.target.closest('.radio-size-p').getAttribute('data-long-side-size')}px`
        }
        document.querySelectorAll('.order-box')[document.querySelectorAll('.order-box').length - 1].querySelector('.order-box__size').textContent = `${document.querySelector('.size-check').offsetWidth}cm x ${document.querySelector('.size-check').offsetHeight}cm`;    
        updDimensions(document.querySelector('.creator-main__step_quantity .counter__num').value)

        checkSameOrderCount()
        calcPrice()

        calcTotalPrice()
        editSizeEnter()
    }

    if (e.target.classList.contains('enter-size-gallery__button')) {
        showOrderButton()
        document.querySelector(".creator-main__step_quantity").classList.add('creator-main__step_current');
        document.querySelector(".creator-main__step_quantity").classList.remove('hidden')
    }
    if (e.target.classList.contains('enter-size-pieces__button')) {
        showOrderButton()
        document.querySelector(".creator-main__step_quantity").classList.add('creator-main__step_current');
        document.querySelector(".creator-main__step_quantity").classList.remove('hidden')
    }

    if (e.target.classList.contains('order-box__rm-btn')) {
        removeOrder(e.target)
    }
})

// FUNCTIONS

function addDescr(title, value) {
    const newLine = `
      <div class="order-descr__row">
          <span class="order-descr__title">${title}: </span>
          <span class="order-descr__value">${value}</span>
      </div>
    `;

    let existingRows = document.querySelectorAll('.order-descr__title');
    let isRemoved = false;

    existingRows.forEach(el => {
      let eTitle = `${title}:`;
      if (eTitle.toLowerCase() === el.textContent.toLowerCase().trim()) {
        el.closest('.order-descr__row').remove();
        isRemoved = true;
      }
    });

    if (!isRemoved) {
      const orderDescr = document.querySelector('.order-descr');
      orderDescr.insertAdjacentHTML('beforeend', newLine);
    } else {
        orderDescr.insertAdjacentHTML('beforeend', newLine);
    }
}
function removeCheckedFromRadioPrint() {
    const radioPrints = document.querySelectorAll('.radio-print');
    radioPrints.forEach(radio => {
      radio.checked = false;
    });
}

function showOrderButton() {
    document.querySelector('.aside-button').disabled = false;
}
function hideOrderButton() {
    document.querySelector('.aside-button').disabled = true;
}

function checkGender() {
    if (document.querySelector('.radio-size-p_current').getAttribute('data-gender') === 'female' && document.querySelector('.creator-main__step_first').getAttribute('data-choose') != 'own') {
        document.querySelector('.prod-preview').classList.add('female');
    } else {
        document.querySelector('.prod-preview').classList.remove('female');
    }
}

function checkSizeType() {
    if (document.querySelector('.creator-main__step_first').getAttribute('data-choose') != 'own') {
        if (document.querySelector('.radio-size-p_current').getAttribute('data-rec-size') === 'type1') {
            document.querySelector('.prod-preview').classList.add('type1');
        } else {
            document.querySelector('.prod-preview').classList.remove('type1');
        } 
        if (document.querySelector('.radio-size-p_current').getAttribute('data-rec-size') === 'type2') {
            document.querySelector('.prod-preview').classList.add('type2');
        } else {
            document.querySelector('.prod-preview').classList.remove('type2');
        }

        if (document.querySelector('.radio-size-p_current').getAttribute('data-rec-size') === 'pocket1') {
            document.querySelector('.prod-preview').classList.add('pocket1');
        } else {
            document.querySelector('.prod-preview').classList.remove('pocket1');
        }
        if (document.querySelector('.radio-size-p_current').getAttribute('data-rec-size') === 'pocket2') {
            document.querySelector('.prod-preview').classList.add('pocket2');
        } else {
            document.querySelector('.prod-preview').classList.remove('pocket2');
        }
        if (document.querySelector('.radio-size-p_current').getAttribute('data-rec-size') === 'pocket3') {
            document.querySelector('.prod-preview').classList.add('pocket3');
        } else {
            document.querySelector('.prod-preview').classList.remove('pocket3');
        }
        if (document.querySelector('.radio-size-p_current').getAttribute('data-rec-size') === 'pocket4') {
            document.querySelector('.prod-preview').classList.add('pocket4');
        } else {
            document.querySelector('.prod-preview').classList.remove('pocket4');
        }
        if (document.querySelector('.radio-size-p_current').getAttribute('data-rec-size') === 'bottom1') {
            document.querySelector('.prod-preview').classList.add('bottom1');
        } else {
            document.querySelector('.prod-preview').classList.remove('bottom1');
        }
        if (document.querySelector('.radio-size-p_current').getAttribute('data-rec-size') === 'bottom2') {
            document.querySelector('.prod-preview').classList.add('bottom2');
        } else {
            document.querySelector('.prod-preview').classList.remove('bottom2');
        }

        if (document.querySelector('.radio-size-p_current').getAttribute('data-rec-size') === 'sleeve') {
            document.querySelector('.prod-preview').classList.add('sleeve');
        } else {
            document.querySelector('.prod-preview').classList.remove('sleeve');
        }
    } else {
        document.querySelector('.prod-preview').classList.remove('type1');
        document.querySelector('.prod-preview').classList.remove('type2');
        document.querySelector('.prod-preview').classList.remove('pocket1');
        document.querySelector('.prod-preview').classList.remove('pocket2');
        document.querySelector('.prod-preview').classList.remove('pocket3');
        document.querySelector('.prod-preview').classList.remove('pocket4');
        document.querySelector('.prod-preview').classList.remove('bottom1');
        document.querySelector('.prod-preview').classList.remove('bottom2');
        document.querySelector('.prod-preview').classList.remove('sleeve');
    }
}

function clearFileInput(input, id) {
    const newInput = document.createElement("input");
    newInput.type = "file";
    newInput.classList.add('upload-input')
    newInput.setAttribute('accept', input.getAttribute('accept'))
    newInput.id = id;
    input.parentNode.replaceChild(newInput, input);
}

function createNewOrder(size, index) {
    let newOrder = `
        <div class="order-box" data-key="${index}">
            <div class="order-box__preview">
                <img src="${document.querySelector('.radio-print-p_current .radio-box__preview img').getAttribute('src')}" alt="">
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
            <h3 class="order-box__title">${document.querySelector('.radio-print-p_current .radio-box__label').textContent}</h3>
            <p class="order-box__size">${size}</p>
            <div class="counter counter-quantity">
                <button class="counter__button btn-minus">-</button>
                <input type="number" class="counter__num" value="1">
                <button class="counter__button btn-plus">+</button>
            </div>

            <div class="counter-price"><span class="counter-price__count" data-price-count="0" data-digits-counter="400">0</span><span class="currency">zł</span></div>    
        </div>
    `;

    document.querySelector('.creator-main__step_quantity .counter-parent').insertAdjacentHTML('beforeend', newOrder);
}

function removeOrder(e) {
    if (document.querySelectorAll('.radio-size-p_current').length > 0) {
        checkSizes()
    }

    if (document.getElementById('artwork-n').checked) {
        let elPos = e.closest('.order-box').getAttribute('data-key');
        if (elPos != 'custom') {
            document.querySelectorAll('.radio-size-p')[elPos].classList.remove('radio-size-p_current')
        }
    }
    e.closest('.order-box').remove()

    document.querySelectorAll('.radio-size-p').forEach(el => {
        if (el.classList.contains('radio-size-p_current')) {
            document.querySelector(".creator-main__step_quantity").classList.add('creator-main__step_current')
            document.querySelector('.creator-main__step_quantity').classList.remove('hidden')  
            showOrderButton()      
        }
    })

    if (document.getElementById('artwork-y').checked) {
        document.querySelectorAll('.dragndrop__pdf-label').forEach(el => {
            el.classList.remove('active')
            el.style.display = 'none';
        })


        if (document.getElementById('own-print-custom').files[0].type != 'application/pdf') {
            document.querySelector('.prod-preview').classList.remove('active');

            document.querySelectorAll('.dragndrop__preview').forEach(el => {
                el.classList.remove('active')
                el.style.display = 'none';
            })
        }
        if (document.getElementById('custom').checked) {
            document.querySelector(".creator-main__step_size").classList.remove('creator-main__step_current')
            document.querySelector('.creator-main__step_size').classList.add('hidden')
            hideOrderButton() 
        }
    }
    
    calcPrice()
    calcTotalPrice()
    editSizeEnter()

    if (document.querySelectorAll('.order-box').length > 0) {
        document.querySelector(".creator-main__step_quantity").classList.add('creator-main__step_current')
        document.querySelector('.creator-main__step_quantity').classList.remove('hidden')
        showOrderButton()   
    } else {
        document.querySelector(".creator-main__step_quantity").classList.remove('creator-main__step_current')
        document.querySelector('.creator-main__step_quantity').classList.add('hidden')
        hideOrderButton()    
    }
}

function checkSameOrderCount() {
    const orderBoxes = document.querySelectorAll('.order-box');

    for (let i = 0; i < orderBoxes.length; i++) {
        const el = orderBoxes[i];
        const elSize = el.querySelector('.order-box__size');

        for (let index = i; index < orderBoxes.length; index++) {
            const elChild = orderBoxes[index];
            const elChildSize = elChild.querySelector('.order-box__size');

            if (elSize.textContent === elChildSize.textContent && i != index) {
                elChild.remove();
                el.querySelector('.counter__num').value = parseInt(el.querySelector('.counter__num').value) + 1;
            }
        }
    }
}

function editSizeEnter() {
    let sizeLine = '';
    document.querySelectorAll('.order-box').forEach(el => {
        sizeLine += `${el.querySelector('.order-box__size').textContent} (${el.querySelector('.counter__num').value})<br>`
    })
    addDescr('size', sizeLine);

    document.querySelectorAll('.order-descr__value').forEach(el => {
        if (el.textContent === '') {
            el.closest('.order-descr__row').remove();
        }
    })
}