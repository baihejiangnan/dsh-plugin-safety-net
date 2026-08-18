/**
 * Agent tools for plugin management (plugin_status / plugin_install /
 * plugin_uninstall / plugin_toggle / plugin_search). Registered on ctx.tools
 * when the host provides it (see registerTools).
 *
 * Install state has two official shapes:
 *  - bundle plugins (npm package declaring dsh.bundle) live in the profile's
 *    dsh.profile.bundles layer stack and need a web restart to load;
 *  - non-bundle plugins (plain cordis packages) mount as insert rows in the
 *    profile cordis.patch.yml, which config HMR applies live (no restart).
 *
 * Dependencies are injected (PluginToolsHost) to avoid a circular import
 * with index.ts, mirroring the reference console's discovery/tools pattern.
 */
import { defineTool } from '@deepseek-ai/dsh-tools';
import type { CommandResult, MarketplaceResult, MutationResult, PluginManagerSnapshot } from './types.ts';
/** Host operations the tools need (implemented by the manager service). */
export interface PluginToolsHost {
    list(profile: string): PluginManagerSnapshot;
    setEnabled(profile: string, entryId: string, enabled: boolean): Promise<MutationResult>;
    install(profile: string, spec: string): Promise<CommandResult>;
    remove(profile: string, name: string): Promise<CommandResult>;
    removeInsert(profile: string, rowId: string): Promise<MutationResult>;
    marketplace(refresh: boolean, profile: string): Promise<MarketplaceResult>;
}
/** Tool dependencies captured for one target profile. */
export interface PluginToolsDeps {
    readonly profile: string;
    readonly snapshot: () => PluginManagerSnapshot;
    readonly setEnabled: (entryId: string, enabled: boolean) => Promise<MutationResult>;
    readonly install: (spec: string) => Promise<CommandResult>;
    readonly remove: (name: string) => Promise<CommandResult>;
    readonly removeInsert: (rowId: string) => Promise<MutationResult>;
    readonly marketplace: (refresh: boolean) => Promise<MarketplaceResult>;
}
/** Build the four plugin tools for one profile. */
export declare function createPluginTools(deps: PluginToolsDeps): ReturnType<typeof defineTool>[];
/** Register the tools on ctx.tools when available. Returns route disposers. */
export declare function registerTools(ctx: {
    get(name: string): unknown;
}, host: PluginToolsHost, profile: string): (() => void)[];
