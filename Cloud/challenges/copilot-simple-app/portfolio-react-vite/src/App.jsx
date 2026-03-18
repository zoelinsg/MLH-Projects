import { useMemo } from 'react'
import Navbar from './components/Navbar'
import ProjectCard from './components/ProjectCard'
import Section from './components/Section'
import { projects, skills } from './data'
import './App.css'

function App() {

  const projectCards = useMemo(
    () => projects.map((project) => <ProjectCard key={project.id} project={project} />),
    [projects],
  )

  return (
    <div className="app">
      <Navbar />
      <main className="main" id="top">
        <Section id="hero" label="Home" enableOverflow>
          <div className="hero">
            <h1 className="hero-title">Hi, I&apos;m Zoe.</h1>
            <p className="hero-subtitle">
              I build web experiences with React, Vite, and modern JavaScript.
            </p>
            <div className="hero-actions">
              <a className="button" href="#projects">
                View projects
              </a>
            </div>
          </div>
        </Section>

        <Section id="skills" label="Skills">
          <div className="grid grid--skills">
            {skills.map((skill) => (
              <div key={skill} className="pill">
                {skill}
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" label="Projects">
          <div className="grid grid--projects">{projectCards}</div>
        </Section>

      </main>

      <footer className="footer">
        <p>Built with React + Vite. Theme saved to localStorage.</p>
      </footer>
    </div>
  )
}

export default App
