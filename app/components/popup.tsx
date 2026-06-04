"use client";

interface popupType {
  triggerContent: React.ReactNode;
  Content: React.ReactNode;
}
import React, { useState, useRef, useEffect } from "react";

export function Popup({ triggerContent, Content: content }: popupType) {
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    const userClick = (event: MouseEvent) => {
      if (triggerRef.current?.contains(event.target as Node)) {
        toggleVisibility();
      }
    };
    document.addEventListener("mousedown", userClick);
    return () => document.removeEventListener("mousedown", userClick);
  }, []);

  return (
    <div className="flex flex-row">
      <button ref={triggerRef}>{triggerContent}</button>
      {isVisible && <div>{content}</div>}
    </div>
  );
}
