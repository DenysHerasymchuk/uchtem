import type { FC, ReactElement, ReactNode } from "react";
import React, { isValidElement } from "react";
import type { ButtonProps as AriaButtonProps, LinkProps as AriaLinkProps } from "react-aria-components";
import { Button as AriaButton, Link as AriaLink } from "react-aria-components";
import { cx, sortCx } from "@/utils/cx";
import { isReactComponent } from "@/utils/is-react-component";

/**
 * Uchtem button: rectangular, 1px bordered, no shadow — restyled from the
 * UntitledUI base component onto the brand's ink/ivory/brass token system.
 */
export const styles = sortCx({
    common: {
        root: [
            "group relative inline-flex h-max cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[2px] font-sans transition-all duration-200 ease-out",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
            "active:scale-[0.98]",
            "disabled:pointer-events-none disabled:opacity-40",
        ].join(" "),
        icon: "pointer-events-none size-4 shrink-0",
        iconTrailing: "pointer-events-none size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1",
    },
    sizes: {
        sm: { root: "px-4 py-2 text-xs tracking-wide uppercase" },
        md: { root: "px-6 py-3 text-sm tracking-wide uppercase" },
        lg: { root: "px-8 py-4 text-sm tracking-widest uppercase" },
    },
    colors: {
        primary: {
            root: "border border-ink bg-ink text-ivory hover:border-brass hover:bg-brass hover:text-ink",
        },
        "primary-inverted": {
            root: "border border-ivory bg-ivory text-ink hover:border-brass hover:bg-brass hover:text-ink",
        },
        secondary: {
            root: "border border-ink/70 bg-transparent text-ink hover:border-brass hover:text-brass",
        },
        "secondary-inverted": {
            root: "border border-ivory/70 bg-transparent text-ivory hover:border-brass hover:text-brass",
        },
        tertiary: {
            root: "border border-transparent bg-transparent p-0! normal-case tracking-normal text-ink underline decoration-transparent underline-offset-4 hover:decoration-brass",
        },
        "tertiary-inverted": {
            root: "border border-transparent bg-transparent p-0! normal-case tracking-normal text-ivory underline decoration-transparent underline-offset-4 hover:decoration-brass",
        },
    },
});

/**
 * Common props shared between button and anchor variants
 */
export interface CommonProps {
    /** Disables the button and shows a disabled state */
    isDisabled?: boolean;
    /** Shows a loading spinner and disables the button */
    isLoading?: boolean;
    /** The size variant of the button */
    size?: keyof typeof styles.sizes;
    /** The color variant of the button */
    color?: keyof typeof styles.colors;
    /** Icon component or element to show before the text */
    iconLeading?: FC<{ className?: string }> | ReactNode;
    /** Icon component or element to show after the text */
    iconTrailing?: FC<{ className?: string }> | ReactNode;

    children?: ReactNode;
    className?: string;
}

/**
 * Props for the button variant (non-link)
 */
export interface ButtonProps extends CommonProps, Omit<AriaButtonProps, "children" | "className"> {}
/**
 * Props for the link variant (anchor tag)
 */
interface LinkProps extends CommonProps, Omit<AriaLinkProps, "children" | "className"> {
    href: NonNullable<AriaLinkProps["href"]>;
}

/** Union type of button and link props */
export type Props = ButtonProps | LinkProps;

export const Button: {
    (props: LinkProps): ReactElement<LinkProps>;
    (props: ButtonProps): ReactElement<ButtonProps>;
} = ({
    size = "md",
    color = "primary",
    children,
    className,
    iconLeading: IconLeading,
    iconTrailing: IconTrailing,
    isDisabled: disabled,
    isLoading: loading,
    ...props
}) => {
    const href = "href" in props ? props.href : undefined;

    const commonChildren = (
        <>
            {isValidElement(IconLeading) && IconLeading}
            {isReactComponent(IconLeading) && <IconLeading data-icon="leading" className={styles.common.icon} />}

            {loading && (
                <svg fill="none" data-icon="loading" viewBox="0 0 20 20" className={cx(styles.common.icon, "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2")}>
                    <circle className="stroke-current opacity-30" cx="10" cy="10" r="8" fill="none" strokeWidth="2" />
                    <circle
                        className="origin-center animate-spin stroke-current"
                        cx="10"
                        cy="10"
                        r="8"
                        fill="none"
                        strokeWidth="2"
                        strokeDasharray="12.5 50"
                        strokeLinecap="round"
                    />
                </svg>
            )}

            {children && <span data-text className={cx(loading && "invisible")}>{children}</span>}

            {isValidElement(IconTrailing) && IconTrailing}
            {isReactComponent(IconTrailing) && <IconTrailing data-icon="trailing" className={styles.common.iconTrailing} />}
        </>
    );

    const commonProps = {
        ...props,
        isDisabled: disabled,
        className: cx(styles.common.root, styles.sizes[size].root, styles.colors[color].root, loading && "pointer-events-none", className),
        children: commonChildren,
    };

    if ("href" in commonProps) {
        return <AriaLink {...commonProps} href={disabled ? undefined : href} />;
    }

    return <AriaButton {...commonProps} type={commonProps.type || "button"} isPending={loading} />;
};
