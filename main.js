const s = (sel) => document.querySelector(sel);
const r = (sel) => Array.from(document.querySelectorAll(sel));

if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]));
}

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = s("#loginForm");
    const signupForm = s("#signupForm");
    const logoutBtn = s("#logoutBtn");

    if ((window.location.pathname.includes("login.html") || window.location.pathname.includes("sign-up.html")) && localStorage.getItem("isLoggedIn") === "true") {
        window.location.href = "home.html";
    }

    r("[data-togglevisibility]").forEach(btn => {
        const input = btn.parentElement.querySelector("input");
        if (!input) return;

        btn.addEventListener("click", () => {
            const showing = input.type === "text";
            input.type = showing ? "password" : "text";
            btn.setAttribute("aria-label", showing ? "Show password" : "Hide password");
            const svg = btn.querySelector("svg");
            if (svg) {
                svg.innerHTML = showing
                    ? `<ellipse cx="12" cy="12" rx="8" ry="5" /><circle cx="12" cy="12" r="2.5" />`
                    : `<ellipse cx="12" cy="12" rx="8" ry="5" /><path d="M4 4l16 16" />`;
            }
        });
    });

    // Login handler
    if (loginForm) {
        loginForm.addEventListener("submit", e => {
            e.preventDefault();
            const email = s("#login-email").value;
            const password = s("#login-password").value;
            const statusDiv = s(".status");
            const users = JSON.parse(localStorage.getItem("users"));
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("currentUser", JSON.stringify(user));
                localStorage.setItem("userEmail", email);
                localStorage.setItem("userName", user.name);
                statusDiv.textContent = "Login successful! Redirecting...";
                statusDiv.style.color = "#4caf50";
                setTimeout(() => window.location.href = "home.html", 1000);
            } else {
                statusDiv.textContent = "Invalid email or password. Please try again.";
                statusDiv.style.color = "#e05d5d";
            }
        });
    }

    // Signup handler
    if (signupForm) {
        signupForm.addEventListener("submit", e => {
            e.preventDefault();
            const name = s("#name").value;
            const email = s("#signup-email").value;
            const password = s("#signup-password").value;
            const confirmPassword = s("#signup-confirm-password").value;
            const mismatchHint = s("#password-mismatch-hint");
            const statusDiv = s(".status");

            if (password !== confirmPassword) {
                mismatchHint.style.display = "block";
                return;
            } else {
                mismatchHint.style.display = "none";
            }

            const users = JSON.parse(localStorage.getItem("users"));
            if (users.some(user => user.email === email)) {
                statusDiv.textContent = "An account with this email already exists.";
                statusDiv.style.color = "#e05d5d";
                return;
            }

            if (!name || !email || password.length < 8) {
                statusDiv.textContent = "Please fill in all details correctly.";
                statusDiv.style.color = "#e05d5d";
                return;
            }

            users.push({ name, email, password });
            localStorage.setItem("users", JSON.stringify(users));
            statusDiv.textContent = "Account created successfully! Please log in.";
            statusDiv.style.color = "#4caf50";
            setTimeout(() => window.location.href = "login.html", 1500);
        });
    }

    // Logout button handler
    if (logoutBtn) {
        logoutBtn.addEventListener("click", e => {
            e.preventDefault();
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("currentUser");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userName");
            window.location.href = "login.html";
        });
    }
});

// Add passive event listeners for better touch/scroll performance
window.addEventListener('touchstart', () => { }, { passive: true });
window.addEventListener('touchmove', () => { }, { passive: true });
window.addEventListener('wheel', () => { }, { passive: true });
