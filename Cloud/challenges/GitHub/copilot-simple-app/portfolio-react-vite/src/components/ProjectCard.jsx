export default function ProjectCard({ project }) {
  return (
    <article className="card">
      <h3 className="card__title">{project.title}</h3>
      <p className="card__description">{project.description}</p>
      <div className="card__footer">
        <div className="card__tech">
          {project.tech.map((tech) => (
            <span key={tech} className="pill pill--micro">
              {tech}
            </span>
          ))}
        </div>
        <div className="card__links">
          {project.link && (
            <a className="card__link" href={project.link} target="_blank" rel="noreferrer">
              Live
            </a>
          )}
          {project.repo && (
            <a className="card__link" href={project.repo} target="_blank" rel="noreferrer">
              Repo
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
