import type { ComponentType, ReactNode, Ref, SVGProps } from "react";
import type { InputProps as AriaInputProps, TextFieldProps as AriaTextFieldProps } from "react-aria-components";
import { Input as AriaInput, TextField as AriaTextField } from "react-aria-components";
import { HintText } from "@/components/base/input/hint-text";
import { Label } from "@/components/base/input/label";
import { cx } from "@/utils/cx";

/**
 * Uchtem text input: flat, 1px hairline border, no rounded-lg SaaS chrome —
 * restyled from the UntitledUI base component onto the brand token system.
 * Password toggles / tooltips / shortcuts from the source component were
 * dropped — this form never needs them. An optional leading icon was added
 * back for the friendlier, more legible contact form.
 */
export interface InputProps extends Omit<AriaTextFieldProps, "type">, Pick<AriaInputProps, "placeholder" | "type"> {
    ref?: Ref<HTMLInputElement>;
    label?: string;
    hint?: ReactNode;
    className?: string;
    inputClassName?: string;
    icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

export const Input = ({ label, hint, placeholder, type = "text", className, inputClassName, icon: Icon, ref, ...props }: InputProps) => {
    return (
        <AriaTextField {...props} className={cx("group flex w-full flex-col gap-2", className)}>
            {({ isInvalid, isRequired }) => (
                <>
                    {label && (
                        <Label isRequired={isRequired} isInvalid={isInvalid}>
                            {label}
                        </Label>
                    )}
                    <div className="relative flex items-center">
                        {Icon && <Icon aria-hidden="true" className="pointer-events-none absolute left-4 size-4 text-stone" />}
                        <AriaInput
                            ref={ref}
                            placeholder={placeholder}
                            type={type}
                            className={cx(
                                "w-full border border-ink/20 bg-transparent px-4 py-3 text-ink outline-none transition-colors placeholder:text-stone/70",
                                Icon && "pl-11",
                                "focus:border-brass",
                                "group-invalid:border-red-700",
                                inputClassName,
                            )}
                        />
                    </div>
                    {hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
                </>
            )}
        </AriaTextField>
    );
};

Input.displayName = "Input";
