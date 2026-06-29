import { cn } from "@/lib/helpers/cn";

export default function Navigator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-xl bg-white text-neutral-800 shadow-2xl select-none",
        className,
      )}
    >
      {/* browser chrome */}
      <div className="flex items-center gap-3 border-b border-neutral-200 bg-neutral-100 px-4 py-2">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-red-500"></span>
          <span className="size-3 rounded-full bg-yellow-500"></span>
          <span className="size-3 rounded-full bg-green-500"></span>
        </div>

        {/* nav controls */}
        <div className="flex items-center gap-1 text-lg leading-none text-neutral-400">
          <button
            type="button"
            className="grid size-7 place-items-center rounded hover:bg-neutral-200 disabled:opacity-40"
            disabled
            aria-label="Back"
          >
            &#8249;
          </button>
          <button
            type="button"
            className="grid size-7 place-items-center rounded hover:bg-neutral-200 disabled:opacity-40"
            disabled
            aria-label="Forward"
          >
            &#8250;
          </button>
        </div>

        {/* address bar */}
        <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-3 py-1 text-sm text-neutral-400 ring-1 ring-neutral-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span>about:blank</span>
        </div>
      </div>

      {/* page content — blank for now */}
      <div className="flex-1 bg-white"></div>
    </div>
  );
}
