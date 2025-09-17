// ===============================
// Tiny DOM helpers
// ===============================
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

// ===============================
// Password visibility toggles
// ===============================
$$('[data-toggle="visibility"]').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = btn.previousElementSibling;
    if (!input) return;
    const showing = input.type === 'text';
    input.type = showing ? 'password' : 'text';
    btn.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
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
        ? '✅ Success — submitting...'
        : '⚠️ Please fix the highlighted fields.';
    }

    // TODO: integrate real API call here
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

// ===============================
// Init both forms
// ===============================
setupForm('#loginForm');
setupForm('#signupForm');
