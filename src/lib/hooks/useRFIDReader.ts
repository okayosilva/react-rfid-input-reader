import { useEffect, useRef, useCallback } from "react";

interface UseRFIDProps {
  onRead: (code: string) => void;
  minLength?: number;
  maxLength?: number;
  timeoutDuration?: number;
  active?: boolean;
}

export function useRFIDReader({
  onRead,
  minLength = 8,
  maxLength = 12,
  timeoutDuration = 500,
  active = true,
}: UseRFIDProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const buffer = useRef<string>("");

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const focusInput = useCallback(() => {
    if (active && inputRef.current) {
      inputRef.current.focus();
    }
  }, [active]);

  const clearBuffer = useCallback(() => {
    buffer.current = "";
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        clearBuffer();
      }, timeoutDuration);

      if (e.key === "Enter") {
        const scannedCode = buffer.current;

        if (
          scannedCode.length >= minLength &&
          scannedCode.length <= maxLength
        ) {
          onRead(scannedCode);
        }

        clearBuffer();
        return;
      }

      if (e.key.length === 1) {
        buffer.current += e.key;
      }
    },
    [onRead, minLength, timeoutDuration, clearBuffer, maxLength]
  );

  useEffect(() => {
    if (active) {
      focusInput();

      const interval = setInterval(() => {
        if (document.activeElement !== inputRef.current) {
          focusInput();
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [active, focusInput]);

  return {
    inputRef,
    handleKeyDown,
    focusInput,
    clearBuffer,
  };
}
