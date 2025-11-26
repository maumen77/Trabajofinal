document.addEventListener('DOMContentLoaded', () => {
  const map = L.map('map').setView([40.4168, -3.7038], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const marker = L.marker([40.4168, -3.7038]).addTo(map).bindPopup('Ositos Lusito').openPopup();
});