const filterListBtn = document.querySelector('.section__list');
const filterElements = document.querySelectorAll('.section__content');

filterListBtn.addEventListener('click', (elem) => {
  if (elem.target.classList.contains('section__button')) {
    let fillterValue = elem.target.getAttribute('data-filter');

    filterElements.forEach((elem) => {
      if (fillterValue !== elem.getAttribute('data-filter')) {
        elem.classList.add('hide');
      } else {
        elem.classList.remove('hide');
      }

      if (fillterValue === 'all') {
        elem.classList.remove('hide');
      }
    });
  }
});

