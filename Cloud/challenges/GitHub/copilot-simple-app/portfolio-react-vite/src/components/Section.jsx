export default function Section({ id, label, children, enableOverflow = false }) {
  return (
    <section id={id} className="section" aria-label={label}>
      <div className="section__header">
        <h2 className="section__title">{label}</h2>
      </div>
      <div className={enableOverflow ? 'section__content section__content--overflow' : 'section__content'}>
        {children}
      </div>
    </section>
  )
}
