export function MinimalBackgroundVisual() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020510]">
      {/* PC View Background Image (pc bg.jpeg) */}
      <img
        src="/pc bg.webp"
        alt=""
        className="hidden md:block absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0 opacity-90"
      />
      {/* Mobile View Background Image (mob bg.jpeg) */}
      <img
        src="/mob bg.webp"
        alt=""
        className="block md:hidden absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0 opacity-90"
      />
    </div>
  );
}

export default MinimalBackgroundVisual;




