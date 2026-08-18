/**
 * Skills & Presets tab (settings.section, above the marketplace): manage
 * marketplace-installed skills and agent presets — list records, re-pull
 * github-sourced installs, uninstall. Agent presets are additionally managed
 * by the official settings page (copy/delete/default); this page only owns
 * the re-pull/update flow for what the marketplace installed.
 *
 * No profile concept here: skills/presets live in the global harness roots.
 */
import { type ReactNode } from 'react';
import type { InjectFace, PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import type { CommandResult, KindListView } from '../types.ts';
/** Registration-side Remote face provided by the section. */
export interface PluginKindsTabInjected {
    readonly kinds: () => Promise<KindListView>;
    /** Uninstall a kind install (profile-less: skills/presets only). */
    readonly uninstall: (repo: string) => Promise<CommandResult>;
    /** Re-pull a github-sourced kind install (re-clone + copy over). */
    readonly reinstall: (repo: string) => Promise<CommandResult>;
}
/** Full component props assembled by the Settings section renderer. */
export type PluginKindsTabProps = PropsRuntime<'settings.section'> & PropsLocale<'settings.pluginManager'> & InjectFace<PluginKindsTabInjected>;
/** Render the skills & presets page. */
export declare function PluginKindsTab({ kinds, uninstall, reinstall, t }: PluginKindsTabProps): ReactNode;
