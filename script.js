// ==========================================
//  IQBAL ALI PORTFOLIO — script.js
// ==========================================

// 1. AOS — Animate On Scroll
AOS.init({
  duration: 900,
  once: true,
  offset: 100,
});

// 2. NAVBAR — add shadow on scroll
window.addEventListener("scroll", () => {
  document
    .getElementById("navbar")
    .classList.toggle("scrolled", window.scrollY > 30);
});

// 3. MOBILE MENU — open / close
function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("open");
}
// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest("nav") && !e.target.closest("#mobileMenu")) {
    document.getElementById("mobileMenu").classList.remove("open");
  }
});

// 4. SKILL BARS — animate when #Services section enters viewport
const skillBars = document.querySelectorAll(".skill-fill");
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        skillBars.forEach((bar) => {
          if (bar.dataset.width) bar.style.width = bar.dataset.width;
        });
        skillObserver.disconnect();
      }
    });
  },
  { threshold: 0.4 },
);

const skillSection = document.querySelector("#Services");
if (skillSection) skillObserver.observe(skillSection);

// 5. FILTER BUTTONS — portfolio filter active state
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// 6. CONTACT FORM — success feedback
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector(".btn-submit");
  btn.textContent = "✅ Message Sent!";
  btn.style.background = "linear-gradient(135deg,#00d4aa,#0ea5e9)";
  setTimeout(() => {
    btn.textContent = "Send Message 🚀";
    btn.style.background = "";
    e.target.reset();
  }, 3000);
}

// 7. ACTIVE NAV LINK — highlight on scroll
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  let scrollY = window.pageYOffset;
  sections.forEach((sec) => {
    const offset = sec.offsetTop - 100;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");
    if (scrollY >= offset && scrollY < offset + height) {
      document.querySelectorAll(".nav-menu a").forEach((a) => {
        a.style.color = "";
      });
      const activeLink = document.querySelector(`.nav-menu a[href="#${id}"]`);
      if (activeLink) activeLink.style.color = "var(--primary)";
    }
  });
});

// ===== CONTACT FORM — Web3Forms =====
const form = document.getElementById("form");

if (form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const formResult = document.getElementById("form-result");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending... ⏳";
    submitBtn.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        // ✅ Success
        formResult.style.display = "block";
        formResult.style.background = "#d1fae5";
        formResult.style.color = "#065f46";
        formResult.style.border = "1px solid #6ee7b7";
        formResult.textContent = "✅ Message sent! I will reply soon.";
        submitBtn.textContent = "✅ Sent!";
        submitBtn.style.background = "linear-gradient(135deg,#00d4aa,#0ea5e9)";
        form.reset();
      } else {
        // ❌ Error
        formResult.style.display = "block";
        formResult.style.background = "#fee2e2";
        formResult.style.color = "#991b1b";
        formResult.style.border = "1px solid #fca5a5";
        formResult.textContent = "❌ Error: " + data.message;
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    } catch (error) {
      formResult.style.display = "block";
      formResult.style.background = "#fee2e2";
      formResult.style.color = "#991b1b";
      formResult.textContent = "❌ Something went wrong. Try again.";
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }

    // Hide result after 5 seconds
    setTimeout(() => {
      formResult.style.display = "none";
      submitBtn.textContent = originalText;
      submitBtn.style.background = "";
      submitBtn.disabled = false;
    }, 5000);
  });
}
