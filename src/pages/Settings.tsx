import * as Select from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useI18n } from "../i18n";

const settingsOptions = [
  { value: "general", label: "Geral", labelEn: "General" },
  { value: "security", label: "Segurança", labelEn: "Security" },
  { value: "notifications", label: "Notificações", labelEn: "Notifications" },
  { value: "privacy", label: "Privacidade", labelEn: "Privacy" },
  { value: "appearance", label: "Aparência", labelEn: "Appearance" },
];

export function Settings() {
  const { translations: t } = useI18n();

  const getSettingLabel = (key: string) => {
    const value = t.settings[key as keyof typeof t.settings];
    return typeof value === "string" ? value : value.label;
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t.settings.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t.settings.managePreferences}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t.settings.category}
        </h3>

        <Select.Root defaultValue="general">
          <Select.Trigger className="inline-flex items-center justify-between w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Select.Value />
            <Select.Icon>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className="overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <Select.Viewport className="p-2">
                {settingsOptions.map((option) => (
                  <Select.Item key={option.value} value={option.value}>
                    <Select.ItemText>
                      {getSettingLabel(option.value)}
                    </Select.ItemText>
                    <Select.ItemIndicator>
                      <CheckIcon />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>

        <div className="mt-6 space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              {t.settings.general.label}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t.settings.general.description}
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              {t.settings.security.label}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t.settings.security.description}
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              {t.settings.notifications.label}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t.settings.notifications.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
