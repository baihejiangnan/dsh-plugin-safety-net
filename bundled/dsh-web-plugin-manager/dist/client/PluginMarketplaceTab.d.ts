/**
 * Plugin Marketplace tab (settings.section first-level entry): browse the
 * merged marketplace (static registry index + curated catalog), with
 * server-side installed detection, update availability and install/update
 * actions per card.
 *
 * Rendering is incremental: the first PAGE cards render immediately and the
 * rest appear as the sentinel enters the viewport (IntersectionObserver),
 * with `content-visibility: auto` letting the browser skip off-screen work —
 * a ~3000-entry listing stays responsive without server-side paging.
 */
import { type ReactNode } from 'react';
import type { InjectFace, PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import type { CommandResult, MarketplaceResult, MutationResult, ProfileInfo } from '../types.ts';
/** Registration-side Remote face provided by the section. */
export interface PluginMarketplaceTabInjected {
    readonly marketplace: (refresh: boolean, profile: string) => Promise<MarketplaceResult>;
    readonly profiles: () => Promise<ProfileInfo[]>;
    readonly install: (profile: string, spec: string, answers?: Record<string, string>) => Promise<CommandResult>;
    readonly update: (profile: string, name: string) => Promise<CommandResult>;
    readonly unblock: (repo: string) => Promise<MutationResult>;
}
/** Full component props assembled by the Settings section renderer. */
export type PluginMarketplaceTabProps = PropsRuntime<'settings.section'> & PropsLocale<'settings.pluginManager'> & InjectFace<PluginMarketplaceTabInjected>;
/** Render the marketplace page. */
export declare function PluginMarketplaceTab({ marketplace, profiles, install, update, unblock, t }: PluginMarketplaceTabProps): ReactNode;
