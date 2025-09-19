// ===============================
// Tiny DOM helpers
// ===============================
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

// ===============================
// Password visibility toggles (robust for all .icon-btn in .password fields)
// ===============================
$$('[data-toggle="visibility"]').forEach(btn => {
  btn.addEventListener('click', () => {
    // Find the input inside the same .password container
    const input = btn.parentElement.querySelector('input');
    if (!input) return;
    const showing = input.type === 'text';
    input.type = showing ? 'password' : 'text';
    btn.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
    btn.textContent = showing ? '👁' : '🙈';
  });
});

// ===============================
// Validation feedback
// ===============================
function setupForm(formSelector) {
  const form = $(formSelector);
  if (!form) return;

  const status = form.querySelector('.status');

  // Handle form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;

    form.querySelectorAll('input[required]').forEach(inp => {
      const field = inp.closest('.field');
      const hint = field && field.querySelector('.hint');
      const invalid = !inp.checkValidity();
      inp.setAttribute('aria-invalid', String(invalid));
      if (hint) {
        hint.hidden = !invalid;
        hint.classList.toggle('error', invalid);
      }
      if (invalid) ok = false;
    });

    if (status) {
      status.textContent = ok
        ? '✅ Validating credentials...'
        : '⚠️ Please fix the highlighted fields.';
    }
  });

  // Handle live input validation
  form.addEventListener('input', (e) => {
    const inp = e.target;
    if (!(inp instanceof HTMLInputElement)) return;
    const field = inp.closest('.field');
    const hint = field && field.querySelector('.hint');
    const invalid = !inp.checkValidity();
    inp.setAttribute('aria-invalid', String(invalid));
    if (hint) {
      hint.hidden = !invalid;
      hint.classList.toggle('error', invalid);
    }
  });
}

// Add authentication check on page load
    document.addEventListener('DOMContentLoaded', function() {
      // Check if user is already logged in
      if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = '../Home page/home.html';
      }
      
      // Handle form submission
      const loginForm = document.getElementById('loginForm');
      const statusDiv = document.querySelector('.status');
      
      if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Basic validation
          const email = document.getElementById('login-email').value;
          const password = document.getElementById('login-password').value;
          
          // Check if user exists in localStorage
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const user = users.find(u => u.email === email && u.password === password);
          
          if (user) {
            // Successful login
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = '../Home page/home.html';
          } else {
            // Failed login
            statusDiv.textContent = 'Invalid email or password. Please try again.';
            statusDiv.style.color = '#e05d5d';
          }
        });
      }
    });

// ===============================
// Init both forms
// ===============================
// Only initialize forms if they exist on the page
if ($('#loginForm')) setupForm('#loginForm');
if ($('#signupForm')) setupForm('#signupForm');

// Initialize users array in localStorage if it doesn't exist
if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify([]));
}
// Show/hide password functionality for sign-up page
    document.addEventListener('DOMContentLoaded', function() {
      const toggleButtons = document.querySelectorAll('.icon-btn[data-toggle="visibility"]');
      toggleButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
          const input = btn.parentElement.querySelector('input');
          if (input.type === 'password') {
            input.type = 'text';
            btn.textContent = '🙈';
          } else {
            input.type = 'password';
            btn.textContent = '👁';
          }
        });
      });
    });
    // Add authentication check on page load
    document.addEventListener('DOMContentLoaded', function() {
      // Check if user is already logged in
      if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = '../Home page/home.html';
      }
      
      // Handle form submission
      const signupForm = document.getElementById('signupForm');
      const statusDiv = document.querySelector('.status');
      
      if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Basic validation
          const name = document.getElementById('name').value;
          const email = document.getElementById('signup-email').value;
          const password = document.getElementById('signup-password').value;
          const confirmPassword = document.getElementById('signup-confirm-password').value;
          const mismatchHint = document.getElementById('password-mismatch-hint');
          
          // Check if passwords match
          if (password !== confirmPassword) {
            mismatchHint.style.display = 'block';
            return false;
          } else {
            mismatchHint.style.display = 'none';
          }
          
          // Check if user already exists
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const userExists = users.some(user => user.email === email);
          
          if (userExists) {
            statusDiv.textContent = 'An account with this email already exists.';
            statusDiv.style.color = '#e05d5d';
            return false;
          }
          
          if (name && email && password.length >= 8) {
            // Store user data
            const newUser = { name, email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            // Show success message and redirect to login page
            statusDiv.textContent = 'Account created successfully! Please log in.';
            statusDiv.style.color = '#4caf50';
            setTimeout(() => {
              window.location.href = 'login.html';
            }, 1500);
          }
        });
      }
    });
    // Password visibility toggle
    document.querySelectorAll('.icon-btn').forEach(button => {
      button.addEventListener('click', function() {
        const input = this.previousElementSibling;
        if (input.type === 'password') {
          input.type = 'text';
          this.setAttribute('aria-label', 'Hide password');
        } else {
          input.type = 'password';
          this.setAttribute('aria-label', 'Show password');
        }
      });
    });