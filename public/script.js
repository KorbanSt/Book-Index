// public/script.js

// Get DOM elements
const form = document.getElementById('dataForm');
const dataInput = document.getElementById('dataInput');
const dataList = document.getElementById('dataList');

// Fetch existing data on page load
window.onload = () => {
  fetch('/data')
    .then(response => response.json())
    .then(data => {
      dataList.innerHTML = data.map(item => `<li>${item}</li>`).join('');
    });
};

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const newData = dataInput.value;

  fetch('/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"message":newData}),
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === 'Data saved successfully') {
      // Add new item to the list
      const listItem = document.createElement('li');
      listItem.textContent = newData;
      dataList.appendChild(listItem);

      // Clear the input field
      dataInput.value = '';
    }
  })
  .catch(error => console.error('Error:', error));
});
