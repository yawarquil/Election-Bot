"use client";

import * as React from "react";
import { Sheet } from "@/components/ui/Sheet";
import { Switch } from "@/components/ui/Switch";
import { Segmented } from "@/components/ui/Segmented";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { RotateCcw } from "lucide-react";

type ThemeMode = "light" | "dark" | "system";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SettingsSheet({ open, onClose }: Props) {
  const theme = useStore((s) => s.theme);
  const setTheme = useStore((s) => s.setTheme);
  const largeText = useStore((s) => s.largeText);
  const setLargeText = useStore((s) => s.setLargeText);
  const highContrast = useStore((s) => s.highContrast);
  const setHighContrast = useStore((s) => s.setHighContrast);
  const reducedMotion = useStore((s) => s.reducedMotion);
  const setReducedMotion = useStore((s) => s.setReducedMotion);
  const resetChecklist = useStore((s) => s.resetChecklist);

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Settings"
      description="Theme, accessibility, and progress controls."
    >
      <div className="space-y-7">
        <section>
          <h4 className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-fg">
            Theme
          </h4>
          <div className="mt-2.5">
            <Segmented<ThemeMode>
              ariaLabel="Theme"
              options={[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
                { value: "system", label: "System" },
              ]}
              value={theme}
              onChange={setTheme}
            />
          </div>
        </section>

        <section className="space-y-3">
          <h4 className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-fg">
            Accessibility
          </h4>
          <Switch
            checked={largeText}
            onChange={setLargeText}
            label="Larger text"
            description="Increases body text scale across the app."
          />
          <Switch
            checked={highContrast}
            onChange={setHighContrast}
            label="High contrast"
            description="Adds a stronger contrast pass for low-vision conditions."
          />
          <Switch
            checked={reducedMotion}
            onChange={setReducedMotion}
            label="Reduce motion"
            description="Minimises animation. The app will respect your OS setting too."
          />
        </section>

        <section className="space-y-3">
          <h4 className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-fg">
            Progress
          </h4>
          <Button
            variant="secondary"
            size="sm"
            iconLeft={<RotateCcw />}
            onClick={() => {
              resetChecklist();
            }}
          >
            Reset checklist progress
          </Button>
        </section>

        <p className="border-t border-[rgb(var(--hairline)_/_0.10)] pt-4 text-[12px] leading-relaxed text-muted-fg">
          Your selections are saved to this device only. The app does not collect personal information.
        </p>
      </div>
    </Sheet>
  );
}
