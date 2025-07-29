// itinerary.js

// Load itinerary for a given dateKey 
async function loadItineraryForDate(dateKey) {
  const response = await fetch('data/itinerary.json');
  const data = await response.json();

  const itinerary = data[dateKey];
  const container = document.getElementById('schedule');

  if (itinerary) {
    container.innerHTML = `<ul>` +
        itinerary.map(item => `<li><strong>${item.time}</strong>: ${item.activity.replace(/\n/g, '<br>')}</li>`).join('') +
        `</ul>`;
  } else {
    container.innerHTML = `<p>No mission briefing for that day. Standby for further instructions. 🕶️</p>`;
  }
}

// show today’s itinerary and set the default value of the date picker
window.onload = function () {
  const today = new Date().toISOString().split("T")[0];
  const datePicker = document.getElementById("datePicker");

  if (datePicker) {
    datePicker.value = today;
    loadItineraryForDate(today);

    //change the date
    datePicker.addEventListener("change", function () {
      const selectedDate = this.value;
      loadItineraryForDate(selectedDate);
    });
  } else {
    console.error("Missing datePicker element in HTML.");
  }
};
