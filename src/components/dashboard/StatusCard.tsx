import { ReactNode } from "react";
import { Card, Flex, Heading, Text, Box } from "@radix-ui/themes";

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color: "blue" | "green" | "purple" | "orange";
}

export function StatusCard({
  title,
  value,
  icon,
  trend,
  color,
}: StatusCardProps) {
  return (
    <Card>
      <Flex justify="between" align="start" gap="4">
        <Flex direction="column" gap="2">
          <Flex align="center" gap="3">
            <Box
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: `var(--${color}-a3)`,
                color: `var(--${color}-11)`,
              }}
            >
              {icon}
            </Box>
            {trend && (
              <Text
                size="2"
                weight="medium"
                color={trend.isPositive ? "green" : "red"}
              >
                {trend.isPositive ? "↑" : "↓"} {trend.value}
              </Text>
            )}
          </Flex>
          <Heading size="6" weight="bold">
            {value}
          </Heading>
          <Text size="2" color="gray">
            {title}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
