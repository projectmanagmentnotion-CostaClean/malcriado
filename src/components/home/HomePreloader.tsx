interface HomePreloaderProps {
  readonly active: boolean;
}

export function HomePreloader({ active }: HomePreloaderProps) {
  return (
    <div
      aria-hidden={active ? undefined : true}
      className="home-preloader"
      data-active={active ? "true" : "false"}
    >
      <div className="home-preloader__inner">
        <p className="home-preloader__eyebrow">Pineda de Mar</p>
        <p className="home-preloader__wordmark">MALCRIADO</p>
        <p className="home-preloader__note">Cocina fusion frente al mar.</p>
      </div>
    </div>
  );
}
