import { useState } from "react";
import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, Building07, CheckCircle, Mail01, MessageChatCircle, User01 } from "@untitledui/icons";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { NativeSelect } from "@/components/base/select/select-native";
import { Button } from "@/components/base/buttons/button";
import { submitContactForm } from "@/lib/formspree";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * The lead-capture form itself, standalone so it can be dropped into both
 * the Contact page and the homepage's closing section.
 */
export function ContactForm() {
    const { t } = useTranslation("contact");
    const [status, setStatus] = useState<Status>("idle");

    const companySizeOptions = [
        { label: t("form.companySizeOptions.placeholder"), value: "", disabled: true },
        { label: t("form.companySizeOptions.1-10"), value: "1-10" },
        { label: t("form.companySizeOptions.11-50"), value: "11-50" },
        { label: t("form.companySizeOptions.51-200"), value: "51-200" },
        { label: t("form.companySizeOptions.200+"), value: "200+" },
    ];

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus("submitting");

        const formData = new FormData(event.currentTarget);
        try {
            await submitContactForm({
                name: String(formData.get("name") ?? ""),
                email: String(formData.get("email") ?? ""),
                company: String(formData.get("company") ?? ""),
                companySize: String(formData.get("companySize") ?? ""),
                message: String(formData.get("message") ?? ""),
            });
            setStatus("success");
        } catch {
            setStatus("error");
        }
    }

    if (status === "success") {
        return (
            <div className="flex flex-col items-center border border-ink/12 p-10 text-center">
                <CheckCircle className="size-8 text-brass" />
                <p className="mt-4 font-display text-2xl text-ink">{t("form.successTitle")}</p>
                <p className="mt-3 text-stone">{t("form.successBody")}</p>
            </div>
        );
    }

    return (
        <Form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Input name="name" label={t("form.fullName")} placeholder={t("form.fullNamePlaceholder")} icon={User01} isRequired />
                <Input
                    name="email"
                    type="email"
                    label={t("form.workEmail")}
                    placeholder={t("form.workEmailPlaceholder")}
                    icon={Mail01}
                    isRequired
                />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Input name="company" label={t("form.company")} placeholder={t("form.companyPlaceholder")} icon={Building07} isRequired />
                <NativeSelect name="companySize" label={t("form.companySize")} options={companySizeOptions} required defaultValue="" />
            </div>

            <TextArea
                name="message"
                label={t("form.message")}
                placeholder={t("form.messagePlaceholder")}
                icon={MessageChatCircle}
                rows={5}
                isRequired
            />

            {status === "error" && <p className="text-sm text-red-700">{t("form.errorMessage")}</p>}

            <Button type="submit" size="lg" color="primary" isLoading={status === "submitting"} iconTrailing={ArrowRight} className="w-full sm:w-auto">
                {t("form.submit")}
            </Button>
        </Form>
    );
}
