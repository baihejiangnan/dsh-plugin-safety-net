/**
 * Plugin Catalog tab: the official inventory look (search + card list),
 * shadowing the official read-only tab (same slot id 'all', lower priority)
 * and adding live enable/disable, installed/built-in filtering (built-ins
 * hidden by default), and sorting (default / A-Z / enabled × asc/desc).
 */
import { type ReactNode } from 'react';
import type { InjectFace, PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import type { MutationResult, PluginManagerSnapshot, ProfileInfo } from '../types.ts';
/** Registration-side Remote face provided by the section. */
export interface PluginCatalogTabInjected {
    readonly profiles: () => Promise<ProfileInfo[]>;
    readonly list: (profile: string) => Promise<PluginManagerSnapshot>;
    readonly setEnabled: (profile: string, entryId: string, enabled: boolean) => Promise<MutationResult>;
    readonly mount: (profile: string, packageName: string) => Promise<MutationResult>;
}
/** Full component props assembled by the Settings slot renderer. */
export type PluginCatalogTabProps = PropsRuntime<'settings.plugins.tab'> & PropsLocale<'settings.pluginManager'> & InjectFace<PluginCatalogTabInjected>;
/** Which rows the catalog shows. */
export type CatalogFilter = 'installed' | 'builtin' | 'all';
/** Sort key for the catalog. */
export type CatalogSort = 'default' | 'az' | 'enabled';
/** Render the catalog (shadows the official read-only inventory). */
export declare function PluginCatalogTab({ profiles, list, setEnabled, mount, t }: PluginCatalogTabProps): ReactNode;
