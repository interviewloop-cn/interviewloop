#!/usr/bin/env python3
"""InterviewLoop · 本地转录
用法：python3 scripts/transcribe.py <音频文件> [-o 输出.md] [--model small|medium|large-v3] [--lang zh|en]
- 优先 mlx-whisper（Apple Silicon），其次 faster-whisper；两者都没有就打印安装命令后退出
- 输出：带时间戳的转录 markdown（每段一行：[mm:ss] 文本），不做说话人区分（由模型在下一步标注【面】/【我】）
- 全程本地，不上传任何数据
"""
import argparse, os, sys, subprocess, json, time

def fmt(t):
    t=int(t); return f"{t//60:02d}:{t%60:02d}"

def need(msg):
    print(msg, file=sys.stderr); sys.exit(2)

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("audio"); ap.add_argument("-o","--out"); ap.add_argument("--model",default="small"); ap.add_argument("--lang",default="zh")
    a=ap.parse_args()
    if not os.path.exists(a.audio): need(f"找不到音频：{a.audio}")
    if subprocess.run(["which","ffmpeg"],capture_output=True).returncode!=0:
        need("缺少 ffmpeg。安装：brew install ffmpeg（macOS）/ sudo apt install ffmpeg（Linux）")
    out=a.out or os.path.splitext(a.audio)[0]+".transcript.md"
    segs=None; engine=None; t0=time.time()
    try:
        import mlx_whisper  # type: ignore
        engine="mlx-whisper"
        repo={"small":"mlx-community/whisper-small-mlx","medium":"mlx-community/whisper-medium-mlx","large-v3":"mlx-community/whisper-large-v3-mlx"}.get(a.model,a.model)
        r=mlx_whisper.transcribe(a.audio,path_or_hf_repo=repo,language=a.lang,verbose=False)
        segs=[(s["start"],s["end"],s["text"].strip()) for s in r["segments"]]
    except ImportError:
        try:
            from faster_whisper import WhisperModel  # type: ignore
            engine="faster-whisper"
            m=WhisperModel(a.model,device="auto",compute_type="int8")
            it,_=m.transcribe(a.audio,language=a.lang,vad_filter=True)
            segs=[(s.start,s.end,s.text.strip()) for s in it]
        except ImportError:
            need("没有可用的本地转录引擎。安装其一：\n  Apple Silicon：pip install mlx-whisper\n  其他平台：pip install faster-whisper\n模型文件首次运行自动下载（small 约 500MB），之后离线可用。")
    dur=segs[-1][1] if segs else 0
    lines=[f"# 转录 · {os.path.basename(a.audio)}",f"> 引擎：{engine} / {a.model} ｜ 音频时长：{fmt(dur)} ｜ 转录耗时：{int(time.time()-t0)} 秒 ｜ 说话人未区分，请在下一步由模型标注【面】/【我】","",]
    for s,e,txt in segs:
        if txt: lines.append(f"[{fmt(s)}] {txt}")
    open(out,"w",encoding="utf-8").write("\n".join(lines)+"\n")
    print(json.dumps({"out":out,"engine":engine,"duration_sec":int(dur),"segments":len(segs)},ensure_ascii=False))

if __name__=="__main__": main()
