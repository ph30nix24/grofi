"use client";

import React, { useEffect } from "react";

export default function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Check if window and IntersectionObserver are available
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const selector = ".reveal-on-scroll, .reveal-scale, .reveal-slide-left, .reveal-slide-right, .reveal-fade";

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    // Initial observe
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      // If already in viewport on load, reveal immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("is-revealed");
      } else {
        observer.observe(el);
      }
    });

    // MutationObserver to capture dynamic items (e.g. filtered tab cards)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.matches(selector)) {
              observer.observe(node);
            }
            const nested = node.querySelectorAll(selector);
            nested.forEach((child) => observer.observe(child));
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return <>{children}</>;
}
