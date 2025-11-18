import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import * as Popover from "@radix-ui/react-popover";
import { SunIcon, MoonIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { useI18n } from "../../i18n";
import "./ControlsExample.css";

export function ControlsExample() {
  const { translations: t } = useI18n();
  const [lightIntensity, setLightIntensity] = useState(75);
  const [lightOn, setLightOn] = useState(true);

  return (
    <div className="controls-example">
      <h2>{t.examples.lighting}</h2>
      <p className="subtitle">{t.examples.lightingDesc}</p>

      <div className="controls-grid">
        {/* Luz (Switch) */}
        <div className="control-card">
          <div className="control-header">
            <h3>{t.examples.lightOn}</h3>
            <Popover.Root>
              <Popover.Trigger asChild>
                <button className="popover-trigger">
                  <InfoCircledIcon />
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content className="popover-content" sideOffset={5}>
                  <div className="popover-arrow-wrapper">
                    <p>{t.examples.infoText}</p>
                    <Popover.Close className="popover-close">✕</Popover.Close>
                  </div>
                  <Popover.Arrow className="popover-arrow" />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>

          <button
            className={`switch-button ${lightOn ? "on" : "off"}`}
            onClick={() => setLightOn(!lightOn)}
          >
            {lightOn ? (
              <SunIcon className="switch-icon" />
            ) : (
              <MoonIcon className="switch-icon" />
            )}
            <span>{lightOn ? t.examples.lightOn : t.examples.lightOff}</span>
          </button>
        </div>

        {/* Intensidade (Slider com Ícone) */}
        <div className="control-card">
          <h3>
            {t.examples.intensity} - {lightIntensity}%
          </h3>
          <div className="slider-container">
            <SunIcon
              className="slider-icon"
              style={{
                fontSize: `${24 + lightIntensity * 0.5}px`,
                opacity: lightOn ? 1 : 0.3,
                transition: "all 0.2s ease",
              }}
            />
            <Slider.Root
              className="slider-root"
              value={[lightIntensity]}
              onValueChange={(value) => setLightIntensity(value[0])}
              min={0}
              max={100}
              step={5}
              disabled={!lightOn}
            >
              <Slider.Track className="slider-track">
                <Slider.Range className="slider-range" />
              </Slider.Track>
              <Slider.Thumb className="slider-thumb" />
            </Slider.Root>
            <span className="value-label">{lightIntensity}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
