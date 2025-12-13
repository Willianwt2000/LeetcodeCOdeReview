import { useCallback } from "react";

export function usePrequalOpen(setOpen: (v: boolean) => void) {
  return useCallback((e?: React.MouseEvent) => {
    e?.preventDefault?.();
    setOpen(true);
  }, [setOpen]);
}