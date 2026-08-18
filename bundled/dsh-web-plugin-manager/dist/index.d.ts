/**
 * dsh-plugin-manager host service: Web-UI plugin management for a DSH profile.
 *
 * Communication with the browser uses a small REST surface registered on
 * `ctx.webServer` under /api2/plugin-manager/* (the official /api channel is
 * Typert-owned and requires generated reflection artifacts; a standalone
 * bundle cannot ship them). Same-origin fetch from the Settings tab.
 *
 * Read side merges three truths:
 *  - the live Loader tree (`ctx.loader.entries()`, like the official
 *    read-only inventory),
 *  - the profile manifest (`dsh.profile.bundles` layer stack),
 *  - the profile's installed dependencies (`package.json`),
 *  - insert rows in the profile `cordis.patch.yml` (live-mounted non-bundle
 *    plugins).
 *
 * Write side (V2):
 *  - enable/disable edits the profile's `cordis.patch.yml` through the
 *    managed-block mechanism (src/patch.ts) — reversible, reviewable, never
 *    rewrites user content; the change is applied live through the loader
 *    include (no restart; see src/live.ts for the platform-deadlock rationale);
 *  - install/remove shells out to the official `dsh plugin` CLI (pnpm +
 *    reconcile of `dsh.profile.bundles`); after install the real package name
 *    is resolved from the manifest, and a non-bundle plugin is additionally
 *    mounted as a managed insert row (config HMR live, no restart);
 *  - agent tools (plugin_status/install/uninstall/toggle) register on
 *    ctx.tools when the host provides it (src/tools.ts).
 */
import { Context, Service } from '@deepseek-ai/cordis';
import z from '@deepseek-ai/schemastery';
import type { BackupDiffResult, BackupFile, CommandResult, KindListView, MarketplaceResult, MutationResult, PluginManagerSnapshot, ProfileInfo, StartResult, UpdateCheckResult } from './types.ts';
import type { AnalyzeResult } from './types.ts';
export type * from './types.ts';
/** Route prefix for the REST surface. */
export declare const ROUTE_PREFIX = "/api2/plugin-manager";
/** This package's own name (identifies the hosting profile). */
export declare const OUR_PACKAGE_NAME: string;
/** Management service (also registered as ctx.pluginManager for host peers). */
export declare class PluginManagerService extends Service {
    static inject: string[];
    constructor(ctx: Context);
    /** List every profile under $DSH_HOME/profiles (directories with package.json). */
    listProfiles(): ProfileInfo[];
    /** Create a custom profile from an official template (web/headless). */
    createProfile(name: string, template: string): Promise<MutationResult>;
    /** Rename a custom profile directory (never the hosting profile). */
    renameProfile(oldName: string, newName: string): MutationResult;
    /** Delete a custom profile directory (never the hosting profile). */
    removeProfile(name: string): MutationResult;
    /**
     * Launch a profile instance (web environments only): opens a terminal
     * window running dsh on a free port (closing the terminal stops the
     * instance). Falls back to a detached background process when no
     * terminal emulator is available. Waits until the web server answers.
     */
    startProfile(name: string): Promise<StartResult>;
    /**
     * Fetch the marketplace listing (24h cache).
     *
     * Sources, in order of value:
     *   1. the static registry index (topic:dsh-plugin, ~3000 repos, CI-built,
     *      zero API calls) — fetched through a multi-source fallback chain
     *      (src/registry.ts) with a local disk cache;
     *   2. the curated awesome-dsh-plugins catalog (status / packageName /
     *      curated description) — overlaid onto registry entries, with its
     *      own-only entries appended;
     *   3. PLUGINS.md (legacy curated table) — merged into the catalog layer;
     *   4. GitHub search API — only when every index source is unusable
     *      (partial by design, never persisted).
     *
     * Caching: a 24h disk cache (merged items, profile-independent) plus an
     * in-process mirror so profile switches (which only recompute installed
     * flags) never re-read the ~1.7MB file; a 5-minute negative cache records
     * total source failure; the search fallback never persists. refresh=1 is
     * the only way to force a network round-trip.
     *
     * Installed flags are computed server-side per request for the queried
     * profile (package-name / repository / git-cache / skills+presets probing),
     * so "installed" is correct even for plugins installed before the manager.
     */
    /**
     * Marketplace listing. Concurrent refreshes are serialized: the source
     * walk + cache write is last-write-wins, and parallel walks would let an
     * older response overwrite a newer one (audit M13).
     */
    marketplace(profile: string, refresh: boolean): Promise<MarketplaceResult>;
    private marketplaceInner;
    /** Snapshot one profile: live entries + installed packages + bundle status. */
    list(profile: string): PluginManagerSnapshot;
    /**
     * Mount an installed-but-unmounted dependency as a managed insert row:
     * the manual-install fix. The official CLI writes only the dependency
     * (non-bundle plugins get no row, so they never load); this writes the
     * same managed insert row the install flow would, applied live when the
     * profile is running.
     */
    mount(profile: string, packageName: string): Promise<MutationResult>;
    private mountInner;
    /** Enable or disable one plugin row via the managed patch block (live). */
    setEnabled(profile: string, entryId: string, enabled: boolean): Promise<MutationResult>;
    private setEnabledInner;
    /**
     * Archive (disable) or restore (re-enable) the plugin's owned agent
     * presets for the running profile, returning a summary suffix for the
     * result message. Skips when the row's package cannot be resolved, when
     * another profile still installs the plugin (presets are global), or when
     * the toggle was file-only. Never throws — a failure degrades to a note.
     */
    private presetLifecycleNote;
    /** Stop a running instance of a custom profile (never the current one). */
    stopProfile(name: string): Promise<MutationResult>;
    /**
     * Install a plugin via dsh plugin (preserving in-box bundles). After a
     * successful add, the real package name is resolved from the manifest
     * (V2-C: pnpm dependency values may be path/git source strings; the
     * dependency key is the package name). A non-bundle plugin (no dsh.bundle
     * declaration) is then mounted as a managed insert row — config HMR applies
     * it live, no restart.
     */
    install(profile: string, spec: string, answers?: Record<string, string>, locale?: 'zh' | 'en'): Promise<CommandResult>;
    /**
     * Copy installed plugins from one profile to another (custom-plugin
     * transfer). Each package is reinstalled into the target using its
     * recorded install source (path/git/tarball/name).
     */
    copyPlugins(fromProfile: string, toProfile: string, names: readonly string[]): Promise<CommandResult>;
    /** Remove an installed package via dsh plugin (preserving in-box bundles). */
    remove(profile: string, name: string): Promise<CommandResult>;
    /**
     * Kind-install overview for the Skills & Presets page: install records
     * (ghost records pruned) plus the on-disk skill / preset directories
     * (including non-record installs).
     */
    listKinds(): Promise<KindListView>;
    /**
     * Export a backup file: install manifests for one profile (or all) plus
     * the marketplace kind records. A reinstallable LIST, not data/config —
     * patch user config, node_modules entities, credentials are excluded.
     */
    backupExport(profileFilter: string): Promise<BackupFile>;
    /**
     * Diff a backup against the current installation state. Local-path sources
     * (link:/file:/absolute) that no longer exist are unrestorable, not
     * missing — reinstalling them would only fail.
     */
    backupDiff(backup: BackupFile, targetProfile: string): Promise<BackupDiffResult>;
    /**
     * Restore a backup: reinstall every missing entry through the protected
     * install chain (quality gate + rollback apply). Failures do not abort the
     * batch — each entry is reported, and the overall result is failed when
     * any entry failed. Serialized by the mutation mutex (installWithSource).
     */
    backupRestore(backup: BackupFile, targetProfile: string): Promise<CommandResult>;
    /**
     * Execute one machine-fixable health-check action. A-level actions (safe
     * defaults) run directly; B-level (conflict disables) are sent here only
     * after the user confirmed in the UI. Serialized by the mutation mutex;
     * inner calls use the un-wrapped service methods to avoid queue nesting.
     */
    fixIssue(profile: string, action: string, target: string): Promise<MutationResult>;
    private fixIssueInner;
    /**
     * Run every A-level (safe-default) fix from a fresh analysis. B-level
     * suggestions are left for the per-issue confirm flow. Serialized by the
     * mutation mutex.
     */
    fixAll(profile: string): Promise<CommandResult>;
    /**
     * Uninstall a marketplace-kind install through its record: skills/presets
     * delete their directories (path-containment guarded), cordis plugins
     * remove each recorded package through the protected path (dependency +
     * insert rows), then the record itself is removed.
     */
    uninstallKind(profile: string, repo: string): Promise<CommandResult>;
    /** Remove one managed insert row (non-bundle plugin, live unmount). */
    removeInsert(profile: string, rowId: string): Promise<MutationResult>;
    private removeInsertInner;
    /**
     * Check every installed package for a newer version (manual update check).
     *
     * Source kinds:
     *  - npm packages (semver range / bare version in the manifest) are
     *    compared against the npm registry dist-tag `latest`;
     *  - git-cloned cache directories (dependencies value `link:<path>` where
     *    the target is a git repository) are compared against their remote:
     *    the cache is fetched (never pulled) and the local HEAD is compared
     *    with the remote ref;
     *  - anything else (local non-git directories, tarballs, unknown shapes)
     *    reports `hasUpdate: false` with an explanatory message — a manual
     *    reinstall is still possible via the update action.
     */
    checkUpdates(profile: string): Promise<UpdateCheckResult>;
    /**
     * Update one installed package to the latest version.
     *
     *  - npm: reinstall through the official CLI with `@latest` (quality gate
     *    and in-box bundle preservation included);
     *  - git cache (link:path into plugin-manager-src): fetch + hard reset the
     *    cache to its remote ref, then re-run the official add to refresh the
     *    dependency record; the installed package links into the cache, so the
     *    new content is picked up on the next start;
     *  - git URL sources (`github:…` / git URLs): re-add the source spec so
     *    pnpm re-resolves the remote;
     *  - local non-git directories cannot be updated (no upstream to pull).
     */
    update(profile: string, name: string, locale?: 'zh' | 'en'): Promise<CommandResult>;
    /**
     * Dependency / conflict / compatibility analysis for one profile. The
     * offline engine (src/analyze.ts) covers any profile; the running profile
     * additionally feeds live observations: fiber states and errors, the
     * active service table (ctx.reflect), and pending-inject diagnostics.
     */
    analyze(profile: string): AnalyzeResult;
}
/**
 * Normalize a cloneable git URL into the pnpm git-protocol form
 * (github:owner/repo for GitHub, the URL itself otherwise), keeping a #ref
 * fragment. Git-source plugins install INTO the profile tree through this
 * spec so their dependencies resolve; a link install would put the code in
 * the clone cache outside the profile, where bare imports cannot reach the
 * profile/fallback node_modules (ERR_MODULE_NOT_FOUND crash).
 */
export declare function toGitSpec(repo: string, ref?: string): string;
/**
 * The pnpm git-protocol spec for a clone-cache directory, from its origin
 * remote (github:owner/repo for GitHub remotes, the URL otherwise). Used by
 * the update path so a cache refresh reinstalls the plugin through the git
 * protocol instead of re-linking it (a link cannot resolve the plugin's
 * dependencies — see prepareInstallSource).
 */
export declare function gitSpecFromCache(local: string): Promise<string | undefined>;
/**
 * The commit a git-protocol dependency currently resolves to, from the
 * profile lockfile (pnpm records it as the tar.gz URL suffix). Used to roll
 * a failed git-source update back to the previous commit.
 */
export declare function gitCommitFromLock(profile: string, packageName: string): string | undefined;
/**
 * Install with source preparation: git sources (not published on npm,
 * workspace subpackages) are cloned into a cache directory and installed
 * from there — the "official path" for repositories that never reached the
 * registry — with npm-first when the cloned package is published. ctx null
 * = out-of-process caller (the dshpm CLI). Serialized by the mutation mutex.
 */
export declare function installWithSource(ctx: Context | null, profile: string, spec: string, answers?: Record<string, string>, locale?: 'zh' | 'en'): Promise<CommandResult>;
/**
 * Shared install path: pnpm add through the official CLI, resolve the real
 * package name, mount non-bundle plugins as managed insert rows, restore
 * in-box bundles, and run a quality check (undeclared runtime imports and
 * official packages declared as regular dependencies are the main reasons
 * third-party plugins break a profile — auto-rollback on failure).
 *
 * ctx is the live host context when a profile instance is running (live
 * apply of insert rows) and null for out-of-process callers (the dshpm
 * CLI): the file-level install, quality gate, and rollback are identical,
 * only the live-mount step is skipped.
 */
export declare function installProtected(ctx: Context | null, profile: string, spec: string, env?: NodeJS.ProcessEnv): Promise<CommandResult>;
/**
 * Shared remove path: pnpm remove through the official CLI, preserving
 * in-box bundles and cleaning up the managed insert rows of the removed
 * package. ctx null = out-of-process caller (the dshpm CLI); the file
 * removal is identical, only the live unmount is skipped. Serialized by the
 * mutation mutex.
 */
export declare function removeProtected(ctx: Context | null, profile: string, name: string): Promise<CommandResult>;
/**
 * Shared update path for one installed package (source-kind contract as on
 * the service method): npm @latest reinstall / git-cache fetch+reset /
 * git-URL re-resolve, each with the quality gate and rollback. ctx-free —
 * usable from the dshpm CLI without a live host. Serialized by the
 * mutation mutex.
 */
export declare function updateProtected(profile: string, name: string, locale?: 'zh' | 'en'): Promise<CommandResult>;
/** Mount the REST surface. Returns the route disposers (may be empty). */
export declare function registerRoutes(ctx: Context, service: PluginManagerService): (() => void)[];
/** Plugin entry config: target profile for the agent tools. */
export interface PluginManagerConfig {
    /** Profile the agent tools (plugin_status/install/uninstall/toggle) manage. */
    profile: string;
}
export declare const Config: z<PluginManagerConfig>;
/** Plugin entry: mount the service, routes, and (when present) agent tools. */
export declare const name = "plugin-manager";
export declare const inject: string[];
export declare function apply(ctx: Context, config: PluginManagerConfig): void;
