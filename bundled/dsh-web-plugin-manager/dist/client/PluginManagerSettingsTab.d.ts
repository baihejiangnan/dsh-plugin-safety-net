/**
 * Plugin Manager management tab: install/remove packages and live-mount
 * rows. Viewing/toggling lives in the catalog tab (PluginCatalogTab); this
 * tab only manages installation state.
 */
import { type ReactNode } from 'react';
import type { InjectFace, PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import type { AnalyzeResult, CommandResult, MutationResult, PluginManagerSnapshot, ProfileInfo, UpdateCheckResult } from '../types.ts';
/** Registration-side Remote face provided by the section. */
export interface PluginManagerTabInjected {
    readonly profiles: () => Promise<ProfileInfo[]>;
    readonly list: (profile: string) => Promise<PluginManagerSnapshot>;
    readonly install: (profile: string, spec: string, answers?: Record<string, string>) => Promise<CommandResult>;
    readonly remove: (profile: string, name: string) => Promise<CommandResult>;
    readonly removeInsert: (profile: string, rowId: string) => Promise<MutationResult>;
    readonly copyPlugins: (from: string, to: string, names: string[]) => Promise<CommandResult>;
    readonly checkUpdates: (profile: string) => Promise<UpdateCheckResult>;
    readonly update: (profile: string, name: string) => Promise<CommandResult>;
    readonly analyze: (profile: string) => Promise<AnalyzeResult>;
    readonly fixIssue: (profile: string, action: string, target: string) => Promise<MutationResult>;
    readonly fixAll: (profile: string) => Promise<CommandResult>;
}
/** Full component props assembled by the Settings slot renderer. */
export type PluginManagerTabProps = PropsRuntime<'settings.plugins.tab'> & PropsLocale<'settings.pluginManager'> & InjectFace<PluginManagerTabInjected>;
/** Render the management tab. */
export declare function PluginManagerSettingsTab({ profiles, list, install, remove, removeInsert, copyPlugins, checkUpdates, update, analyze, fixIssue, fixAll, t }: PluginManagerTabProps): ReactNode;
