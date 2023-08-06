dragndrop.querySelector('input').addEventListener('change', updPreview);


document.addEventListener("DOMContentLoaded", () => {
    const dropArea = document.querySelector(".dragndrop__area");
    const dragndrop = document.querySelector(".dragndrop");

    dropArea.addEventListener("dragenter", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropArea.classList.add("dragging");
    });

    dropArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });

    dropArea.addEventListener("dragleave", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropArea.classList.remove("dragging");
    });

    dropArea.addEventListener("drop", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropArea.classList.remove("dragging");

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        document.querySelector('.prod-preview').classList.add('active');
        document.querySelector(".creator-main__step_size").classList.remove('creator-main__step_current')
        document.querySelector(".creator-main__step_quantity").classList.add('creator-main__step_current')
        showOrderButton();

        const file = files[0];

        const dragndropPreview = document.getElementById('dragndrop-preview');
        dragndropPreview.src = window.URL.createObjectURL(file);

        const previewPrint = document.getElementById('preview-print');
        previewPrint.src = window.URL.createObjectURL(file);
        addDescr('Artwork', 'own')
        addDescr('size', 'own');

        removeCheckedFromRadioPrint()
        document.querySelector('.creator-main__step_first').setAttribute('data-choose', 'own')
        checkGender()
        checkSizeType()
        document.querySelectorAll('.radio-print-p').forEach(el => {
          el.classList.remove('radio-print-p_current')
        })

        dragndrop.classList.add('active');
        previewArea.style.display = 'block';
        document.querySelector('.creator-main__step_color').classList.add('creator-main__step_current')
      }
    });
});


// FUNCTIONS

function updPreview() {
  document.querySelector('.prod-preview').classList.add('active');
  document.querySelector(".creator-main__step_size").classList.remove('creator-main__step_current')
  document.querySelector(".creator-main__step_quantity").classList.add('creator-main__step_current')
  showOrderButton();

  document.getElementById('dragndrop-preview').src = window.URL.createObjectURL(this.files[0]);
  document.getElementById('preview-print').src = window.URL.createObjectURL(this.files[0]);
  document.querySelector('.dragndrop').classList.add('active');
  previewArea.style.display = 'block';
  document.querySelector('.creator-main__step_color').classList.add('creator-main__step_current')

  addDescr('Artwork', 'own')
  addDescr('size', 'own');
  removeCheckedFromRadioPrint()

  document.querySelector('.creator-main__step_first').setAttribute('data-choose', 'own')
  checkGender()
  checkSizeType()
  document.querySelectorAll('.radio-print-p').forEach(el => {
    el.classList.remove('radio-print-p_current')
  })
}