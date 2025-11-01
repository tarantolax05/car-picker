fetch('cars.json')
  .then(response => response.json())
  .then(cars => {
    const garage = document.getElementById('garage');

    cars.forEach(car => {
      const card = document.createElement('div');
      card.className = 'car-card';
      card.innerHTML = `
        <img src="${car.image}" alt="${car.brand} ${car.model}">
        <div class="car-info">
          <h3>${car.flag} ${car.brand} ${car.model}</h3>
          <p><strong>Targa:</strong> ${car.plate}</p>
          <p><strong>Posti:</strong> ${car.seats}</p>
        </div>
      `;
      garage.appendChild(card);
    });
  })
  .catch(error => console.error('Errore nel caricamento delle auto:', error));