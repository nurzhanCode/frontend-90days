document.getElementById('theme-toggle').addEventListener('click', () => {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');

    root.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
});


let allExtensions = [];

const container = document.getElementById('card-container');

fetch('./data.json')
    .then(res => res.json())
    .then(data => {
        allExtensions = data;
        renderCards(allExtensions);
    });

function filterCards(status) {
    if (status === 'all') {
        renderCards(allExtensions);
    } else if (status === 'active') {
        renderCards(allExtensions.filter(item => item.isActive));
    } else if (status === 'inactive') {
        renderCards(allExtensions.filter(item => !item.isActive));
    }
}

function renderCards(data) {
    container.innerHTML = '';

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card__box';
        card.innerHTML = `
      <div class="d--flex">
        <div><img class="card__icon" src="${item.logo}" alt="${item.name}"></div>
        <div>
          <h3 class="card__title">${item.name}</h3>
          <p class="card__description">${item.description}</p>
        </div>
      </div>
      <div class="d--flex">
        <div><button class="card__btn">Remove</button></div>
        <div>
          <label class="toggle">
            <input type="checkbox" ${item.isActive ? 'checked' : ''}>
            <span class="slider"></span>
          </label>
        </div>
      </div>
    `;
        container.appendChild(card);
    });
}

document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        filterCards(filter);
    });
});

