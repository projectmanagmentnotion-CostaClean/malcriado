import { businessIdentity } from "@/content/siteContent";

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <p className="eyebrow">Malcriado</p>
        <p>{businessIdentity.address}</p>
      </div>
      <div>
        <a href={`tel:${businessIdentity.phone.replace(/\s+/g, "")}`}>
          {businessIdentity.phone}
        </a>
        <a href={`mailto:${businessIdentity.email}`}>
          {businessIdentity.email}
        </a>
        <a
          href={businessIdentity.instagramUrl}
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
      </div>
    </footer>
  );
}
