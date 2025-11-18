import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useI18n } from "../i18n";

const users = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@email.com",
    role: "Admin",
    status: "active",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@email.com",
    role: "Editor",
    status: "active",
  },
  {
    id: 3,
    name: "Pedro Costa",
    email: "pedro@email.com",
    role: "Viewer",
    status: "inactive",
  },
  {
    id: 4,
    name: "Ana Oliveira",
    email: "ana@email.com",
    role: "Editor",
    status: "active",
  },
];

export function Users() {
  const { language } = useI18n();
  const isPortuguese = language === "pt_BR";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {isPortuguese ? "Usuários" : "Users"}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {isPortuguese
            ? "Gerencie usuários do sistema"
            : "Manage system users"}
        </p>
      </div>

      <Accordion.Root type="multiple" className="space-y-3">
        {users.map((user) => (
          <Accordion.Item
            key={user.id}
            value={`user-${user.id}`}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <Accordion.Header>
              <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      user.status === "active" ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                </div>
                <ChevronDownIcon className="w-5 h-5 text-gray-500 transition-transform group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {isPortuguese ? "Função" : "Role"}
                  </p>
                  <p className="text-gray-900 dark:text-white">{user.role}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Status
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {user.status === "active"
                      ? isPortuguese
                        ? "Ativo"
                        : "Active"
                      : isPortuguese
                      ? "Inativo"
                      : "Inactive"}
                  </p>
                </div>
                <div className="flex gap-2 pt-2">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                    {isPortuguese ? "Editar" : "Edit"}
                  </button>
                  <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg text-sm font-medium transition-colors">
                    {isPortuguese ? "Desativar" : "Deactivate"}
                  </button>
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
