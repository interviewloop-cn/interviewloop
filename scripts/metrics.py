#!/usr/bin/env python3
"""InterviewLoop · 转录三指标（PROTOCOL B-5）
用法：python3 scripts/metrics.py <已标注说话人的转录.md> [--fillers 其实,就是,然后,的话]
输入格式：每行 "[mm:ss] 【我】文本" 或 "[mm:ss] 【面】文本"（由模型在转录上标注）
输出 JSON：候选人发言字数、发言分钟数、语速（字/分钟）、口头禅各词次数、填充词密度（次/分钟）、最长单答时长（秒）及其起止
只计数不解读。
"""
import argparse, re, json, sys

def parse(path):
    rows=[]
    for line in open(path,encoding="utf-8"):
        m=re.match(r"^\[(\d+):(\d+)\]\s*【(面|我)】\s*(.*)$",line.strip())
        if m: rows.append((int(m.group(1))*60+int(m.group(2)),m.group(3),m.group(4)))
    return rows

def main():
    ap=argparse.ArgumentParser(); ap.add_argument("transcript"); ap.add_argument("--fillers",default="其实,就是,然后,的话")
    a=ap.parse_args(); rows=parse(a.transcript)
    if not rows: print("没有解析到 [mm:ss] 【面】/【我】 格式的行",file=sys.stderr); sys.exit(2)
    fillers=[f for f in a.fillers.split(",") if f]
    # 每段时长 = 下一段起点 - 本段起点；最后一段按每 4 字 1 秒估
    spans=[]
    for i,(t,who,txt) in enumerate(rows):
        end=rows[i+1][0] if i+1<len(rows) else t+max(1,len(txt)//4)
        spans.append((t,end,who,txt))
    me=[s for s in spans if s[2]=="我"]
    chars=sum(len(re.sub(r"[\s，。、？！：；,.?!:;\"“”‘’（）()《》〈〉…—\-]","",s[3])) for s in me)  # 只数字词，不数标点
    secs=sum(max(0,s[1]-s[0]) for s in me)
    mins=secs/60 if secs else 0
    fc={f:sum(s[3].count(f) for s in me) for f in fillers}
    # 最长单答：连续的【我】段合并
    best=(0,None,None); cur=None
    for s in spans:
        if s[2]=="我":
            cur=[s[0],s[1]] if cur is None else [cur[0],s[1]]
        else:
            if cur and cur[1]-cur[0]>best[0]: best=(cur[1]-cur[0],cur[0],cur[1])
            cur=None
    if cur and cur[1]-cur[0]>best[0]: best=(cur[1]-cur[0],cur[0],cur[1])
    f=lambda t: f"{t//60:02d}:{t%60:02d}" if t is not None else None
    out={"候选人发言字数":chars,"候选人发言分钟":round(mins,1),"语速_字每分钟":round(chars/mins) if mins else None,
         "口头禅计数":fc,"填充词密度_次每分钟":round(sum(fc.values())/mins,1) if mins else None,
         "最长单答_秒":best[0],"最长单答_起止":[f(best[1]),f(best[2])],"面试官发言段数":sum(1 for s in spans if s[2]=="面"),"候选人发言段数":len(me)}
    print(json.dumps(out,ensure_ascii=False,indent=2))

if __name__=="__main__": main()
