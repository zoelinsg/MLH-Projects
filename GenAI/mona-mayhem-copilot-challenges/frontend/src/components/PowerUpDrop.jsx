export default function PowerUpDrop({ powerUp, onCollect }) {
  return (
    <article className="powerup-drop" style={{ borderColor: powerUp.type.color }}>
      <div className="powerup-badge" style={{ backgroundColor: powerUp.type.color }}>
        {powerUp.type.label}
      </div>
      <p className="powerup-description">{powerUp.type.description}</p>
      <button className="powerup-button" type="button" onClick={() => onCollect(powerUp.id)}>
        Collect
      </button>
    </article>
  )
}
