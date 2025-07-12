const form = document.getElementById('eventForm');
const eventsList = document.getElementById('eventsList');

let events = JSON.parse(localStorage.getItem('events')) || [];

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const datetime = document.getElementById('datetime').value;
  const email = document.getElementById('email').value.trim();
  const category = document.getElementById('category').value;

  if (!title || !datetime || new Date(datetime) < new Date()) {
    alert("Please enter a valid title and future date.");
    return;
  }

  const event = {
    id: Date.now(),
    title,
    description,
    datetime,
    email,
    category
  };

  events.push(event);
  localStorage.setItem('events', JSON.stringify(events));
  form.reset();
  renderEvents();
});

function renderEvents() {
  eventsList.innerHTML = '';
  events.forEach(event => {
    const eventDiv = document.createElement('div');
    eventDiv.className = 'event';

    const timerId = `timer-${event.id}`;
    eventDiv.innerHTML = `
      <h3>${event.title}</h3>
      <small>${event.category}</small>
      <p>${event.description}</p>
      <p><strong>Time left:</strong> <span id="${timerId}"></span></p>
      ${event.email ? `<p><em>Reminder will be sent to:</em> ${event.email}</p>` : ''}
      <button class="edit-btn" onclick="editEvent(${event.id})">Edit</button>
      <button class="delete-btn" onclick="deleteEvent(${event.id})">Delete</button>
    `;

    eventsList.appendChild(eventDiv);
    startCountdown(event, timerId);
  });
}

function deleteEvent(id) {
  if (confirm("Delete this event?")) {
    events = events.filter(e => e.id !== id);
    localStorage.setItem('events', JSON.stringify(events));
    renderEvents();
  }
}

function editEvent(id) {
  const event = events.find(e => e.id === id);
  if (event) {
    document.getElementById('title').value = event.title;
    document.getElementById('description').value = event.description;
    document.getElementById('datetime').value = event.datetime;
    document.getElementById('email').value = event.email;
    document.getElementById('category').value = event.category;
    deleteEvent(id);
  }
}

function startCountdown(event, elementId) {
  function updateCountdown() {
    const now = new Date().getTime();
    const eventTime = new Date(event.datetime).getTime();
    const distance = eventTime - now;

    if (distance <= 0) {
      document.getElementById(elementId).innerText = `⚠️ ${event.title} is happening now!`;
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById(elementId).innerText =
      `${days} Days ${hours}H:${minutes}M:${seconds}S`;

    // Email reminder simulation
    const oneDayBefore = eventTime - (24 * 60 * 60 * 1000);
    if (now >= oneDayBefore && now < oneDayBefore + 1000) {
      console.log(`Reminder: "${event.title}" is happening tomorrow.`);
      if (event.email) {
        console.log(`Simulated email sent to ${event.email}`);
      }
      alert(`Reminder: "${event.title}" is happening tomorrow!`);
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

renderEvents();
