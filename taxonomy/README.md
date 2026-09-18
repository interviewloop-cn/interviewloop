# taxonomy/ · 分类库

三个模块共用的公共资产，随仓库分发。个人手册是私有的，不在这里。

## 目录

```
taxonomy/
  cn/                      中国市场包（唯一市场包）
    interviewer-types.md   面试官类型 A / A-2 / B / C / D / E / F / G
    skeletons.md           应答骨架 A–J（例句为虚构骨科植入物临床市场岗，行话见 example/SOURCES.md）
    signals.md             硬信号 H1–H5 + 软信号
    pitfalls.md            常见失分模式（11 条）
    stages.md              业务阶段 × 考察重心
    companies/             公司索引，发布时为空
  en/                      cn 包的英文翻译，附 Cultural notes；不是独立市场包
```

## 文件头字段

每个文件以 YAML 头开始：

```
market: cn        市场包标识；协议按此加载
version: 1        本文件版本，每次合并 PR +1
file: <name>      文件名，供英文版 source 字段引用
scope: 一位候选人（不分社招 / 校招），面试官一人或多人
```

`en/` 下的文件额外带 `source: cn/<file> v<n>`。中英不一致时以中文为准。

## 市场包规则

- v1.0 只有 `cn`。语言开关与市场开关相互独立：界面切英文读 `en/`，市场仍是 cn。
- 海外市场包不做。启动条件：该市场累计 ≥ 10 场按 `templates/zh/contribute-type.md` 提交的类型记录。在此之前不创作任何海外类型、信号或骨架；中文原文在其他市场不成立的地方写进 `en/` 的 Cultural notes，不改原文。

## 分类库的性质

- 来自单一职能、单一行业的小样本。**种子，不是全集。** "未分类"是合法输出。
- 硬信号是作者经验规则，命中从零积累，没有统计意义。

## 贡献

只收本目录的 PR，走 `templates/zh/contribute-type.md`（新类型 / 新模式）与 `templates/zh/contribute-company.md`（公司索引）。禁公司名、人名、评价性语言；转录片段可提交，去掉人名与公司名。唯一例外：`companies/` 索引可写招聘页上的公开公司名，但**作者本人的任何面试记录零条进入仓库**，目录发布时为空。合并节奏不承诺。
