/**
 * Static registry index (Phase A of the marketplace rework).
 *
 * The community DSH-Plugins-Marketplace project publishes a CI-built index
 * of every topic:dsh-plugin repository (registry.json, ~2.2MB / .gz ~700KB)
 * every 2 hours. Consuming it gives the marketplace ~3000 entries with zero
 * GitHub API calls and no rate-limit exposure; the existing curated catalog
 * (awesome-dsh-plugins) overlays quality metadata on top of it.
 *
 * Fallback chain (in order):
 *   1. api.github.com contents (token-aware when GH_TOKEN/GITHUB_TOKEN set)
 *   2. jsDelivr CDN (freshness-checked via `generated_at`, ≤6h)
 *   3. raw.githubusercontent.com
 *   4. local disk cache (last successful full index, any age)
 *   5. GitHub search API topic:dsh-plugin (partial by design; never persisted)
 */
/** One normalized entry from the static index (or the search fallback). */
export interface RegistryRepo {
    readonly full_name: string;
    readonly name: string;
    readonly description: string | null;
    readonly html_url: string;
    readonly stargazers_count: number;
    readonly updated_at: string;
    readonly default_branch: string;
    readonly topics: readonly string[];
    readonly license: string | null;
    /** Published npm package name (CI-enriched, when the repo has one). */
    readonly pkg_name?: string;
    /** Latest version from the repo's package.json (CI-fetched). */
    readonly version?: string;
    /** Category stamp from the CI classifier. */
    readonly category?: string;
}
/** The community index project (consumed read-only, never a hard dependency). */
export declare const REGISTRY_OWNER = "bradeGithub";
export declare const REGISTRY_REPO = "DSH-Plugins-Marketplace";
/**
 * Eco-generic topics stripped before a repo's topics reach the UI: they are
 * ecosystem labels (ai/llm/deepseek/dsh/plugin/web/tool/…) rather than
 * functional signals, and would otherwise dominate every card's topic row.
 * Mirrors the registry builder's TOPIC_STOP_WORDS.
 */
export declare const TOPIC_STOP_WORDS: Set<string>;
/** Filter a repo's topics down to functional signals (eco-generic tags removed). */
export declare function functionalTopics(topics: readonly string[] | undefined): string[];
/** Registry index disk cache (inside the plugin-manager cache dir). */
export declare function registryCacheFile(): string;
/** Normalize one raw repo record (registry.json or search-API shapes). */
export declare function normalizeRegistryRepo(raw: unknown): RegistryRepo | null;
/**
 * Fetch the index through every network source. The result carries whether
 * the winning source passed a freshness check: only freshness-verified
 * sources (jsDelivr, generated_at within REGISTRY_MAX_AGE_MS) may persist to
 * disk — the GitHub api/raw responses carry no generated_at and an old one
 * must not overwrite a good cache (audit M14). null when all fail.
 */
export declare function fetchRegistryRepos(): Promise<{
    repos: RegistryRepo[];
    cacheable: boolean;
} | null>;
/** Search-API fallback (topic:dsh-plugin). Partial by design — never cached. */
export declare function fetchSearchFallback(): Promise<RegistryRepo[] | null>;
/** Last successful full index from disk (any age — better than nothing). */
export declare function readRegistryCache(): RegistryRepo[] | null;
/** Persist a successful full index (never the search fallback). */
export declare function writeRegistryCache(repos: RegistryRepo[]): void;
/**
 * One dsh.so registry entry (https://www.dsh.so/plugins-index.json). The
 * community-run registry independently verifies every listed plugin and runs
 * a static security scan — we overlay that metadata onto our own listing
 * (verification level + risk level) as a quality signal; the entry itself is
 * never used as an install source.
 */
export interface DshSoEntry {
    readonly name: string;
    /** How far the plugin was actually tested (1 found … 5 feature-tested). */
    readonly verification?: {
        readonly level: number;
        readonly label: string;
        readonly lastVerifiedAt?: string | null;
    };
    /** Automated security scan result. */
    readonly security?: {
        readonly status: 'audited' | 'pending' | 'failed' | 'skipped';
        readonly riskLevel: 'low' | 'medium' | 'high' | 'critical' | 'unknown';
        readonly scannedAt?: string | null;
    };
}
/** dsh.so index disk cache. */
export declare function dshSoCacheFile(): string;
/** Fetch the dsh.so index (network, then disk cache); null when unusable. */
export declare function fetchDshSoIndex(): Promise<DshSoEntry[] | null>;
