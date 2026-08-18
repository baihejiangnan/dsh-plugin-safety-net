/**
 * Plugin-install guard rails for agent-driven plugin management.
 *
 * Users often ask the agent directly to install a plugin ("install X for
 * me"). Left to itself the agent runs the raw official CLI
 * (`dsh plugin --profile <name> add <pkg>`) or pnpm against the profile
 * directory — bypassing this manager's quality gate entirely, so a broken
 * plugin (undeclared imports, official packages declared as regular
 * dependencies) lands in the profile and the next boot or round fails.
 *
 * Two layers close that hole:
 *  - a tool guard denies bash/run_code calls that mutate plugin state
 *    through the raw path, with a denial reason pointing at the protected
 *    surface (plugin_* tools, dshpm CLI) — the model reads the reason and
 *    retries through the protected flow;
 *  - a system prompt section states the rule up front, so the model prefers
 *    the protected surface before it ever attempts the raw path.
 */
import type { ToolGuard } from '@deepseek-ai/dsh-tools';
/** One guard instance for the running host (registered once per apply). */
export declare function createPluginGuard(): ToolGuard;
/**
 * Register the guard on the tools service (same scope the agent's tool
 * calls execute in). Returns the guard disposer.
 */
export declare function registerPluginGuard(ctx: {
    get(name: string): unknown;
}): (() => void) | null;
/**
 * The system prompt section stating the protected plugin-management
 * surface. Order 300 sits after the tool-guidance band (100-199), so the
 * rule reads as an operational constraint, not tool documentation.
 */
export declare const PLUGIN_RULE_SECTION: {
    name: string;
    order: number;
    text: string;
};
/** Register the prompt section on the systemPrompt service. Returns the section disposer. */
export declare function registerPluginRulePrompt(ctx: {
    get(name: string): unknown;
}): (() => void) | null;
