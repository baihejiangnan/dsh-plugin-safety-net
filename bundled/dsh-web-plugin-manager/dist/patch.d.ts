/**
 * Controlled editing of a profile's cordis.patch.yml.
 *
 * The manager never rewrites the whole file (that would destroy user
 * comments and hand-written rows). It appends/removes a single marked block
 * per entry id, using line markers that make every edit reversible and
 * reviewable:
 *
 *   # dsh-plugin-manager:managed:start
 *   - id: <entryId>
 *     disabled: true
 *   # dsh-plugin-manager:managed:end
 *
 * The block is a plain id-targeted patch row: it replaces the targeted row's
 * whole config with `disabled: true`, exactly the Loader's disable contract.
 *
 * Non-bundle plugins are mounted as an insert row inside the same marker
 * scheme (live via config HMR, no restart):
 *
 *   # dsh-plugin-manager:managed:start
 *   - insert:
 *       - id: <rowId>
 *         name: '<package>'
 *   # dsh-plugin-manager:managed:end
 *
 * YAML traps handled here (all reproduced in plugin-registry, see
 * docs/reference-notes.md):
 *  - an empty-array document line (`[]`) must be dropped before appending any
 *    row, or the file becomes a two-document YAML and fails to start;
 *  - package names starting with `@` must be single-quoted (bare `@` is a
 *    YAML reserved indicator);
 *  - after removing rows, a file left with no patch row at all (comments or
 *    blank lines only) parses as null and HMR reload fails — restore the
 *    official `[]` template instead.
 */
/** Validate an entry id so it cannot break the YAML block structure. */
export declare function assertSafeEntryId(id: string): void;
/** Validate a package name written into a quoted YAML scalar. */
export declare function assertSafePackageName(name: string): void;
/** Single-quote a YAML scalar (' doubled inside; @ prefixes stay safe). */
export declare function yamlQuote(value: string): string;
/** One insert row found in a patch file. */
export interface PatchInsertRow {
    /** Insert row id (the mounted entry id). */
    readonly id: string;
    /** Module specifier (package name) the row mounts. */
    readonly name: string;
    /** Whether the row lives inside a plugin-manager managed block. */
    readonly managed: boolean;
}
/**
 * Read every insert row from a patch file (managed blocks and user rows).
 * Line-level parse of top-level `- insert:` blocks and their indented
 * `- id:` / `name:` pairs; never parses the whole document.
 */
export declare function readInsertRows(content: string): PatchInsertRow[];
/**
 * Read the ids of top-level rows in a patch file — rows the user (or the
 * manager's managed blocks) explicitly manages. These rows' configured state
 * deviates from the bundle defaults, which the UI highlights. Insert-block
 * child rows (indented) are not targets and are excluded.
 */
export declare function readManagedIds(content: string): Set<string>;
/** Whether a patch file already manages a disable block for the entry id. */
export declare function hasManagedDisable(patchPath: string, entryId: string): boolean;
/**
 * Add (or refresh) the disable block for one entry id. Returns the new file
 * content; the caller persists it.
 */
export declare function addDisableBlock(content: string, entryId: string): string;
/** Remove the disable block for one entry id. Returns new content. */
export declare function removeDisableBlock(content: string, entryId: string): string;
/**
 * Line-level enable of a user-written top-level row: drop its `disabled:`
 * child and, when nothing else remains under it, the row itself. Returns the
 * new content and whether anything changed.
 */
export declare function applyRowEnabled(content: string, entryId: string): {
    content: string;
    changed: boolean;
};
/**
 * Line-level disable of a user-written top-level row: add or update its
 * `disabled: true` child. Returns the new content and whether anything
 * changed (false when no such top-level row exists — the caller falls back
 * to the managed block).
 */
export declare function applyRowDisabled(content: string, entryId: string): {
    content: string;
    changed: boolean;
};
/**
 * Add (or refresh) the insert block mounting one non-bundle plugin. The name
 * is single-quoted (YAML @ trap) and the row id is validated.
 */
export declare function addInsertRow(content: string, rowId: string, name: string): string;
/** Remove the insert block for one row id. Returns new content and whether a block was removed. */
export declare function removeInsertRow(content: string, rowId: string): {
    content: string;
    removed: boolean;
};
/** Persist new content with an atomic write (tmp + rename). */
export declare function writePatch(patchPath: string, content: string): void;
