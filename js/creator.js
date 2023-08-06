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

        document.querySelector(".creator-main__step_size").classList.add('creator-main__step_current')
        document.querySelector(".creator-main__step_quantity").classList.remove('creator-main__step_current')

        hideOrderButton()

        if (document.querySelector('.radio-size-input').checked) {
            addDescr('size', document.querySelector('.radio-size-p_current .radio-box__label').textContent);
        }
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