'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { HiSun, HiMoon, HiMenu, HiX, HiSearch } from 'react-icons/hi';

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => pathname.startsWith(path);
  const links = [
    { href: '/', label: "\u9996\u9875" },
    { href: '/search', label: "\u641c\u7d22" },
    { href: '/admin', label: "\u7ba1\u7406" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-nav-bg border-b border-card-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-accent tracking-wide">\u4e66\u9999\u9601</Link>
        <div className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <Link key={link.href} href={link.href}
              className={"text-sm font-medium transition-colors hover:text-accent " + (isActive(link.href) ? "text-accent" : "")}>
              {link.label}
            </Link>
          ))}
          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-card-border transition-colors" aria-label="\u5207\u6362\u4e3b\u9898">
            {theme === 'dark' ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
          </button>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <Link href="/search" className="p-2 rounded-lg hover:bg-card-border"><HiSearch className="w-5 h-5" /></Link>
          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-card-border">
            {theme === 'dark' ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-lg hover:bg-card-border">
            {menuOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-nav-bg border-t border-card-border px-4 py-3">
          <div className="flex flex-col gap-3">
            {links.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className={"text-sm font-medium transition-colors hover:text-accent " + (isActive(link.href) ? "text-accent" : "")}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
