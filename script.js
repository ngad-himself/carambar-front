const API_BASE = 'https://carambar-api-63au.onrender.com/api/v1/blagues'; 
// const API_BASE = 'http://localhost:3000/api/v1/blagues'; // Pour le développement local
const btn   = document.getElementById('btn-joke');
const box   = document.getElementById('joke-box');
const qElt  = document.getElementById('question');
const aElt  = document.getElementById('answer');

async function fetchRandomJoke() {
  // UI : désactive le bouton et affiche un petit loader
  btn.disabled = true;
  btn.textContent = '🤔 ...';

  try {
    const url = `${API_BASE}/random/blague`;
    console.log('Appel API →', url);      // NEW
    const res  = await fetch(url, { mode: 'cors' });
    console.log('Status', res.status);    // NEW

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    qElt.textContent = data.question;
    aElt.textContent = data.answer;
    box.classList.remove('hidden');
  } catch (err) {
    console.error('Fetch error:', err);
    alert('Impossible de récupérer une blague 😢\nVérifie que l’API tourne sur http://localhost:3000');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Raconte‑moi une blague !';
  }
}

btn.addEventListener('click', fetchRandomJoke);
