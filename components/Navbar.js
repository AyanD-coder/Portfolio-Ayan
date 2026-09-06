"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Work" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const menuRef = useRef(null);
  const menuToggleRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    const menu = menuRef.current;
    const focusableElements = menu?.querySelectorAll("a[href], button:not([disabled])") || [];
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    document.body.style.overflow = "hidden";
    firstFocusable?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        window.requestAnimationFrame(() => menuToggleRef.current?.focus());
        return;
      }

      if (event.key !== "Tab" || focusableElements.length === 0) return;

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    let frameId;

    const updateScrollState = () => {
      frameId = undefined;
      const scrollTop = window.scrollY;

      setHasScrolled(scrollTop > 12);

      if (pathname === "/") {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(scrollableHeight > 0 ? Math.min(scrollTop / scrollableHeight, 1) : 0);
      }
    };

    const handleScroll = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateScrollState);
      }
    };

    updateScrollState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [pathname]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 720px)");
    const closeOnDesktop = (event) => {
      if (event.matches) setIsOpen(false);
    };

    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header className={`navbar${hasScrolled ? " is-scrolled" : ""}`}>
      {pathname === "/" ? (
        <span
          className="site-scroll-progress"
          aria-hidden="true"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      ) : null}
      <div className="container nav-inner">
        <Link href="/" className="brand" aria-label="Ayan Dutta home">
          <Image className="brand-logo" src="/icon.png" alt="Ayan Dutta Logo" width={64} height={64} priority />
          <span>Ayan Dutta</span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <Link href="/contact" className="ghost-button">
            Let&apos;s Talk
          </Link>
          <button 
            ref={menuToggleRef}
            type="button"
            className="mobile-menu-toggle" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            suppressHydrationWarning
          >
            {isOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
            )}
          </button>
        </div>
      </div>

      <div
        className={`mobile-menu-overlay${isOpen ? " is-open" : ""}`}
        aria-hidden={!isOpen}
        inert={!isOpen}
        onClick={() => setIsOpen(false)}
        role="presentation"
      >
        <div
          ref={menuRef}
          id="mobile-navigation"
          className="mobile-menu"
          role="dialog"
          aria-modal={isOpen ? "true" : undefined}
          aria-label="Mobile navigation"
          onClick={(event) => event.stopPropagation()}
        >
          <nav className="mobile-menu-links" aria-label="Mobile navigation links">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="primary-button mobile-contact-link">
              Contact Me
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
