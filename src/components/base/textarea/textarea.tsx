import type { ComponentType, ReactNode, Ref, SVGProps } from "react";
import type { TextAreaProps as AriaTextAreaProps, TextFieldProps as AriaTextFieldProps } from "react-aria-components";
import { TextArea as AriaTextArea, TextField as AriaTextField } from "react-aria-components";
import { HintText } from "@/components/base/input/hint-text";
import { Label } from "@/components/base/input/label";
import { cx } from "@/utils/cx";

export interface TextAreaFieldProps extends AriaTextFieldProps {
    label?: string;
    hint?: ReactNode;
    placeholder?: string;
    rows?: number;
    textAreaRef?: Ref<HTMLTextAreaElement>;
    textAreaProps?: Partial<AriaTextAreaProps>;
    className?: string;
    icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

export const TextArea = ({ label, hint, placeholder, rows = 5, textAreaRef, textAreaProps, className, icon: Icon, ...props }: TextAreaFieldProps) => {
    return (
        <AriaTextField {...props} className={cx("group flex w-full flex-col gap-2", className)}>
            {({ isInvalid, isRequired }) => (
                <>
                    {label && (
                        <Label isRequired={isRequired} isInvalid={isInvalid}>
                            {label}
                        </Label>
                    )}
                    <div className="relative">
                        {Icon && <Icon aria-hidden="true" className="pointer-events-none absolute top-4 left-4 size-4 text-stone" />}
                        <AriaTextArea
                            {...textAreaProps}
                            ref={textAreaRef}
                            placeholder={placeholder}
                            rows={rows}
                            className={cx(
                                "w-full resize-y border border-ink/20 bg-transparent px-4 py-3 text-ink outline-none transition-colors placeholder:text-stone/70 focus:border-brass group-invalid:border-red-700",
                                Icon && "pl-11",
                            )}
                        />
                    </div>
                    {hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
                </>
            )}
        </AriaTextField>
    );
};

TextArea.displayName = "TextArea";
