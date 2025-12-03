import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTheme, useSetTheme } from "@/store/theme";
import type { Theme } from "@/types";
import { Popover, PopoverClose } from "@radix-ui/react-popover";
import { CheckIcon, SunIcon } from "lucide-react";
import { useEffect } from "react";

const THEMES: Theme[] = ["system", "dark", "light"];

export default function ThemeButton() {
  const curruntTheme = useTheme();
  const setTheme = useSetTheme();

  return (
    <Popover>
      <PopoverTrigger>
        <div className="hover:bg-muted cursor-pointer rounded-full p-2">
          <SunIcon />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-35 p-0">
        {THEMES.map((theme) => (
          <PopoverClose key={`theme-button-${theme}`} asChild>
            <div
              onClick={() => setTheme(theme)}
              className="hover:bg-muted flex cursor-pointer items-center justify-between p-3"
            >
              {theme}
              {curruntTheme === theme && <CheckIcon className="h-4 w-4" />}
            </div>
          </PopoverClose>
        ))}
      </PopoverContent>
    </Popover>
  );
}
