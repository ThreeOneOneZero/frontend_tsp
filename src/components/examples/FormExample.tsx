import { useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Accordion from "@radix-ui/react-accordion";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronDownIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useI18n } from "../../i18n";
import "./FormExample.css";

export function FormExample() {
  const { translations: t } = useI18n();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("option1");

  return (
    <div className="form-example">
      <h2>{t.examples.formValidation}</h2>

      <div className="form-grid">
        {/* Radio Group */}
        <div className="form-card">
          <h3>{t.examples.agreeTerms}</h3>
          <RadioGroup.Root
            value={selectedOption}
            onValueChange={setSelectedOption}
          >
            <div className="radio-item">
              <RadioGroup.Item
                value="option1"
                id="opt1"
                className="radio-input"
              />
              <label htmlFor="opt1" className="radio-label">
                {t.examples.createAccount}
              </label>
            </div>
            <div className="radio-item">
              <RadioGroup.Item
                value="option2"
                id="opt2"
                className="radio-input"
              />
              <label htmlFor="opt2" className="radio-label">
                {t.examples.profile}
              </label>
            </div>
            <div className="radio-item">
              <RadioGroup.Item
                value="option3"
                id="opt3"
                className="radio-input"
              />
              <label htmlFor="opt3" className="radio-label">
                {t.examples.settings}
              </label>
            </div>
          </RadioGroup.Root>
          <p className="info-text">
            Seleção: <strong>{selectedOption}</strong>
          </p>
        </div>

        {/* Accordion */}
        <div className="form-card">
          <h3>FAQ</h3>
          <Accordion.Root type="single" collapsible className="accordion">
            <Accordion.Item value="faq1" className="accordion-item">
              <Accordion.Trigger className="accordion-trigger">
                {t.examples.createAccount}?
                <ChevronDownIcon className="accordion-icon" />
              </Accordion.Trigger>
              <Accordion.Content className="accordion-content">
                Clique em "Criar Conta" para começar seu registro no sistema.
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item value="faq2" className="accordion-item">
              <Accordion.Trigger className="accordion-trigger">
                Como posso editar meu {t.examples.profile}?
                <ChevronDownIcon className="accordion-icon" />
              </Accordion.Trigger>
              <Accordion.Content className="accordion-content">
                Acesse a seção de {t.examples.settings} e clique em{" "}
                {t.examples.edit}.
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item value="faq3" className="accordion-item">
              <Accordion.Trigger className="accordion-trigger">
                Como faço para {t.examples.logout}?
                <ChevronDownIcon className="accordion-icon" />
              </Accordion.Trigger>
              <Accordion.Content className="accordion-content">
                Clique em {t.examples.logout} no menu de {t.examples.settings}.
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </div>

        {/* Dialog */}
        <div className="form-card">
          <h3>{t.examples.dialogs}</h3>
          <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger asChild>
              <button className="dialog-trigger">
                {t.examples.openDialog}
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="dialog-overlay" />
              <Dialog.Content className="dialog-content">
                <div className="dialog-header">
                  <Dialog.Title className="dialog-title">
                    {t.examples.dialogTitle}
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="dialog-close">
                      <Cross2Icon />
                    </button>
                  </Dialog.Close>
                </div>

                <p className="dialog-description">{t.examples.dialogMessage}</p>

                <div className="dialog-actions">
                  <Dialog.Close asChild>
                    <button className="btn-secondary">{t.examples.no}</button>
                  </Dialog.Close>
                  <button
                    className="btn-primary"
                    onClick={() => setDialogOpen(false)}
                  >
                    {t.examples.yes}
                  </button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </div>
  );
}
