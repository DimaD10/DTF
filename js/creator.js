const dragndrop = document.querySelector('.dragndrop');
const printList = document.querySelector('.print-list');
const previewArea = document.querySelector('.dragndrop__preview');
const colorCloth = document.getElementById('cloth-prod-color');

const orderDescr = document.querySelector('.order-descr');

let ownFile = false;

document.addEventListener('change', e => {
    if (e.target.matches('input[data-open-dragndrop]:checked')) {
        dragndrop.classList.add('opened')
    } 
    if (e.target.matches('input[data-close-dragndrop]:checked')) {
        dragndrop.classList.remove('opened')
    }
    if (e.target.matches('input[data-open-printlist]:checked')) {
        printList.classList.add('opened')
    }
    if (e.target.matches('input[data-close-printlist]:checked')) {
        printList.classList.remove('opened')
    }

    if (e.target.classList.contains('radio-size-input')) {
        document.querySelector('.size-list').classList.add('opened')
        document.querySelector(".creator-main__step_quantity").classList.add('creator-main__step_current')
        showOrderButton()
        checkGender()
        checkSizeType()
        checkZoom()
        addDescr('size', document.querySelector('.radio-size-p_current .radio-box__label').textContent);
    }
})

document.addEventListener('click', e => {
    if (e.target.closest('.radio-print-p')) {
        document.querySelectorAll('.radio-print-p').forEach(el => {
            el.classList.remove('radio-print-p_current')
        })
        e.target.closest('.radio-print-p').classList.add('radio-print-p_current');

        previewArea.style.display = 'none';
        document.querySelector('.prod-preview').classList.add('active');
        document.querySelector('.creator-main__step_color').classList.add('creator-main__step_current')

        let label = e.target.closest('.radio-print-p');
        let previewUrl = label.querySelector('.radio-box__preview img').getAttribute('src');
        document.getElementById('preview-print').setAttribute('src', previewUrl);

        let newValue = label.querySelector('.radio-box__label').textContent;
        addDescr('Artwork', newValue);
        checkGender()

        document.querySelector(".creator-main__step_size").classList.add('creator-main__step_current')
        document.querySelector(".creator-main__step_quantity").classList.remove('creator-main__step_current')


        if (document.querySelector('.radio-size-input').checked) {
            addDescr('size', document.querySelector('.radio-size-p_current .radio-box__label').textContent);
            document.querySelector(".creator-main__step_quantity").classList.add('creator-main__step_current')
            showOrderButton()
        } else {
            hideOrderButton()
        }
        document.querySelector('.creator-main__step_first').setAttribute('data-choose', 'print')

        checkSizeType()
        checkZoom()
    }

    if (e.target.closest('.radio-color')) {
        document.querySelectorAll('.radio-color').forEach(el => {
            el.classList.remove('radio-color_current')
        })
        e.target.closest('.radio-color').classList.add('radio-color_current');

        let currentColor = e.target.closest('.radio-color').getAttribute('data-color');

        colorCloth.style.fill = currentColor;

        addDescr('Color', e.target.closest('.radio-color').getAttribute('data-color-value'));
    }

    if (e.target.closest('.radio-size-p')) {
        document.querySelectorAll('.radio-size-p').forEach(el => {
            el.classList.remove('radio-size-p_current')
        })
        e.target.closest('.radio-size-p').classList.add('radio-size-p_current');

        addDescr('size', e.target.closest('.radio-size-p').querySelector('.radio-box__label').textContent);
        checkGender()
        checkSizeType()
        checkZoom()
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

function checkZoom() {
    if (document.querySelector('.creator-main__step_first').getAttribute('data-choose') != 'own') {
        if (document.querySelector('.radio-size-p_current').getAttribute('data-zoom') === 'true') {
            document.querySelector('.prod-preview').classList.add('zoom');
        } else {
            document.querySelector('.prod-preview').classList.remove('zoom');
        } 
    } else {
        document.querySelector('.prod-preview').classList.remove('zoom');
    }
}