const pogonWidth = 100;
const pogonHeight = 57;

const basePrice = 15;
const pricePerPogon = 60;

let printWidth = 40 + 1;
let printHeight = 40 + 1;

// FUNCTIONS
function calculatePrintsPerMeter(printWidth, printHeight, pogonWidth, pogonHeight) {
    const horizontalPrints = Math.floor(pogonWidth / printWidth);
    const verticalPrints = Math.floor(pogonHeight / printHeight);
  
    const horizontalPrintsRotated = Math.floor(pogonWidth / printHeight);
    const verticalPrintsRotated = Math.floor(pogonHeight / printWidth);
  
    const maxPrints = Math.max(
      horizontalPrints * verticalPrints,
      horizontalPrintsRotated * verticalPrintsRotated
    );
  
    return maxPrints;
}

function updDimensions(count) {
    printWidth = parseFloat(document.querySelector('.size-check').offsetWidth) + 1;
    printHeight = parseFloat(document.querySelector('.size-check').offsetHeight) + 1;

    if (document.getElementById('artwork-y').checked) {
        if (document.querySelector('.creator-main__step_quantity').classList.contains('creator-main__step_current') && !document.querySelector('.creator-main__step_quantity').classList.contains('hidden')) {
            let maxPrintsPerPogon = calculatePrintsPerMeter(printWidth, printHeight, pogonWidth, pogonHeight);
            let printPrice = (pricePerPogon / maxPrintsPerPogon) + (basePrice / maxPrintsPerPogon);
        
            if (document.getElementById('custom').checked) {
                document.querySelector('.counter-price__count').setAttribute('data-price-count', printPrice.toFixed(2))
                calcPrice()
            } else {                
                if (count > 0 && count < 2) {
                    document.querySelector('.counter-price__count').setAttribute('data-price-count', 50)
                } else if (count >= 2 && count <= 10) {
                    document.querySelector('.counter-price__count').setAttribute('data-price-count', 45)
                } else if (count > 10 && count <= 50) {
                    document.querySelector('.counter-price__count').setAttribute('data-price-count', 43)
                } else {
                    document.querySelector('.counter-price__count').setAttribute('data-price-count', 41)
                }

                calcPrice()
            }
        }
    } else {
        if (document.querySelector('.creator-main__step_quantity').classList.contains('creator-main__step_current') && !document.querySelector('.creator-main__step_quantity').classList.contains('hidden')) {
            let maxPrintsPerPogon = calculatePrintsPerMeter(printWidth, printHeight, pogonWidth, pogonHeight);
            let printPrice = (pricePerPogon / maxPrintsPerPogon) + (basePrice / maxPrintsPerPogon);
            
            if (document.getElementById('cust').checked) {
                let currentEl;
                document.querySelectorAll('.order-box').forEach(el => {
                    if (el.querySelector('.order-box__size').textContent === `${document.querySelector('.size-check').offsetWidth}cm x ${document.querySelector('.size-check').offsetHeight}cm`) {
                        currentEl = el;
                    }
                })
                currentEl.querySelector('.counter-price__count').setAttribute('data-price-count', printPrice.toFixed(2))
            } else {
                document.querySelectorAll('.order-box')[document.querySelectorAll('.order-box').length - 1].querySelector('.counter-price__count').setAttribute('data-price-count', printPrice.toFixed(2))
            }
            calcPrice()
        }
    }
}

function calcTotalPrice() {
    let totalPrice = 0;
    document.querySelectorAll('.counter-price__count').forEach(el => {
        totalPrice += parseInt(el.textContent);
    })

    document.querySelector('.total-bill__value-num').textContent = totalPrice;
}