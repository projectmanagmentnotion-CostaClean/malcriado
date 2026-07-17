import { NavLink } from "react-router-dom";
import { Cluster } from "@/components/layout/Cluster";

const devLinks = [
  { path: "/dev/design-system/", label: "Design system" },
  { path: "/dev/assets/", label: "Assets" },
  { path: "/dev/content/", label: "Content" },
] as const;

export function DevNavigation() {
  return (
    <nav aria-label="Herramientas internas" className="dev-navigation">
      <Cluster as="ul" gap="xs">
        {devLinks.map((link) => (
          <li key={link.path}>
            <NavLink className="dev-navigation__link" to={link.path}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </Cluster>
    </nav>
  );
}
