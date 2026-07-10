/*
  script.js
  - Beginner-friendly JavaScript for the Community Event Calendar
  - Renders an in-memory list of events, supports search, category filtering,
    viewing details, and adding new events via a simple form.
*/

// -----------------------------
// In-memory example events (nonprofit & community focused)
// -----------------------------
const events = [
  {
    id: 'evt-' + Date.now(),
    title: 'Neighborhood Food Donation Drive',
    category: 'Community',
    date: '2026-07-05',
    location: 'Community Hall Parking Lot',
    description: 'Collect non-perishable food to support local food banks. Bring canned goods or toiletries — volunteers will help sort donations.'
  },
  {
    id: 'evt-' + (Date.now() + 1),
    title: 'Riverside Volunteer Clean-up',
    category: 'Volunteer',
    date: '2026-07-10',
    location: 'Riverside Park',
    description: 'Help restore our riverside: remove litter, plant native flowers, and improve trails. All ages welcome; tools and safety gear provided.'
  },
  {
    id: 'evt-' + (Date.now() + 2),
    title: 'Neighborhood Tutoring Sessions',
    category: 'Education',
    date: '2026-07-22',
    location: 'Library Tutoring Room',
    description: 'Volunteer tutors offer free one-on-one help for students in reading and math. Sign up for a 45-minute slot.'
  },
  {
    id: 'evt-' + (Date.now() + 3),
    title: 'Health Awareness Workshop: Heart Health',
    category: 'Workshop',
    date: '2026-08-02',
    location: 'Community Center Auditorium',
    description: 'Local healthcare providers present tips on heart health, nutrition, and easy exercises. Free screening available on arrival.'
  },
  {
    id: 'evt-' + (Date.now() + 4),
    title: 'Community Fundraising Walk',
    category: 'Fundraiser',
    date: '2026-07-30',
    location: 'Town Hall to Riverside Loop',
    description: 'A short community walk to raise funds for youth programs. Family-friendly route, pledge options available, and a small post-walk celebration.'
  },
  {
    id: 'evt-' + (Date.now() + 5),
    title: 'Youth Summer Learning Program',
    category: 'Education',
    date: '2026-08-12',
    location: 'Youth Center',
    description: 'Five-day program offering hands-on STEM activities, reading circles, and mentorship. Scholarships available for families in need.'
  }
];

// -----------------------------
// DOM Elements
// -----------------------------
// Cache main interactive elements from the page so we can attach listeners.
const eventsContainer = document.getElementById('eventsContainer');
const searchInput = document.getElementById('searchInput');
const categoryFilters = document.getElementById('categoryFilters');
const addEventModal = document.getElementById('addEventModal');
const addEventForm = document.getElementById('addEventForm');
const openAddBtn = document.getElementById('open-add-event');
const closeAddBtn = document.getElementById('closeAddEvent');
const cancelAddBtn = document.getElementById('cancelAdd');
const detailsModal = document.getElementById('detailsModal');
const detailsContent = document.getElementById('detailsContent');
const closeDetailsBtn = document.getElementById('closeDetails');

// Track last focused element before opening modal so we can return focus on close.
let lastFocusedElement = null;

// State for current filters
let currentCategory = 'All';
let currentSearch = '';

// -----------------------------
// Rendering functions
// -----------------------------

// Format date nicely (simple helper)
function formatDate(dateStr) {
  try {
    const d = new Date(dateStr + 'T00:00');
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch (e) {
    return dateStr;
  }
}

// Create a single event card element
function createEventCard(event) {
  const article = document.createElement('article');
  article.className = 'card';
  // Accessibility: each card acts as a list item in the events list
  article.setAttribute('role', 'listitem');

  article.innerHTML = `
    <div class="meta">
      <span class="small">${formatDate(event.date)}</span>
      <span class="badge ${event.category}">${event.category}</span>
    </div>
    <h3>${escapeHtml(event.title)}</h3>
    <p class="small">${escapeHtml(event.location || '')}</p>
    <p>${escapeHtml(truncate(event.description || '', 120))}</p>
    <div class="card-actions">
      <!-- Details button includes aria-label for screen readers -->
      <button class="btn" data-action="details" data-id="${event.id}" aria-label="View details for ${escapeHtml(event.title)}">Details</button>
    </div>
  `;

  return article;
}

// Render the events list based on current filters
function renderEvents() {
  // Apply filters: category and search keyword
  const filtered = events.filter(evt => {
    const matchesCategory = currentCategory === 'All' || evt.category === currentCategory;
    const search = currentSearch.trim().toLowerCase();
    const hay = (evt.title + ' ' + (evt.location||'') + ' ' + (evt.description||'')).toLowerCase();
    const matchesSearch = search === '' || hay.includes(search);
    return matchesCategory && matchesSearch;
  });

  // Clear container and append cards
  eventsContainer.innerHTML = '';
  if (filtered.length === 0) {
    eventsContainer.innerHTML = '<p class="muted">No events match your search or filters.</p>';
    return;
  }

  filtered.forEach(evt => {
    const card = createEventCard(evt);
    eventsContainer.appendChild(card);
  });
}

// -----------------------------
// Utilities
// -----------------------------

// Very small HTML escaper to avoid inserting raw HTML from data
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function truncate(str, n) {
  return str.length > n ? str.slice(0, n-1) + '…' : str;
}

// Find event by id
function findEventById(id) {
  return events.find(e => e.id === id);
}

// -----------------------------
// Event handlers
// -----------------------------

// Category button clicks (event delegation)
categoryFilters.addEventListener('click', (e) => {
  const btn = e.target.closest('.cat-btn');
  if (!btn) return;
  // Update active state and aria-pressed for accessibility
  document.querySelectorAll('#categoryFilters .cat-btn').forEach(b => {
    b.setAttribute('aria-pressed', 'false');
  });
  btn.setAttribute('aria-pressed', 'true');
  currentCategory = btn.dataset.category || 'All';
  renderEvents();
});

// Search input
searchInput.addEventListener('input', (e) => {
  currentSearch = e.target.value;
  renderEvents();
});

// Details and card actions (event delegation on container)
eventsContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action="details"]');
  if (!btn) return;
  const id = btn.dataset.id;
  const evt = findEventById(id);
  if (evt) showDetails(evt);
});

// Open add event modal
openAddBtn.addEventListener('click', () => {
  // Save last focused element so we can restore focus when the modal closes
  lastFocusedElement = document.activeElement;
  openModal(addEventModal);
  // Focus the first input in the form for keyboard users
  const first = document.getElementById('evTitle');
  if (first) first.focus();
});

// Close add event modal buttons
closeAddBtn.addEventListener('click', () => closeModal(addEventModal));
cancelAddBtn.addEventListener('click', () => closeModal(addEventModal));

// Close details modal
closeDetailsBtn.addEventListener('click', () => closeModal(detailsModal));

// Submit add event form
addEventForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Read values from the form (simple and explicit)
  const title = document.getElementById('evTitle').value.trim();
  const date = document.getElementById('evDate').value;
  const time = document.getElementById('evTime').value;
  const category = document.getElementById('evCategory').value;
  const location = document.getElementById('evLocation').value.trim();
  const description = document.getElementById('evDescription').value.trim();

  if (!title || !date) {
    alert('Please provide at least a title and date for the event.');
    return;
  }

  const newEvent = {
    id: 'evt-' + Date.now(),
    title,
    category,
    date,
    location,
    description
  };

  // Add to the in-memory array and re-render
  events.push(newEvent);
  // Reset form and close modal
  addEventForm.reset();
  closeModal(addEventModal);
  // Keep current filters/search applied when showing the new event list
  renderEvents();
});

// -----------------------------
// Detail view
// -----------------------------
function showDetails(event) {
  // Fill the details content with accessible markup
  detailsContent.innerHTML = `
    <div style="padding:10px 0">
      <p class="small">${formatDate(event.date)} &middot; ${escapeHtml(event.location || '')}</p>
      <h3>${escapeHtml(event.title)}</h3>
      <p>${escapeHtml(event.description || 'No description provided.')}</p>
      <p class="small">Category: <strong>${escapeHtml(event.category)}</strong></p>
    </div>
  `;
  lastFocusedElement = document.activeElement;
  openModal(detailsModal);
  // Move focus to the close button so keyboard users can dismiss easily
  closeDetailsBtn.focus();
}

// -----------------------------
// Modal helpers (toggle using aria-hidden for CSS)
// -----------------------------
function openModal(modalEl) {
  modalEl.setAttribute('aria-hidden', 'false');
}
function closeModal(modalEl) {
  modalEl.setAttribute('aria-hidden', 'true');
  // Restore focus to the element that triggered the modal, if possible
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

// -----------------------------
// Initialize the UI
// -----------------------------
function init() {
  // Ensure category 'All' is active by default
  const allBtn = document.querySelector('#categoryFilters .cat-btn[data-category="All"]');
  if (allBtn) {
    // Use aria-pressed for accessibility and visual state
    allBtn.setAttribute('aria-pressed', 'true');
  }

  renderEvents();
}

// Run init after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Close any open modal on Escape key for improved keyboard accessibility
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' || e.key === 'Esc') {
    if (addEventModal.getAttribute('aria-hidden') === 'false') closeModal(addEventModal);
    if (detailsModal.getAttribute('aria-hidden') === 'false') closeModal(detailsModal);
  }
});

/* End of script.js */
