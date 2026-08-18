/**
 * PmSelect: official dropdown (ui-primitives Menu) replacing native selects.
 */
import { type ReactNode } from 'react';
/** One option of the dropdown. */
export interface PmSelectOption {
    readonly value: string;
    readonly label: string;
}
/**
 * Render a controlled official-style dropdown.
 * @param props.value - selected option value.
 * @param props.options - selectable options.
 * @param props.onChange - selection callback.
 * @param props.ariaLabel - accessible label for the trigger button.
 */
export declare function PmSelect({ value, options, onChange, ariaLabel, disabled }: {
    value: string;
    options: readonly PmSelectOption[];
    onChange: (value: string) => void;
    ariaLabel?: string;
    /** Lock the selector while a mutation is running (audit m-4). */
    disabled?: boolean;
}): ReactNode;
