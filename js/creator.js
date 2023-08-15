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
            document.querySelector(".creator-main__step_quantity").classList.remove('creator-main__step_current');
            document.querySelector(".creator-main__step_quantity").classList.add('hidden')
        } else {
            document.querySelector('.size-list').classList.remove('opened')
            showOrderButton()
            
            if (document.getElementById('artwork-n').checked) {
                document.querySelector('.enter-size-gallery').classList.add('opened');
                document.querySelector(".creator-main__step_quantity").classList.remove('creator-main__step_current');
                document.querySelector(".creator-main__step_quantity").classList.add('hidden')
                hideOrderButton()

                document.querySelectorAll('.radio-size-p').forEach(el => {
                    el.classList.remove('radio-size-p_current')
                })
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

        //clearFileInput(document.getElementById('own-print-design'), 'own-print-design')
        //clearFileInput(document.getElementById('own-print-custom'), 'own-print-custom')
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
        if (Array.from(document.querySelectorAll('.radio-print-p')).some(element => element.classList.contains('radio-print-p_current'))) {
            document.querySelector(".creator-main__step_size").classList.add('creator-main__step_current')
            document.querySelector(".creator-main__step_size").classList.remove('hidden')
            document.querySelector(".creator-main__step_color").classList.add('creator-main__step_current')
            document.querySelector(".creator-main__step_color").classList.remove('hidden')
        } else {
            document.querySelector(".creator-main__step_size").classList.remove('creator-main__step_current')
            document.querySelector(".creator-main__step_size").classList.add('hidden')
            document.querySelector(".creator-main__step_color").classList.remove('creator-main__step_current')
            document.querySelector(".creator-main__step_color").classList.add('hidden')
        }
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
    }

    if (e.target === document.getElementById('artwork-y')) {
        document.getElementById('rec-l').style.display = 'none';
    }

    if (e.target === document.getElementById('own-print-custom')) {
        if (document.getElementById('own-print-custom').files[0]) {
            document.querySelector(".creator-main__step_size").classList.add('creator-main__step_current')
            document.querySelector(".creator-main__step_size").classList.remove('hidden')    
        }
    }
    if (e.target === document.getElementById('own-print-design')) {
        if (document.getElementById('own-print-design').files[0]) {
            document.querySelector(".creator-main__step_size").classList.remove('creator-main__step_current')
            document.querySelector(".creator-main__step_size").classList.add('hidden')    
            document.querySelector(".creator-main__step_quantity").classList.add('creator-main__step_current');
            document.querySelector(".creator-main__step_quantity").classList.remove('hidden') 
            showOrderButton()
        }
    }

    if (e.target === document.getElementById('own-print-design')) {
        showOrderButton()
    }

    if (e.target.matches('input#upload-by-link')) {
        if (e.target.checked) {
            e.target.closest('.dragndrop__other-way').classList.add('active')
        } else {
            e.target.closest('.dragndrop__other-way').classList.remove('active')  
        }
    }
})

document.querySelector('.dragndrop__other-way-paste').addEventListener('input', e => {
    if (e.target.value !== '') {
        document.querySelector(".creator-main__step_quantity").classList.add('creator-main__step_current');
        document.querySelector('.creator-main__step_quantity').classList.remove('hidden');
        showOrderButton();
        document.querySelector('.order-box__preview img').setAttribute('src', document.querySelector('.prod-preview__roll').getAttribute('src'));

        document.querySelectorAll('.dragndrop__pdf-label').forEach(el => {
            el.classList.remove('active')
            el.style.display = 'none';
        })
    } else {
        document.querySelector(".creator-main__step_quantity").classList.remove('creator-main__step_current');
        document.querySelector('.creator-main__step_quantity').classList.add('hidden');
        hideOrderButton();
    }
});


document.addEventListener('click', e => {
    if (e.target.closest('.radio-print-p')) {
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

        // Putting the preview, title and size to the quantitys preview
        document.querySelector('.order-box__preview img').setAttribute('src', document.querySelector('.prod-preview__print img').getAttribute('src'))
        document.querySelector('.order-box__title').textContent = label.querySelector('.radio-box__label').textContent;

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
            addDescr('size', document.querySelector('.radio-size-p_current .radio-box__label').textContent);
            document.querySelector(".creator-main__step_quantity").classList.add('creator-main__step_current')
            showOrderButton()
        } else {
            hideOrderButton()
        }
        document.querySelector('.creator-main__step_first').setAttribute('data-choose', 'print')

        document.querySelector('.prod-preview__cloth').classList.add('active');
        document.querySelector('.prod-preview__roll').classList.remove('active');

        document.getElementById('own-print-custom').value = '';
        document.querySelectorAll('.radio-size-input').forEach(el => {
            el.checked = false;
        })
        document.querySelector('.enter-size-gallery').classList.remove('opened')
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
        document.querySelectorAll('.radio-size-p').forEach(el => {
            el.classList.remove('radio-size-p_current')
        })
        e.target.closest('.radio-size-p').classList.add('radio-size-p_current');

        document.querySelector('.order-box__size').textContent = document.querySelector('.radio-size-p_current').querySelector('.radio-box__label').textContent;
        document.querySelector('.order-box__size').textContent = e.target.closest('.radio-size-p').querySelector('.radio-box__label').textContent;

        document.querySelector(".creator-main__step_quantity").classList.add('creator-main__step_current')
        document.querySelector('.creator-main__step_quantity').classList.remove('hidden')

        if (document.getElementById('rec').checked) {
            addDescr('size', e.target.closest('.radio-size-p').querySelector('.radio-box__label').textContent);
            checkGender()
            checkSizeType()
        }

        showOrderButton()

        document.querySelector('.size-check').setAttribute('src', document.querySelector('.prod-preview__print img').getAttribute('src'));
        checkSizes()
        enterSizes()
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