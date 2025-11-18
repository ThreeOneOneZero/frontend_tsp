import * as Popover from "@radix-ui/react-popover";
import { Button, Badge, Flex, Text, Box } from "@radix-ui/themes";
import { BellIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useI18n } from "../../i18n";

interface Notification {
  id: string;
  title: string;
  titleEn: string;
  message: string;
  messageEn: string;
  time: string;
  unread: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Nova mensagem",
    titleEn: "New message",
    message: "Você recebeu uma nova mensagem de João",
    messageEn: "You received a new message from João",
    time: "2 min",
    unread: true,
  },
  {
    id: "2",
    title: "Atualização de sistema",
    titleEn: "System update",
    message: "Sistema atualizado com sucesso",
    messageEn: "System updated successfully",
    time: "1 hora",
    unread: true,
  },
  {
    id: "3",
    title: "Backup concluído",
    titleEn: "Backup completed",
    message: "Backup automático realizado",
    messageEn: "Automatic backup completed",
    time: "3 horas",
    unread: false,
  },
];

export function NotificationButton() {
  const { language } = useI18n();
  const unreadCount = mockNotifications.filter((n) => n.unread).length;

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="ghost" size="2" style={{ position: "relative" }}>
          <BellIcon />
          {unreadCount > 0 && (
            <Badge
              color="red"
              size="2"
              style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                minWidth: "20px",
                minHeight: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4"
          sideOffset={5}
        >
          <Flex justify="between" align="center" mb="3">
            <Text size="3" weight="bold">
              {language === "pt_BR" ? "Notificações" : "Notifications"}
            </Text>
            <Popover.Close asChild>
              <Button variant="ghost" size="1" style={{ padding: "0" }}>
                <Cross2Icon />
              </Button>
            </Popover.Close>
          </Flex>

          <Box style={{ maxHeight: "384px", overflowY: "auto" }}>
            <Flex direction="column" gap="3">
              {mockNotifications.map((notification) => (
                <Box
                  key={notification.id}
                  p="3"
                  style={{
                    borderRadius: "8px",
                    border: notification.unread
                      ? "1px solid var(--blue-6)"
                      : "1px solid var(--gray-6)",
                    backgroundColor: notification.unread
                      ? "var(--blue-a2)"
                      : "var(--gray-a2)",
                  }}
                >
                  <Flex justify="between" gap="2">
                    <Flex direction="column" gap="1">
                      <Text size="2" weight="medium">
                        {language === "pt_BR"
                          ? notification.title
                          : notification.titleEn}
                      </Text>
                      <Text size="2" color="gray">
                        {language === "pt_BR"
                          ? notification.message
                          : notification.messageEn}
                      </Text>
                    </Flex>
                    <Text
                      size="1"
                      color="gray"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {notification.time}
                    </Text>
                  </Flex>
                </Box>
              ))}
            </Flex>
          </Box>

          <Button variant="ghost" size="2" mt="3" style={{ width: "100%" }}>
            {language === "pt_BR" ? "Ver todas" : "See all"}
          </Button>

          <Popover.Arrow className="fill-white dark:fill-gray-800" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
