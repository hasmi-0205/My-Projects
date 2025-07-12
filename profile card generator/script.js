document.addEventListener('DOMContentLoaded', loadCards);

function generateCard() {
  const name = document.getElementById('name').value.trim();
  const bio = document.getElementById('bio').value.trim();
  const imageFile = document.getElementById('imageUpload').files[0];
  const borderStyle = document.getElementById('borderStyle').value;

  if (!name || !bio || !imageFile) {
    alert("All fields are required!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const cardData = {
      id: Date.now(),
      name,
      bio,
      image: e.target.result,
      theme: 'light',
      border: borderStyle
    };
    saveCard(cardData);
    renderCard(cardData);
  };
  reader.readAsDataURL(imageFile);
}

function renderCard(data) {
  const container = document.getElementById('cardContainer');

  const card = document.createElement('div');
  card.className = `card ${data.theme}`;
  card.dataset.id = data.id;

  const img = document.createElement('img');
  img.src = data.image;
  if (data.border === 'circle') img.style.borderRadius = '50%';
  else if (data.border === 'rounded') img.style.borderRadius = '10px';
  else img.style.borderRadius = '0';

  const nameEl = document.createElement('h4');
  nameEl.textContent = data.name;

  const bioEl = document.createElement('p');
  bioEl.textContent = data.bio;

  const btnGroup = document.createElement('div');
  btnGroup.className = 'btn-group';

  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = 'Toggle Theme';
  toggleBtn.onclick = () => toggleTheme(data.id);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = () => deleteCard(data.id);

  btnGroup.appendChild(toggleBtn);
  btnGroup.appendChild(deleteBtn);

  card.appendChild(img);
  card.appendChild(nameEl);
  card.appendChild(bioEl);
  card.appendChild(btnGroup);

  container.appendChild(card);
}

function saveCard(card) {
  const cards = JSON.parse(localStorage.getItem('profileCards')) || [];
  cards.push(card);
  localStorage.setItem('profileCards', JSON.stringify(cards));
}

function loadCards() {
  const cards = JSON.parse(localStorage.getItem('profileCards')) || [];
  cards.forEach(renderCard);
}

function toggleTheme(id) {
  const cards = JSON.parse(localStorage.getItem('profileCards'));
  const index = cards.findIndex(c => c.id === id);
  if (index > -1) {
    cards[index].theme = cards[index].theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('profileCards', JSON.stringify(cards));
    location.reload();
  }
}

function deleteCard(id) {
  const cards = JSON.parse(localStorage.getItem('profileCards'));
  const updated = cards.filter(c => c.id !== id);
  localStorage.setItem('profileCards', JSON.stringify(updated));
  location.reload();
}
