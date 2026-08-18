#!/usr/bin/env node
/**
 * dshpm — the dsh-web-plugin-manager command line.
 *
 * Every mutation goes through the same protected path as the Web UI:
 * pnpm add/remove through the official dsh CLI, the quality gate (undeclared
 * imports, official packages declared as regular dependencies), rollback on
 * failure, post-install analysis, and managed insert-row bookkeeping.
 *
 * Agents that manage plugins for a user should call this CLI (or the
 * plugin_* tools) instead of raw dsh plugin / pnpm commands: the raw path
 * skips the quality gate and can break the whole profile at runtime.
 *
 * Usage:
 *   dshpm install <source> [--profile <name>] [--env KEY=value ...]
 *   dshpm remove <name>    [--profile <name>]
 *   dshpm update <name>    [--profile <name>]
 *   dshpm mount <name>     [--profile <name>]
 *   dshpm list             [--profile <name>]
 *   dshpm analyze          [--profile <name>]
 *   dshpm help | --help
 *   dshpm version | --version
 *
 * --home <path> overrides the Harness home (default: $DSH_HOME or ~/.dsh).
 * --env KEY=value supplies an install-time environment variable (repeatable;
 * git-source installs pause and ask for the repository's variables otherwise).
 */
export {};
