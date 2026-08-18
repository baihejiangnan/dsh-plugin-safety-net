/**
 * Multi-kind install support (Phase B): detect and install skill and
 * agent-preset repositories into the OFFICIAL harness roots
 * (<dshHome>/skills, <dshHome>/.agent-presets — verified against the DSH
 * source: skill-filesystem scans <dshHome>/skills with a default chokidar
 * watch (hot reload), agent-presets discovers <dshHome>/.agent-presets on
 * every read with agent.cordis.yml as the composition file).
 *
 * Detection mirrors the community marketplace's layered ordering WITHOUT the
 * script type: repositories carrying install.sh/ps1 are never auto-executed
 * (third-party code) and fall through to instructions. A preset is any
 * directory holding agent.cordis.yml (the official composition file) —
 * preset.yml is only optional display metadata, not a requirement.
 *
 * Also owns the shared install record store (installed-kinds.json) and the
 * blocked-repos list (repositories detected as non-installable are filtered
 * from every marketplace listing, cached or fresh).
 */
/** The kind of installable content a repository carries. */
export type RepoKind = 'agent-preset' | 'cordis-plugin' | 'skill' | 'instructions';
/** Official composition file that makes a directory an agent preset. */
export declare const PRESET_COMPOSITION_FILE = "agent.cordis.yml";
/** Official skill manifest file. */
export declare const SKILL_MANIFEST_FILE = "SKILL.md";
/** The harness home (DSH_HOME env, then ~/.dsh). */
export declare function dshHomePath(): string;
/** Official user skill root. */
export declare function skillsDirPath(): string;
/** Official user agent-preset root. */
export declare function presetsDirPath(): string;
/** Sluggish dir-name form used by skill/preset install dirs. */
export declare function slugDirName(name: string): string;
/** A directory name safe on every platform (reserved names get a suffix). */
export declare function safeDirName(name: string): string;
/** Normalize a repository reference (URL or owner/repo) to lowercase owner/repo. */
export declare function normalizeRepoRef(value: string): string | null;
/**
 * DSH plugin eligibility: the manifest declares a `dsh` field, or depends on
 * the DSH core packages. Repos that merely carry a package.json (aggregate
 * pages, desktop apps, plain npm projects) are filtered out.
 */
export declare function looksLikeDshPlugin(pkg: unknown): boolean | null;
/**
 * Find SKILL.md roots (root and nested skill-collection repos), skipping dot
 * directories (repo-internal agent tooling), node_modules and vendored dirs.
 */
export declare function findSkillRoots(root: string, maxDepth?: number, limit?: number): string[];
/** Find directories holding the official preset composition file (nested presets included). */
export declare function findPresetRoots(root: string, maxDepth?: number, limit?: number): string[];
/** Find DSH-plugin package roots (skin/multi-package repos), filtered by eligibility. */
export declare function findPluginRoots(root: string, maxDepth?: number, limit?: number): string[];
/**
 * Layered type detection:
 *   1. preset (root or nested agent.cordis.yml) — official single-file rule;
 *   2. root package.json declaring DSH capability → cordis-plugin;
 *   3. root SKILL.md → skill (covers tool-chain package.json on pure skill
 *      repos — looksLikeDshPlugin is false there);
 *   4. a package.json that is NOT a DSH plugin (aggregate pages, desktop
 *      apps, plain npm projects) → instructions (blocked from the
 *      marketplace instead of being force-installed as a cordis plugin);
 *   5. nested preset / nested plugin / nested skill roots;
 *   6. install scripts are NOT auto-executed — such repos fall through to
 *      instructions (third-party code requires a confirmation loop we do not
 *      ship; the user is told to run the script manually if they trust it).
 */
export declare function detectRepoType(root: string): RepoKind;
/**
 * Install a skill repository into <dshHome>/skills. One root or many (skill
 * collections); names come from SKILL.md frontmatter, falling back to the
 * repo name (single root) or the directory name (multiple roots).
 */
export declare function installSkill(root: string, repoName: string, occupied?: Set<string>): {
    name: string;
    names: string[];
    location: string;
};
/**
 * Install agent presets into <dshHome>/.agent-presets. Nested preset
 * directories are each copied under their directory name (the conventional
 * `preset` name falls back to the repo name as the id); a root preset copies
 * under the repo name.
 */
export declare function installPreset(root: string, repoName: string, occupied?: Set<string>): {
    name: string;
    names: string[];
    location: string;
};
/** One marketplace-install record: what a repo installed, and where. */
export interface KindRecord {
    readonly type: RepoKind;
    /** Display name (single install) — package name for cordis, skill/preset id otherwise. */
    readonly name: string | null;
    /** All installed names (multi-root skill collections / multi-preset repos). */
    readonly names: string[] | null;
    /** Install location(s): directory for skills/presets, profile node_modules for cordis. */
    readonly location: string | null;
    /** Installed version, when the kind carries one. */
    readonly version: string | null;
    /** ISO timestamp. */
    readonly installedAt: string;
    /** Target profile (cordis-plugin installs; skill/preset are global). */
    readonly profile?: string;
}
export declare function kindRecordsFile(): string;
/** Load the record map (cached in-process; keys are normalized lowercase repo refs). */
export declare function loadKindRecords(): Promise<Map<string, KindRecord>>;
/** Persist one record (serialized read-modify-write). */
export declare function saveKindRecord(repoKey: string, record: KindRecord): Promise<void>;
/** Remove one record (serialized read-modify-write). */
export declare function removeKindRecord(repoKey: string): Promise<void>;
/**
 * Drop ghost records: installs whose directories were removed OUTSIDE the
 * manager (manual `rm`, another tool, a cleaned-up temp dir). The in-process
 * record cache cannot notice external deletions, so every read surface
 * (listKinds, marketplace installed flags) prunes first — otherwise deleted
 * skills/presets keep showing as installed forever.
 */
export declare function pruneGhostRecords(): Promise<void>;
export declare function blockedReposFile(): string;
/** Load the blocked set (cached in-process; normalized lowercase repo refs). */
export declare function loadBlockedRepos(): Promise<Set<string>>;
/** Block a repository (detected as not plugin/skill/preset). */
export declare function addBlockedRepo(repoKey: string): Promise<void>;
/** Unblock a repository (restores it in the marketplace). */
export declare function removeBlockedRepo(repoKey: string): Promise<void>;
/** Ensure the managed dir exists (called by install paths before copying). */
export declare function ensureCacheDir(): void;
/**
 * Path-containment guard for deletions: target must stay under a managed
 * root. Windows file systems are case-insensitive while JS startsWith is
 * case-sensitive — a case-mismatched path would wrongly block a legal
 * deletion (audit W2).
 */
export declare function isUnderRoot(target: string, root: string): boolean;
/**
 * Remove a tree with brief retries. Windows AV scanners / editors hold
 * transient handles and rmSync fails EPERM/EBUSY on the first attempt
 * (audit W1); `force` only tolerates a missing path, not an open handle.
 */
export declare function rmRetry(target: string): void;
/** Rename with brief retries (Windows: destination busy / AV scanning). */
export declare function renameRetry(from: string, to: string): void;
