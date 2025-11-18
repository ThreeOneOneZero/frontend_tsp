import * as Select from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Card, Heading, Flex, Text, Badge } from "@radix-ui/themes";
import { useI18n } from "../../i18n";

interface Activity {
  id: string;
  user: string;
  action: string;
  actionEn: string;
  time: string;
  timeEn: string;
  type: "create" | "update" | "delete";
}

const activities: Activity[] = [
  {
    id: "1",
    user: "João Silva",
    action: "criou um novo projeto",
    actionEn: "created a new project",
    time: "5 min atrás",
    timeEn: "5 min ago",
    type: "create",
  },
  {
    id: "2",
    user: "Maria Santos",
    action: "atualizou documento",
    actionEn: "updated document",
    time: "15 min atrás",
    timeEn: "15 min ago",
    type: "update",
  },
  {
    id: "3",
    user: "Pedro Costa",
    action: "removeu arquivo",
    actionEn: "removed file",
    time: "1 hora atrás",
    timeEn: "1 hour ago",
    type: "delete",
  },
  {
    id: "4",
    user: "Ana Oliveira",
    action: "adicionou comentário",
    actionEn: "added comment",
    time: "2 horas atrás",
    timeEn: "2 hours ago",
    type: "create",
  },
];

const typeBadgeColor = {
  create: "green",
  update: "blue",
  delete: "red",
} as const;

export function ActivityFeed() {
  const { translations: t, language } = useI18n();

  return (
    <Card>
      <Flex justify="between" align="center" mb="4">
        <Heading size="5" weight="bold">
          {t.dashboard.recentActivity}
        </Heading>

        <Select.Root defaultValue="all">
          <Select.Trigger className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Select.Value />
            <Select.Icon>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className="overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <Select.Viewport className="p-1">
                <Select.Item
                  value="all"
                  className="relative flex items-center px-8 py-2 text-sm text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer outline-none"
                >
                  <Select.ItemText>
                    {language === "pt_BR" ? "Todas" : "All"}
                  </Select.ItemText>
                  <Select.ItemIndicator className="absolute left-2">
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>

                <Select.Item
                  value="today"
                  className="relative flex items-center px-8 py-2 text-sm text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer outline-none"
                >
                  <Select.ItemText>
                    {language === "pt_BR" ? "Hoje" : "Today"}
                  </Select.ItemText>
                  <Select.ItemIndicator className="absolute left-2">
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>

                <Select.Item
                  value="week"
                  className="relative flex items-center px-8 py-2 text-sm text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer outline-none"
                >
                  <Select.ItemText>
                    {language === "pt_BR" ? "Esta semana" : "This week"}
                  </Select.ItemText>
                  <Select.ItemIndicator className="absolute left-2">
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </Flex>

      <Flex direction="column" gap="4">
        {activities.map((activity) => (
          <Flex key={activity.id} gap="3" align="start">
            <Badge
              color={typeBadgeColor[activity.type]}
              radius="small"
              size="2"
            >
              {activity.type === "create"
                ? language === "pt_BR"
                  ? "Criado"
                  : "Created"
                : activity.type === "update"
                ? language === "pt_BR"
                  ? "Atualizado"
                  : "Updated"
                : language === "pt_BR"
                ? "Removido"
                : "Deleted"}
            </Badge>
            <Flex direction="column" gap="1">
              <Text size="2">
                <Text weight="medium">{activity.user}</Text>{" "}
                {language === "pt_BR" ? activity.action : activity.actionEn}
              </Text>
              <Text size="1" color="gray">
                {language === "pt_BR" ? activity.time : activity.timeEn}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Card>
  );
}
