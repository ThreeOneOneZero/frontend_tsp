import React, { useState } from "react";
import { Header } from "../components/Header";
import { VolumeControl } from "../components/dashboard/VolumeControl";
import { UserMenu } from "../components/dashboard/UserMenu";
import { NotificationButton } from "../components/dashboard/NotificationButton";
import { QuickActions } from "../components/dashboard/QuickActions";
import { StatusCard } from "../components/dashboard/StatusCard";
import { ActivityFeed } from "../components/dashboard/ActivityFeed";
import { Products } from "./Products";
import { Users } from "./Users";
import { Settings } from "./Settings";
import {
  RocketIcon,
  PersonIcon,
  FileTextIcon,
  ClockIcon,
} from "@radix-ui/react-icons";
import { useI18n } from "../i18n";

export const Dashboard: React.FC = () => {
  const { translations: t } = useI18n();
  const [activeNav, setActiveNav] = useState("dashboard");

  const navItems = [
    { label: "Dashboard", id: "dashboard" },
    { label: t.products.title, id: "options1" },
    { label: t.pages.users, id: "options2" },
    { label: t.examples.settings, id: "options3" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header
        navItems={navItems}
        activeItem={activeNav}
        onNavigate={setActiveNav}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeNav === "dashboard" && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {t.dashboard.welcome}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <NotificationButton />
                <UserMenu
                  userName="Carlos Silva"
                  userEmail="carlos@exemplo.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatusCard
                title={t.dashboard.activeProjects}
                value={12}
                icon={<RocketIcon className="w-6 h-6" />}
                color="blue"
                trend={{ value: "12%", isPositive: true }}
              />
              <StatusCard
                title={t.dashboard.totalUsers}
                value={248}
                icon={<PersonIcon className="w-6 h-6" />}
                color="green"
                trend={{ value: "8%", isPositive: true }}
              />
              <StatusCard
                title={t.dashboard.documents}
                value={1432}
                icon={<FileTextIcon className="w-6 h-6" />}
                color="purple"
                trend={{ value: "3%", isPositive: false }}
              />
              <StatusCard
                title={t.dashboard.hoursWorked}
                value="342h"
                icon={<ClockIcon className="w-6 h-6" />}
                color="orange"
                trend={{ value: "15%", isPositive: true }}
              />
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t.dashboard.volumeControl}
              </h2>
              <VolumeControl />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <QuickActions />
              <ActivityFeed />
            </div>
          </>
        )}

        {activeNav === "options1" && <Products />}
        {activeNav === "options2" && <Users />}
        {activeNav === "options3" && <Settings />}
      </main>
    </div>
  );
};
