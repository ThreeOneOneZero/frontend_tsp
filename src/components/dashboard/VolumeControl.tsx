import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { Card, Flex, Text } from "@radix-ui/themes";
import { SpeakerLoudIcon } from "@radix-ui/react-icons";

export function VolumeControl() {
  const [volume, setVolume] = useState(50);

  const iconSize = 20 + volume * 0.4;

  return (
    <Card>
      <Flex align="center" gap="4">
        <SpeakerLoudIcon
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            transition: "all 0.15s ease",
            color: "var(--blue-11)",
          }}
        />
        <Slider.Root
          className="relative flex items-center select-none touch-none flex-1 h-5"
          value={[volume]}
          onValueChange={(value) => setVolume(value[0])}
          min={0}
          max={100}
          step={1}
          style={{ width: "100%" }}
        >
          <Slider.Track
            style={{
              backgroundColor: "var(--gray-a6)",
              borderRadius: "9999px",
              height: "4px",
            }}
            className="relative grow"
          >
            <Slider.Range
              style={{
                backgroundColor: "var(--blue-9)",
                borderRadius: "9999px",
                height: "100%",
              }}
            />
          </Slider.Track>
          <Slider.Thumb
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "white",
              border: "2px solid var(--blue-9)",
              borderRadius: "9999px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
          />
        </Slider.Root>
        <Text size="2" weight="medium" style={{ minWidth: "32px" }}>
          {volume}
        </Text>
      </Flex>
    </Card>
  );
}
