import { useMemo, useState } from 'react';
import './App.css';

const demoImages = {
  lifestyle:
    'https://images.unsplash.com/photo-1511300636408-a63a89df3482?auto=format&fit=crop&w=1200&q=80',
  nature:
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  city:
    'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80',
};

const presetOptions = [
  { label: 'Lifestyle Scene', value: 'lifestyle' },
  { label: 'Nature View', value: 'nature' },
  { label: 'City Scene', value: 'city' },
];

function App() {
  const [selectedPreset, setSelectedPreset] = useState('lifestyle');
  const [projectTitle, setProjectTitle] = useState('AI Photo Remix Studio');

  const originalImage = demoImages[selectedPreset];

  const remixCards = useMemo(() => {
    return [
      {
        title: 'Original Preview',
        subtitle: 'Base image before remix',
        image: `${originalImage}&w=900&h=900`,
      },
      {
        title: 'Square Crop',
        subtitle: 'Avatar-style crop for profile layouts',
        image: `${originalImage}&fit=crop&w=700&h=700`,
      },
      {
        title: 'Portrait Frame',
        subtitle: 'Vertical layout for stories and mobile previews',
        image: `${originalImage}&fit=crop&w=700&h=980`,
      },
      {
        title: 'Wide Social Banner',
        subtitle: 'Hero-style format for blog or social headers',
        image: `${originalImage}&fit=crop&w=1200&h=675`,
      },
    ];
  }, [originalImage]);

  return (
    <div className="app-shell">
      <div className="app-background-glow app-background-glow-left" />
      <div className="app-background-glow app-background-glow-right" />

      <main className="app-container">
        <section className="hero-card">
          <div className="hero-copy">
            <span className="hero-badge">Cloudinary AI Remix Demo</span>
            <h1>{projectTitle}</h1>
            <p className="hero-text">
              A React-based image remix studio for exploring Cloudinary-style transformations,
              visual layouts, and optimized media presentation.
            </p>

            <div className="hero-controls">
              <div className="control-group">
                <label htmlFor="projectTitle">Project Title</label>
                <input
                  id="projectTitle"
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="Enter project title"
                />
              </div>

              <div className="control-group">
                <label htmlFor="preset">Demo Image</label>
                <select
                  id="preset"
                  value={selectedPreset}
                  onChange={(e) => setSelectedPreset(e.target.value)}
                >
                  {presetOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="hero-preview-card">
            <p className="preview-label">Featured Preview</p>
            <img
              src={originalImage}
              alt="Selected demo preview"
              className="hero-preview-image"
            />
          </div>
        </section>

        <section className="upload-panel">
          <div className="section-heading">
            <h2>Upload Flow Preview</h2>
            <p>
              This section is designed for a Cloudinary-powered upload flow, where a selected image
              can be previewed across multiple remix formats and presentation styles.
            </p>
          </div>

          <div className="upload-placeholder">
            <div className="upload-icon">↑</div>
            <h3>Image Upload Placeholder</h3>
            <p>
              This upload area is reserved for Cloudinary starter-kit integration, allowing users to
              upload a source image and instantly preview remixed outputs.
            </p>
            <button type="button">Upload Integration Ready</button>
          </div>
        </section>

        <section className="gallery-section">
          <div className="section-heading">
            <h2>Remix Gallery</h2>
            <p>
              One selected image can be adapted into multiple presentation formats for profile cards,
              mobile layouts, and wide social banners.
            </p>
          </div>

          <div className="gallery-grid">
            {remixCards.map((card) => (
              <article className="image-card" key={card.title}>
                <img
                  src={card.image}
                  alt={card.title}
                  className="image-card-preview"
                />
                <div className="image-card-body">
                  <h3>{card.title}</h3>
                  <p>{card.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="notes-section">
          <div className="section-heading">
            <h2>Project Notes</h2>
            <p>
              This project is structured as a React image remix playground that can evolve into a
              fuller Cloudinary AI demo with upload, transformation, and optimized delivery
              features.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;