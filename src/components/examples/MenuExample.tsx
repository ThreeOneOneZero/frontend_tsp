import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Popover from "@radix-ui/react-popover";
import {
  DotsHorizontalIcon,
  InfoCircledIcon,
  Pencil1Icon,
  CopyIcon,
  TrashIcon,
  GearIcon,
  ExitIcon,
} from "@radix-ui/react-icons";
import { useI18n } from "../../i18n";
import "./MenuExample.css";

export function MenuExample() {
  const { translations: t } = useI18n();

  return (
    <div className="menu-example">
      <h2>{t.examples.menu}</h2>

      <div className="menu-showcase">
        <div className="menu-card">
          <div className="card-header">
            <h3>Radix Dropdown</h3>
            <Popover.Root>
              <Popover.Trigger asChild>
                <button className="info-btn">
                  <InfoCircledIcon />
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content className="popover-content" sideOffset={5}>
                  <div className="popover-inner">
                    <p>
                      Clique no ícone para abrir um menu dropdown customizado
                    </p>
                    <Popover.Close className="popover-close">✕</Popover.Close>
                  </div>
                  <Popover.Arrow className="popover-arrow" />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>

          <div className="menu-preview">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="menu-trigger">
                  <DotsHorizontalIcon />
                  Opções
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="dropdown-content"
                  sideOffset={8}
                >
                  <DropdownMenu.Item className="dropdown-item">
                    <Pencil1Icon /> {t.examples.edit}
                  </DropdownMenu.Item>

                  <DropdownMenu.Item className="dropdown-item">
                    <CopyIcon /> {t.examples.duplicate}
                  </DropdownMenu.Item>

                  <DropdownMenu.Separator className="dropdown-separator" />

                  <DropdownMenu.Item className="dropdown-item danger">
                    <TrashIcon /> {t.examples.delete}
                  </DropdownMenu.Item>

                  <DropdownMenu.Arrow className="dropdown-arrow" />
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>

        <div className="menu-card">
          <div className="card-header">
            <h3>Settings Menu</h3>
          </div>

          <div className="menu-preview">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="menu-trigger settings">
                  <GearIcon />
                  {t.examples.settings}
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="dropdown-content"
                  sideOffset={8}
                >
                  <DropdownMenu.Item className="dropdown-item">
                    <GearIcon /> {t.examples.profile}
                  </DropdownMenu.Item>

                  <DropdownMenu.Item className="dropdown-item">
                    <GearIcon /> {t.examples.settings}
                  </DropdownMenu.Item>

                  <DropdownMenu.Separator className="dropdown-separator" />

                  <DropdownMenu.Item className="dropdown-item logout">
                    <ExitIcon /> {t.examples.logout}
                  </DropdownMenu.Item>

                  <DropdownMenu.Arrow className="dropdown-arrow" />
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>
      </div>
    </div>
  );
}
