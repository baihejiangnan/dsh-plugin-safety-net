/**
 * Static plugin dependency / conflict / compatibility analysis for one
 * profile — the package-manager-grade checks the quality gate alone cannot
 * cover.
 *
 * The quality gate (src/index.ts qualityIssues) verifies one package in
 * isolation (declared imports vs manifest). This module looks at the whole
 * profile:
 *
 *  - dependency graph: every plugin entry's imports, resolved against the
 *    providers installed in the profile (package names + exports subpaths);
 *  - availability: an import whose provider is missing, disabled in the
 *    patch, or failed at runtime;
 *  - conflicts: duplicate patch row ids, services registered by more than
 *    one plugin (source-scan of `new Service(ctx, 'x')` /
 *    `ctx.provide('x')`), same-name registrations in the other named
 *    registries (tool names, prompt-section names, web route paths — each
 *    fails loud at runtime), dependency cycles, and official-package
 *    duplication (an @deepseek-ai/* package present in BOTH the profile
 *    node_modules and the installation fallback — a second copy that
 *    hijacks the official loader row and splits module identity);
 *  - compatibility: peerDependencies (e.g. @deepseek-ai/cordis) checked
 *    against the resolved versions;
 *  - load order: a topological order of the dependency graph (for
 *    understanding and triage — cordis activation itself is
 *    service-availability driven, not order driven).
 *
 * The analysis is offline (works for any profile, running or not). The host
 * additionally feeds runtime observations (active services, fiber states,
 * fiber errors) into the same report shape.
 */
import type { AnalyzeIssue, AnalyzeResult } from './types.ts';
/**
 * Official (@deepseek-ai/*) packages that are SAFE as regular dependencies:
 * runtime libraries whose module identity is not singleton-sensitive, so a
 * profile copy cannot split identity with the installation's shared copy.
 * schemastery qualifies: its validation errors are duck-typed through
 * `Symbol.for('ValidationError')` (global symbol, shared across copies) and
 * its schemas are pure closures — the official @deepseek-ai/dsh-llm-deepseek
 * declares it as a regular dependency for the same reason. cosmokit
 * qualifies too: a pure utility collection (types/time/string/array/misc)
 * with no module-level mutable state and no identity symbols; its only
 * globalThis use is the `is()` instanceof helper, which consults the shared
 * global constructors and cannot split between copies. cosmokit enters the
 * profile transitively whenever a plugin declares schemastery as a regular
 * dependency (schemastery depends on cosmokit), so without the exemption
 * every such plugin trips official-duplicate with schemastery as the
 * misleading culprit. Every other fallback package (cordis, dsh-tools,
 * dsh-llm, dsh-client-*, loader rows, service singletons) stays peer-only.
 */
export declare const OFFICIAL_DEP_ALLOWED: Set<string>;
export declare function scanImports(filePath: string): string[];
/**
 * Scan every file reachable from a package entry through relative imports
 * (BFS, bounded). The quality gate must see the whole load chain, not just
 * the entry file: an undeclared import one hop down fails at boot exactly
 * like one in the entry.
 */
export declare function scanPackageImports(pkgDir: string, entry: string | null, maxFiles?: number): string[];
/** Resolve a package's entry file (exports["."].default, main, module, index.js). */
export declare function packageEntry(pkgDir: string, manifest: Record<string, unknown>): string | null;
/**
 * Analyze one profile directory offline: build the dependency graph and
 * collect availability / conflict / compatibility issues.
 *
 * @param profileDir - absolute profile directory.
 * @param bundles - the profile's dsh.profile.bundles layer stack.
 * @param patchContent - the profile's cordis.patch.yml content (for disabled
 *   rows and duplicate-id detection), may be ''.
 * @param disabledNames - package names whose rows are disabled (host may pass
 *   the live view; offline callers can pass an empty set).
 * @param extraIssues - runtime observations fed by the host (fiber failures,
 *   pending injects), appended to the report.
 */
export declare function analyzeProfile(profileDir: string, bundles: readonly string[], patchContent: string, disabledNames: ReadonlySet<string>, extraIssues?: readonly AnalyzeIssue[]): AnalyzeResult;
/**
 * Package names physically present in one node_modules root (name or
 * @scope/name; scoped subpaths flatten to the package name). This is the
 * LAYER view, not the merged provider view: the profile's own node_modules
 * and the shared installation fallback are compared against each other, so
 * a name present in both is a duplicate installation.
 */
export declare function scanNodeModulesNames(root: string): Set<string>;
