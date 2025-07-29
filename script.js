async function loadItinerary() {
  const response = await fetch('data/itinerary.json');
  const data = await response.json();

  const today = new Date();
  const dateKey = today.toISOString().split('T')[0]; // "YYYY-MM-DD"

  const itinerary = data[dateKey];
  const container = document.getElementById('schedule');

  if (itinerary) {
    container.innerHTML = `<ul>` +
      itinerary.map(item => `<li><strong>${item.time}</strong>: ${item.activity}</li>`).join('') +
      `</ul>`;
  } else {
    container.innerHTML = `<p>No mission briefing for today. Standby for further instructions. 🕶️</p>`;
  }
}

loadItinerary();
