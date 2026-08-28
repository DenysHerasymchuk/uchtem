import { type ComponentType, type SelectHTMLAttributes, type SVGProps, useId } from "react";
import { ChevronDown } from "@untitledui/icons";
import { HintText } from "@/components/base/input/hint-text";
import { Label } from "@/components/base/input/label";
import { cx } from "@/utils/cx";

interface NativeSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
    label?: string;
    hint?: string;
    options: { label: string; value: string; disabled?: boolean }[];
    icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

export const NativeSelect = ({ label, hint, options, className, icon: Icon, ...props }: NativeSelectProps) => {
    const id = useId();
    const selectId = `select-native-${id}`;
    const hintId = `select-native-hint-${id}`;

    return (
        <div className={cx("flex w-full flex-col gap-2", className)}>
            {label && <Label htmlFor={selectId}>{label}</Label>}

            <div className="relative grid w-full items-center">
                {Icon && <Icon aria-hidden="true" className="pointer-events-none absolute left-4 size-4 text-stone" />}
                <select
                    {...props}
                    id={selectId}
                    aria-describedby={hint ? hintId : undefined}
                    className={cx(
                        "w-full appearance-none border border-ink/20 bg-transparent px-4 py-3 text-ink outline-none transition-colors focus:border-brass",
                        Icon && "pl-11",
                    )}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                            {opt.label}
                        </option>
                    ))}
                </select>

                <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 size-4 text-stone" />
            </div>

            {hint && <HintText id={hintId}>{hint}</HintText>}
        </div>
    );
};
