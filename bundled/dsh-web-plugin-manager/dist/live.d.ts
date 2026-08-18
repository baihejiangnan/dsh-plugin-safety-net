/**
 * Live patch application through the loader's include entry.
 *
 * The profile patch file stays the source of truth for persistence (every
 * mutation is still written to cordis.patch.yml), but live application goes
 * through the include entry's update() — the same channel the platform's
 * config watcher (watchUserPatches) uses — instead of waiting for the file
 * watcher to pick the change up.
 *
 * Why: a watcher-triggered refresh that unloads a service the HMR service
 * itself depends on deadlocks the platform. The web profile's HMR service
 * injects the timer row; disabling `timer` through the watcher starts a
 * refresh task whose tree update disposes the timer fiber, which unloads
 * HMR (a dependent), and HMR's unload awaits its own disposables — including
 * the very refresh task that is running. The circular wait never settles and
 * every later patch change is silently ignored for the rest of the session.
 * Applying directly (outside the watcher task) lets the unload chain settle
 * cleanly, and the watcher's later refresh of the same content is a no-op.
 *
 * Two platform quirks are compensated here:
 *  - applyEntryPatches mutates the patch objects it is given (override
 *    fields are written into the row objects of earlier insert patches), so
 *    the composed stack is deep-cloned before every update. Removing a
 *    managed disable block additionally scrubs the baked `disabled: true`
 *    from the matching row inside the bundle insert lists — otherwise a
 *    re-enable would keep the row disabled forever (the baked value survives
 *    the block's removal).
 *  - entry.update() can hang when the include's apply queue is already
 *    poisoned by an external deadlock; a timeout converts that into a
 *    "restart to apply" outcome instead of a stuck request.
 */
import type { Context } from '@deepseek-ai/cordis';
/** One mutation of the live patch stack. */
export type StackOp = 
/** Append a new patch row (managed disable block, insert block). */
{
    kind: 'append';
    value: unknown;
}
/**
 * Remove the first top-level row equal to value (managed block removal).
 * `id` triggers the baked-disabled scrub (undoes applyEntryPatches's
 * in-place mutation of insert children).
 */
 | {
    kind: 'remove-first';
    id?: string;
    value: unknown;
}
/**
 * Edit the last top-level row with this id in place (user-written rows).
 * The mutate callback returns the replacement, or null to drop the row.
 */
 | {
    kind: 'replace-last';
    id: string;
    mutate: (row: Record<string, unknown>) => Record<string, unknown> | null;
}
/**
 * Remove every top-level row whose insert list mounts the named package
 * (bundle-layer rows and managed insert rows alike). Matches by child
 * `name`, so it survives the in-place override fields applyEntryPatches
 * bakes into rows (disabled/config) that JSON equality would miss.
 */
 | {
    kind: 'remove-by-name';
    name: string;
};
/** Apply stack ops to the include entry (live config refresh). */
export declare function applyLiveOps(ctx: Context, ops: readonly StackOp[], timeoutMs?: number): Promise<{
    ok: boolean;
    message?: string;
}>;
/**
 * Start (or keep) the plugin-owned watcher for the running profile's patch
 * file. The platform's own watcher is an effect of the HMR service, which
 * dies when a toggle unloads the timer row (HMR injects it) — and its
 * registerConfig effects are not restored on reactivation. This watcher
 * lives on the plugin's own context and recomposes through the direct
 * include channel, so manual patch edits keep applying live regardless of
 * HMR's lifecycle.
 */
export declare function ensurePatchWatcher(ctx: Context, patchPath: string): void;
