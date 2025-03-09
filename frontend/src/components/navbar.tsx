import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@heroui/input";
import { SearchIcon } from "@/components/icons";
import { Navbar as HeroUINavbar, NavbarItem } from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Logo } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import CartShop from "./cartShop";
import { siteConfig } from "@/config/site";

export const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const searchInput = (
    <form onSubmit={handleSearch}>
      <Input
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100 w-full",
          input: "text-sm",
        }}
        labelPlacement="outside"
        placeholder="Search..."
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
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
              className="data-[active=true]:text-primary data-[active=true]:font-medium"
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