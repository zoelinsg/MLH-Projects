import { useMemo, useState } from 'react';
import './App.css';

const destinations = {
  tokyo: {
    title: 'Tokyo Night',
    vibe: 'Neon streets, late-night ramen, and cinematic city energy.',
    heroImage:
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1400&q=80',
    cards: [
      {
        title: 'City Lights',
        note: 'Bright urban mood for a night arrival.',
        image:
          'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80',
      },
      {
        title: 'Food Stop',
        note: 'Street food and warm small-restaurant energy.',
        image:
          'https://images.unsplash.com/photo-1554797589-7241bb691973?auto=format&fit=crop&w=900&q=80',
      },
      {
        title: 'Station Scene',
        note: 'Fast-moving transit and layered city life.',
        image:
          'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=900&q=80',
      },
      {
        title: 'Night Walk',
        note: 'Quiet alleys and glowing side streets.',
        image:
          'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=900&q=80',
      },
    ],
    notes: [
      'Best for travelers who enjoy urban exploration and food culture.',
      'Cloudinary-style delivery helps present the same destination in multiple visual layouts.',
      'This mood board emphasizes fast-loading destination previews and polished travel inspiration.',
    ],
  },
  beach: {
    title: 'Beach Escape',
    vibe: 'Soft sunlight, ocean air, and a slow relaxed weekend atmosphere.',
    heroImage:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
    cards: [
      {
        title: 'Ocean Horizon',
        note: 'A bright and open hero-style destination view.',
        image:
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
      },
      {
        title: 'Coastal Walk',
        note: 'Perfect for a slow morning itinerary.',
        image:
          'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80',
      },
      {
        title: 'Resort Mood',
        note: 'A calm stay focused on rest and scenery.',
        image:
          'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80',
      },
      {
        title: 'Sunset Scene',
        note: 'Warm color palette for an evening travel story.',
        image:
          'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=900&q=80',
      },
    ],
    notes: [
      'This destination set highlights calm visuals and wide scenic layouts.',
      'Cloudinary enhancements are useful for responsive travel galleries and banner-sized imagery.',
      'The board is designed to feel light, airy, and mobile-friendly.',
    ],
  },
  mountain: {
    title: 'Mountain Weekend',
    vibe: 'Fresh air, quiet cabins, and scenic routes for a restorative short trip.',
    heroImage:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80',
    cards: [
      {
        title: 'Valley View',
        note: 'Wide natural composition for a destination header.',
        image:
          'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
      },
      {
        title: 'Forest Trail',
        note: 'Great for activity highlights and trip cards.',
        image:
          'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      },
      {
        title: 'Cabin Mood',
        note: 'A cozy visual for stay recommendations.',
        image:
          'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80',
      },
      {
        title: 'Lake Stop',
        note: 'Balanced, calm composition for slower travel inspiration.',
        image:
          'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
      },
    ],
    notes: [
      'This board focuses on calm pacing, natural scenery, and layered landscape presentation.',
      'Cloudinary-style media handling helps create clean destination cards and responsive hero images.',
      'The overall experience is designed to feel peaceful, scenic, and curated.',
    ],
  },
};

const destinationOptions = [
  { label: 'Tokyo Night', value: 'tokyo' },
  { label: 'Beach Escape', value: 'beach' },
  { label: 'Mountain Weekend', value: 'mountain' },
];

function App() {
  const [selectedDestination, setSelectedDestination] = useState('tokyo');
  const [viewMode, setViewMode] = useState('grid');

  const activeDestination = destinations[selectedDestination];

  const featuredCards = useMemo(() => {
    if (viewMode === 'highlight') {
      return [
        activeDestination.cards[0],
        activeDestination.cards[1],
        activeDestination.cards[2],
      ];
    }

    return activeDestination.cards;
  }, [activeDestination, viewMode]);

  return (
    <div className="travel-app-shell">
      <div className="travel-glow travel-glow-left" />
      <div className="travel-glow travel-glow-right" />

      <main className="travel-app-container">
        <section className="travel-hero-card">
          <div className="travel-hero-copy">
            <span className="travel-badge">Cloudinary Enhanced Travel App</span>
            <h1>Travel Mood Board Enhanced</h1>
            <p className="travel-hero-text">
              A destination mood board app designed to present travel imagery in polished, flexible,
              and media-friendly layouts inspired by Cloudinary-powered delivery and visual
              enhancement workflows.
            </p>

            <div className="travel-controls">
              <div className="travel-control-group">
                <label htmlFor="destination">Destination Theme</label>
                <select
                  id="destination"
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                >
                  {destinationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="travel-control-group">
                <label htmlFor="viewMode">View Mode</label>
                <select
                  id="viewMode"
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value)}
                >
                  <option value="grid">Grid View</option>
                  <option value="highlight">Highlight View</option>
                </select>
              </div>
            </div>

            <div className="travel-summary-card">
              <p className="summary-label">Destination Mood</p>
              <h2>{activeDestination.title}</h2>
              <p>{activeDestination.vibe}</p>
            </div>
          </div>

          <div className="travel-hero-visual">
            <img
              src={activeDestination.heroImage}
              alt={activeDestination.title}
              className="travel-hero-image"
            />
          </div>
        </section>

        <section className="travel-gallery-section">
          <div className="section-heading">
            <h2>Mood Board Gallery</h2>
            <p>
              This gallery presents destination imagery in a structured layout, similar to how a
              travel app could use Cloudinary to manage hero images, cards, and responsive media
              blocks.
            </p>
          </div>

          <div className={viewMode === 'highlight' ? 'highlight-layout' : 'travel-gallery-grid'}>
            {featuredCards.map((card) => (
              <article className="travel-image-card" key={card.title}>
                <img src={card.image} alt={card.title} className="travel-card-image" />
                <div className="travel-card-body">
                  <h3>{card.title}</h3>
                  <p>{card.note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="travel-notes-section">
          <div className="section-heading">
            <h2>Travel Notes</h2>
            <p>
              These notes explain how media presentation improves the travel browsing experience and
              makes destination content feel more curated.
            </p>
          </div>

          <div className="travel-notes-list">
            {activeDestination.notes.map((note) => (
              <div className="travel-note-card" key={note}>
                <p>{note}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;