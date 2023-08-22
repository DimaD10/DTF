dragndrop.forEach(el => {
  el.querySelector('input').addEventListener('change', e => updPreview(e));
})


document.addEventListener("DOMContentLoaded", () => {
    const dropArea = document.querySelectorAll(".dragndrop__area");
    const dragndrop = document.querySelector(".dragndrop");

    dropArea.forEach(el => {
      el.addEventListener("dragenter", (e) => {
        e.preventDefault();
        e.stopPropagation();
        el.classList.add("dragging");
      });
  
      el.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
  
      el.addEventListener("dragleave", (e) => {
        e.preventDefault();
        e.stopPropagation();
        el.classList.remove("dragging");
      });
  
      el.addEventListener("drop", (e) => {
        e.preventDefault();
        e.stopPropagation();
        el.classList.remove("dragging");
  
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          document.querySelector(".creator-main__step_size").classList.remove('creator-main__step_current')
      
          document.querySelector('.dragndrop').classList.add('active');
          document.querySelectorAll('.dragndrop__preview').forEach(el => {
            el.style.display = 'none';
          })
          document.querySelectorAll('.dragndrop__pdf-label').forEach(el => {
            el.style.display = 'none';
          })
          if (files[0]) {
            cleanAndAddOrder()

            el.closest('.dragndrop').querySelector('.dragndrop__preview img').src = window.URL.createObjectURL(files[0]);
            el.closest('.dragndrop').querySelector('.dragndrop__preview').classList.add('active');

            document.querySelector('.enter-size-gallery').classList.remove('opened')

            if (files[0].type === 'application/pdf') {
              el.closest('.dragndrop').querySelector('.dragndrop__pdf-label').classList.add('active')
              el.closest('.dragndrop').querySelector('.dragndrop__pdf-label').style.display = 'block';
              el.closest('.dragndrop').querySelector('.dragndrop__preview').style.display = 'none';
              el.closest('.dragndrop').querySelector('.dragndrop__preview').classList.remove('active')
              
              document.querySelector('.enter-size-pieces').classList.add('opened')
              document.querySelector('.enter-size-gallery').classList.remove('opened')

              document.querySelector('.prod-preview__cloth').classList.remove('active');
              document.querySelector('.prod-preview__roll').classList.add('active');
              document.querySelector('.prod-preview').classList.remove('active');    
              document.querySelector('.order-box__preview img').setAttribute('src', document.querySelector('.prod-preview__roll').getAttribute('src'))    
            } else {
              el.closest('.dragndrop').querySelector('.dragndrop__pdf-label').classList.remove('active')
              el.closest('.dragndrop').querySelector('.dragndrop__pdf-label').style.display = 'none';
              el.closest('.dragndrop').querySelector('.dragndrop__preview').style.display = 'block';
              el.closest('.dragndrop').querySelector('.dragndrop__preview').classList.add('active')

              document.querySelector('.enter-size-pieces').classList.remove('opened')
              document.querySelector('.enter-size-gallery').classList.add('opened')

              document.querySelector('.prod-preview__cloth').classList.add('active');
              document.querySelector('.prod-preview__roll').classList.remove('active');
              document.querySelector('.prod-preview').classList.add('active');
              document.querySelector('.prod-preview__print img').src = window.URL.createObjectURL(files[0]); 
              document.querySelector('.order-box__preview img').setAttribute('src', document.querySelector('.prod-preview__print img').getAttribute('src'));        
            }
        
            if (document.getElementById('custom').checked) {
              document.querySelector(".creator-main__step_size").classList.add('creator-main__step_current');
              document.querySelector('.creator-main__step_size').classList.remove('hidden')
              document.getElementById('cust').checked = true;
            } else {
              document.querySelector(".creator-main__step_quantity").classList.add('creator-main__step_current');
              document.querySelector('.creator-main__step_quantity').classList.remove('hidden')
              showOrderButton();
              document.querySelectorAll('.radio-size-input').forEach(el => {
                el.checked = false;
              })

              calcPrice()
            }

            rmTypes()
          } else {
            hideOrderButton()
            el.closest('.dragndrop').querySelector('.dragndrop__preview').style.display = 'none';
        
            document.querySelector(".creator-main__step_size").classList.remove('creator-main__step_current');
            document.querySelector('.creator-main__step_size').classList.add('hidden')
        
            document.querySelector(".creator-main__step_quantity").classList.remove('creator-main__step_current');
            document.querySelector(".creator-main__step_quantity").classList.add('hidden')
          }

          addDescr('Artwork', 'own')
          addDescr('size', 'own');
  
          removeCheckedFromRadioPrint()
          document.querySelector('.creator-main__step_first').setAttribute('data-choose', 'own')
          document.querySelectorAll('.radio-print-p').forEach(el => {
            el.classList.remove('radio-print-p_current')
          })
  
          dragndrop.classList.add('active');
          document.querySelector('.creator-main__step_color').classList.add('creator-main__step_current')

          document.querySelector('.size-list').classList.remove('opened')

          // Putting the preview, title and size to the quantitys preview
          document.querySelector('.order-box__title').textContent = 'Own file';
          document.querySelector('.order-box__size').textContent = '57x100cm'; 

          document.getElementById('upload-by-link').checked = false;
          document.querySelector('.dragndrop__other-way').classList.remove('active') 
          document.querySelector('.dragndrop__other-way-paste').value = ''; 

          let count = document.querySelector('.order-box .counter__num').value;

          if (count > 0 && count <= 2) {
            document.querySelector('.counter-price__count').setAttribute('data-price-count', 50)
          } else if (count > 2 && count <= 10) {
            document.querySelector('.counter-price__count').setAttribute('data-price-count', 45)
          } else if (count > 10 && count < 50) {
            document.querySelector('.counter-price__count').setAttribute('data-price-count', 43)
          } else {
            document.querySelector('.counter-price__count').setAttribute('data-price-count', 41)
          }
        
          calcPrice()
          calcTotalPrice()
          editSizeEnter()
        }
      });
    })

});


// FUNCTIONS

function updPreview(el) {

  document.querySelector(".creator-main__step_size").classList.remove('creator-main__step_current')

  document.querySelector('.dragndrop').classList.add('active');
  document.querySelectorAll('.dragndrop__preview').forEach(el => {
    el.style.display = 'none';
    el.classList.remove('active')
  })
  document.querySelectorAll('.dragndrop__pdf-label').forEach(el => {
    el.style.display = 'none';
    el.classList.remove('active')
  })
  if (el.target.files[0]) {
    cleanAndAddOrder()

    el.target.closest('.dragndrop').querySelector('.dragndrop__preview img').src = window.URL.createObjectURL(el.target.files[0]);
    el.target.closest('.dragndrop').querySelector('.dragndrop__preview').classList.add('active');

    if (el.target.files[0].type === 'application/pdf') {
      el.target.closest('.dragndrop').querySelector('.dragndrop__pdf-label').classList.add('active')
      el.target.closest('.dragndrop').querySelector('.dragndrop__pdf-label').style.display = 'block';
      el.target.closest('.dragndrop').querySelector('.dragndrop__preview').style.display = 'none';
      el.target.closest('.dragndrop').querySelector('.dragndrop__preview').classList.remove('active')

      document.querySelector('.enter-size-pieces').classList.add('opened')
      document.querySelector('.enter-size-gallery').classList.remove('opened')

      document.querySelector(".creator-main__step_color").classList.remove('creator-main__step_current')
      document.querySelector(".creator-main__step_color").classList.add('hidden')

      document.querySelector('.prod-preview__cloth').classList.remove('active');
      document.querySelector('.prod-preview__roll').classList.add('active');
      document.querySelector('.prod-preview').classList.remove('active');
      document.querySelector('.order-box__preview img').setAttribute('src', document.querySelector('.prod-preview__roll').getAttribute('src'))
    } else {
      el.target.closest('.dragndrop').querySelector('.dragndrop__pdf-label').classList.remove('active')
      el.target.closest('.dragndrop').querySelector('.dragndrop__pdf-label').style.display = 'none';
      el.target.closest('.dragndrop').querySelector('.dragndrop__preview').style.display = 'block';
      el.target.closest('.dragndrop').querySelector('.dragndrop__preview').classList.add('active')

      document.querySelector('.enter-size-pieces').classList.remove('opened')
      document.querySelector('.enter-size-gallery').classList.add('opened')

      document.querySelector(".creator-main__step_color").classList.add('creator-main__step_current')
      document.querySelector(".creator-main__step_color").classList.remove('hidden')

      document.querySelector('.prod-preview__cloth').classList.add('active');
      document.querySelector('.prod-preview__roll').classList.remove('active');
      document.querySelector('.prod-preview').classList.add('active');
      document.querySelector('.prod-preview__print img').src = window.URL.createObjectURL(el.target.files[0]);
      document.querySelector('.order-box__preview img').setAttribute('src', window.URL.createObjectURL(el.target.files[0]));        
    }

    if (document.getElementById('custom').checked) {
      document.querySelector(".creator-main__step_size").classList.add('creator-main__step_current');
      document.querySelector('.creator-main__step_size').classList.remove('hidden')
      document.getElementById('cust').checked = true;
    } else {
      document.querySelectorAll('.radio-size-input').forEach(el => {
        el.checked = false;
      })
    }
    rmTypes()
  } else {
    hideOrderButton()
    el.target.closest('.dragndrop').querySelector('.dragndrop__preview').style.display = 'none';

    document.querySelector(".creator-main__step_size").classList.remove('creator-main__step_current');
    document.querySelector('.creator-main__step_size').classList.add('hidden')

    document.querySelector(".creator-main__step_quantity").classList.remove('creator-main__step_current');
    document.querySelector(".creator-main__step_quantity").classList.add('hidden')
  }

  
  document.querySelector('.creator-main__step_color').classList.add('creator-main__step_current')

  addDescr('Artwork', 'own')
  addDescr('size', 'own');
  removeCheckedFromRadioPrint()

  document.querySelector('.creator-main__step_first').setAttribute('data-choose', 'own')

  document.querySelectorAll('.radio-print-p').forEach(el => {
    el.classList.remove('radio-print-p_current')
  })

  document.querySelector('.size-list').classList.remove('opened')

  // Putting the preview, title and size to the quantitys preview
  document.querySelector('.order-box__title').textContent = 'Own file';
  document.querySelector('.order-box__size').textContent = '57cm x 100cm';  

  document.getElementById('upload-by-link').checked = false;
  document.querySelector('.dragndrop__other-way').classList.remove('active') 
  document.querySelector('.dragndrop__other-way-paste').value = ''; 


  let count = document.querySelector('.order-box .counter__num').value;

  if (count > 0 && count <= 2) {
    document.querySelector('.counter-price__count').setAttribute('data-price-count', 50)
  } else if (count > 2 && count <= 10) {
    document.querySelector('.counter-price__count').setAttribute('data-price-count', 45)
  } else if (count > 10 && count < 50) {
    document.querySelector('.counter-price__count').setAttribute('data-price-count', 43)
  } else {
    document.querySelector('.counter-price__count').setAttribute('data-price-count', 41)
  }

  calcPrice()
  calcTotalPrice()
  editSizeEnter()
}


function rmTypes() {
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

function cleanAndAddOrder() {
  if (document.querySelectorAll('.order-box').length > 0) {
    document.querySelectorAll('.order-box').forEach(el => {
        el.remove()
    })
  }

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
        <h3 class="order-box__title">Own</h3>
        <p class="order-box__size">56cm x 100cm</p>
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