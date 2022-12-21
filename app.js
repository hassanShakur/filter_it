const container = getElement('.container');
const preLoader = getElement('.loader');
const btnContainer = getElement('.filter-btns');
const searchInput = getElement('.search');
const modeBtnContainer = getElement('.mode');

let filteredData = [...data];

window.addEventListener('load', vanishLoader);
window.addEventListener('DOMContentLoaded', loadImages);

function vanishLoader() {
  preLoader.classList.add('vanish');
}

function loadImages() {
  if (filteredData.length < 1) {
    container.innerHTML = `<h6>sorry... No items match your search.</h6>`;
    return;
  }
  const mealsText = filteredData
    .map((meal) => {
      return `<div class="image">
          <img src="${meal.src}" alt="image meal" class="img" title="${meal.meal}" />
          <div class="details"><h5>${meal.meal}</h5> <h5>$${meal.price}</h5></div>
        </div>`;
    })
    .join('');
  container.innerHTML = mealsText;

  const btns = ['all', ...new Set(data.map((item) => item.category))]
    .map((btn) => `<button class="filter-btn">${btn}</button>`)
    .join('');

  btnContainer.innerHTML = btns;
}

function getElement(identifier) {
  const element = document.querySelector(identifier);

  if (element) {
    return element;
  }
  throw new Error(`Identifier "${identifier}" not found!!!`);
}

btnContainer.addEventListener('click', (e) => {
  searchInput.value = '';
  if (e.target.classList.contains('filter-btn')) {
    const btnCategory = e.target.innerHTML;

    if (btnCategory === 'all') {
      filteredData = [...data];
    } else {
      filteredData = data.filter((item) => item.category === btnCategory);
    }
    loadImages();
  }
});

searchInput.addEventListener('keyup', () => {
  let value = searchInput.value;
  filteredData = data.filter((item) => item.meal.includes(value));
  loadImages();
});

modeBtnContainer.addEventListener('click', () => {
  const toggler = modeBtnContainer.querySelector('.toggle-mode');
  toggler.classList.toggle('switch');
  document.documentElement.classList.toggle('dark-mode');
});
