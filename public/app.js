// DOM Elements
const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const submitBtn = form.querySelector('.btn-submit');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  successMessage.style.display = 'none';
  errorMessage.style.display = 'none';

  if (!validateForm()) {
    return;
  }

  submitBtn.disabled = true;
  showSuccess('Démonstration terminée. Votre numéro n’a pas été envoyé ni enregistré. Aucune participation réelle n’a été créée.');
  form.reset();
  submitBtn.disabled = false;
});

function validateForm() {
  const nameError = document.getElementById('nameError');
  const name = nameInput.value.trim();
  nameError.textContent = '';

  if (!name) {
    nameError.textContent = 'Entrez votre numéro de téléphone.';
    return false;
  }
  if (name.length < 5) {
    nameError.textContent = 'Vérifiez le numéro saisi.';
    return false;
  }
  return true;
}

function showSuccess(message) {
  successMessage.textContent = message;
  successMessage.style.display = 'block';
}

nameInput.addEventListener('input', () => {
  if (nameInput.value.trim().length >= 5) {
    document.getElementById('nameError').textContent = '';
  }
});

console.log('Independent prize-page demo loaded');
