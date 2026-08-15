const Footer = () => {
  return (
    <footer className="w-full border-t border-white/6 bg-canvas py-14 flex flex-col items-center justify-center">
      <div className="w-full max-w-[1140px] px-5 sm:px-8 flex flex-col items-center text-center gap-2">
        <p className="text-[17px] font-semibold text-white font-display">
          Asim Ali
        </p>
        <p className="text-[14px] font-medium text-orange font-display">
          Backend Software Engineer
        </p>
        <p className="text-[13px] text-muted font-display tracking-wide">
          Laravel · Custom Business Systems · Automation
        </p>
        <p className="text-[13px] text-muted/60 font-display mt-4">
          © 2026 Asim Ali · Punjab, Pakistan
        </p>
      </div>
    </footer>
  );
};

export default Footer;
