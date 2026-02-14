import type { LucideIcon } from "lucide-react";
import { Fragment } from "react";
import { Link } from "react-router";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbRoot,
  BreadcrumbSeparator,
} from "./breadcrumb";

export interface BreadcrumbDataProps {
  name?: string;
  link?: string;
  isActive?: boolean;
}

interface BreadcrumbMenusProps {
  data: BreadcrumbDataProps[];
  icon: LucideIcon;
}

const BreadcrumbMenus = ({ data = [], icon: HomeIcon }: BreadcrumbMenusProps) => {
  const linkClassNames = "ease-linear transition-colors text-neutral-6 hover:text-neutral-10";

  const renderItem = (item: BreadcrumbDataProps) => {
    if (item.isActive || !item.link) {
      return <BreadcrumbPage>{item.name}</BreadcrumbPage>;
    }

    return (
      <BreadcrumbLink asChild>
        <Link to={item.link} className={linkClassNames}>
          {item.name}
        </Link>
      </BreadcrumbLink>
    );
  };

  return (
    <BreadcrumbRoot>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>
            <HomeIcon size={20} />
          </BreadcrumbPage>
        </BreadcrumbItem>
        {data.map((item) => (
          <Fragment key={item.name}>
            <BreadcrumbSeparator className="text-neutral-5" />
            <BreadcrumbItem>{renderItem(item)}</BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
};

export { BreadcrumbMenus };
