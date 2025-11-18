import { Flex, Spinner, Text, Box } from "@radix-ui/themes";

interface LoadingSpinnerProps {
  size?: "1" | "2" | "3";
  text?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({
  size = "2",
  text,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const spinner = (
    <Flex direction="column" align="center" gap="3">
      <Spinner size={size} />
      {text && (
        <Text size={size === "1" ? "1" : size === "2" ? "2" : "3"}>{text}</Text>
      )}
    </Flex>
  );

  if (fullScreen) {
    return (
      <Box style={{ minHeight: "100vh" }}>
        <Flex
          align="center"
          justify="center"
          style={{ height: "100vh", width: "100%" }}
        >
          {spinner}
        </Flex>
      </Box>
    );
  }

  return spinner;
}
