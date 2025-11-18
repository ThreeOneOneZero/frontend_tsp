import * as Tabs from "@radix-ui/react-tabs";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import {
  PlusIcon,
  FileTextIcon,
  PersonIcon,
  ArchiveIcon,
} from "@radix-ui/react-icons";
import { useI18n } from "../../i18n";

export function QuickActions() {
  const { translations: t } = useI18n();

  return (
    <Card>
      <Heading size="5" weight="bold" mb="4">
        {t.dashboard.quickActions}
      </Heading>

      <Tabs.Root defaultValue="create">
        <Tabs.List className="flex gap-2 mb-4 border-b border-gray-200 dark:border-gray-700">
          <Tabs.Trigger
            value="create"
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 transition-colors"
          >
            {t.dashboard.create}
          </Tabs.Trigger>
          <Tabs.Trigger
            value="manage"
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 transition-colors"
          >
            {t.dashboard.manage}
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="create">
          <Flex direction="column" gap="2">
            <Button variant="ghost" size="3" asChild>
              <Flex
                gap="3"
                align="start"
                p="3"
                width="100%"
                style={{ cursor: "pointer" }}
              >
                <PlusIcon style={{ width: "20px", height: "20px" }} />
                <Flex direction="column" align="start">
                  <Text size="2" weight="medium">
                    {t.dashboard.newProject}
                  </Text>
                  <Text size="1" color="gray">
                    {t.dashboard.createNewProject}
                  </Text>
                </Flex>
              </Flex>
            </Button>

            <Button variant="ghost" size="3" asChild>
              <Flex
                gap="3"
                align="start"
                p="3"
                width="100%"
                style={{ cursor: "pointer" }}
              >
                <FileTextIcon style={{ width: "20px", height: "20px" }} />
                <Flex direction="column" align="start">
                  <Text size="2" weight="medium">
                    {t.dashboard.newDocument}
                  </Text>
                  <Text size="1" color="gray">
                    {t.dashboard.createDocument}
                  </Text>
                </Flex>
              </Flex>
            </Button>

            <Button variant="ghost" size="3" asChild>
              <Flex
                gap="3"
                align="start"
                p="3"
                width="100%"
                style={{ cursor: "pointer" }}
              >
                <PersonIcon style={{ width: "20px", height: "20px" }} />
                <Flex direction="column" align="start">
                  <Text size="2" weight="medium">
                    {t.dashboard.addUser}
                  </Text>
                  <Text size="1" color="gray">
                    {t.dashboard.inviteNewMember}
                  </Text>
                </Flex>
              </Flex>
            </Button>
          </Flex>
        </Tabs.Content>

        <Tabs.Content value="manage">
          <Flex direction="column" gap="2">
            <Button variant="ghost" size="3" asChild>
              <Flex
                gap="3"
                align="start"
                p="3"
                width="100%"
                style={{ cursor: "pointer" }}
              >
                <ArchiveIcon style={{ width: "20px", height: "20px" }} />
                <Flex direction="column" align="start">
                  <Text size="2" weight="medium">
                    {t.dashboard.files}
                  </Text>
                  <Text size="1" color="gray">
                    {t.dashboard.manageFiles}
                  </Text>
                </Flex>
              </Flex>
            </Button>

            <Button variant="ghost" size="3" asChild>
              <Flex
                gap="3"
                align="start"
                p="3"
                width="100%"
                style={{ cursor: "pointer" }}
              >
                <PersonIcon style={{ width: "20px", height: "20px" }} />
                <Flex direction="column" align="start">
                  <Text size="2" weight="medium">
                    {t.dashboard.team}
                  </Text>
                  <Text size="1" color="gray">
                    {t.dashboard.manageMembers}
                  </Text>
                </Flex>
              </Flex>
            </Button>
          </Flex>
        </Tabs.Content>
      </Tabs.Root>
    </Card>
  );
}
