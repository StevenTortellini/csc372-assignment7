// base url for api requests
const BASE_URL = 'http://localhost:3000/jokes';

// get all html elements
const jokeText = document.getElementById('joke-text');
const newRandomBtn = document.getElementById('new-random');
const loadCategoriesBtn = document.getElementById('load-categories');
const categoryList = document.getElementById('category-list');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const jokeResults = document.getElementById('joke-results');
const jokeForm = document.getElementById('joke-form');
const jokeSetupInput = document.getElementById('joke-setup');
const jokeDeliveryInput = document.getElementById('joke-delivery');
const jokeCategoryInput = document.getElementById('joke-category');

// fetch a random joke from server
async function fetchRandomJoke() {
  try {
    const res = await fetch(`${BASE_URL}/random`);
    const data = await res.json();

    if (data.length > 0) {
      const joke = data[0];
      jokeText.textContent = `${joke.set_up} — ${joke.delivery}`;
    } else {
      jokeText.textContent = 'no jokes found';
    }
  } catch (err) {
    jokeText.textContent = 'error loading joke';
    console.error(err);
  }
}

// button event to load new random joke
newRandomBtn.addEventListener('click', fetchRandomJoke);

// fetch all joke categories
async function fetchCategories() {
  try {
    const res = await fetch(`${BASE_URL}/categories`);
    const categories = await res.json();

    categoryList.innerHTML = '';
    categories.forEach(cat => {
      const li = document.createElement('li');
      li.textContent = cat.joke_type;
      li.addEventListener('click', () => fetchJokesByCategory(cat.joke_type));
      categoryList.appendChild(li);
    });
  } catch (err) {
    console.error('error loading categories:', err);
  }
}

// button event to load categories
loadCategoriesBtn.addEventListener('click', fetchCategories);

// fetch jokes by specific category
async function fetchJokesByCategory(category) {
  try {
    const res = await fetch(`${BASE_URL}/category/${encodeURIComponent(category)}`);
    const jokes = await res.json();

    jokeResults.innerHTML = `<h3>${category} jokes</h3>`;
    jokes.forEach(j => {
      const li = document.createElement('li');
      li.textContent = `${j.set_up} — ${j.delivery}`;
      jokeResults.appendChild(li);
    });
  } catch (err) {
    console.error('error fetching jokes by category:', err);
  }
}

// handle search by category name
searchBtn.addEventListener('click', () => {
  const category = searchInput.value.trim();
  if (category) fetchJokesByCategory(category);
});

// handle add new joke form
jokeForm.addEventListener('submit', async (e) => {
  e.preventDefault(); //prevents browser from submitting form js handled

  const newJoke = {
    set_up: jokeSetupInput.value,
    delivery: jokeDeliveryInput.value,
    joke_type: jokeCategoryInput.value
  };

  try {
    const res = await fetch(`${BASE_URL}/joke/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJoke)
    });

    if (res.ok) {
      fetchJokesByCategory(newJoke.joke_type);
      jokeSetupInput.value = '';
      jokeDeliveryInput.value = '';
      jokeCategoryInput.value = '';
    } else {
      console.error('error adding joke');
    }
  } catch (err) {
    console.error('error adding joke:', err);
  }
});

// load one random joke when page opens
fetchRandomJoke();

