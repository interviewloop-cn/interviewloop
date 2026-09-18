#!/usr/bin/env python3
"""InterviewLoop · [原话] 逐字核对（PROTOCOL 0.2 / B-8 自检）
用法：python3 scripts/check_quotes.py <B.md> <transcript.md>
把 B 输出里每条 [原话] [mm:ss] "…" 与转录逐字比对（忽略空格）；有省略号或拼接一律判不通过。
"""
import re,sys
b=open(sys.argv[1],encoding='utf-8').read(); t=open(sys.argv[2],encoding='utf-8').read().replace(' ','')
qs=re.findall(r'\[原话\]\s*\[\d\d:\d\d\]\s*[“"]([^”"]+)[”"]',b)+re.findall(r'\[VERBATIM\]\s*\[\d\d:\d\d\]\s*[“"]([^”"]+)[”"]',b)
bad=[q for q in qs if ('…' in q or '...' in q or q.replace(' ','') not in t)]
print(f'[原话] {len(qs)} 条，不可逐字搜到 {len(bad)} 条'); [print(' ✗',q[:80]) for q in bad]
sys.exit(1 if bad else 0)
