import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useI18n } from "../../i18n";
import "./SelectorsExample.css";

export function SelectorsExample() {
  const { translations: t, language, setLanguage } = useI18n();
  const [selectedTab, setSelectedTab] = useState("docs");

  return (
    <div className="selectors-example">
      <h2>{t.examples.formValidation}</h2>

      <div className="selectors-grid">
        {/* Language Selector */}
        <div className="selector-card">
          <h3>{t.examples.language}</h3>
          <ToggleGroup.Root
            type="single"
            value={language}
            onValueChange={(value) => {
              if (value) setLanguage(value as "pt_BR" | "en_US");
            }}
            className="language-toggle"
          >
            <ToggleGroup.Item
              value="pt_BR"
              className="toggle-button"
              aria-label="Português"
            >
              🇧🇷 {t.examples.portuguese}
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="en_US"
              className="toggle-button"
              aria-label="English"
            >
              🇺🇸 {t.examples.english}
            </ToggleGroup.Item>
          </ToggleGroup.Root>
          <p className="toggle-info">
            Idioma atual:{" "}
            <strong>{language === "pt_BR" ? "Português" : "English"}</strong>
          </p>
        </div>

        {/* Theme Selector */}
        <div className="selector-card">
          <h3>{t.examples.theme}</h3>
          <Tabs.Root
            defaultValue="docs"
            value={selectedTab}
            onValueChange={setSelectedTab}
          >
            <Tabs.List className="tabs-list">
              <Tabs.Trigger value="docs" className="tabs-trigger">
                📚 Documentação
              </Tabs.Trigger>
              <Tabs.Trigger value="examples" className="tabs-trigger">
                📝 Exemplos
              </Tabs.Trigger>
              <Tabs.Trigger value="api" className="tabs-trigger">
                ⚙️ API
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="docs" className="tabs-content">
              <div className="tab-body">
                <h4>Documentação</h4>
                <p>
                  Este é um sistema completo de componentes Radix UI com suporte
                  a tema claro/escuro e múltiplos idiomas.
                </p>
              </div>
            </Tabs.Content>

            <Tabs.Content value="examples" className="tabs-content">
              <div className="tab-body">
                <h4>Exemplos</h4>
                <p>
                  Veja exemplos práticos de como usar cada componente em seus
                  projetos. Todos os componentes são totalmente customizáveis.
                </p>
              </div>
            </Tabs.Content>

            <Tabs.Content value="api" className="tabs-content">
              <div className="tab-body">
                <h4>API</h4>
                <p>
                  Todos os componentes seguem a especificação Radix UI. Consulte
                  a documentação oficial para mais detalhes.
                </p>
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
}
