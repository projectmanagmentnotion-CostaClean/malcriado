import { Link } from "react-router-dom";
import type { MenuCategory } from "@/types/content";
import { cn } from "@/lib/cn";
import { buildMenuCategoryId } from "@/lib/menu/menuPresentation";

interface MenuCategoryLinkProps {
  readonly category: MenuCategory;
  readonly count: number;
  readonly className?: string;
}

export function MenuCategoryLink({
  category,
  count,
  className,
}: MenuCategoryLinkProps) {
  return (
    <Link
      className={cn("menu-category-link", className)}
      to={`/menu/#${buildMenuCategoryId(category.slug)}`}
    >
      <span className="menu-category-link__label">{category.label}</span>
      <span className="menu-category-link__meta">{count} items</span>
    </Link>
  );
}
