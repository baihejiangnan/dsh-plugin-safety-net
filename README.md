# dsh-plugin-safety-net

DeepSeek Harness (DSH) Web 插件安全网。一次安装聚合插件管理、安装保护、快照回滚、静态安全扫描和隔离健康检查，并统一呈现在 DSH 的设置界面中。

## 聚合内容

本项目聚合并兼容以下 MIT 开源插件：

| 上游插件 | 提供的主要能力 | 设置界面 |
| --- | --- | --- |
| [`lxzy-7/dsh-plugin-guard`](https://github.com/lxzy-7/dsh-plugin-guard) | 安装前快照、手动/自动回滚、守护启动、事故报告 | 备份管理、插件配置 |
| [`LX2000WASD/dsh-web-plugin-manager`](https://github.com/LX2000WASD/dsh-web-plugin-manager) | 插件查看、安装、更新、启停、卸载、市场及基础健康分析 | 插件管理、市场、环境管理 |
| [`chenw2759-wq/dsh-plugin-healthcheck`](https://github.com/chenw2759-wq/dsh-plugin-healthcheck) | 静态检查、配置组合检查、隔离试跑、恶意代码扫描及修复建议 | 插件检测 |

## 聚合方式

安全网采用组合 Bundle，而不是复制或改写上游源码：

- 一次安装带入并挂载三个上游插件；
- 三个模块共用 DSH 设置入口，但保留独立服务、路由和数据目录；
- 插件管理器替代 DSH 原生只读插件列表，其他安全面板作为同一设置界面的独立分区；
- 依赖直接来自上游 GitHub 仓库，便于审计来源和跟随安全更新；
- 卸载本聚合包即可移除组合挂载层，不修改 DSH 核心源码。

这种隔离式聚合避免合并代码时产生服务名、路由、设置 section 和客户端模块注册冲突。

## 安装

```bash
dsh plugin --profile web add github:baihejiangnan/dsh-plugin-safety-net
```

安装完成后重启 `dsh web`，然后在设置中使用：

- **插件管理**：安装、更新、启停或卸载插件；
- **插件检测**：执行静态检查、配置检查和隔离试跑；
- **备份管理**：创建快照并在故障时回滚。

建议通过插件管理器执行后续安装操作，使安装质量门和回滚链路生效。要获得启动失败后的自动恢复能力，还需按 `dsh-plugin-guard` 上游文档使用 `boot-guard.ps1` 或 `boot-guard.sh` 启动 DSH。

## 兼容性说明

- 面向 DSH `profile/web`。
- 不应同时单独挂载这三个上游插件，否则可能出现重复 Loader 条目或重复设置面板。
- 上游插件仍由各自作者维护；升级前建议先创建快照并运行健康检查。
- 聚合包不会绕过上游插件自身的确认步骤、安全边界或平台限制。

## 致谢

感谢以下作者和项目提供核心能力：

- `lxzy-7/dsh-plugin-guard` 的作者与贡献者；
- `LX2000WASD/dsh-web-plugin-manager` 的作者与贡献者；
- `chenw2759-wq/dsh-plugin-healthcheck` 的作者与贡献者；
- DeepSeek Harness 项目及其插件生态贡献者。

本项目仅负责组合安装与兼容配置。各上游项目的著作权归原作者所有，具体实现、文档和问题反馈请优先参考对应上游仓库。

## License

本聚合配置采用 MIT License。三个上游插件也分别采用 MIT License；使用或再分发时请同时遵守各上游项目的许可证与版权声明。
