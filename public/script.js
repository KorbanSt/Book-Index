// public/script.js

const categories = ['quotes', 'books', 'writing'];

window.onload = () => {
  categories.forEach(category => {
    fetch(`/data/${category}`)
      .then(response => response.json())
      .then(data => {
        const list = document.getElementById(`${category}List`);
        list.innerHTML = data.map(item => `<li>${item}</li>`).join('');
      });
  });
};

document.querySelectorAll('.cardForm').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const category = form.getAttribute('data-category');
    const input = form.querySelector('input[type="text"]');
    const value = input.value;

    fetch(`/data/${category}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: value }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Data saved successfully') {
          const list = document.getElementById(`${category}List`);
          const listItem = document.createElement('li');
          listItem.textContent = value;
          list.appendChild(listItem);
          input.value = '';
        }
      })
      .catch(err => console.error('Error:', err));
  });
});
