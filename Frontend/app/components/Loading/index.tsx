export function Loading() {
  return (
    <div className="relative w-64 h-64 mx-auto mt-32">
      <svg
        className="absolute inset-0 w-full h-full animate-spin [animation-duration:2s]"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="#13141B"
          strokeWidth="4"
          strokeDasharray="12 10"
        />
      </svg>

      <p className="absolute  font-poppins  font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-white z-10">
        Carregando...
      </p>
    </div>
  );
}
