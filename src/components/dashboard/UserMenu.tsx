import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from "@radix-ui/themes";
import {
  PersonIcon,
  GearIcon,
  ExitIcon,
  BarChartIcon,
  BellIcon,
} from "@radix-ui/react-icons";
import { useI18n } from "../../i18n";

interface UserMenuProps {
  userName: string;
  userEmail: string;
}

export function UserMenu({ userName, userEmail }: UserMenuProps) {
  const { translations: t } = useI18n();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button>
          <PersonIcon />
          {userName}
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg border border-gray-200 dark:border-gray-700"
          sideOffset={5}
        >
          <div className="px-3 py-2 mb-2 border-b border-gray-200 dark:border-gray-700">
            <p className="font-medium text-gray-900 dark:text-white">
              {userName}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {userEmail}
            </p>
          </div>

          <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer outline-none">
            <PersonIcon className="w-4 h-4" />
            {t.examples.profile}
          </DropdownMenu.Item>

          <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer outline-none">
            <BarChartIcon className="w-4 h-4" />
            {t.examples.statistics}
          </DropdownMenu.Item>

          <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer outline-none">
            <BellIcon className="w-4 h-4" />
            {t.examples.notifications}
          </DropdownMenu.Item>

          <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer outline-none">
            <GearIcon className="w-4 h-4" />
            {t.examples.settings}
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="h-px bg-gray-200 dark:bg-gray-700 my-2" />

          <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 rounded hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer outline-none">
            <ExitIcon className="w-4 h-4" />
            {t.examples.logout}
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="fill-white dark:fill-gray-800" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
