import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { Navbar as HeroUINavbar, NavbarItem } from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import CartShop from "./cartShop";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon } from "@/components/icons";
import { Logo } from "@/components/icons";

export const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100 w-full",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Buscar..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyDown={handleSearchKeyDown}
    />
  );

  return (
    <HeroUINavbar
      className="bg-gray-200 dark:bg-neutral-900"
      maxWidth="xl"
      position="sticky"
    >
      <div className="lg:flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <Logo />
            <p className="font-bold text-inherit">LTDA</p>
          </Link>
        </div>

        <div className="w-3/4">{searchInput}</div>

        <div>
          <ThemeSwitch />
        </div>
      </div>

      <div className="lg:flex gap-4 justify-start items-center">
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium",
              )}
              color="foreground"
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
        <CartShop />
      </div>
    </HeroUINavbar>
  );
};
