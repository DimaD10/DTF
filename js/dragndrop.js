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

              calcPrice(document.querySelector('.creator-main__step_quantity .counter__num').textContent)
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

      calcPrice(document.querySelector('.creator-main__step_quantity .counter__num').textContent)
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
  document.querySelector('.order-box__size').textContent = '57x100cm';  

  document.getElementById('upload-by-link').checked = false;
  document.querySelector('.dragndrop__other-way').classList.remove('active') 
  document.querySelector('.dragndrop__other-way-paste').value = ''; 
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