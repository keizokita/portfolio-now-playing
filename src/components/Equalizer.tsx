export function Equalizer({ paused = false, className = "" }: { paused?: boolean; className?: string }) {
  return (
    <span className={`eq ${className}`} data-paused={paused} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}
