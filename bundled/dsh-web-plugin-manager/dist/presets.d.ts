/** Neutral standard ownership marker file name (written by our installer). */
export declare const OWNER_MARKER = ".dsh-preset-owner.json";
/** Marker schema version. */
export declare const OWNER_MARKER_FORMAT = 0;
/** Directory where disabled plugins' presets are parked (outside the user root). */
export declare function presetArchiveDir(): string;
/**
 * Digest of a preset directory's composition files (filename + NUL + content
 * + NUL each, same scheme as dsh-agent-rp). Returns null when a file is
 * unreadable — treated as "cannot verify" by the modified check.
 */
export declare function presetDigest(presetDir: string): string | null;
/**
 * Read every owner a preset directory declares, across the standard marker
 * and the compatible third-party shapes. A corrupt STANDARD marker makes the
 * whole read fail closed (no owners — nothing is deleted); a corrupt
 * third-party marker is skipped individually (their writers are less strict).
 */
export declare function readPresetOwners(presetDir: string): string[];
/** Preset directories under a root (directory name = id; dot dirs skipped). */
export declare function scanPresets(root: string): Array<{
    id: string;
    dir: string;
}>;
export interface PresetOwnership {
    /** Whether the preset's only owner is the given plugin. */
    readonly owned: boolean;
    /** Whether the files no longer match the recorded install digest. */
    readonly modified: boolean;
}
/**
 * Ownership verdict for one preset directory. Multi-owner markers (a preset
 * claimed by more than one plugin) are never acted on — one owner's removal
 * must not take the other's data. "Modified" is true when the marker carries
 * a digest and the files differ, and also when the standard marker is
 * corrupt (fail closed); markers without a digest (gamelike shape) report
 * unmodified.
 */
export declare function presetOwnedBy(presetDir: string, pluginName: string): PresetOwnership;
/** The host agentPresets service, when the running host provides it. */
export interface AgentPresetService {
    list(): Promise<Array<{
        id: string;
        path: string;
    }>>;
    remove(id: string): Promise<unknown>;
}
export declare function agentPresetsOf(ctx: unknown): AgentPresetService | undefined;
export interface PresetCleanupResult {
    readonly removed: readonly string[];
    readonly skipped: readonly {
        id: string;
        reason: string;
    }[];
}
/**
 * Delete the unmodified presets solely owned by the given plugin under the
 * given root. Prefers the host agentPresets.remove() (it clears a settings
 * default that pointed at the preset and keeps standing sessions intact);
 * falls back to direct removal when the host service is absent (CLI runs).
 * Edited presets (digest mismatch) and multi-owner presets are skipped and
 * reported.
 */
export declare function cleanupOwnedPresets(ctx: unknown, root: string, pluginName: string): Promise<PresetCleanupResult>;
export interface PresetArchiveResult {
    readonly archived: readonly string[];
    readonly skipped: readonly {
        id: string;
        reason: string;
    }[];
}
/**
 * Move a disabled plugin's owned presets out of the user root (archive).
 * Zero data loss: edited presets are archived too, only the picker loses the
 * entry. The roster re-scans the directory on every read, so the change is
 * visible immediately; no host notification is needed.
 */
export declare function archiveOwnedPresets(root: string, pluginName: string): PresetArchiveResult;
export interface PresetRestoreResult {
    readonly restored: readonly string[];
    readonly skipped: readonly {
        id: string;
        reason: string;
    }[];
}
/**
 * Move a re-enabled plugin's archived presets back into the user root. A
 * same-id preset that appeared meanwhile wins; the archived copy stays put
 * and is reported.
 */
export declare function restoreArchivedPresets(root: string, pluginName: string): PresetRestoreResult;
/**
 * Whether the plugin is still installed in another profile. Presets are
 * global, so uninstalling or disabling a plugin in one profile must not
 * remove presets a second profile still uses. Install records always land in
 * the profile manifest dependencies, so the dependency check is the
 * authoritative "still around somewhere" signal.
 */
export declare function pluginInstalledInOtherProfiles(profile: string, pluginName: string): boolean;
/**
 * Write the neutral ownership marker into an installed preset directory.
 * Never overwrites an existing marker (a plugin or another tool may already
 * claim the directory). The digest records what was just installed, so a
 * later user edit skips deletion.
 */
export declare function writeOwnerMarker(presetDir: string, owners: readonly string[]): void;
/** Human-readable summary of a cleanup result (for command output). */
export declare function formatCleanupResult(pluginName: string, result: PresetCleanupResult): string;
/** Human-readable summary of an archive result. */
export declare function formatArchiveResult(pluginName: string, result: PresetArchiveResult): string;
/** Human-readable summary of a restore result. */
export declare function formatRestoreResult(pluginName: string, result: PresetRestoreResult): string;
