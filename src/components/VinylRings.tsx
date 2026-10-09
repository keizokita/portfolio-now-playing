// Marca geométrica simples (anéis de vinil), usada como textura nas capas.
export function VinylRings({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className}>
      <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="100" cy="100" r="34" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="100" cy="100" r="8" fill="currentColor" />
    </svg>
  );
}
