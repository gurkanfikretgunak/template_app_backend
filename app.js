const API_BASE_URL = 'http://localhost:3000'; // Replace with your API base URL

function loginWithFacebook() {
  window.location.href = `${API_BASE_URL}/auth/facebook`;
}

function loginWithGoogle() {
  window.location.href = `${API_BASE_URL}/auth/google`;
}

function loginWithTwitter() {
  window.location.href = `${API_BASE_URL}/auth/twitter`;
}
