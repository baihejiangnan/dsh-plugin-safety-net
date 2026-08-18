/**
 * dsh-plugin-manager browser half: registers two settings tabs.
 *  - PluginCatalogTab shadows the official read-only inventory (same slot
 *    id 'all', lower priority) with live enable/disable, filtering, sorting.
 *  - PluginManagerSettingsTab is the install/uninstall management page.
 * Communicates with the host through the /api2/plugin-manager REST surface
 * (same-origin fetch).
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client';
import { type PluginManagerLocaleKey } from './locales.ts';
export type { PluginCatalogTabInjected, PluginCatalogTabProps } from './PluginCatalogTab.tsx';
export type { PluginManagerTabInjected, PluginManagerTabProps } from './PluginManagerSettingsTab.tsx';
export type { PluginEnvironmentsTabInjected, PluginEnvironmentsTabProps } from './PluginEnvironmentsTab.tsx';
export type { PluginKindsTabInjected, PluginKindsTabProps } from './PluginKindsTab.tsx';
export type { PluginMarketplaceTabInjected, PluginMarketplaceTabProps } from './PluginMarketplaceTab.tsx';
export type { PluginManagerLocaleKey } from './locales.ts';
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        /** Plugin-manager settings copy. */
        'settings.pluginManager': PluginManagerLocaleKey;
    }
}
/** Dictionary namespace owned by this plugin. */
export declare const NS = "settings.pluginManager";
/** Services required by the Settings registration. */
export declare const inject: string[];
/** Contribute the catalog (shadowing official) and management tabs. */
export declare function apply(ctx: ClientContext): void;
