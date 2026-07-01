// macOS-style traffic-light window controls.
// When `onClose` is set, the red and yellow dots act as buttons that close
// the window; otherwise all three are purely decorative.
export default function WindowDots({ onClose }: { onClose?: () => void }) {
  if (!onClose) {
    return (
      <div className="flex gap-1.5">
        <span className="size-3 rounded-full bg-red-500"></span>
        <span className="size-3 rounded-full bg-yellow-500"></span>
        <span className="size-3 rounded-full bg-green-500"></span>
      </div>
    );
  }

  return (
    <div className="flex gap-1.5">
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="size-3 rounded-full bg-red-500 hover:brightness-90"
      ></button>
      <button
        type="button"
        onClick={onClose}
        aria-label="Minimizar"
        className="size-3 rounded-full bg-yellow-500 hover:brightness-90"
      ></button>
      <span className="size-3 rounded-full bg-green-500"></span>
    </div>
  );
}
