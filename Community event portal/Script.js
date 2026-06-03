/* ================================================================
   script.js — CityConnect Local Community Event Portal
   JavaScript Exercises 1–14: All covered
   ================================================================ */

/* ── Exercise 1: Basics ── */
console.log("Welcome to the Community Portal");

/* ── Exercise 2: Data Types & Operators ── */
const portalName = "CityConnect";          // const for fixed data
const launchDate = "2025-01-01";
let totalSeats   = 200;                     // let for mutable

const portalInfo = `${portalName} launched on ${launchDate}. Seats: ${totalSeats}`;
console.log(portalInfo);

/* ── Exercise 5: Constructor + Prototype ── */
function Event(id, name, category, date, seats, fee, location) {
  this.id       = id;
  this.name     = name;
  this.category = category;
  this.date     = date;
  this.seats    = seats;
  this.fee      = fee;
  this.location = location;
}

Event.prototype.checkAvailability = function () {
  return this.seats > 0;
};

function logEvent(ev) {
  // Exercise 5: Object.entries
  Object.entries(ev).forEach(([k, v]) => console.log(`  ${k}: ${v}`));
}

/* ── Exercise 6: Arrays ── */
let eventsData = [
  new Event(1, "Annual Music Fest",    "music",    "2025-08-10",  80, 150, "Marina Beach"),
  new Event(2, "Baking Workshop",      "workshop", "2025-07-14",  15, 200, "Community Centre"),
  new Event(3, "City Marathon",        "sports",   "2025-09-05", 200,   0, "Adyar"),
  new Event(4, "Street Food Festival", "food",     "2025-08-22", 500,  50, "T. Nagar"),
  new Event(5, "Tech Talk: Cyber",     "workshop", "2025-07-01",  40,   0, "IIT Madras"),
  new Event(6, "Kids Art Show",        "workshop", "2025-10-12",  60,  30, "Mylapore Hall"),
];

// .push() — Exercise 6
function addEvent(ev) { eventsData.push(ev); }

// .filter() for music — Exercise 6
function getMusicEvents() { return eventsData.filter(e => e.category === "music"); }

// .map() to format display — Exercise 6
function formatCard(ev) {
  return `${ev.category.charAt(0).toUpperCase() + ev.category.slice(1)}: ${ev.name}`;
}

/* ── Exercise 4: Closures — registration tracker ── */
function makeTracker() {
  const counts = {};
  return {
    register(cat)  { counts[cat] = (counts[cat] || 0) + 1; },
    getCount(cat)  { return counts[cat] || 0; },
    getAll()       { return { ...counts }; }
  };
}
const tracker = makeTracker();

/* ── Exercise 4: Higher-order functions ── */
function filterEventsByCategory(events, predicate) {
  return events.filter(predicate);
}

/* ── Exercise 4: Default parameters ── */
function addNewEvent(name, category, date, seats = 50, fee = 0, location = "TBD") {
  const id = eventsData.length + 1;
  const ev = new Event(id, name, category, date, seats, fee, location);
  addEvent(ev);
  logEvent(ev);
  renderEvents(getCurrentFiltered());
  renderAdminTable();
  showToast(`Event "${name}" added!`, "success");
}

/* Public alias for demo button */
function addDemoEvent() {
  addNewEvent("New Community Event", "workshop", "2025-12-01", 30, 0, "City Hall");
}

/* ── Exercise 9: Async / Await — fetch from mock API ── */
async function fetchEventsFromAPI() {
  try {
    const res  = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=3");
    const data = await res.json();
    console.log("API fetch result:", data);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}
fetchEventsFromAPI();

/* ── Exercise 9: Promises ── */
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then(r => r.json())
  .then(d => console.log("Promise result:", d))
  .catch(e => console.error("Promise error:", e));

/* ── Exercise 10: Spread to clone before filter ── */
function getFilteredClone(category) {
  const clone = [...eventsData];
  return clone.filter(e => e.category === category);
}

/* ── Exercise 10: Destructuring ── */
function logFirstEvent() {
  const [first] = eventsData;
  const { name, date, location } = first;
  console.log(`First: ${name} on ${date} @ ${location}`);
}
logFirstEvent();

/* ================================================================
   Exercise 7: DOM Manipulation — Render event cards
   ================================================================ */
function renderEvents(events) {
  const container = document.getElementById("eventsContainer");
  if (!container) return;
  container.innerHTML = "";

  // Exercise 3: if-else / forEach
  if (events.length === 0) {
    container.innerHTML = `<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:3rem 0;font-size:0.95rem;">No events match your search.</p>`;
    return;
  }

  events.forEach(ev => {
    // Exercise 3: if-else — hide past or full events
    const isPast = new Date(ev.date) < new Date();
    const available = ev.checkAvailability();

    // Exercise 7: createElement + append
    const card = document.createElement("div");
    card.className = "eventCard";
    card.dataset.category = ev.category;
    card.dataset.id       = ev.id;

    // Exercise 6: .map() formatted string
    console.log(formatCard(ev));

    const feeText   = ev.fee === 0 ? "FREE" : `₹${ev.fee}`;
    const seatsClass = ev.seats <= 20 ? "seats-badge low" : "seats-badge ok";

    card.innerHTML = `
      <div class="cat-tag">${ev.category}</div>
      <h3>${ev.name}</h3>
      <p class="event-meta">
        📅 ${ev.date}<br/>
        📍 ${ev.location}<br/>
        🎫 ${feeText}
        ${isPast ? '<br/><span style="color:var(--error);font-size:0.75rem;">● Past event</span>' : ''}
      </p>
      <p class="${seatsClass}">
        ${available ? `✔ ${ev.seats} seats available` : "✘ Fully Booked"}
      </p>
      <button class="cta-button${available ? '' : ' ghost'} small"
        onclick="registerForEvent(${ev.id})"
        ${!available ? 'disabled style="opacity:0.4;cursor:not-allowed"' : ''}>
        ${available ? "Register" : "Sold Out"}
      </button>
    `;

    container.appendChild(card);
  });
}

/* ── Exercise 8: onclick Register ── */
function registerForEvent(id) {
  // Exercise 3: try-catch
  try {
    const ev = eventsData.find(e => e.id === id);
    if (!ev)                      throw new Error("Event not found.");
    if (!ev.checkAvailability())  throw new Error("Event is fully booked.");

    ev.seats--;              // Exercise 2: --
    totalSeats--;
    tracker.register(ev.category);
    renderTrackerDisplay();

    console.log(`[Step 1] Registered for: ${ev.name}`);
    console.log(`[Step 2] Remaining seats: ${ev.seats}`);
    console.log(`[Step 3] Tracker state:`, tracker.getAll());

    renderEvents(getCurrentFiltered());
    renderAdminTable();

    // Exercise 12: POST to mock API
    sendRegistration({ eventName: ev.name, category: ev.category });
    showToast(`✔ Registered for "${ev.name}"`, "success");
  } catch (err) {
    console.error("Registration error:", err.message);
    showToast(`✘ ${err.message}`, "error");
  }
}

/* ── Exercise 7: Render Admin Table ── */
function renderAdminTable() {
  const tbody = document.getElementById("adminTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  eventsData.forEach(ev => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${ev.name}</td>
      <td>${ev.category}</td>
      <td>${ev.date}</td>
      <td>${ev.seats}</td>
      <td>${ev.fee === 0 ? "FREE" : "₹" + ev.fee}</td>
      <td>${ev.checkAvailability() ? "✔ Open" : "✘ Full"}</td>
    `;
    tbody.appendChild(tr);
  });
}

/* ── Exercise 8: onchange filter + keydown search ── */
let activeCategory = "all";

function setCategoryFilter(btn, cat) {
  activeCategory = cat;
  document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
  btn.classList.add("active");
  renderEvents(getCurrentFiltered());
}

function searchEvents() {
  renderEvents(getCurrentFiltered());
}

function getCurrentFiltered() {
  const q   = document.getElementById("searchInput")?.value.toLowerCase() || "";
  return eventsData.filter(ev => {
    const matchCat  = activeCategory === "all" || ev.category === activeCategory;
    const matchText = ev.name.toLowerCase().includes(q) || ev.location.toLowerCase().includes(q);
    return matchCat && matchText;
  });
}

/* ── Exercise 6: onblur phone validation ── */
function validatePhone() {
  const val = document.getElementById("phoneNo").value.trim();
  const err = document.getElementById("phoneError");
  if (val && !/^[+]?[\d\s\-]{7,15}$/.test(val)) {
    err.textContent = "Please enter a valid phone number.";
  } else {
    err.textContent = "";
  }
}

/* ── Exercise 6: onchange — show fee ── */
const feeLookup = { music: "₹150", workshop: "₹200", sports: "FREE", food: "₹50" };
function showEventFee() {
  const type = document.getElementById("eventType").value;
  const el   = document.getElementById("eventFeeDisplay");
  el.textContent = type ? `Entry fee: ${feeLookup[type]}` : "";
}

/* ── Exercise 6: keyup character counter ── */
function countChars() {
  const text = document.getElementById("messageBox").value;
  const fill = document.getElementById("charBarFill");
  const ct   = document.getElementById("charCount");
  const pct  = Math.min((text.length / 300) * 100, 100);
  fill.style.width      = pct + "%";
  fill.style.background = pct > 90 ? "var(--error)" : "var(--accent)";
  ct.textContent = `${text.length} / 300`;
  if (text.length > 300)
    document.getElementById("messageBox").value = text.slice(0, 300);
}

function countFeedbackChars() {
  const len = document.getElementById("feedbackText").value.length;
  document.getElementById("feedbackCharCount").textContent = `${len} characters`;
}

/* ── Exercise 11: Form — validate & submit ── */
function submitForm(e) {
  e.preventDefault();   // prevent default

  const name  = document.getElementById("fullName").value.trim();
  const email = document.getElementById("emailAddr").value.trim();
  const date  = document.getElementById("eventDate").value;
  const type  = document.getElementById("eventType").value;
  const out   = document.getElementById("formOutput");

  let valid = true;

  // Inline validation
  if (!name) {
    document.getElementById("nameError").textContent = "Name is required.";
    valid = false;
  } else { document.getElementById("nameError").textContent = ""; }

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    document.getElementById("emailError").textContent = "Valid email is required.";
    valid = false;
  } else { document.getElementById("emailError").textContent = ""; }

  if (!valid) return;

  // Exercise 8: localStorage
  if (document.getElementById("savePrefs").checked && type) {
    localStorage.setItem("preferredEventType", type);
    displaySavedPref();
  }

  // Exercise 12: fetch POST
  sendRegistration({ name, email, date, eventType: type });

  out.textContent = `🎉 Thank you, ${name}! Registered for "${type}" on ${date}.`;
  out.className   = "form-output success";

  // Reset
  e.target.reset();
  document.getElementById("eventFeeDisplay").textContent = "";
  document.getElementById("charCount").textContent = "0 / 300";
  document.getElementById("charBarFill").style.width = "0%";
}

/* ── Exercise 12: AJAX & Fetch ── */
async function sendRegistration(data) {
  console.log("[Fetch Step 1] Sending data:", data);
  try {
    const res    = await fetch("https://httpbin.org/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    console.log("[Fetch Step 2] Server response received:", result.json || result);
    // Exercise 12: setTimeout simulate delay
    setTimeout(() => console.log("[Fetch Step 3] Confirmation logged."), 1500);
  } catch (err) {
    console.error("[Fetch Error]", err);
  }
}

/* ── Exercise 6: Feedback submit — onclick ── */
function submitFeedback() {
  const name = document.getElementById("feedbackName").value.trim();
  const text = document.getElementById("feedbackText").value.trim();
  const msg  = document.getElementById("feedbackMsg");

  if (!text) {
    msg.textContent = "Please write something before submitting.";
    msg.className   = "form-output error";
    return;
  }
  msg.textContent = `✔ Thank you${name ? ", " + name : ""}! We've received your feedback.`;
  msg.className   = "form-output success";
  document.getElementById("feedbackName").value = "";
  document.getElementById("feedbackText").value = "";
  document.getElementById("feedbackCharCount").textContent = "0 characters";
}

/* ── HTML Exercise 7: Video events ── */
function videoReady() {
  const el = document.getElementById("videoStatus");
  if (el) el.textContent = "▶ Video ready to play!";
}

/* ── HTML Exercise 6: ondblclick — lightbox ── */
function enlargeImage(src, caption) {
  const lb  = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");
  const cap = document.getElementById("lightboxCaption");
  img.src = src;
  if (cap) cap.textContent = caption;
  lb.classList.add("active");
}
function closeLightbox() {
  document.getElementById("lightbox").classList.remove("active");
}

/* ── HTML Exercise 9: Geolocation ── */
function findNearbyEvents() {
  const el = document.getElementById("geoResult");
  el.textContent = "📡 Detecting location…";

  if (!navigator.geolocation) {
    el.textContent = "✘ Geolocation not supported by your browser."; return;
  }

  navigator.geolocation.getCurrentPosition(
    ({ coords: { latitude, longitude, accuracy } }) => {
      el.textContent = `✔ Found you: ${latitude.toFixed(4)}°N, ${longitude.toFixed(4)}°E (±${Math.round(accuracy)}m). Showing nearby events…`;
    },
    err => {
      const msgs = {
        [err.PERMISSION_DENIED]:      "✘ Location access denied.",
        [err.POSITION_UNAVAILABLE]:   "✘ Location unavailable.",
        [err.TIMEOUT]:                "✘ Request timed out."
      };
      el.textContent = msgs[err.code] || "✘ Unknown error.";
    },
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
  );
}

/* ── HTML Exercise 8: localStorage preference ── */
function loadSavedPreferences() {
  const saved = localStorage.getItem("preferredEventType");
  if (saved) {
    const sel = document.getElementById("eventType");
    if (sel) { sel.value = saved; showEventFee(); }
    displaySavedPref();
  }
}
function displaySavedPref() {
  const saved = localStorage.getItem("preferredEventType");
  const el    = document.getElementById("savedPrefDisplay");
  if (el) el.textContent = saved
    ? saved.charAt(0).toUpperCase() + saved.slice(1)
    : "None saved";
}
function clearPreferences() {
  localStorage.clear(); sessionStorage.clear();
  displaySavedPref();
  showToast("Preferences cleared", "success");
}

/* ── Exercise 10: Theme toggle — destructuring + spread ── */
function toggleTheme() {
  // Destructuring
  const { classList } = document.body;
  classList.toggle("light");
  const btn = document.getElementById("themeToggle");
  btn.textContent = classList.contains("light") ? "☀" : "☽";
  localStorage.setItem("theme", classList.contains("light") ? "light" : "dark");
}

/* ── Tracker display for registration form ── */
function renderTrackerDisplay() {
  const el = document.getElementById("trackerDisplay");
  if (!el) return;
  const all = tracker.getAll();
  if (!Object.keys(all).length) {
    el.innerHTML = `<p style="font-size:0.82rem;color:var(--text-dim);">No registrations yet this session.</p>`;
    return;
  }
  el.innerHTML = Object.entries(all).map(([cat, count]) =>
    `<div class="tracker-item"><span>${cat}</span><strong>${count}</strong></div>`
  ).join('');
}

/* ── Exercise 14: jQuery equivalents (pure JS) ──
   jQuery: $('#registerBtn').click(fn)  → document.getElementById('registerBtn').addEventListener('click', fn)
   jQuery: .fadeIn()/.fadeOut()         → done via CSS opacity transition in .eventCard
   Benefit of React/Vue: Component-based architecture, virtual DOM, reusable state management.
*/
function jQueryDemo() {
  // Pure JS equiv of $('#registerBtn').click(...)
  const btn = document.getElementById("registerBtn");
  if (btn) btn.addEventListener("click", () => console.log("[jQuery equiv] Register clicked"));
}

/* ── Exercise 13: Global error handler (Debugging) ── */
window.onerror = (msg, src, line, col, err) => {
  console.error(`[Global Error] ${msg} at ${src}:${line}:${col}`, err);
};

/* ── Toast helper ── */
function showToast(msg, type = "success") {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast"; document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className   = `show ${type}`;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { toast.className = type; }, 3000);
}

/* ── Cursor blob tracking ── */
document.addEventListener("mousemove", e => {
  const blob = document.getElementById("cursorBlob");
  if (blob) { blob.style.left = e.clientX + "px"; blob.style.top = e.clientY + "px"; }
});

/* ── Mobile nav ── */
function toggleMobileNav() {
  document.getElementById("mainNav").classList.toggle("open");
}

/* ── Sticky header shadow ── */
window.addEventListener("scroll", () => {
  const h = document.getElementById("mainHeader");
  if (h) h.style.boxShadow = window.scrollY > 20 ? "0 2px 30px rgba(0,0,0,0.4)" : "none";
});

/* ── Scroll-reveal cards ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.style.opacity    = "1";
      en.target.style.transform  = "translateY(0)";
    }
  });
}, { threshold: 0.1 });

/* ================================================================
   INIT — window.load (Exercise 1)
   ================================================================ */
window.addEventListener("load", () => {
  // Hide loader
  const loader = document.getElementById("loader");
  if (loader) setTimeout(() => loader.classList.add("hide"), 600);

  // Restore theme
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    const btn = document.getElementById("themeToggle");
    if (btn) btn.textContent = "☀";
  }

  loadSavedPreferences();  // Exercise 8
  renderEvents(eventsData); // Exercise 7
  renderAdminTable();
  renderTrackerDisplay();
  jQueryDemo();

  // Observe eventCards for scroll-reveal
  document.querySelectorAll(".eventCard").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    observer.observe(el);
  });

  // Re-observe after render (cards added dynamically)
  setTimeout(() => {
    document.querySelectorAll(".eventCard").forEach(el => observer.observe(el));
  }, 100);

  console.log("Portal loaded. Events:", eventsData.length);
  console.log("Music events:", getMusicEvents().map(e => e.name));
  console.log("Filtered clone:", getFilteredClone("sports").map(e => e.name));
});