window.__ModuleLoader__.load({
	id: "dsh-web-plugin-manager",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		//#region \0rolldown/runtime.js
		var __create = Object.create;
		var __defProp = Object.defineProperty;
		var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames = Object.getOwnPropertyNames;
		var __getProtoOf = Object.getPrototypeOf;
		var __hasOwnProp = Object.prototype.hasOwnProperty;
		var __copyProps = (to, from, except, desc) => {
			if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
				key = keys[i];
				if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
					get: ((k) => from[k]).bind(null, key),
					enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
				});
			}
			return to;
		};
		var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
			value: mod,
			enumerable: true
		}) : target, mod));
		//#endregion
		let react = require("react");
		react = __toESM(react, 1);
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region src/client/PmSelect.tsx
		/**
		* PmSelect: official dropdown (ui-primitives Menu) replacing native selects.
		*/
		/**
		* Render a controlled official-style dropdown.
		* @param props.value - selected option value.
		* @param props.options - selectable options.
		* @param props.onChange - selection callback.
		* @param props.ariaLabel - accessible label for the trigger button.
		*/
		function PmSelect({ value, options, onChange, ariaLabel, disabled }) {
			const [open, setOpen] = (0, react.useState)(false);
			const selected = options.find((option) => option.value === value);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Menu, {
				open: open && disabled !== true,
				anchor: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Button, {
					size: "sm",
					variant: "outline",
					"aria-label": ariaLabel,
					title: selected?.label ?? value,
					style: { maxWidth: 160 },
					disabled,
					onClick: () => setOpen((current) => !current),
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						style: {
							display: "inline-block",
							maxWidth: 120,
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
							verticalAlign: "middle"
						},
						children: selected?.label ?? value
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, {
						size: 12,
						"aria-hidden": "true"
					})]
				}),
				items: options.map((option) => ({
					id: option.value,
					label: option.label
				})),
				selectedId: value,
				onSelect: (id) => {
					onChange(id);
					setOpen(false);
				},
				onClose: () => setOpen(false)
			});
		}
		//#endregion
		//#region src/client/PluginCatalogTab.tsx
		/**
		* Plugin Catalog tab: the official inventory look (search + card list),
		* shadowing the official read-only tab (same slot id 'all', lower priority)
		* and adding live enable/disable, installed/built-in filtering (built-ins
		* hidden by default), and sorting (default / A-Z / enabled × asc/desc).
		*/
		/** Official --dsw-* token styles (mirrors the official inventory tab). */
		const styles$5 = {
			section: {
				display: "flex",
				flexDirection: "column",
				gap: "14px",
				width: "100%",
				maxWidth: "760px",
				color: "var(--dsw-alias-label-primary)"
			},
			toolbar: {
				display: "flex",
				alignItems: "center",
				gap: "10px",
				flexWrap: "wrap"
			},
			heading: {
				display: "flex",
				alignItems: "baseline",
				gap: "7px",
				padding: "0 2px"
			},
			headingTitle: {
				margin: 0,
				fontSize: "13px",
				lineHeight: "20px",
				fontWeight: 600
			},
			headingCount: {
				fontSize: "12px",
				lineHeight: "18px",
				color: "var(--dsw-alias-label-tertiary)",
				fontVariantNumeric: "tabular-nums"
			},
			search: {
				display: "flex",
				alignItems: "center",
				gap: "8px",
				width: "100%",
				height: "36px",
				border: "1px solid var(--dsw-alias-border-l2)",
				borderRadius: "8px",
				padding: "0 12px",
				boxSizing: "border-box",
				background: "var(--dsw-alias-bg-layer-1)",
				color: "var(--dsw-alias-label-tertiary)"
			},
			searchInput: {
				flex: 1,
				minWidth: 0,
				border: 0,
				outline: "none",
				background: "transparent",
				color: "var(--dsw-alias-label-primary)",
				font: "inherit",
				fontSize: "13px"
			},
			cards: {
				display: "grid",
				gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
				alignItems: "start",
				gap: "10px",
				margin: 0,
				padding: 0,
				listStyle: "none"
			},
			cardContent: {
				boxSizing: "border-box",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: "12px",
				width: "100%",
				minHeight: "52px",
				border: 0,
				padding: "12px 14px",
				background: "transparent",
				color: "inherit",
				font: "inherit",
				textAlign: "left",
				cursor: "pointer"
			},
			cardTitle: {
				minWidth: 0,
				overflow: "hidden",
				fontSize: "14px",
				lineHeight: "20px",
				fontWeight: 600,
				textOverflow: "ellipsis",
				whiteSpace: "nowrap"
			},
			cardTrailing: {
				display: "inline-flex",
				flex: "none",
				alignItems: "center",
				gap: "7px"
			},
			statusDot: {
				display: "inline-block",
				width: "7px",
				height: "7px",
				flex: "none",
				borderRadius: "999px",
				background: "var(--dsw-alias-label-tertiary)"
			},
			statusDotActive: { background: "var(--dsw-alias-state-success-primary)" },
			statusDotFailed: { background: "var(--dsw-alias-state-error-primary)" },
			statusDotLoading: { background: "var(--dsw-alias-state-business-primary)" },
			configTag: {
				display: "inline-flex",
				alignItems: "center",
				minHeight: "20px",
				borderRadius: "5px",
				padding: "1px 6px",
				background: "var(--dsw-alias-bg-layer-1)",
				color: "var(--dsw-alias-label-secondary)",
				fontSize: "11px",
				lineHeight: "16px",
				whiteSpace: "nowrap"
			},
			configTagOn: {
				background: "color-mix(in srgb, var(--dsw-alias-state-success-primary) 10%, transparent)",
				color: "var(--dsw-alias-state-success-primary)"
			},
			chevron: {
				flex: "none",
				color: "var(--dsw-alias-label-tertiary)",
				transition: "transform 140ms var(--ds-ease-in-out)"
			},
			chevronOpen: { transform: "rotate(180deg)" },
			cardDetails: {
				borderTop: "1px solid var(--dsw-alias-border-l2)",
				padding: "10px 14px 12px",
				background: "var(--dsw-alias-bg-module-platform)"
			},
			entryValue: {
				display: "block",
				overflowWrap: "anywhere",
				color: "var(--dsw-alias-label-primary)",
				fontFamily: "var(--ds-font-family-code)",
				fontSize: "12px",
				lineHeight: "18px"
			},
			details: {
				display: "grid",
				gridTemplateColumns: "76px minmax(0, 1fr)",
				gap: "6px 10px",
				margin: "8px 0 0",
				color: "var(--dsw-alias-label-tertiary)",
				fontSize: "11px",
				lineHeight: "17px"
			},
			detailsRow: { display: "contents" },
			status: {
				fontSize: "13px",
				lineHeight: "20px",
				color: "var(--dsw-alias-label-tertiary)",
				margin: 0
			},
			error: {
				fontSize: "13px",
				lineHeight: "20px",
				color: "var(--dsw-alias-state-error-primary)",
				margin: 0
			},
			select: {
				height: "36px",
				border: "1px solid var(--dsw-alias-border-l2)",
				borderRadius: "8px",
				padding: "0 10px",
				outline: "none",
				background: "var(--dsw-alias-bg-layer-1)",
				color: "var(--dsw-alias-label-primary)",
				font: "inherit",
				fontSize: "13px"
			},
			filterRow: {
				display: "flex",
				alignItems: "center",
				gap: "8px",
				flexWrap: "wrap"
			},
			filterLabel: {
				fontSize: "12px",
				lineHeight: "18px",
				color: "var(--dsw-alias-label-tertiary)"
			}
		};
		/** Compact a module specifier like the official inventory. */
		function moduleShortName(moduleName) {
			return (moduleName.startsWith("@") ? moduleName.slice(moduleName.indexOf("/") + 1) : moduleName).replace(/^cordis:/, "").replace(/^cordis-plugin-/, "").replace(/^dsh-(?:host-|client-)?/, "");
		}
		/** Author:module display id (@scope/pkg → scope:pkg, else local:name). */
		function authorModule(moduleName) {
			if (moduleName.startsWith("@")) {
				const rest = moduleName.slice(1);
				const slash = rest.indexOf("/");
				if (slash > 0) return rest.slice(0, slash) + ":" + rest.slice(slash + 1);
			}
			return "local:" + moduleName;
		}
		/** Render the catalog (shadows the official read-only inventory). */
		function PluginCatalogTab({ profiles, list, setEnabled, mount, t }) {
			const catalogId = (0, react.useId)();
			const [profileList, setProfileList] = (0, react.useState)([]);
			const [selected, setSelected] = (0, react.useState)("");
			const [state, setState] = (0, react.useState)({ status: "loading" });
			const [busy, setBusy] = (0, react.useState)(null);
			const [query, setQuery] = (0, react.useState)("");
			const [filter, setFilter] = (0, react.useState)("installed");
			const [sort, setSort] = (0, react.useState)("default");
			const [descending, setDescending] = (0, react.useState)(false);
			const [expanded, setExpanded] = (0, react.useState)(null);
			const injected = (0, react.useRef)({
				profiles,
				list,
				setEnabled,
				mount
			});
			(0, react.useEffect)(() => {
				injected.current.profiles().then((items) => {
					setProfileList(items);
					if (items.length > 0) {
						const current = items.find((profile) => profile.running !== null) ?? items.find((profile) => profile.isCurrent === true) ?? items[0];
						setSelected(current.name);
						load(current.name);
					} else setState({
						status: "ready",
						snapshot: void 0
					});
				}, (error) => {
					setState({
						status: "error",
						message: error instanceof Error ? error.message : String(error)
					});
				});
			}, []);
			const loadSeq = (0, react.useRef)(0);
			const load = (profile) => {
				if (profile.length === 0) return;
				const seq = ++loadSeq.current;
				setState((current) => current.status === "ready" ? current : { status: "loading" });
				injected.current.list(profile).then((snapshot) => {
					if (seq === loadSeq.current) setState({
						status: "ready",
						snapshot
					});
				}, (error) => {
					if (seq === loadSeq.current) setState({
						status: "error",
						message: error instanceof Error ? error.message : String(error)
					});
				});
			};
			const onSelect = (name) => {
				setSelected(name);
				setExpanded(null);
				load(name);
			};
			const onToggle = async (entryId, enable) => {
				if (selected.length === 0) return;
				if (!enable && !window.confirm(t("confirmDisable"))) return;
				setBusy(entryId);
				try {
					await injected.current.setEnabled(selected, entryId, enable);
					setExpanded(null);
					load(selected);
				} catch (error) {
					window.alert(error instanceof Error ? error.message : String(error));
				} finally {
					setBusy(null);
				}
			};
			/** Mount an installed-but-unmounted dependency as a managed insert row. */
			const onMount = async (packageName) => {
				if (selected.length === 0) return;
				setBusy(packageName);
				try {
					const result = await injected.current.mount(selected, packageName);
					setExpanded(null);
					load(selected);
					if (!result.ok) window.alert(result.message);
				} catch (error) {
					window.alert(error instanceof Error ? error.message : String(error));
				} finally {
					setBusy(null);
				}
			};
			const snapshot = state.status === "ready" ? state.snapshot : void 0;
			const normalizedQuery = query.trim().toLocaleLowerCase();
			const rows = (0, react.useMemo)(() => {
				if (snapshot === void 0) return [];
				const sorted = [...snapshot.entries.filter((entry) => {
					if (filter === "installed" && !entry.installed) return false;
					if (filter === "builtin" && entry.installed) return false;
					if (normalizedQuery.length === 0) return true;
					return entry.entryId.toLocaleLowerCase().includes(normalizedQuery) || entry.moduleName.toLocaleLowerCase().includes(normalizedQuery);
				})];
				const byDisplay = (a, b) => moduleShortName(a.moduleName).localeCompare(moduleShortName(b.moduleName)) || a.moduleName.localeCompare(b.moduleName);
				if (sort === "az") sorted.sort(byDisplay);
				else if (sort === "enabled") sorted.sort((a, b) => Number(b.enabled) - Number(a.enabled) || byDisplay(a, b));
				if (descending) sorted.reverse();
				return sorted;
			}, [
				snapshot,
				filter,
				sort,
				descending,
				normalizedQuery
			]);
			(0, react.useEffect)(() => {
				if (expanded !== null && !rows.some((entry) => entry.entryId === expanded)) setExpanded(null);
			}, [expanded, rows]);
			const dotStyle = (phase) => {
				if (phase === "active") return {
					...styles$5.statusDot,
					...styles$5.statusDotActive
				};
				if (phase === "failed") return {
					...styles$5.statusDot,
					...styles$5.statusDotFailed
				};
				if (phase === "loading" || phase === "pending") return {
					...styles$5.statusDot,
					...styles$5.statusDotLoading
				};
				return styles$5.statusDot;
			};
			const phaseLabel = (phase) => {
				if (phase === null) return t("unobserved");
				if (phase === "pending") return t("pending");
				if (phase === "loading") return t("loadingPhase");
				if (phase === "active") return t("active");
				if (phase === "failed") return t("failed");
				return t("unloading");
			};
			const cordisLabel = (phase, tfn) => {
				if (phase === "active") return tfn("mounted");
				if (phase === null) return tfn("notMounted");
				if (phase === "pending") return tfn("pending");
				if (phase === "loading") return tfn("loadingPhase");
				if (phase === "failed") return tfn("failed");
				return tfn("unloading");
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: styles$5.section,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("style", { children: `
.pm-card {
  min-width: 0; overflow: hidden;
  border: 1px solid var(--dsw-alias-border-l2); border-radius: 10px;
  background: var(--dsw-alias-bg-layer-3);
}
.pm-card[data-open='true'] { border-color: var(--dsw-alias-border-l1); }
.pm-card[data-modified='true'] {
  border-color: color-mix(in srgb, var(--dsw-alias-state-warn-primary) 55%, transparent);
}
.pm-card[data-modified='true'][data-open='true'] {
  border-color: var(--dsw-alias-state-warn-secondary);
}
.pm-card-content:focus-visible {
  outline: 2px solid var(--dsw-alias-state-business-primary);
  outline-offset: -2px;
}
` }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						style: styles$5.toolbar,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								style: styles$5.filterLabel,
								children: t("profileLabel")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PmSelect, {
								ariaLabel: t("profileLabel"),
								disabled: busy !== null,
								value: selected,
								options: profileList.map((profile) => ({
									value: profile.name,
									label: profile.name
								})),
								onChange: onSelect
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								size: "sm",
								variant: "ghost",
								disabled: selected.length === 0 || busy !== null,
								onClick: () => load(selected),
								children: t("refresh")
							})
						]
					}),
					state.status === "error" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
						style: styles$5.error,
						role: "alert",
						children: [
							t("error"),
							": ",
							state.message
						]
					}),
					state.status === "loading" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						style: styles$5.status,
						"aria-busy": "true",
						children: t("loading")
					}),
					snapshot !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
							style: styles$5.search,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconSearchOutline16, { "aria-hidden": "true" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								type: "search",
								style: styles$5.searchInput,
								value: query,
								placeholder: t("search"),
								"aria-label": t("search"),
								onChange: (event) => setQuery(event.currentTarget.value)
							})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							style: styles$5.filterRow,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									style: styles$5.filterLabel,
									children: t("filterLabel")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PmSelect, {
									ariaLabel: t("filterLabel"),
									value: filter,
									options: [
										{
											value: "installed",
											label: t("filterInstalled")
										},
										{
											value: "builtin",
											label: t("filterBuiltin")
										},
										{
											value: "all",
											label: t("filterAll")
										}
									],
									onChange: (value) => setFilter(value)
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									style: styles$5.filterLabel,
									children: t("sortLabel")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PmSelect, {
									ariaLabel: t("sortLabel"),
									value: sort,
									options: [
										{
											value: "default",
											label: t("sortDefault")
										},
										{
											value: "az",
											label: t("sortAz")
										},
										{
											value: "enabled",
											label: t("sortEnabled")
										}
									],
									onChange: (value) => setSort(value)
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => setDescending((current) => !current),
									children: descending ? t("sortDesc") : t("sortAsc")
								})
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							style: styles$5.heading,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
								style: styles$5.headingTitle,
								children: t("catalog")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								style: styles$5.headingCount,
								"data-plugin-count": rows.length,
								children: rows.length
							})]
						}),
						snapshot.entries.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							style: styles$5.status,
							children: t("noEntries")
						}) : null,
						snapshot.entries.length > 0 && rows.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							style: styles$5.status,
							children: t("emptyFilter")
						}) : null,
						rows.length > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
							style: styles$5.cards,
							children: rows.map((entry) => {
								const title = moduleShortName(entry.moduleName);
								const open = expanded === entry.entryId;
								const detailId = catalogId + "-details-" + encodeURIComponent(entry.entryId);
								return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
									className: "pm-card",
									"data-plugin-entry": entry.entryId,
									"data-open": open ? "true" : void 0,
									"data-modified": entry.modified && !entry.installed ? "true" : void 0,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
										className: "pm-card-content",
										style: styles$5.cardContent,
										type: "button",
										"aria-expanded": open,
										"aria-controls": detailId,
										onClick: () => setExpanded((current) => current === entry.entryId ? null : entry.entryId),
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", {
											style: styles$5.cardTitle,
											title: entry.moduleName,
											children: title
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
											style: styles$5.cardTrailing,
											children: [
												entry.enabled ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													style: dotStyle(entry.fiberPhase),
													"data-phase": entry.fiberPhase ?? "unobserved",
													role: "img",
													"aria-label": phaseLabel(entry.fiberPhase),
													title: phaseLabel(entry.fiberPhase)
												}) : null,
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													style: {
														...styles$5.configTag,
														...entry.enabled && !entry.unmounted ? styles$5.configTagOn : {}
													},
													"data-enabled": entry.enabled ? "true" : "false",
													"data-unmounted": entry.unmounted ? "true" : void 0,
													children: entry.unmounted ? t("unmountedTag") : entry.enabled ? t("enabled") : t("disabled")
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													style: open ? {
														...styles$5.chevron,
														...styles$5.chevronOpen
													} : styles$5.chevron,
													role: "presentation",
													children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, {
														size: 12,
														"aria-hidden": "true"
													})
												})
											]
										})]
									}), open ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										style: styles$5.cardDetails,
										id: detailId,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", {
												style: styles$5.entryValue,
												"data-loader-entry": true,
												children: authorModule(entry.moduleName)
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("dl", {
												style: styles$5.details,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
													style: styles$5.detailsRow,
													children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("dt", { children: t("configState") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dd", { children: entry.enabled ? t("enabled") : t("disabled") })]
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
													style: styles$5.detailsRow,
													children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("dt", { children: t("cordisState") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dd", { children: entry.unmounted ? t("unmountedHint") : cordisLabel(entry.fiberPhase, t) })]
												})]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
												style: {
													marginTop: "10px",
													display: "flex",
													justifyContent: "flex-end"
												},
												children: entry.unmounted ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
													size: "sm",
													variant: "primary",
													disabled: busy !== null,
													onClick: () => void onMount(entry.moduleName),
													children: busy === entry.moduleName ? t("mounting") : t("mountButton")
												}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
													size: "sm",
													variant: entry.enabled ? "ghost" : "primary",
													disabled: busy !== null,
													onClick: () => void onToggle(entry.entryId, !entry.enabled),
													children: entry.enabled ? t("disableButton") : t("enableButton")
												})
											})
										]
									}) : null]
								}, entry.entryId);
							})
						}) : null
					] })
				]
			});
		}
		//#endregion
		//#region src/client/EnvQuestionForm.tsx
		/**
		* EnvQuestionForm (C2): shared inline form for install-time environment
		* variables. Used by the marketplace card and the management install bar —
		* no popups, no terminal input (user preference). Empty value = skip.
		*/
		const styles$4 = {
			box: {
				display: "flex",
				flexDirection: "column",
				gap: "8px",
				marginTop: "8px",
				padding: "10px 12px",
				background: "color-mix(in srgb, var(--dsw-alias-fill-base) 96%, transparent)",
				border: "1px solid color-mix(in srgb, var(--dsw-alias-border) 60%, transparent)",
				borderRadius: "8px"
			},
			title: {
				margin: 0,
				fontSize: "12px",
				lineHeight: "18px",
				fontWeight: 600,
				color: "var(--dsw-alias-label-primary)"
			},
			hint: {
				margin: 0,
				fontSize: "11px",
				lineHeight: "16px",
				color: "var(--dsw-alias-label-tertiary)"
			},
			row: {
				display: "flex",
				alignItems: "center",
				gap: "8px"
			},
			label: {
				flex: "0 0 auto",
				minWidth: "150px",
				maxWidth: "45%",
				fontSize: "12px",
				lineHeight: "18px",
				fontFamily: "var(--dsw-font-mono)",
				color: "var(--dsw-alias-label-secondary)",
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap"
			},
			input: {
				flex: "1 1 auto",
				minWidth: 0,
				fontFamily: "var(--dsw-font-mono)"
			},
			actions: {
				display: "flex",
				alignItems: "center",
				gap: "8px"
			}
		};
		/** One env question rendered inline; the caller supplies t (bound locale). */
		function EnvQuestionForm({ questions, busy, t, onContinue, onCancel }) {
			const [answers, setAnswers] = (0, react.useState)(() => {
				const initial = {};
				for (const q of questions) initial[q.id] = "";
				return initial;
			});
			const setValue = (key, value) => {
				setAnswers((current) => ({
					...current,
					[key]: value
				}));
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: styles$4.box,
				role: "group",
				"aria-label": t("envFormTitle"),
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						style: styles$4.title,
						children: t("envFormTitle")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						style: styles$4.hint,
						children: t("envFormHint")
					}),
					questions.map((question) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						style: styles$4.row,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
								style: styles$4.label,
								title: question.id,
								children: question.id
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								type: "text",
								style: styles$4.input,
								value: answers[question.id] ?? "",
								placeholder: t("envFormValuePlaceholder"),
								"aria-label": question.id,
								spellCheck: false,
								autoComplete: "off",
								onChange: (event) => setValue(question.id, event.currentTarget.value)
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								size: "sm",
								variant: "ghost",
								disabled: busy,
								onClick: () => setValue(question.id, ""),
								children: t("envFormSkip")
							})
						]
					}, question.id)),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						style: styles$4.actions,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							size: "sm",
							variant: "primary",
							disabled: busy,
							onClick: () => onContinue(answers),
							children: busy ? t("envFormBusy") : t("envFormContinue")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							size: "sm",
							variant: "ghost",
							disabled: busy,
							onClick: onCancel,
							children: t("envFormCancel")
						})]
					})
				]
			});
		}
		//#endregion
		//#region src/client/PluginManagerSettingsTab.tsx
		/**
		* Plugin Manager management tab: install/remove packages and live-mount
		* rows. Viewing/toggling lives in the catalog tab (PluginCatalogTab); this
		* tab only manages installation state.
		*/
		/** Official --dsw-* token styles (mirrors the official inventory tab). */
		const styles$3 = {
			section: {
				display: "flex",
				flexDirection: "column",
				gap: "14px",
				width: "100%",
				maxWidth: "760px",
				color: "var(--dsw-alias-label-primary)"
			},
			toolbar: {
				display: "flex",
				alignItems: "center",
				gap: "10px",
				flexWrap: "wrap"
			},
			heading: {
				display: "flex",
				alignItems: "baseline",
				gap: "7px",
				padding: "0 2px"
			},
			headingTitle: {
				margin: 0,
				fontSize: "13px",
				lineHeight: "20px",
				fontWeight: 600
			},
			headingCount: {
				fontSize: "12px",
				lineHeight: "18px",
				color: "var(--dsw-alias-label-tertiary)",
				fontVariantNumeric: "tabular-nums"
			},
			cards: {
				display: "grid",
				gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
				alignItems: "start",
				gap: "10px",
				margin: 0,
				padding: 0,
				listStyle: "none"
			},
			card: {
				minWidth: 0,
				overflow: "hidden",
				border: "1px solid var(--dsw-alias-border-l2)",
				borderRadius: "10px",
				background: "var(--dsw-alias-bg-layer-3)"
			},
			cardRow: {
				boxSizing: "border-box",
				display: "flex",
				alignItems: "center",
				gap: "8px",
				width: "100%",
				minHeight: "52px",
				padding: "10px 14px"
			},
			cardTitle: {
				minWidth: 0,
				overflow: "hidden",
				fontSize: "14px",
				lineHeight: "20px",
				fontWeight: 600,
				textOverflow: "ellipsis",
				whiteSpace: "nowrap"
			},
			cardSub: {
				minWidth: 0,
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap",
				color: "var(--dsw-alias-label-tertiary)",
				fontFamily: "var(--ds-font-family-code)",
				fontSize: "11px",
				lineHeight: "17px"
			},
			tag: {
				display: "inline-flex",
				alignItems: "center",
				flex: "none",
				minHeight: "20px",
				borderRadius: "5px",
				padding: "1px 6px",
				background: "var(--dsw-alias-bg-layer-1)",
				color: "var(--dsw-alias-label-secondary)",
				fontSize: "11px",
				lineHeight: "16px",
				whiteSpace: "nowrap"
			},
			tagOn: {
				background: "color-mix(in srgb, var(--dsw-alias-state-success-primary) 10%, transparent)",
				color: "var(--dsw-alias-state-success-primary)"
			},
			cardContent: {
				boxSizing: "border-box",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: "12px",
				width: "100%",
				minHeight: "52px",
				border: 0,
				padding: "12px 14px",
				background: "transparent",
				color: "inherit",
				font: "inherit",
				textAlign: "left",
				cursor: "pointer"
			},
			cardTrailing: {
				display: "inline-flex",
				flex: "none",
				alignItems: "center",
				gap: "7px"
			},
			cardDetails: {
				borderTop: "1px solid var(--dsw-alias-border-l2)",
				padding: "10px 14px 12px",
				background: "var(--dsw-alias-bg-module-platform)"
			},
			entryValue: {
				display: "block",
				overflowWrap: "anywhere",
				color: "var(--dsw-alias-label-primary)",
				fontFamily: "var(--ds-font-family-code)",
				fontSize: "12px",
				lineHeight: "18px"
			},
			details: {
				display: "grid",
				gridTemplateColumns: "76px minmax(0, 1fr)",
				gap: "6px 10px",
				margin: "8px 0 0",
				color: "var(--dsw-alias-label-tertiary)",
				fontSize: "11px",
				lineHeight: "17px"
			},
			detailsRow: { display: "contents" },
			link: {
				color: "var(--dsw-alias-state-business-primary)",
				textDecoration: "none",
				overflowWrap: "anywhere"
			},
			output: {
				maxHeight: "200px",
				overflow: "auto",
				whiteSpace: "pre-wrap",
				border: "1px solid var(--dsw-alias-border-l2)",
				borderRadius: "10px",
				padding: "10px 14px",
				background: "var(--dsw-alias-bg-module-platform)",
				fontFamily: "var(--ds-font-family-code)",
				fontSize: "12px",
				lineHeight: "18px",
				color: "var(--dsw-alias-label-primary)",
				margin: 0
			},
			status: {
				fontSize: "13px",
				lineHeight: "20px",
				color: "var(--dsw-alias-label-tertiary)",
				margin: 0
			},
			error: {
				fontSize: "13px",
				lineHeight: "20px",
				color: "var(--dsw-alias-state-error-primary)",
				margin: 0
			},
			select: {
				height: "36px",
				border: "1px solid var(--dsw-alias-border-l2)",
				borderRadius: "8px",
				padding: "0 10px",
				outline: "none",
				background: "var(--dsw-alias-bg-layer-1)",
				color: "var(--dsw-alias-label-primary)",
				font: "inherit",
				fontSize: "13px"
			},
			filterLabel: {
				fontSize: "12px",
				lineHeight: "18px",
				color: "var(--dsw-alias-label-tertiary)"
			},
			foldButton: {
				border: 0,
				background: "transparent",
				padding: 0,
				cursor: "pointer",
				color: "var(--dsw-alias-label-primary)",
				textAlign: "left"
			},
			analysisPanel: {
				border: "1px solid var(--dsw-alias-border-l2)",
				borderRadius: "10px",
				padding: "10px 14px",
				background: "var(--dsw-alias-bg-layer-3)"
			},
			analysisList: {
				display: "flex",
				flexDirection: "column",
				gap: "6px",
				margin: "8px 0 0",
				padding: 0,
				listStyle: "none"
			},
			analysisIssue: {
				display: "flex",
				alignItems: "baseline",
				gap: "8px",
				fontSize: "12px",
				lineHeight: "18px"
			},
			analysisIssueKind: {
				flex: "none",
				fontFamily: "var(--ds-font-family-code)",
				fontSize: "11px",
				color: "var(--dsw-alias-state-warn-primary)",
				whiteSpace: "nowrap"
			},
			analysisIssueText: {
				minWidth: 0,
				color: "var(--dsw-alias-label-primary)",
				overflowWrap: "anywhere"
			}
		};
		/** Format an ISO timestamp for display (local time). */
		function formatTime(iso) {
			const date = new Date(iso);
			if (Number.isNaN(date.getTime())) return iso;
			const pad = (value) => String(value).padStart(2, "0");
			return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate()) + " " + pad(date.getHours()) + ":" + pad(date.getMinutes());
		}
		/** Render the management tab. */
		function PluginManagerSettingsTab({ profiles, list, install, remove, removeInsert, copyPlugins, checkUpdates, update, analyze, fixIssue, fixAll, t }) {
			const [profileList, setProfileList] = (0, react.useState)([]);
			const [selected, setSelected] = (0, react.useState)("");
			const [state, setState] = (0, react.useState)({ status: "loading" });
			const [busy, setBusy] = (0, react.useState)(null);
			const [spec, setSpec] = (0, react.useState)("");
			const [output, setOutput] = (0, react.useState)("");
			const [envQuestions, setEnvQuestions] = (0, react.useState)(null);
			const [updates, setUpdates] = (0, react.useState)({});
			const [checking, setChecking] = (0, react.useState)(false);
			const [analysis, setAnalysis] = (0, react.useState)(null);
			const [analyzing, setAnalyzing] = (0, react.useState)(false);
			const [fixing, setFixing] = (0, react.useState)(null);
			const [confirmKey, setConfirmKey] = (0, react.useState)(null);
			const [fixedKeys, setFixedKeys] = (0, react.useState)(/* @__PURE__ */ new Set());
			const injected = (0, react.useRef)({
				profiles,
				list,
				install,
				remove,
				removeInsert,
				copyPlugins,
				checkUpdates,
				update,
				analyze,
				fixIssue,
				fixAll
			});
			const loadSeq = (0, react.useRef)(0);
			const load = (profile) => {
				if (profile.length === 0) return;
				const seq = ++loadSeq.current;
				setState((current) => current.status === "ready" ? current : { status: "loading" });
				injected.current.list(profile).then((snapshot) => {
					if (seq === loadSeq.current) setState({
						status: "ready",
						snapshot
					});
				}, (error) => {
					if (seq === loadSeq.current) setState({
						status: "error",
						message: error instanceof Error ? error.message : String(error)
					});
				});
			};
			(0, react.useEffect)(() => {
				injected.current.profiles().then((items) => {
					setProfileList(items);
					if (items.length > 0) {
						const current = items.find((profile) => profile.running !== null) ?? items.find((profile) => profile.isCurrent === true) ?? items[0];
						setSelected(current.name);
						load(current.name);
					} else setState({
						status: "ready",
						snapshot: void 0
					});
				}, (error) => {
					setState({
						status: "error",
						message: error instanceof Error ? error.message : String(error)
					});
				});
			}, []);
			const onSelect = (name) => {
				setSelected(name);
				setUpdates({});
				setAnalysis(null);
				setEnvQuestions(null);
				setOutput("");
				load(name);
			};
			const onAnalyze = async () => {
				if (selected.length === 0 || analyzing) return;
				setAnalyzing(true);
				try {
					const result = await injected.current.analyze(selected);
					setAnalysis(result);
					setFixedKeys(/* @__PURE__ */ new Set());
					setConfirmKey(null);
				} catch (error) {
					setOutput("$ analyze --profile " + selected + "\n[error] " + (error instanceof Error ? error.message : String(error)));
				} finally {
					setAnalyzing(false);
				}
			};
			/** A-level fixes run directly; B-level suggestions confirm inline first. */
			const onFix = async (issue, key) => {
				if (issue.fix === void 0) return;
				if (issue.fix.confirm) {
					const id = key ?? issue.fix.label;
					if (confirmKey !== id) {
						setConfirmKey(id);
						return;
					}
					setConfirmKey(null);
				}
				const fixKey = key ?? "auto-" + issue.kind;
				setFixing(fixKey);
				try {
					const result = await injected.current.fixIssue(selected, issue.fix.action, issue.fix.target);
					setOutput("$ fix " + issue.kind + " (" + issue.fix.label + ")\n" + result.message);
					if (result.ok) {
						setFixedKeys((current) => new Set(current).add(fixKey));
						onAnalyze();
					}
				} catch (error) {
					setOutput("$ fix " + issue.kind + "\n[error] " + (error instanceof Error ? error.message : String(error)));
				} finally {
					setFixing(null);
				}
			};
			const onFixAll = async () => {
				setFixing("all");
				try {
					const result = await injected.current.fixAll(selected);
					setOutput("$ fix all\n" + result.output);
					onAnalyze();
				} catch (error) {
					setOutput("$ fix all\n[error] " + (error instanceof Error ? error.message : String(error)));
				} finally {
					setFixing(null);
				}
			};
			/** Issues grouped by fixability: auto (A) / suggested (B) / manual (C). */
			const autoFixable = (0, react.useMemo)(() => (analysis?.issues ?? []).filter((issue) => issue.fix !== void 0 && !issue.fix.confirm), [analysis]);
			const suggested = (0, react.useMemo)(() => (analysis?.issues ?? []).filter((issue) => issue.fix !== void 0 && issue.fix.confirm), [analysis]);
			const manual = (0, react.useMemo)(() => (analysis?.issues ?? []).filter((issue) => issue.fix === void 0), [analysis]);
			const onInstall = async () => {
				const trimmed = spec.trim();
				if (selected.length === 0 || trimmed.length === 0) return;
				setBusy("install");
				try {
					const result = await install(selected, trimmed);
					if (result.awaiting !== void 0) {
						setEnvQuestions(result.awaiting.questions);
						setOutput("$ dsh plugin --profile " + selected + " add " + trimmed + "\n" + result.output);
						return;
					}
					const mounted = result.live === true ? "\n✓ " + t("installMounted") : "";
					setOutput("$ dsh plugin --profile " + selected + " add " + trimmed + "\n" + result.output + mounted);
					setEnvQuestions(null);
					setSpec("");
					load(selected);
				} catch (error) {
					setOutput("$ dsh plugin --profile " + selected + " add " + trimmed + "\n[error] " + (error instanceof Error ? error.message : String(error)));
				} finally {
					setBusy(null);
				}
			};
			/** C2: user submitted the env-var answers — continue the same install. */
			const onEnvContinue = async (answers) => {
				const trimmed = spec.trim();
				if (selected.length === 0 || trimmed.length === 0) return;
				setBusy("install");
				try {
					const result = await install(selected, trimmed, answers);
					if (result.awaiting !== void 0) {
						setEnvQuestions(result.awaiting.questions);
						setOutput("$ dsh plugin --profile " + selected + " add " + trimmed + "\n" + result.output);
						return;
					}
					const mounted = result.live === true ? "\n✓ " + t("installMounted") : "";
					setOutput("$ dsh plugin --profile " + selected + " add " + trimmed + "\n" + result.output + mounted);
					setEnvQuestions(null);
					setSpec("");
					load(selected);
				} catch (error) {
					setOutput("$ dsh plugin --profile " + selected + " add " + trimmed + "\n[error] " + (error instanceof Error ? error.message : String(error)));
				} finally {
					setBusy(null);
				}
			};
			const onRemove = async (name) => {
				if (!window.confirm(t("confirmRemove"))) return;
				setBusy(name);
				try {
					const result = await remove(selected, name);
					setOutput("$ dsh plugin --profile " + selected + " remove " + name + "\n" + result.output);
					load(selected);
				} catch (error) {
					setOutput("$ dsh plugin --profile " + selected + " remove " + name + "\n[error] " + (error instanceof Error ? error.message : String(error)));
				} finally {
					setBusy(null);
				}
			};
			const onUninstall = async (rowId) => {
				if (!window.confirm(t("confirmUninstall"))) return;
				setBusy(rowId);
				try {
					const result = await removeInsert(selected, rowId);
					setOutput(result.message);
					load(selected);
				} catch (error) {
					setOutput("$ removeInsert " + rowId + "\n[error] " + (error instanceof Error ? error.message : String(error)));
				} finally {
					setBusy(null);
				}
			};
			const onCheckUpdates = async () => {
				if (selected.length === 0 || checking) return;
				setChecking(true);
				try {
					const result = await injected.current.checkUpdates(selected);
					const byName = {};
					for (const item of result.items) byName[item.name] = item;
					setUpdates(byName);
					const updatable = result.items.filter((item) => item.hasUpdate);
					setOutput("$ check updates --profile " + selected + "\n" + (updatable.length > 0 ? updatable.map((item) => "  " + item.name + ": " + (item.currentVersion ?? "?") + " → " + (item.latestVersion ?? "?")).join("\n") : "  all " + result.items.length + " packages up to date") + "\n" + result.message);
				} catch (error) {
					setOutput("$ check updates --profile " + selected + "\n[error] " + (error instanceof Error ? error.message : String(error)));
				} finally {
					setChecking(false);
				}
			};
			const onUpdate = async (name) => {
				if (selected.length === 0) return;
				setBusy("update:" + name);
				try {
					const result = await injected.current.update(selected, name);
					setOutput("$ update " + name + "\n" + result.output + "\n" + (result.ok ? t("updateRestartHint") : t("updateFailedHint")));
					setUpdates((current) => {
						const next = { ...current };
						if (result.ok) delete next[name];
						return next;
					});
					load(selected);
				} catch (error) {
					setOutput("$ update " + name + "\n[error] " + (error instanceof Error ? error.message : String(error)));
				} finally {
					setBusy(null);
				}
			};
			const [expandedPkg, setExpandedPkg] = (0, react.useState)(null);
			const [outputOpen, setOutputOpen] = (0, react.useState)(true);
			const snapshot = state.status === "ready" ? state.snapshot : void 0;
			const packages = (0, react.useMemo)(() => snapshot?.packages ?? [], [snapshot]);
			const insertRows = (0, react.useMemo)(() => snapshot?.insertRows ?? [], [snapshot]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: styles$3.section,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("style", { children: `
.pm-card {
  min-width: 0; overflow: hidden;
  border: 1px solid var(--dsw-alias-border-l2); border-radius: 10px;
  background: var(--dsw-alias-bg-layer-3);
}
.pm-card[data-open='true'] { border-color: var(--dsw-alias-border-l1); }
.pm-card[data-updatable='true'] {
  border-color: color-mix(in srgb, var(--dsw-alias-state-success-primary) 55%, transparent);
}
.pm-card[data-updatable='true'][data-open='true'] {
  border-color: var(--dsw-alias-state-success-secondary);
}
.pm-card-content:focus-visible {
  outline: 2px solid var(--dsw-alias-state-business-primary);
  outline-offset: -2px;
}
` }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						style: styles$3.toolbar,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								style: styles$3.filterLabel,
								children: t("profileLabel")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PmSelect, {
								ariaLabel: t("profileLabel"),
								disabled: busy !== null || envQuestions !== null,
								value: selected,
								options: profileList.map((profile) => ({
									value: profile.name,
									label: profile.name
								})),
								onChange: onSelect
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								size: "sm",
								variant: "ghost",
								disabled: selected.length === 0 || busy !== null,
								onClick: () => load(selected),
								children: t("refresh")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { style: { marginLeft: "auto" } }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								size: "sm",
								variant: "ghost",
								disabled: selected.length === 0 || busy !== null || analyzing,
								onClick: () => void onAnalyze(),
								children: analyzing ? t("analyzing") : t("healthCheck")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								size: "sm",
								variant: "ghost",
								disabled: selected.length === 0 || busy !== null || checking,
								onClick: () => void onCheckUpdates(),
								children: checking ? t("checking") : t("checkUpdates")
							})
						]
					}),
					state.status === "error" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
						style: styles$3.error,
						role: "alert",
						children: [
							t("error"),
							": ",
							state.message
						]
					}),
					state.status === "loading" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						style: styles$3.status,
						"aria-busy": "true",
						children: t("loading")
					}),
					snapshot !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							style: styles$3.toolbar,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
								type: "text",
								value: spec,
								placeholder: t("installPlaceholder"),
								disabled: busy !== null || envQuestions !== null,
								onChange: (event) => setSpec(event.currentTarget.value),
								onKeyDown: (event) => {
									if (event.key === "Enter") onInstall();
								},
								style: { flex: 1 }
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "primary",
								disabled: busy !== null || envQuestions !== null || spec.trim().length === 0,
								onClick: () => void onInstall(),
								children: busy === "install" ? t("installing") : t("installButton")
							})]
						}),
						envQuestions !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(EnvQuestionForm, {
							questions: envQuestions,
							busy: busy === "install",
							t,
							onContinue: (answers) => void onEnvContinue(answers),
							onCancel: () => setEnvQuestions(null)
						}),
						analysis !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							style: styles$3.analysisPanel,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									style: styles$3.heading,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
											style: styles$3.headingTitle,
											children: t("healthCheck")
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											style: styles$3.headingCount,
											children: analysis.issues.length === 0 ? t("healthOk") : analysis.issues.length + " " + t("healthIssues")
										}),
										autoFixable.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
											size: "sm",
											variant: "outline",
											disabled: busy !== null || fixing !== null,
											onClick: () => void onFixAll(),
											children: fixing === "all" ? t("fixing") : t("fixAllButton") + "(" + autoFixable.length + ")"
										})
									]
								}),
								analysis.issues.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									style: styles$3.status,
									children: t("healthClean")
								}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
									autoFixable.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
										style: styles$3.status,
										children: t("fixAutoGroup")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
										style: styles$3.analysisList,
										children: autoFixable.map((issue, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
											style: styles$3.analysisIssue,
											children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													style: styles$3.analysisIssueKind,
													children: issue.kind
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													style: styles$3.analysisIssueText,
													children: issue.message
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
													size: "sm",
													variant: "outline",
													disabled: busy !== null || fixing !== null,
													onClick: () => void onFix(issue),
													children: fixedKeys.has("auto-" + index) ? t("fixDone") : fixing === "auto-" + index ? t("fixing") : t("fixButton")
												})
											]
										}, "auto-" + index))
									}),
									suggested.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
										style: styles$3.status,
										children: t("fixSuggestedGroup")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
										style: styles$3.analysisList,
										children: suggested.map((issue, index) => {
											const key = "sug-" + index;
											const confirming = confirmKey === key;
											return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
												style: styles$3.analysisIssue,
												children: [
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														style: styles$3.analysisIssueKind,
														children: issue.kind
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														style: styles$3.analysisIssueText,
														children: issue.message
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
														size: "sm",
														variant: confirming ? "primary" : "outline",
														disabled: busy !== null || fixing !== null,
														onClick: () => void onFix(issue, key),
														children: fixedKeys.has(key) ? t("fixDone") : fixing === key ? t("fixing") : confirming ? t("fixConfirm") : t("fixSuggestButton")
													})
												]
											}, key);
										})
									}),
									manual.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
										style: styles$3.status,
										children: t("fixManualGroup")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
										style: styles$3.analysisList,
										children: manual.map((issue, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
											style: styles$3.analysisIssue,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												style: styles$3.analysisIssueKind,
												children: issue.kind
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												style: styles$3.analysisIssueText,
												children: issue.message
											})]
										}, "manual-" + index))
									})
								] }),
								analysis.topoOrder.length > 1 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									style: {
										marginTop: "8px",
										fontSize: "11px",
										lineHeight: "17px",
										color: "var(--dsw-alias-label-tertiary)"
									},
									children: [
										t("loadOrder"),
										": ",
										analysis.topoOrder.join(" → ")
									]
								})
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							style: styles$3.heading,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
								style: styles$3.headingTitle,
								children: t("packages")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								style: styles$3.headingCount,
								children: packages.length
							})]
						}),
						packages.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							style: styles$3.status,
							children: t("noPackages")
						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
							style: styles$3.cards,
							children: packages.map((pkg) => {
								const open = expandedPkg === pkg.name;
								const info = updates[pkg.name];
								const updatable = info !== void 0 && info.hasUpdate;
								return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
									className: "pm-card",
									"data-open": open ? "true" : void 0,
									"data-updatable": updatable ? "true" : void 0,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
										className: "pm-card-content",
										style: styles$3.cardContent,
										type: "button",
										"aria-expanded": open,
										onClick: () => setExpandedPkg((current) => current === pkg.name ? null : pkg.name),
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											style: styles$3.cardTitle,
											title: pkg.name,
											children: pkg.name
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
											style: styles$3.cardTrailing,
											children: [
												updatable && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													style: {
														...styles$3.tag,
														...styles$3.tagOn
													},
													children: t("updateAvailable")
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													style: {
														...styles$3.tag,
														...pkg.isBundle ? styles$3.tagOn : {}
													},
													children: pkg.isBundle ? t("bundleBadge") : t("dependencyBadge")
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, {
													size: 12,
													"aria-hidden": "true"
												})
											]
										})]
									}), open ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										style: styles$3.cardDetails,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("code", {
												style: styles$3.entryValue,
												children: [pkg.name, pkg.version ? "@" + pkg.version : ""]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("dl", {
												style: styles$3.details,
												children: [
													/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
														style: styles$3.detailsRow,
														children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("dt", { children: t("installedAt") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dd", { children: pkg.installedAt !== void 0 ? formatTime(pkg.installedAt) : t("unknown") })]
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
														style: styles$3.detailsRow,
														children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("dt", { children: t("repository") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dd", { children: pkg.repository !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("a", {
															href: pkg.repository,
															target: "_blank",
															rel: "noreferrer",
															style: styles$3.link,
															children: pkg.repository
														}) : t("unknown") })]
													}),
													info !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
														info.currentVersion !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
															style: styles$3.detailsRow,
															children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("dt", { children: t("currentVersion") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dd", { children: info.currentVersion })]
														}),
														info.latestVersion !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
															style: styles$3.detailsRow,
															children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("dt", { children: t("latestVersion") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dd", { children: info.latestVersion })]
														}),
														info.message !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
															style: styles$3.detailsRow,
															children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("dt", { children: t("updateMessage") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("dd", { children: info.message })]
														})
													] })
												]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												style: {
													marginTop: "10px",
													display: "flex",
													justifyContent: "flex-end",
													gap: "8px"
												},
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
													size: "sm",
													variant: "ghost",
													disabled: busy !== null || !updatable,
													onClick: () => void onUpdate(pkg.name),
													children: busy === "update:" + pkg.name ? t("updating") : t("updateButton")
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
													size: "sm",
													variant: "ghost",
													disabled: busy !== null,
													onClick: () => void onRemove(pkg.name),
													children: t("removeButton")
												})]
											})
										]
									}) : null]
								}, pkg.name);
							})
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							style: styles$3.heading,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
								style: styles$3.headingTitle,
								children: t("insertRows")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								style: styles$3.headingCount,
								children: insertRows.length
							})]
						}),
						insertRows.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							style: styles$3.status,
							children: t("noInsertRows")
						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
							style: styles$3.cards,
							children: insertRows.map((row) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("li", {
								style: styles$3.card,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									style: styles$3.cardRow,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											style: styles$3.cardTitle,
											title: row.id,
											children: row.id
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											style: styles$3.cardSub,
											children: row.name
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											style: {
												...styles$3.tag,
												...row.managed ? styles$3.tagOn : {}
											},
											children: row.managed ? t("liveBadge") : t("userBadge")
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											style: { marginLeft: "auto" },
											children: row.managed && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
												size: "sm",
												variant: "ghost",
												disabled: busy !== null,
												onClick: () => void onUninstall(row.id),
												children: t("uninstallButton")
											})
										})
									]
								})
							}, row.id))
						}),
						output.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							style: styles$3.heading,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								style: {
									...styles$3.headingTitle,
									...styles$3.foldButton
								},
								onClick: () => setOutputOpen((current) => !current),
								children: [outputOpen ? "▾ " : "▸ ", t("commandOutput")]
							})
						}), outputOpen && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
							style: styles$3.output,
							children: output
						})] })
					] })
				]
			});
		}
		//#endregion
		//#region src/client/PluginEnvironmentsTab.tsx
		/**
		* Environment management tab: create/rename/remove custom profiles
		* (official web/headless are read-only), with web/headless templates.
		*/
		/** Official --dsw-* token styles (mirrors the other tabs). */
		const styles$2 = {
			section: {
				display: "flex",
				flexDirection: "column",
				gap: "14px",
				width: "100%",
				maxWidth: "760px",
				color: "var(--dsw-alias-label-primary)"
			},
			toolbar: {
				display: "flex",
				alignItems: "center",
				gap: "10px",
				flexWrap: "wrap"
			},
			formCol: {
				display: "flex",
				flexDirection: "column",
				gap: "8px"
			},
			heading: {
				display: "flex",
				alignItems: "baseline",
				gap: "7px",
				padding: "0 2px"
			},
			headingTitle: {
				margin: 0,
				fontSize: "13px",
				lineHeight: "20px",
				fontWeight: 600
			},
			headingCount: {
				fontSize: "12px",
				lineHeight: "18px",
				color: "var(--dsw-alias-label-tertiary)",
				fontVariantNumeric: "tabular-nums"
			},
			cards: {
				display: "grid",
				gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
				alignItems: "start",
				gap: "10px",
				margin: 0,
				padding: 0,
				listStyle: "none"
			},
			card: {
				minWidth: 0,
				overflow: "hidden",
				border: "1px solid var(--dsw-alias-border-l2)",
				borderRadius: "10px",
				background: "var(--dsw-alias-bg-layer-3)"
			},
			cardRow: {
				boxSizing: "border-box",
				display: "flex",
				alignItems: "center",
				gap: "8px",
				width: "100%",
				minHeight: "52px",
				padding: "10px 14px",
				flexWrap: "wrap"
			},
			cardTitle: {
				minWidth: 0,
				overflow: "hidden",
				fontSize: "14px",
				lineHeight: "20px",
				fontWeight: 600,
				textOverflow: "ellipsis",
				whiteSpace: "nowrap"
			},
			tag: {
				display: "inline-flex",
				alignItems: "center",
				flex: "none",
				minHeight: "20px",
				borderRadius: "5px",
				padding: "1px 6px",
				background: "var(--dsw-alias-bg-layer-1)",
				color: "var(--dsw-alias-label-secondary)",
				fontSize: "11px",
				lineHeight: "16px",
				whiteSpace: "nowrap"
			},
			tagOn: {
				background: "color-mix(in srgb, var(--dsw-alias-state-success-primary) 10%, transparent)",
				color: "var(--dsw-alias-state-success-primary)"
			},
			status: {
				fontSize: "13px",
				lineHeight: "20px",
				color: "var(--dsw-alias-label-tertiary)",
				margin: 0
			},
			cardHeader: {
				boxSizing: "border-box",
				display: "flex",
				alignItems: "center",
				gap: "8px",
				width: "100%",
				minHeight: "52px",
				padding: "0 10px 0 0"
			},
			titleButton: {
				boxSizing: "border-box",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: "12px",
				flex: 1,
				minWidth: 0,
				minHeight: "52px",
				border: 0,
				padding: "12px 14px",
				background: "transparent",
				color: "inherit",
				font: "inherit",
				textAlign: "left",
				cursor: "pointer"
			},
			cardTrailing: {
				display: "inline-flex",
				flex: "none",
				alignItems: "center",
				gap: "7px",
				minWidth: 0
			},
			cardDetails: {
				borderTop: "1px solid var(--dsw-alias-border-l2)",
				padding: "10px 14px 12px",
				background: "var(--dsw-alias-bg-module-platform)"
			},
			detailsActions: {
				display: "flex",
				alignItems: "center",
				gap: "8px",
				flexWrap: "wrap"
			},
			error: {
				fontSize: "13px",
				lineHeight: "20px",
				color: "var(--dsw-alias-state-error-primary)",
				margin: 0
			},
			filterLabel: {
				fontSize: "12px",
				lineHeight: "18px",
				color: "var(--dsw-alias-label-tertiary)"
			},
			output: {
				maxHeight: "200px",
				overflow: "auto",
				whiteSpace: "pre-wrap",
				border: "1px solid var(--dsw-alias-border-l2)",
				borderRadius: "10px",
				padding: "10px 14px",
				background: "var(--dsw-alias-bg-module-platform)",
				fontFamily: "var(--ds-font-family-code)",
				fontSize: "12px",
				lineHeight: "18px",
				color: "var(--dsw-alias-label-primary)",
				margin: 0
			}
		};
		/** Render the environment management tab. */
		function PluginEnvironmentsTab({ profiles, copyPlugins, startProfile, stopProfile, createProfile, renameProfile, removeProfile, backupExport, backupDiff, backupRestore, t }) {
			const [profileList, setProfileList] = (0, react.useState)([]);
			const [busy, setBusy] = (0, react.useState)(null);
			const [newName, setNewName] = (0, react.useState)("");
			const [template, setTemplate] = (0, react.useState)("web");
			const [output, setOutput] = (0, react.useState)("");
			const [expanded, setExpanded] = (0, react.useState)(null);
			const [transferNames, setTransferNames] = (0, react.useState)("");
			const [transferFrom, setTransferFrom] = (0, react.useState)("");
			const [transferTo, setTransferTo] = (0, react.useState)("");
			const [backupProfile, setBackupProfile] = (0, react.useState)("");
			const [backupData, setBackupData] = (0, react.useState)(null);
			const [diffResult, setDiffResult] = (0, react.useState)(null);
			const fileInputRef = (0, react.useRef)(null);
			const injected = (0, react.useRef)({
				profiles,
				copyPlugins,
				startProfile,
				stopProfile,
				createProfile,
				renameProfile,
				removeProfile,
				backupExport,
				backupDiff,
				backupRestore
			});
			const refresh = () => {
				injected.current.profiles().then(setProfileList, () => {});
			};
			(0, react.useEffect)(() => {
				injected.current.profiles().then((items) => {
					setProfileList(items);
					const running = items.find((profile) => profile.running !== null);
					if (running !== void 0) setBackupProfile(running.name);
				}, () => {});
			}, []);
			const onCreate = async () => {
				const name = newName.trim();
				if (name.length === 0) return;
				setBusy("create");
				try {
					const result = await injected.current.createProfile(name, template);
					setOutput(result.message);
					if (result.ok) {
						setNewName("");
						refresh();
					}
				} catch (error) {
					setOutput("[error] " + (error instanceof Error ? error.message : String(error)));
				} finally {
					setBusy(null);
				}
			};
			const onRename = async (oldName) => {
				const newProfileName = window.prompt(t("renamePrompt"), oldName);
				if (newProfileName === null || newProfileName.trim().length === 0 || newProfileName.trim() === oldName) return;
				setBusy("rename-" + oldName);
				try {
					const result = await injected.current.renameProfile(oldName, newProfileName.trim());
					setOutput(result.message);
					if (result.ok) refresh();
				} catch (error) {
					setOutput("[error] " + (error instanceof Error ? error.message : String(error)));
				} finally {
					setBusy(null);
				}
			};
			const onRemove = async (name) => {
				if (!window.confirm(t("confirmRemoveProfile") + " " + name + "?")) return;
				setBusy("remove-" + name);
				try {
					const result = await injected.current.removeProfile(name);
					setOutput(result.message);
					if (result.ok) refresh();
				} catch (error) {
					setOutput("[error] " + (error instanceof Error ? error.message : String(error)));
				} finally {
					setBusy(null);
				}
			};
			const onStart = async (name) => {
				setBusy("start-" + name);
				try {
					const result = await injected.current.startProfile(name);
					setOutput(result.message);
					if (result.ok && result.url !== void 0) window.open(result.url, "_blank");
				} catch (error) {
					setOutput("[error] " + (error instanceof Error ? error.message : String(error)));
				} finally {
					setBusy(null);
				}
			};
			const onStop = async (name) => {
				setBusy("stop-" + name);
				try {
					const result = await injected.current.stopProfile(name);
					setOutput(result.message);
				} catch (error) {
					setOutput("[error] " + (error instanceof Error ? error.message : String(error)));
				} finally {
					setBusy(null);
				}
			};
			const onTransfer = async () => {
				const names = transferNames.split(/[,\s]+/).map((name) => name.trim()).filter((name) => name.length > 0);
				if (names.length === 0 || transferFrom.length === 0 || transferTo.length === 0) return;
				setBusy("transfer");
				try {
					const result = await injected.current.copyPlugins(transferFrom, transferTo, names);
					setOutput("$ copy " + names.join(", ") + " " + transferFrom + " -> " + transferTo + "\n" + result.output);
					setTransferNames("");
				} catch (error) {
					setOutput("[error] " + (error instanceof Error ? error.message : String(error)));
				} finally {
					setBusy(null);
				}
			};
			/** Export the selected environment (or all) as a downloadable JSON backup. */
			const onBackupExport = async () => {
				setBusy("backup-export");
				try {
					const backup = await injected.current.backupExport(backupProfile);
					const blob = new Blob([JSON.stringify(backup, void 0, 2)], { type: "application/json" });
					const url = URL.createObjectURL(blob);
					const anchor = document.createElement("a");
					anchor.href = url;
					anchor.download = "dsh-backup-" + (backupProfile.length > 0 ? backupProfile : "all") + "-" + (backup.exportedAt ?? "").slice(0, 10) + ".json";
					anchor.click();
					URL.revokeObjectURL(url);
					setOutput("$ export backup (" + backup.profiles.length + " profile(s), " + backup.kinds.length + " kind record(s))");
				} catch (error) {
					setOutput("[error] " + (error instanceof Error ? error.message : String(error)));
				} finally {
					setBusy(null);
				}
			};
			/** Read an imported backup file and diff it against the current state. */
			const onBackupFile = async (file) => {
				if (file === null) return;
				try {
					const backup = JSON.parse(await file.text());
					setBackupData(backup);
					const diff = await injected.current.backupDiff(backup, backupProfile);
					setDiffResult(diff);
					setOutput("$ import " + file.name + " — diff computed (" + diff.missing.length + " missing, " + diff.already.length + " already, " + diff.missingProfiles.length + " missing profiles, " + diff.unrestorable.length + " unrestorable)");
				} catch (error) {
					setOutput("$ import failed: " + (error instanceof Error ? error.message : String(error)));
				}
			};
			/** Restore every missing entry from the imported backup. */
			const onBackupRestore = async () => {
				if (backupData === null) return;
				setBusy("backup-restore");
				try {
					const result = await injected.current.backupRestore(backupData, backupProfile);
					setOutput("$ restore\n" + result.output);
					const diff = await injected.current.backupDiff(backupData, backupProfile);
					setDiffResult(diff);
				} catch (error) {
					setOutput("[error] " + (error instanceof Error ? error.message : String(error)));
				} finally {
					setBusy(null);
				}
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: styles$2.section,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("style", { children: `
.pm-card {
  min-width: 0; overflow: hidden;
  border: 1px solid var(--dsw-alias-border-l2); border-radius: 10px;
  background: var(--dsw-alias-bg-layer-3);
}
.pm-card[data-open='true'] { border-color: var(--dsw-alias-border-l1); }
.pm-card-title-btn:focus-visible {
  outline: 2px solid var(--dsw-alias-state-business-primary);
  outline-offset: -2px;
}
` }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						style: styles$2.heading,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
							style: styles$2.headingTitle,
							children: t("envList")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							style: styles$2.headingCount,
							children: profileList.length
						})]
					}),
					profileList.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						style: styles$2.status,
						children: t("noProfiles")
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
						style: styles$2.cards,
						children: profileList.map((profile) => {
							const open = expanded === profile.name;
							const running = profile.running !== null;
							const canStart = !running && profile.bundles.includes("@deepseek-ai/dsh-web-app");
							return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
								className: "pm-card",
								"data-open": open ? "true" : void 0,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									style: styles$2.cardHeader,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
											className: "pm-card-title-btn",
											style: styles$2.titleButton,
											type: "button",
											"aria-expanded": open,
											onClick: () => setExpanded((current) => current === profile.name ? null : profile.name),
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												style: styles$2.cardTitle,
												title: profile.name,
												children: profile.name
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
												style: styles$2.cardTrailing,
												children: [
													profile.isOfficial ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														style: styles$2.tag,
														children: t("officialBadge")
													}) : null,
													profile.isCurrent ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														style: {
															...styles$2.tag,
															...styles$2.tagOn
														},
														children: t("currentBadge")
													}) : null,
													running ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
														style: {
															...styles$2.tag,
															...styles$2.tagOn
														},
														children: [t("runningBadge"), profile.running.port !== null ? " :" + profile.running.port : ""]
													}) : null
												]
											})]
										}),
										canStart && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											style: { flex: "none" },
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
												size: "sm",
												variant: "outline",
												disabled: busy !== null,
												onClick: () => void onStart(profile.name),
												children: busy === "start-" + profile.name ? t("starting") : t("startButton")
											})
										}),
										running && !profile.isCurrent && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											style: { flex: "none" },
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
												size: "sm",
												variant: "ghost",
												disabled: busy !== null,
												onClick: () => void onStop(profile.name),
												children: busy === "stop-" + profile.name ? t("stopping") : t("stopButton")
											})
										})
									]
								}), open && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									style: styles$2.cardDetails,
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										style: styles$2.detailsActions,
										children: [
											!profile.isOfficial && !profile.isCurrent && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
												size: "sm",
												variant: "ghost",
												disabled: busy !== null,
												onClick: () => void onRename(profile.name),
												children: t("renameButton")
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
												size: "sm",
												variant: "ghost",
												disabled: busy !== null,
												onClick: () => void onRemove(profile.name),
												children: t("removeButton")
											})] }),
											profile.isOfficial && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												style: styles$2.filterLabel,
												children: t("officialReadonly")
											}),
											profile.isCurrent && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												style: styles$2.filterLabel,
												children: t("currentRunningHint")
											}),
											running && !profile.isCurrent && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												style: styles$2.filterLabel,
												children: t("terminalRunningHint")
											})
										]
									})
								})]
							}, profile.name);
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						style: styles$2.heading,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
							style: styles$2.headingTitle,
							children: t("createEnv")
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						style: styles$2.formCol,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
							type: "text",
							value: newName,
							placeholder: t("createPlaceholder"),
							disabled: busy !== null,
							onChange: (event) => setNewName(event.currentTarget.value),
							onKeyDown: (event) => {
								if (event.key === "Enter") onCreate();
							},
							style: { width: "100%" }
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							style: styles$2.toolbar,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PmSelect, {
								ariaLabel: t("templateLabel"),
								value: template,
								options: [{
									value: "web",
									label: t("templateWeb")
								}, {
									value: "headless",
									label: t("templateHeadless")
								}],
								onChange: setTemplate
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "primary",
								disabled: busy !== null || newName.trim().length === 0,
								onClick: () => void onCreate(),
								children: busy === "create" ? t("creating") : t("createButton")
							})]
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						style: styles$2.heading,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
							style: styles$2.headingTitle,
							children: t("transferTitle")
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						style: styles$2.formCol,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Input, {
							type: "text",
							value: transferNames,
							placeholder: t("transferPlaceholder"),
							disabled: busy !== null,
							onChange: (event) => setTransferNames(event.currentTarget.value),
							onKeyDown: (event) => {
								if (event.key === "Enter") onTransfer();
							},
							style: { width: "100%" }
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							style: styles$2.toolbar,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PmSelect, {
									ariaLabel: t("transferFrom"),
									value: transferFrom,
									options: profileList.map((profile) => ({
										value: profile.name,
										label: profile.name
									})),
									onChange: setTransferFrom
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									style: styles$2.filterLabel,
									children: t("transferArrow")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PmSelect, {
									ariaLabel: t("transferTo"),
									value: transferTo,
									options: profileList.map((profile) => ({
										value: profile.name,
										label: profile.name
									})),
									onChange: setTransferTo
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "primary",
									disabled: busy !== null || transferNames.trim().length === 0 || transferFrom.length === 0 || transferTo.length === 0 || transferFrom === transferTo,
									onClick: () => void onTransfer(),
									children: busy === "transfer" ? t("transferring") : t("transferButton")
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						style: styles$2.heading,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
							style: styles$2.headingTitle,
							children: t("backupTitle")
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						style: styles$2.formCol,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							style: styles$2.toolbar,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									style: styles$2.filterLabel,
									children: t("backupTargetLabel")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PmSelect, {
									ariaLabel: t("backupTargetLabel"),
									value: backupProfile,
									options: [{
										value: "",
										label: t("backupAll")
									}, ...profileList.map((profile) => ({
										value: profile.name,
										label: profile.name
									}))],
									onChange: setBackupProfile
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { style: { marginLeft: "auto" } }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									size: "sm",
									variant: "outline",
									disabled: busy !== null,
									onClick: () => void onBackupExport(),
									children: busy === "backup-export" ? t("exporting") : t("backupExportButton")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									size: "sm",
									variant: "outline",
									disabled: busy !== null,
									onClick: () => fileInputRef.current?.click(),
									children: t("backupImportButton")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
									ref: fileInputRef,
									type: "file",
									accept: "application/json,.json",
									style: { display: "none" },
									onChange: (event) => {
										const file = event.currentTarget.files?.[0] ?? null;
										onBackupFile(file);
										event.currentTarget.value = "";
									}
								}),
								diffResult !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [diffResult.missing.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									variant: "primary",
									disabled: busy !== null,
									onClick: () => void onBackupRestore(),
									children: busy === "backup-restore" ? t("restoring") : t("backupRestoreButton")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									style: styles$2.filterLabel,
									children: t("backupDiffSummary", {
										missing: diffResult.missing.length,
										already: diffResult.already.length
									})
								})] })
							]
						}), diffResult !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [
							diffResult.missingProfiles.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
								style: styles$2.status,
								children: [
									t("backupMissingProfiles"),
									": ",
									diffResult.missingProfiles.join(", ")
								]
							}),
							diffResult.unrestorable.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
								style: styles$2.status,
								children: [t("backupUnrestorable"), ":"]
							}),
							diffResult.unrestorable.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
								style: styles$2.status,
								children: ["- ", item]
							}, item)),
							diffResult.missing.length === 0 && diffResult.missingProfiles.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								style: styles$2.status,
								children: t("backupUpToDate")
							})
						] })]
					}),
					output.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						style: styles$2.heading,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
							style: styles$2.headingTitle,
							children: t("commandOutput")
						})
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
						style: styles$2.output,
						children: output
					})] })
				]
			});
		}
		//#endregion
		//#region src/client/PluginKindsTab.tsx
		/**
		* Skills & Presets tab (settings.section, above the marketplace): manage
		* marketplace-installed skills and agent presets — list records, re-pull
		* github-sourced installs, uninstall. Agent presets are additionally managed
		* by the official settings page (copy/delete/default); this page only owns
		* the re-pull/update flow for what the marketplace installed.
		*
		* No profile concept here: skills/presets live in the global harness roots.
		*/
		/** Official --dsw-* token styles (mirrors the other pages). */
		const styles$1 = {
			section: {
				display: "flex",
				flexDirection: "column",
				gap: "14px",
				width: "100%",
				maxWidth: "760px",
				color: "var(--dsw-alias-label-primary)"
			},
			heading: {
				display: "flex",
				alignItems: "baseline",
				gap: "7px",
				padding: "0 2px"
			},
			pageTitle: {
				margin: 0,
				fontSize: "16px",
				lineHeight: "24px",
				fontWeight: 600,
				color: "var(--dsw-alias-label-primary)"
			},
			headingTitle: {
				margin: 0,
				fontSize: "13px",
				lineHeight: "20px",
				fontWeight: 600
			},
			headingCount: {
				fontSize: "12px",
				lineHeight: "18px",
				color: "var(--dsw-alias-label-tertiary)",
				fontVariantNumeric: "tabular-nums"
			},
			hint: {
				fontSize: "12px",
				lineHeight: "18px",
				color: "var(--dsw-alias-label-tertiary)",
				margin: 0
			},
			card: {
				minWidth: 0,
				maxWidth: "100%",
				overflow: "hidden",
				border: "1px solid var(--dsw-alias-border-l2)",
				borderRadius: "10px",
				background: "var(--dsw-alias-bg-layer-3)"
			},
			cardRow: {
				boxSizing: "border-box",
				display: "flex",
				alignItems: "center",
				gap: "8px",
				width: "100%",
				minHeight: "52px",
				padding: "10px 14px"
			},
			cardTitle: {
				flex: "1 1 auto",
				minWidth: 0,
				overflow: "hidden",
				fontSize: "14px",
				lineHeight: "20px",
				fontWeight: 600,
				textOverflow: "ellipsis",
				whiteSpace: "nowrap"
			},
			cardAction: {
				flex: "none",
				display: "inline-flex",
				alignItems: "center",
				gap: "6px"
			},
			cardMetaRow: {
				display: "flex",
				alignItems: "center",
				gap: "6px",
				flexWrap: "wrap",
				minHeight: "28px",
				padding: "0 14px 10px"
			},
			tag: {
				display: "inline-flex",
				alignItems: "center",
				flex: "none",
				minHeight: "20px",
				borderRadius: "5px",
				padding: "1px 6px",
				background: "var(--dsw-alias-bg-layer-1)",
				color: "var(--dsw-alias-label-secondary)",
				fontSize: "11px",
				lineHeight: "16px",
				whiteSpace: "nowrap",
				maxWidth: "100%",
				overflow: "hidden",
				textOverflow: "ellipsis"
			},
			tagOn: {
				background: "color-mix(in srgb, var(--dsw-alias-state-success-primary) 10%, transparent)",
				color: "var(--dsw-alias-state-success-primary)"
			},
			meta: {
				fontSize: "11px",
				lineHeight: "16px",
				color: "var(--dsw-alias-label-tertiary)",
				fontVariantNumeric: "tabular-nums"
			},
			status: {
				fontSize: "13px",
				lineHeight: "20px",
				color: "var(--dsw-alias-label-tertiary)",
				margin: 0
			},
			error: {
				fontSize: "13px",
				lineHeight: "20px",
				color: "var(--dsw-alias-state-error-primary)",
				margin: 0
			},
			output: {
				maxHeight: "200px",
				overflow: "auto",
				whiteSpace: "pre-wrap",
				border: "1px solid var(--dsw-alias-border-l2)",
				borderRadius: "10px",
				padding: "10px 14px",
				background: "var(--dsw-alias-bg-module-platform)",
				fontFamily: "var(--ds-font-family-code)",
				fontSize: "12px",
				lineHeight: "18px",
				color: "var(--dsw-alias-label-primary)",
				margin: 0
			}
		};
		/** Format an ISO timestamp as a short date. */
		function shortDate$1(iso) {
			const date = new Date(iso);
			if (Number.isNaN(date.getTime())) return iso;
			return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
		}
		/** Whether a record key is a github owner/repo (re-pullable) vs a local path. */
		function isGithubSource(repo) {
			return /^[a-z0-9._-]+\/[a-z0-9._-]+$/i.test(repo) && !repo.includes("\\") && !repo.includes(":") && !repo.includes(" ");
		}
		/** Render the skills & presets page. */
		function PluginKindsTab({ kinds, uninstall, reinstall, t }) {
			const [state, setState] = (0, react.useState)(null);
			const [error, setError] = (0, react.useState)("");
			const [busy, setBusy] = (0, react.useState)(null);
			const [output, setOutput] = (0, react.useState)("");
			const injected = (0, react.useRef)({
				kinds,
				uninstall,
				reinstall
			});
			const reload = () => {
				injected.current.kinds().then(setState, (err) => {
					setError(err instanceof Error ? err.message : String(err));
				});
			};
			(0, react.useEffect)(() => {
				reload();
			}, []);
			/** Only skill / agent-preset records are managed here (cordis lives in Manage). */
			const records = (state?.records ?? []).filter((record) => record.type === "skill" || record.type === "agent-preset");
			const onUninstall = (record) => {
				if (!window.confirm(t("confirmKindRemove"))) return;
				setBusy(record.repo);
				injected.current.uninstall(record.repo).then((result) => {
					setOutput("$ uninstall " + record.repo + "\n" + result.output);
					reload();
				}, (error) => {
					setOutput("$ uninstall " + record.repo + "\n[error] " + (error instanceof Error ? error.message : String(error)));
				}).finally(() => setBusy(null));
			};
			const onReinstall = (record) => {
				setBusy(record.repo);
				injected.current.reinstall(record.repo).then((result) => {
					const pausedNote = result.awaiting !== void 0 ? "\n\n" + t("envFormPausedElsewhere") : "";
					setOutput("$ re-pull " + record.repo + "\n" + result.output + pausedNote);
					reload();
				}, (error) => {
					setOutput("$ re-pull " + record.repo + "\n[error] " + (error instanceof Error ? error.message : String(error)));
				}).finally(() => setBusy(null));
			};
			const kindTag = (type) => type === "skill" ? t("typeSkill") : type === "agent-preset" ? t("typeAgent") : type;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: styles$1.section,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						style: styles$1.heading,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
								style: styles$1.pageTitle,
								children: t("kindsTitle")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								style: styles$1.headingCount,
								children: records.length
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								style: { marginLeft: "auto" },
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
									size: "sm",
									variant: "ghost",
									disabled: busy !== null,
									onClick: reload,
									children: t("refresh")
								})
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						style: styles$1.hint,
						children: t("kindsHint")
					}),
					error.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
						style: styles$1.error,
						role: "alert",
						children: [
							t("error"),
							": ",
							error
						]
					}),
					state !== null && records.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						style: styles$1.status,
						children: t("kindsNone")
					}),
					records.map((record) => {
						const github = isGithubSource(record.repo);
						const names = record.names !== null && record.names.length > 0 ? record.names : [record.name ?? record.repo];
						return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							style: styles$1.card,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								style: styles$1.cardRow,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										style: styles$1.cardTitle,
										title: record.repo,
										children: record.name ?? record.repo
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										style: {
											...styles$1.tag,
											...styles$1.tagOn
										},
										children: kindTag(record.type)
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										style: styles$1.cardAction,
										children: [github && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
											size: "sm",
											variant: "outline",
											disabled: busy !== null,
											onClick: () => onReinstall(record),
											children: busy === record.repo ? t("installing") : t("reinstallButton")
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
											size: "sm",
											variant: "ghost",
											disabled: busy !== null,
											onClick: () => onUninstall(record),
											children: t("uninstallButton")
										})]
									})
								]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								style: styles$1.cardMetaRow,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									style: styles$1.meta,
									children: [
										t("kindsDirLabel"),
										": ",
										names.join(", "),
										" · ",
										t("kindsSourceLabel"),
										": ",
										record.repo,
										" · ",
										t("installedAt"),
										" ",
										shortDate$1(record.installedAt)
									]
								})
							})]
						}, record.repo);
					}),
					state !== null && (state.skills.length > 0 || state.presets.length > 0) && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						style: styles$1.heading,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
							style: styles$1.headingTitle,
							children: t("kindsUnmanagedTitle")
						})
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
						style: styles$1.status,
						children: [
							state.skills.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
								t("skillsDirLabel"),
								": ",
								state.skills.join(", ")
							] }),
							state.skills.length > 0 && state.presets.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("br", {}),
							state.presets.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
								t("presetsDirLabel"),
								": ",
								state.presets.join(", ")
							] })
						]
					})] }),
					output.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						style: styles$1.heading,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
							style: styles$1.headingTitle,
							children: t("commandOutput")
						})
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
						style: styles$1.output,
						children: output
					})] })
				]
			});
		}
		//#endregion
		//#region src/client/PluginMarketplaceTab.tsx
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
		/** Cards rendered per incremental batch, and the initial batch size. */
		const RENDER_BATCH = 120;
		/** localStorage key for the column preference. */
		const COLS_KEY = "dshpm-market-cols";
		/** Official --dsw-* token styles (mirrors the other pages). */
		const styles = {
			section: {
				display: "flex",
				flexDirection: "column",
				gap: "14px",
				width: "100%",
				maxWidth: "760px",
				color: "var(--dsw-alias-label-primary)"
			},
			toolbar: {
				display: "flex",
				alignItems: "center",
				gap: "10px",
				flexWrap: "wrap"
			},
			heading: {
				display: "flex",
				alignItems: "baseline",
				gap: "7px",
				padding: "0 2px"
			},
			pageTitle: {
				margin: 0,
				fontSize: "16px",
				lineHeight: "24px",
				fontWeight: 600,
				color: "var(--dsw-alias-label-primary)"
			},
			headingTitle: {
				margin: 0,
				fontSize: "13px",
				lineHeight: "20px",
				fontWeight: 600
			},
			headingCount: {
				fontSize: "12px",
				lineHeight: "18px",
				color: "var(--dsw-alias-label-tertiary)",
				fontVariantNumeric: "tabular-nums"
			},
			search: {
				display: "flex",
				alignItems: "center",
				gap: "8px",
				width: "100%",
				height: "36px",
				border: "1px solid var(--dsw-alias-border-l2)",
				borderRadius: "8px",
				padding: "0 12px",
				boxSizing: "border-box",
				background: "var(--dsw-alias-bg-layer-1)",
				color: "var(--dsw-alias-label-tertiary)"
			},
			searchInput: {
				flex: 1,
				minWidth: 0,
				border: 0,
				outline: "none",
				background: "transparent",
				color: "var(--dsw-alias-label-primary)",
				font: "inherit",
				fontSize: "13px"
			},
			cards: {
				display: "grid",
				gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
				alignItems: "start",
				gap: "10px",
				margin: 0,
				padding: 0,
				listStyle: "none"
			},
			card: {
				minWidth: 0,
				maxWidth: "100%",
				overflow: "hidden",
				border: "1px solid var(--dsw-alias-border-l2)",
				borderRadius: "10px",
				background: "var(--dsw-alias-bg-layer-3)",
				contentVisibility: "auto",
				containIntrinsicSize: "auto 132px"
			},
			cardRow: {
				boxSizing: "border-box",
				display: "flex",
				alignItems: "center",
				gap: "8px",
				width: "100%",
				minHeight: "52px",
				padding: "10px 14px"
			},
			cardTitle: {
				flex: "1 1 auto",
				minWidth: 0,
				overflow: "hidden",
				fontSize: "14px",
				lineHeight: "20px",
				fontWeight: 600,
				textOverflow: "ellipsis",
				whiteSpace: "nowrap"
			},
			cardAction: {
				flex: "none",
				display: "inline-flex",
				alignItems: "center",
				gap: "6px"
			},
			cardDesc: {
				display: "block",
				minWidth: 0,
				overflow: "hidden",
				fontSize: "12px",
				lineHeight: "17px",
				color: "var(--dsw-alias-label-secondary)",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap"
			},
			meta: {
				fontSize: "11px",
				lineHeight: "16px",
				color: "var(--dsw-alias-label-tertiary)",
				fontVariantNumeric: "tabular-nums"
			},
			cardMetaRow: {
				display: "flex",
				alignItems: "center",
				gap: "6px",
				flexWrap: "wrap",
				minHeight: "28px",
				padding: "0 14px 8px"
			},
			tagOn: {
				background: "color-mix(in srgb, var(--dsw-alias-state-success-primary) 10%, transparent)",
				color: "var(--dsw-alias-state-success-primary)"
			},
			tag: {
				display: "inline-flex",
				alignItems: "center",
				flex: "none",
				minHeight: "20px",
				borderRadius: "5px",
				padding: "1px 6px",
				background: "var(--dsw-alias-bg-layer-1)",
				color: "var(--dsw-alias-label-secondary)",
				fontSize: "11px",
				lineHeight: "16px",
				whiteSpace: "nowrap",
				maxWidth: "100%",
				overflow: "hidden",
				textOverflow: "ellipsis"
			},
			updateButton: {
				background: "color-mix(in srgb, var(--dsw-alias-state-warning-primary) 14%, transparent)",
				color: "var(--dsw-alias-state-warning-primary)",
				borderColor: "var(--dsw-alias-state-warning-primary)"
			},
			securityLow: {
				background: "color-mix(in srgb, var(--dsw-alias-state-success-primary) 10%, transparent)",
				color: "var(--dsw-alias-state-success-primary)"
			},
			securityMedium: {
				background: "color-mix(in srgb, var(--dsw-alias-state-warning-primary) 12%, transparent)",
				color: "var(--dsw-alias-state-warning-primary)"
			},
			securityHigh: {
				background: "color-mix(in srgb, var(--dsw-alias-state-error-primary) 10%, transparent)",
				color: "var(--dsw-alias-state-error-primary)"
			},
			status: {
				fontSize: "13px",
				lineHeight: "20px",
				color: "var(--dsw-alias-label-tertiary)",
				margin: 0
			},
			error: {
				fontSize: "13px",
				lineHeight: "20px",
				color: "var(--dsw-alias-state-error-primary)",
				margin: 0
			},
			filterLabel: {
				fontSize: "12px",
				lineHeight: "18px",
				color: "var(--dsw-alias-label-tertiary)"
			},
			output: {
				maxHeight: "200px",
				overflow: "auto",
				whiteSpace: "pre-wrap",
				border: "1px solid var(--dsw-alias-border-l2)",
				borderRadius: "10px",
				padding: "10px 14px",
				background: "var(--dsw-alias-bg-module-platform)",
				fontFamily: "var(--ds-font-family-code)",
				fontSize: "12px",
				lineHeight: "18px",
				color: "var(--dsw-alias-label-primary)",
				margin: 0
			},
			link: {
				color: "var(--dsw-alias-state-business-primary)",
				textDecoration: "none",
				overflowWrap: "anywhere"
			}
		};
		/** Format an ISO timestamp as a short date. */
		function shortDate(iso) {
			const date = new Date(iso);
			if (Number.isNaN(date.getTime())) return iso;
			return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
		}
		/** Compact star counts: 2500 → 2.5K, 1_200_000 → 1.2M. */
		function formatStars(n) {
			const trimZero = (s) => s.endsWith(".0") ? s.slice(0, -2) : s;
			if (n >= 1e6) return trimZero((n / 1e6).toFixed(1)) + "M";
			if (n >= 1e3) return trimZero((n / 1e3).toFixed(1)) + "K";
			return String(n);
		}
		/** dsh.so security badge: tone by risk level (no icons — text only). */
		function securityBadge(t, security) {
			const risk = security.riskLevel;
			if (risk === "low") return {
				text: t("securityLow"),
				style: styles.securityLow
			};
			if (risk === "medium") return {
				text: t("securityMedium"),
				style: styles.securityMedium
			};
			if (risk === "high" || risk === "critical") return {
				text: t("securityHigh"),
				style: styles.securityHigh
			};
			return {
				text: t("securityUnknown"),
				style: styles.tag
			};
		}
		/** Render the marketplace page. */
		function PluginMarketplaceTab({ marketplace, profiles, install, update, unblock, t }) {
			const [state, setState] = (0, react.useState)({ status: "loading" });
			const [busy, setBusy] = (0, react.useState)(null);
			const [query, setQuery] = (0, react.useState)("");
			const [sort, setSort] = (0, react.useState)("stars");
			const [descending, setDescending] = (0, react.useState)(false);
			const [output, setOutput] = (0, react.useState)("");
			const [profileList, setProfileList] = (0, react.useState)([]);
			const [targetProfile, setTargetProfile] = (0, react.useState)("web");
			const [awaiting, setAwaiting] = (0, react.useState)(null);
			const [cols, setCols] = (0, react.useState)(() => {
				try {
					return localStorage.getItem(COLS_KEY) === "1" ? 1 : 2;
				} catch {
					return 2;
				}
			});
			const [visibleCount, setVisibleCount] = (0, react.useState)(RENDER_BATCH);
			const sentinelRef = (0, react.useRef)(null);
			const injected = (0, react.useRef)({
				marketplace,
				profiles,
				install,
				update,
				unblock
			});
			const fetchSeq = (0, react.useRef)(0);
			/** Fetch the listing; installed flags are computed server-side per profile. */
			const fetchMarketplace = (refresh, profile) => {
				const seq = ++fetchSeq.current;
				setState((current) => current.status === "ready" ? current : { status: "loading" });
				injected.current.marketplace(refresh, profile).then((result) => {
					if (seq === fetchSeq.current) setState({
						status: "ready",
						result
					});
				}, (error) => {
					if (seq === fetchSeq.current) setState({
						status: "error",
						message: error instanceof Error ? error.message : String(error)
					});
				});
			};
			(0, react.useEffect)(() => {
				injected.current.profiles().then((items) => {
					setProfileList(items);
					const current = items.find((profile) => profile.running !== null) ?? items.find((profile) => profile.isCurrent === true);
					const target = current !== void 0 ? current.name : "web";
					setTargetProfile(target);
					fetchMarketplace(false, target);
				}, () => {
					fetchMarketplace(false, "web");
				});
			}, []);
			const onTargetProfileChange = (value) => {
				setTargetProfile(value);
				setAwaiting(null);
				fetchMarketplace(false, value);
			};
			const onColsToggle = () => {
				setCols((current) => {
					const next = current === 2 ? 1 : 2;
					try {
						localStorage.setItem(COLS_KEY, String(next));
					} catch {}
					return next;
				});
			};
			const runCommand = (item, action, label) => {
				setBusy(item.name);
				action.then((result) => {
					setOutput("$ " + label + " " + item.displayName + "\n" + result.output);
					if (result.awaiting !== void 0) {
						setAwaiting({
							name: item.name,
							questions: result.awaiting.questions
						});
						return;
					}
					fetchMarketplace(false, targetProfile);
				}, (error) => {
					setOutput("$ " + label + " " + item.displayName + "\n[error] " + (error instanceof Error ? error.message : String(error)));
				}).finally(() => {
					setBusy(null);
				});
			};
			const onInstall = (item) => {
				runCommand(item, injected.current.install(targetProfile, item.url), "install");
			};
			/** C2: user submitted the env-var answers — re-run the install with them. */
			const onEnvContinue = (item, answers) => {
				runCommand(item, injected.current.install(targetProfile, item.url, answers), "install");
			};
			/** Update path: npm-published plugins update through the managed update op
			*  (rewrites the specifier to @latest with quality gate + rollback); git-only
			*  sources re-run the install (re-clone + re-link). */
			const onUpdate = (item) => {
				const action = item.packageName !== void 0 && item.packageName.length > 0 ? injected.current.update(targetProfile, item.packageName) : injected.current.install(targetProfile, item.url);
				runCommand(item, action, "update");
			};
			/** Unblock one repository (restores it in the listing on the next fetch). */
			const onUnblock = (repo) => {
				setBusy("unblock:" + repo);
				injected.current.unblock(repo).then(() => {
					fetchMarketplace(false, targetProfile);
				}, (error) => {
					setOutput("$ unblock " + repo + "\n[error] " + (error instanceof Error ? error.message : String(error)));
				}).finally(() => {
					setBusy(null);
				});
			};
			const items = state.status === "ready" ? state.result.items : [];
			const normalizedQuery = query.trim().toLocaleLowerCase();
			const rows = (0, react.useMemo)(() => {
				const sorted = [...items.filter((item) => normalizedQuery.length === 0 || item.name.toLocaleLowerCase().includes(normalizedQuery) || (item.description ?? "").toLocaleLowerCase().includes(normalizedQuery))];
				if (sort === "az") sorted.sort((a, b) => a.displayName.localeCompare(b.displayName));
				else if (sort === "updated") sorted.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
				else if (sort === "created") sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
				else sorted.sort((a, b) => (b.installed ? 1 : 0) - (a.installed ? 1 : 0) || b.stars - a.stars);
				if (descending) sorted.reverse();
				return sorted;
			}, [
				items,
				normalizedQuery,
				sort,
				descending
			]);
			(0, react.useEffect)(() => {
				setVisibleCount(RENDER_BATCH);
			}, [
				normalizedQuery,
				sort,
				descending
			]);
			(0, react.useEffect)(() => {
				const node = sentinelRef.current;
				if (node === null) return;
				const observer = new IntersectionObserver((entries) => {
					if (entries.some((entry) => entry.isIntersecting)) setVisibleCount((count) => Math.min(count + RENDER_BATCH, rows.length));
				}, { rootMargin: "600px" });
				observer.observe(node);
				return () => observer.disconnect();
			}, [rows.length]);
			const rendered = rows.slice(0, visibleCount);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: styles.section,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						style: styles.heading,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
							style: styles.pageTitle,
							children: t("marketList")
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						style: styles.toolbar,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								style: styles.filterLabel,
								children: t("sortLabel")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PmSelect, {
								ariaLabel: t("sortLabel"),
								value: sort,
								options: [
									{
										value: "stars",
										label: t("sortStars")
									},
									{
										value: "az",
										label: t("sortAz")
									},
									{
										value: "updated",
										label: t("sortUpdated")
									},
									{
										value: "created",
										label: t("sortCreated")
									}
								],
								onChange: (value) => setSort(value)
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => setDescending((current) => !current),
								children: descending ? t("sortDesc") : t("sortAsc")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { style: { marginLeft: "auto" } }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								size: "sm",
								variant: "ghost",
								onClick: onColsToggle,
								children: cols === 2 ? t("colsOne") : t("colsTwo")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								size: "sm",
								variant: "ghost",
								disabled: busy !== null,
								onClick: () => fetchMarketplace(true, targetProfile),
								children: t("refresh")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								style: styles.filterLabel,
								children: t("installTarget")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PmSelect, {
								ariaLabel: t("installTarget"),
								disabled: busy !== null || awaiting !== null,
								value: targetProfile,
								options: profileList.map((profile) => ({
									value: profile.name,
									label: profile.name
								})),
								onChange: onTargetProfileChange
							})
						]
					}),
					state.status === "error" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
						style: styles.error,
						role: "alert",
						children: [
							t("error"),
							": ",
							state.message
						]
					}),
					state.status === "loading" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						style: styles.status,
						"aria-busy": "true",
						children: t("loading")
					}),
					state.status === "ready" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							style: styles.heading,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
									style: styles.headingTitle,
									children: t("marketCount")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									style: styles.headingCount,
									children: rows.length
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									style: styles.filterLabel,
									children: [state.result.fromCache ? t("marketCached") + (state.result.cachedAt !== void 0 ? " " + shortDate(state.result.cachedAt) : "") : t("marketFresh"), state.result.source !== void 0 ? " · " + state.result.source : ""]
								})
							]
						}),
						state.result.dropped !== void 0 && state.result.dropped > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							style: styles.status,
							children: t("marketDropped", { n: state.result.dropped })
						}),
						state.result.blocked !== void 0 && state.result.blocked > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							style: styles.heading,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								style: styles.status,
								children: t("marketBlocked", { n: state.result.blocked })
							}), (state.result.blockedRepos ?? []).map((repo) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								size: "sm",
								variant: "ghost",
								disabled: busy !== null,
								onClick: () => onUnblock(repo),
								title: repo,
								children: [
									t("unblockButton"),
									" ",
									repo
								]
							}, repo))]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
							style: styles.search,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconSearchOutline16, { "aria-hidden": "true" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								type: "search",
								style: styles.searchInput,
								value: query,
								placeholder: t("search"),
								"aria-label": t("search"),
								onChange: (event) => setQuery(event.currentTarget.value)
							})]
						}),
						rows.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							style: styles.status,
							children: t("noMarketItems")
						}), !state.result.ok && state.result.message.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
							style: styles.error,
							role: "alert",
							children: [
								t("marketSourceError"),
								": ",
								state.result.message
							]
						})] }),
						state.result.ok && state.result.message.includes("unavailable") && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
							style: styles.status,
							children: [
								t("marketSourceNote"),
								": ",
								state.result.message
							]
						}),
						rendered.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
							style: {
								...styles.cards,
								gridTemplateColumns: cols === 2 ? "repeat(2, minmax(0, 1fr))" : "repeat(1, minmax(0, 1fr))"
							},
							children: rendered.map((item) => {
								const sourceLabel = item.packageName !== void 0 && item.packageName.length > 0 ? t("sourceNpm") : t("sourceGit");
								const kindLabel = item.installed ? item.installedKind === "skill" ? t("typeSkill") : item.installedKind === "agent-preset" ? t("typeAgent") : t("typePlugin") : null;
								return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
									style: styles.card,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											style: styles.cardRow,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("a", {
												href: item.url,
												target: "_blank",
												rel: "noreferrer",
												style: {
													...styles.cardTitle,
													...styles.link
												},
												title: item.name,
												children: item.displayName
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												style: styles.cardAction,
												children: item.installed ? item.updateAvailable ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
													size: "sm",
													variant: "outline",
													style: styles.updateButton,
													disabled: busy !== null,
													onClick: () => onUpdate(item),
													children: busy === item.name ? t("updating") : t("updateButton")
												}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
													style: {
														...styles.tag,
														...styles.tagOn
													},
													children: [t("marketInstalled"), item.installedVersion !== void 0 ? " v" + item.installedVersion : ""]
												}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
													size: "sm",
													variant: "outline",
													disabled: busy !== null || awaiting !== null && awaiting.name === item.name,
													onClick: () => onInstall(item),
													children: busy === item.name ? t("installing") : t("installButton")
												})
											})]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											style: styles.cardMetaRow,
											children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
													style: styles.tag,
													title: String(item.stars),
													children: ["★ ", formatStars(item.stars)]
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													style: styles.tag,
													title: item.packageName,
													children: sourceLabel
												}),
												kindLabel !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													style: styles.tag,
													children: kindLabel
												})
											]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											style: styles.cardMetaRow,
											children: [
												item.status !== void 0 && item.status.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													style: {
														...styles.tag,
														...item.status.includes("✅") ? styles.tagOn : {}
													},
													title: item.status,
													children: item.status.includes("✅") ? t("statusVerified") : item.status.includes("archived") ? t("statusArchived") : t("statusPending")
												}),
												item.verification !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
													style: {
														...styles.tag,
														...item.verification.level >= 2 ? styles.tagOn : {}
													},
													title: item.verification.label,
													children: [
														t("dsoVerified"),
														" L",
														item.verification.level
													]
												}),
												item.security !== void 0 && item.security.status !== "skipped" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													style: {
														...styles.tag,
														...securityBadge(t, item.security).style
													},
													title: item.security.status,
													children: securityBadge(t, item.security).text
												}),
												item.topics !== void 0 && item.topics.slice(0, 2).map((topic) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													style: styles.tag,
													title: item.topics.join(", "),
													children: topic
												}, topic)),
												item.topics !== void 0 && item.topics.length > 2 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
													style: styles.tag,
													title: item.topics.join(", "),
													children: ["+", item.topics.length - 2]
												})
											]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											style: {
												minWidth: 0,
												overflow: "hidden",
												padding: "0 14px 10px"
											},
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												style: styles.cardDesc,
												title: item.description ?? "",
												children: item.description !== void 0 && item.description.length > 0 ? item.description : "\xA0"
											})
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											style: { padding: "0 14px 10px" },
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
												style: styles.meta,
												children: [
													t("updatedAt"),
													" ",
													shortDate(item.updatedAt),
													item.createdAt.length > 0 ? " · " + t("createdAt") + " " + shortDate(item.createdAt) : ""
												]
											})
										}),
										awaiting !== null && awaiting.name === item.name && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											style: { padding: "0 14px 10px" },
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(EnvQuestionForm, {
												questions: awaiting.questions,
												busy: busy === item.name,
												t,
												onContinue: (answers) => onEnvContinue(item, answers),
												onCancel: () => setAwaiting(null)
											})
										})
									]
								}, item.name);
							})
						}),
						rows.length > rendered.length && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							ref: sentinelRef,
							style: { height: 1 }
						}),
						rows.length > rendered.length && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => setVisibleCount((count) => Math.min(count + RENDER_BATCH, rows.length)),
							children: [
								t("marketMore"),
								" (",
								rows.length - rendered.length,
								")"
							]
						}),
						output.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							style: styles.heading,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
								style: styles.headingTitle,
								children: t("commandOutput")
							})
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
							style: styles.output,
							children: output
						})] })
					] })
				]
			});
		}
		//#endregion
		//#region src/client/locales.ts
		/**
		* Locale copy for the plugin-manager settings tab.
		*/
		/** Simplified Chinese dictionary and key source of truth. */
		const zh = {
			tab: "管理",
			heading: "插件管理",
			intro: "为所选 profile 安装、删除、启停插件。启停变更经配置 HMR 即时生效，重启后保持。",
			profileLabel: "运行环境",
			refresh: "刷新",
			packages: "已安装包",
			entries: "运行时条目",
			noPackages: "还没有依赖。在下方安装一个 bundle。",
			installPlaceholder: "npm 包名、github:user/repo、tarball 或 ./路径",
			installButton: "安装",
			installing: "安装中…",
			removeButton: "删除",
			enableButton: "启用",
			disableButton: "停用",
			enabled: "已启用",
			disabled: "已停用",
			restartHint: "补丁更改通过配置 HMR 即时生效，重启后保持。",
			stopButton: "停止",
			stopping: "停止中…",
			commandOutput: "命令输出",
			error: "错误",
			bundleBadge: "bundle",
			dependencyBadge: "依赖",
			phase: "状态",
			entryId: "条目",
			module: "模块",
			confirmRemove: "从 profile 中删除此包？",
			insertRows: "实时挂载插件",
			liveBadge: "实时",
			userBadge: "用户",
			uninstallButton: "卸载",
			confirmUninstall: "卸载此实时挂载插件？",
			noInsertRows: "没有 insert 行。安装非 bundle 插件会自动实时挂载。",
			installMounted: "已识别为插件，已实时挂载（无需重启）",
			confirmDisable: "停用该条目？若其他条目依赖它，profile 可能无法启动（可在 cordis.patch.yml 手动恢复）。",
			search: "搜索",
			loading: "加载中…",
			noEntries: "没有条目。",
			unobserved: "未观察",
			catalogTab: "插件",
			catalog: "插件列表",
			filterLabel: "筛选",
			filterInstalled: "已安装",
			filterBuiltin: "内置",
			filterAll: "全部",
			sortLabel: "排序",
			sortDefault: "默认",
			sortAz: "A-Z",
			sortEnabled: "已启用",
			sortAsc: "升序",
			sortDesc: "降序",
			installedBadge: "已安装",
			emptyFilter: "没有匹配当前筛选/搜索的条目。",
			pending: "等待中",
			loadingPhase: "加载中",
			active: "运行中",
			failed: "失败",
			unloading: "卸载中",
			configState: "配置状态",
			cordisState: "Cordis 状态",
			mounted: "已挂载",
			notMounted: "未挂载",
			envTab: "环境",
			envList: "环境列表",
			createEnv: "新建环境",
			noProfiles: "没有环境。",
			officialBadge: "官方",
			currentBadge: "当前",
			renameButton: "重命名",
			createButton: "新建",
			creating: "创建中…",
			createPlaceholder: "新环境名称（仅小写字母/数字/._-）",
			renamePrompt: "输入新环境名称：",
			confirmRemoveProfile: "确定删除环境",
			templateLabel: "模板",
			templateWeb: "Web 环境（base + web-app）",
			templateHeadless: "Headless 环境（base + headless）",
			copyToLabel: "复制到",
			copyButton: "复制",
			transferTitle: "复制/转移插件",
			transferPlaceholder: "包名（多个用逗号/空格分隔）",
			transferFrom: "原环境",
			transferTo: "目标环境",
			transferArrow: "→",
			transferButton: "转移",
			transferring: "转移中…",
			startButton: "启动",
			starting: "启动中…",
			runningBadge: "运行中",
			currentRunningHint: "当前实例正在此环境运行；其插件可在插件/管理页直接管理。",
			terminalRunningHint: "实例运行中——点「停止」结束；若由终端窗口启动,关闭该终端亦可。",
			officialReadonly: "官方环境只读，不可修改",
			installedAt: "安装时间",
			updatedAt: "更新时间",
			createdAt: "发布时间",
			repository: "原仓库",
			unknown: "未知",
			marketTab: "市场",
			marketList: "插件市场",
			marketCount: "插件数量",
			marketCached: "缓存于",
			marketFresh: "实时",
			installTarget: "安装到",
			statusVerified: "adp 已验证",
			statusPending: "adp 待测",
			statusArchived: "adp 已归档",
			catVision: "视觉多模态",
			catDocument: "文档办公",
			catMemory: "记忆知识",
			catModel: "模型用量",
			catNotify: "通知通讯",
			catCoding: "开发编码",
			catConversation: "对话聊天",
			catWebUi: "界面美化",
			catAgent: "Agent 自动化",
			catTool: "通用工具",
			catResource: "聚合资源",
			catOther: "其他",
			sourceNpm: "npm包",
			sourceGit: "git仓库",
			sourceLocal: "本地",
			typePlugin: "插件",
			colsOne: "单列",
			colsTwo: "双列",
			noMarketItems: "没有市场条目。",
			marketSourceError: "市场数据源错误",
			marketSourceNote: "提示",
			mountButton: "挂载",
			mounting: "挂载中…",
			unmountedTag: "未挂载",
			unmountedHint: "已安装但从未挂载（手动安装不会写挂载行）——点「挂载」写入 insert 行并加载",
			sortStars: "星数",
			sortUpdated: "更新时间",
			sortCreated: "发布时间",
			checkUpdates: "检查更新",
			checking: "检查中…",
			updateButton: "更新",
			updating: "更新中…",
			updateAvailable: "有更新",
			upToDate: "最新",
			currentVersion: "当前版本",
			latestVersion: "最新版本",
			updateSource: "来源",
			updateMessage: "检测结果",
			updateResultTitle: "更新检查结果",
			updateRestartHint: "更新已应用，重启后完全生效",
			updateFailedHint: "更新失败（见上方输出）；版本未变更",
			healthCheck: "健康检查",
			analyzing: "检查中…",
			healthOk: "正常",
			healthIssues: "个问题",
			healthClean: "依赖、冲突与兼容性检查均通过。",
			loadOrder: "建议加载顺序",
			fixButton: "修复",
			fixAllButton: "一键修复",
			fixSuggestButton: "执行建议",
			fixConfirm: "确认执行？",
			fixDone: "已修复 ✓",
			fixing: "修复中…",
			fixAutoGroup: "可自动修复：",
			fixSuggestedGroup: "建议修复（需确认）：",
			fixManualGroup: "需人工处理：",
			marketInstalled: "已安装",
			marketDropped: "{n} 个同名 npm 包已隐藏（同一包只能安装一个）",
			marketMore: "加载更多",
			marketBlocked: "{n} 个仓库已被屏蔽（检测为非插件/skill/预设）",
			unblockButton: "解除屏蔽",
			typeSkill: "skill",
			typeAgent: "agent",
			dsoVerified: "so",
			securityLow: "低风险",
			securityMedium: "中风险",
			securityHigh: "高风险",
			securityUnknown: "未检测",
			kindsTitle: "技能与预设",
			kindsTab: "技能与预设",
			kindsHint: "agent预设由官方设置页管理，本页只负责其的重新拉取更新。",
			kindsNone: "暂无市场安装的技能或预设。",
			reinstallButton: "重新拉取",
			kindsDirLabel: "目录",
			kindsSourceLabel: "来源",
			kindsUnmanagedTitle: "未关联记录的目录",
			confirmKindRemove: "卸载此技能/预设？（删除安装目录与记录）",
			skillsDirLabel: "已安装技能目录",
			presetsDirLabel: "预设目录",
			backupTitle: "备份与恢复",
			backupTargetLabel: "环境",
			backupAll: "全部环境",
			backupExportButton: "导出备份",
			backupImportButton: "导入备份",
			backupRestoreButton: "恢复缺失项",
			backupDiffSummary: "缺失 {missing} 项可恢复 · 已装 {already} 项跳过",
			backupMissingProfiles: "备份中的环境不存在（请先创建）",
			backupUnrestorable: "无法恢复（本地路径源已不存在）",
			backupUpToDate: "备份内容均已安装，无需恢复。",
			exporting: "导出中…",
			restoring: "恢复中…",
			envFormTitle: "该插件需要以下环境变量（留空=跳过）",
			envFormHint: "仅将这些变量注入安装进程，宿主其他环境变量不可见。",
			envFormValuePlaceholder: "变量值（留空=跳过）",
			envFormSkip: "跳过",
			envFormContinue: "继续安装",
			envFormCancel: "取消",
			envFormBusy: "安装中…",
			envFormPausedElsewhere: "该仓库需要环境变量（见上方列表）。请到「管理」页安装栏或市场卡片重新安装并提供变量。"
		};
		/** English dictionary checked against the Chinese key set. */
		const en = {
			tab: "Manage",
			heading: "Plugin Manager",
			intro: "Install, remove, and toggle plugins for the selected profile. Enable/disable changes apply immediately via config HMR and persist across restarts.",
			profileLabel: "Profile",
			refresh: "Refresh",
			packages: "Installed packages",
			entries: "Runtime entries",
			noPackages: "No dependencies yet. Install a bundle below.",
			installPlaceholder: "npm package, github:user/repo, tarball, or ./path",
			installButton: "Install",
			installing: "Installing…",
			removeButton: "Remove",
			enableButton: "Enable",
			disableButton: "Disable",
			enabled: "enabled",
			disabled: "disabled",
			restartHint: "Patch changes apply immediately via config HMR and persist across restarts.",
			stopButton: "Stop",
			stopping: "Stopping…",
			commandOutput: "Command output",
			error: "Error",
			bundleBadge: "bundle",
			dependencyBadge: "dependency",
			phase: "phase",
			entryId: "entry",
			module: "module",
			confirmRemove: "Remove this package from the profile?",
			insertRows: "Live-mounted plugins",
			liveBadge: "live",
			userBadge: "user",
			uninstallButton: "Uninstall",
			confirmUninstall: "Unmount this live-mounted plugin?",
			noInsertRows: "No insert rows. Installing a non-bundle plugin mounts it live automatically.",
			installMounted: "Recognized as a plugin and mounted live (no restart)",
			confirmDisable: "Disable this entry? If other entries depend on it, the profile may fail to start (recoverable by editing cordis.patch.yml manually).",
			search: "Search",
			loading: "Loading…",
			noEntries: "No entries.",
			unobserved: "unobserved",
			catalogTab: "Plugins",
			catalog: "Plugin catalog",
			filterLabel: "Filter",
			filterInstalled: "Installed",
			filterBuiltin: "Built-in",
			filterAll: "All",
			sortLabel: "Sort",
			sortDefault: "Default",
			sortAz: "A-Z",
			sortEnabled: "Enabled",
			sortAsc: "Ascending",
			sortDesc: "Descending",
			installedBadge: "installed",
			emptyFilter: "No entries match the current filter/search.",
			pending: "pending",
			loadingPhase: "loading",
			active: "active",
			failed: "failed",
			unloading: "unloading",
			configState: "Configuration",
			cordisState: "Cordis state",
			mounted: "mounted",
			notMounted: "not mounted",
			envTab: "Environments",
			envList: "Environments",
			createEnv: "Create environment",
			noProfiles: "No environments.",
			officialBadge: "official",
			currentBadge: "current",
			renameButton: "Rename",
			createButton: "Create",
			creating: "Creating…",
			createPlaceholder: "New environment name (lowercase letters/digits/._-)",
			renamePrompt: "New environment name:",
			confirmRemoveProfile: "Delete environment",
			templateLabel: "Template",
			templateWeb: "Web environment (base + web-app)",
			templateHeadless: "Headless environment (base + headless)",
			copyToLabel: "Copy to",
			copyButton: "Copy",
			transferTitle: "Copy / transfer plugins",
			transferPlaceholder: "Package names (comma/space separated)",
			transferFrom: "From",
			transferTo: "To",
			transferArrow: "→",
			transferButton: "Transfer",
			transferring: "Transferring…",
			startButton: "Start",
			starting: "Starting…",
			runningBadge: "running",
			currentRunningHint: "The current instance runs this environment; manage its plugins from the Plugins/Manage tabs.",
			terminalRunningHint: "Instance running — click Stop to end it; if started in a terminal window, closing it also stops the instance.",
			officialReadonly: "Official environment is read-only",
			installedAt: "Installed at",
			updatedAt: "Updated at",
			createdAt: "Created at",
			repository: "Repository",
			unknown: "unknown",
			marketTab: "Marketplace",
			marketList: "Plugin marketplace",
			marketCount: "Plugin count",
			marketCached: "cached at",
			marketFresh: "fresh",
			installTarget: "Install into",
			statusVerified: "adp verified",
			statusPending: "adp untested",
			statusArchived: "adp archived",
			catVision: "Vision & multimodal",
			catDocument: "Docs & office",
			catMemory: "Memory & knowledge",
			catModel: "Model usage",
			catNotify: "Notifications",
			catCoding: "Coding",
			catConversation: "Conversation",
			catWebUi: "Web UI",
			catAgent: "Agent automation",
			catTool: "Utility",
			catResource: "Resources",
			catOther: "Other",
			sourceNpm: "npm pkg",
			sourceGit: "git repo",
			sourceLocal: "local",
			typePlugin: "Plugin",
			colsOne: "1 column",
			colsTwo: "2 columns",
			noMarketItems: "No marketplace entries.",
			marketSourceError: "Marketplace source error",
			marketSourceNote: "Note",
			mountButton: "Mount",
			mounting: "Mounting…",
			unmountedTag: "not mounted",
			unmountedHint: "Installed but never mounted (manual installs write no mount row) — click \"Mount\" to add the insert row and load it",
			sortStars: "Stars",
			sortUpdated: "Updated",
			sortCreated: "Created",
			checkUpdates: "Check updates",
			checking: "Checking…",
			updateButton: "Update",
			updating: "Updating…",
			updateAvailable: "update available",
			upToDate: "up to date",
			currentVersion: "Current version",
			latestVersion: "Latest version",
			updateSource: "Source",
			updateMessage: "Note",
			updateResultTitle: "Update check results",
			updateRestartHint: "Update applied; fully effective after a restart",
			updateFailedHint: "Update failed (see output above); version unchanged",
			healthCheck: "Health check",
			analyzing: "Analyzing…",
			healthOk: "healthy",
			healthIssues: "issue(s)",
			healthClean: "Dependency, conflict and compatibility checks all pass.",
			loadOrder: "Suggested load order",
			fixButton: "Fix",
			fixAllButton: "Fix all",
			fixSuggestButton: "Apply",
			fixConfirm: "Confirm?",
			fixDone: "fixed ✓",
			fixing: "Fixing…",
			fixAutoGroup: "Auto-fixable:",
			fixSuggestedGroup: "Suggested (needs confirmation):",
			fixManualGroup: "Manual:",
			marketInstalled: "installed",
			marketDropped: "{n} duplicate package(s) hidden (one npm package can only be installed once)",
			marketMore: "Load more",
			marketBlocked: "{n} repo(s) blocked (detected as not plugin/skill/preset)",
			unblockButton: "Unblock",
			typeSkill: "skill",
			typeAgent: "agent",
			dsoVerified: "so",
			securityLow: "low risk",
			securityMedium: "medium risk",
			securityHigh: "high risk",
			securityUnknown: "unscanned",
			kindsTitle: "Skills & presets",
			kindsTab: "Skills & presets",
			kindsHint: "Agent presets are managed by the official settings page; this page only owns re-pulling/updating them.",
			kindsNone: "No marketplace-installed skills or presets yet.",
			reinstallButton: "Re-pull",
			kindsDirLabel: "Dir",
			kindsSourceLabel: "Source",
			kindsUnmanagedTitle: "Unrecorded dirs",
			confirmKindRemove: "Uninstall this skill/preset? (removes the install dir and record)",
			skillsDirLabel: "Skill dirs",
			presetsDirLabel: "Preset dirs",
			backupTitle: "Backup & restore",
			backupTargetLabel: "Environment",
			backupAll: "All environments",
			backupExportButton: "Export backup",
			backupImportButton: "Import backup",
			backupRestoreButton: "Restore missing",
			backupDiffSummary: "{missing} missing to restore · {already} already present (skipped)",
			backupMissingProfiles: "Profiles in the backup do not exist locally (create them first)",
			backupUnrestorable: "Cannot restore (local-path source no longer exists)",
			backupUpToDate: "Everything in the backup is already installed.",
			exporting: "Exporting…",
			restoring: "Restoring…",
			envFormTitle: "This repository requests the following environment variables (leave empty to skip)",
			envFormHint: "Only these variables are injected into the install process; other host env vars stay hidden.",
			envFormValuePlaceholder: "Value (empty = skip)",
			envFormSkip: "Skip",
			envFormContinue: "Continue install",
			envFormCancel: "Cancel",
			envFormBusy: "Installing…",
			envFormPausedElsewhere: "This repository needs environment variables (listed above). Reinstall it from the Manage tab or the marketplace and provide them."
		};
		//#endregion
		//#region src/client/index.ts
		/** Dictionary namespace owned by this plugin. */
		const NS = "settings.pluginManager";
		/** Services required by the Settings registration. */
		const inject = ["slots", "locale"];
		/** Base URL of the host REST surface. */
		const BASE = "/api2/plugin-manager";
		/** Call one REST op with a JSON body. */
		async function call(op, body) {
			const response = await fetch(`${BASE}/${op}`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(body)
			});
			if (!response.ok) throw new Error(`pluginManager.${op}: HTTP ${response.status}`);
			const envelope = await response.json();
			if (!envelope.ok) throw new Error(`pluginManager.${op} failed: ${envelope.error?.code}: ${envelope.error?.message}`);
			return envelope.value;
		}
		/** Contribute the catalog (shadowing official) and management tabs. */
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "dsh-web-plugin-manager: dictionaries");
			const t = ctx.locale.bind(NS);
			const catalogInjected = () => ({
				profiles: () => call("listProfiles", {}),
				list: (profile) => call("list", { profile }),
				setEnabled: (profile, entryId, enabled) => call("setEnabled", {
					profile,
					entryId,
					enabled
				}),
				mount: (profile, packageName) => call("mount", {
					profile,
					packageName
				})
			});
			const managerInjected = () => ({
				profiles: () => call("listProfiles", {}),
				list: (profile) => call("list", { profile }),
				install: (profile, spec, answers) => call("install", {
					profile,
					spec,
					answers
				}),
				remove: (profile, name) => call("remove", {
					profile,
					name
				}),
				removeInsert: (profile, rowId) => call("removeInsert", {
					profile,
					rowId
				}),
				copyPlugins: (from, to, names) => call("copyPlugins", {
					from,
					to,
					names
				}),
				checkUpdates: (profile) => call("checkUpdates", { profile }),
				update: (profile, name) => call("update", {
					profile,
					name
				}),
				analyze: (profile) => call("analyze", { profile }),
				fixIssue: (profile, action, target) => call("fixIssue", {
					profile,
					action,
					target
				}),
				fixAll: (profile) => call("fixAll", { profile })
			});
			ctx.slots.inject("settings.plugins.tab", () => ctx.slots.register({
				name: "settings.plugins.tab",
				id: "all",
				order: 10,
				priority: -1,
				label: () => t("catalogTab"),
				locale: NS,
				inject: catalogInjected
			}, PluginCatalogTab));
			ctx.slots.inject("settings.plugins.tab", () => ctx.slots.register({
				name: "settings.plugins.tab",
				id: "manager",
				order: 20,
				label: () => t("tab"),
				locale: NS,
				inject: managerInjected
			}, PluginManagerSettingsTab));
			const environmentsInjected = () => ({
				profiles: () => call("listProfiles", {}),
				copyPlugins: (from, to, names) => call("copyPlugins", {
					from,
					to,
					names
				}),
				startProfile: (name) => call("startProfile", { name }),
				stopProfile: (name) => call("stopProfile", { name }),
				createProfile: (name, template) => call("createProfile", {
					name,
					template
				}),
				renameProfile: (oldName, newName) => call("renameProfile", {
					oldName,
					newName
				}),
				removeProfile: (name) => call("removeProfile", { name }),
				backupExport: (profile) => call("backupExport", { profile }),
				backupDiff: (backup, profile) => call("backupDiff", {
					profile,
					backup
				}),
				backupRestore: (backup, profile) => call("backupRestore", {
					profile,
					backup
				})
			});
			ctx.slots.inject("settings.plugins.tab", () => ctx.slots.register({
				name: "settings.plugins.tab",
				id: "environments",
				order: 30,
				label: () => t("envTab"),
				locale: NS,
				inject: environmentsInjected
			}, PluginEnvironmentsTab));
			const kindsInjected = () => ({
				kinds: () => call("listKinds", {}),
				uninstall: (repo) => call("uninstallKind", {
					profile: "",
					repo
				}),
				reinstall: (repo) => call("install", {
					profile: "",
					spec: "https://github.com/" + repo,
					answers: void 0
				})
			});
			ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: "kinds",
				order: 15,
				label: () => t("kindsTab"),
				locale: NS,
				inject: kindsInjected
			}, PluginKindsTab));
			const marketplaceInjected = () => ({
				marketplace: (refresh, profile) => call("marketplace", {
					refresh,
					profile
				}),
				install: (profile, spec, answers) => call("install", {
					profile,
					spec,
					answers
				}),
				update: (profile, name) => call("update", {
					profile,
					name
				}),
				unblock: (repo) => call("unblockRepo", { repo }),
				profiles: () => call("listProfiles", {})
			});
			ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: "marketplace",
				order: 20,
				label: () => t("marketTab"),
				locale: NS,
				inject: marketplaceInjected
			}, PluginMarketplaceTab));
		}
		//#endregion
		exports.NS = NS;
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
