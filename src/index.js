let currentDogId = null;

function fetchDogs() {
  return fetch('http://localhost:3000/dogs')
    .then(res => res.json());
}

function renderDogs(dogs) {
  const tbody = document.getElementById('table-body');
  tbody.innerHTML = '';
  dogs.forEach(dog => {
    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    tdName.textContent = dog.name;
    const tdBreed = document.createElement('td');
    tdBreed.textContent = dog.breed;
    const tdSex = document.createElement('td');
    tdSex.textContent = dog.sex;
    const tdButton = document.createElement('td');
    const button = document.createElement('button');
    button.textContent = 'Edit';
    button.addEventListener('click', () => {
      currentDogId = dog.id;
      document.querySelector('input[name="name"]').value = dog.name;
      document.querySelector('input[name="breed"]').value = dog.breed;
      document.querySelector('input[name="sex"]').value = dog.sex;
    });
    tdButton.appendChild(button);
    tr.append(tdName, tdBreed, tdSex, tdButton);
    tbody.appendChild(tr);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchDogs().then(renderDogs);

  const form = document.getElementById('dog-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!currentDogId) return;
    const name = document.querySelector('input[name="name"]').value;
    const breed = document.querySelector('input[name="breed"]').value;
    const sex = document.querySelector('input[name="sex"]').value;
    fetch(`http://localhost:3000/dogs/${currentDogId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, breed, sex })
    })
    .then(() => {
      currentDogId = null;
      form.reset();
      return fetchDogs();
    })
    .then(renderDogs);
  });
});
