const BackgroundEffects = () => {
  return (
    <>
      {/* Top Left */}
      <div
        className="fixed -top-32 -left-32 w-[500px] h-[500px]
        rounded-full bg-green-500/15 dark:bg-emerald-500/15
        blur-[120px] -z-10 pointer-events-none animate-float1"
      />

      {/* Bottom Right */}
      <div
        className="fixed -bottom-32 -right-32 w-[450px] h-[450px]
        rounded-full bg-lime-500/12 dark:bg-emerald-500/10
        blur-[120px] z-0 pointer-events-none animate-float2"
      />
    </>
  );
};

export default BackgroundEffects;
