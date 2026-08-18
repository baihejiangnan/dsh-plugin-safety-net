/**
 * EnvQuestionForm (C2): shared inline form for install-time environment
 * variables. Used by the marketplace card and the management install bar —
 * no popups, no terminal input (user preference). Empty value = skip.
 */
import { type ReactNode } from 'react';
import type { EnvQuestion } from '../types.ts';
import type { PluginManagerLocaleKey } from './locales.ts';
/** Locale bind signature (ctx.locale.bind(NS)). */
type T = (key: PluginManagerLocaleKey, params?: Record<string, string | number>) => string;
/** One env question rendered inline; the caller supplies t (bound locale). */
export declare function EnvQuestionForm({ questions, busy, t, onContinue, onCancel }: {
    questions: readonly EnvQuestion[];
    busy: boolean;
    t: T;
    onContinue: (answers: Record<string, string>) => void;
    onCancel: () => void;
}): ReactNode;
export {};
