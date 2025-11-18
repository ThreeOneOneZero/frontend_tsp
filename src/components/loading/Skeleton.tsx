import { Box, Flex } from "@radix-ui/themes";

interface SkeletonProps {
  count?: number;
  type?: "line" | "card" | "table-row";
}

export function Skeleton({ count = 1, type = "line" }: SkeletonProps) {
  const skeletonBase = (
    <Box
      style={{
        background: "var(--gray-a3)",
        borderRadius: "var(--radius-2)",
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }}
    />
  );

  if (type === "line") {
    return (
      <Flex direction="column" gap="2">
        {Array.from({ length: count }).map((_, i) => (
          <Box key={i} style={{ height: "1rem", width: "100%" }}>
            {skeletonBase}
          </Box>
        ))}
      </Flex>
    );
  }

  if (type === "card") {
    return (
      <Flex direction="column" gap="4">
        {Array.from({ length: count }).map((_, i) => (
          <Box
            key={i}
            style={{
              padding: "1.5rem",
              borderRadius: "var(--radius-3)",
              border: "1px solid var(--gray-a5)",
            }}
          >
            <Box
              style={{ height: "1.5rem", width: "30%", marginBottom: "1rem" }}
            >
              {skeletonBase}
            </Box>
            <Box
              style={{ height: "1rem", width: "100%", marginBottom: "0.5rem" }}
            >
              {skeletonBase}
            </Box>
            <Box style={{ height: "1rem", width: "80%" }}>{skeletonBase}</Box>
          </Box>
        ))}
      </Flex>
    );
  }

  if (type === "table-row") {
    return (
      <Flex direction="column">
        {Array.from({ length: count }).map((_, i) => (
          <Flex
            key={i}
            gap="4"
            align="center"
            style={{
              padding: "1rem",
              borderBottom: "1px solid var(--gray-a5)",
            }}
          >
            <Box style={{ height: "2rem", width: "2rem", minWidth: "2rem" }}>
              {skeletonBase}
            </Box>
            <Flex direction="column" gap="2" style={{ flex: 1 }}>
              <Box style={{ height: "1rem", width: "25%" }}>{skeletonBase}</Box>
              <Box style={{ height: "0.75rem", width: "33%" }}>
                {skeletonBase}
              </Box>
            </Flex>
            <Box style={{ height: "1rem", width: "4rem" }}>{skeletonBase}</Box>
          </Flex>
        ))}
      </Flex>
    );
  }

  return null;
}
