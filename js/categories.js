const categories = document.querySelectorAll('.categories__category');

document.addEventListener('click', e => {
    if (e.target.classList.contains('categories__category')) {
        categories.forEach(el => {
            el.classList.remove('categories__category_current')
        })

        e.target.classList.add('categories__category_current')
    }
})