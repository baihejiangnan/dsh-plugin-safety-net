/**
 * Environment management tab: create/rename/remove custom profiles
 * (official web/headless are read-only), with web/headless templates.
 */
import { type ReactNode } from 'react';
import type { InjectFace, PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import type { BackupDiffResult, BackupFile, CommandResult, MutationResult, ProfileInfo, StartResult } from '../types.ts';
/** Registration-side Remote face provided by the section. */
export interface PluginEnvironmentsTabInjected {
    readonly profiles: () => Promise<ProfileInfo[]>;
    readonly copyPlugins: (from: string, to: string, names: string[]) => Promise<CommandResult>;
    readonly startProfile: (name: string) => Promise<StartResult>;
    readonly stopProfile: (name: string) => Promise<MutationResult>;
    readonly createProfile: (name: string, template: string) => Promise<MutationResult>;
    readonly renameProfile: (oldName: string, newName: string) => Promise<MutationResult>;
    readonly removeProfile: (name: string) => Promise<MutationResult>;
    readonly backupExport: (profile: string) => Promise<BackupFile>;
    readonly backupDiff: (backup: BackupFile, profile: string) => Promise<BackupDiffResult>;
    readonly backupRestore: (backup: BackupFile, profile: string) => Promise<CommandResult>;
}
/** Full component props assembled by the Settings slot renderer. */
export type PluginEnvironmentsTabProps = PropsRuntime<'settings.plugins.tab'> & PropsLocale<'settings.pluginManager'> & InjectFace<PluginEnvironmentsTabInjected>;
/** Render the environment management tab. */
export declare function PluginEnvironmentsTab({ profiles, copyPlugins, startProfile, stopProfile, createProfile, renameProfile, removeProfile, backupExport, backupDiff, backupRestore, t }: PluginEnvironmentsTabProps): ReactNode;
