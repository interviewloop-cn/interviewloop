---
market: cn
version: 1
file: signals
scope: one candidate (experienced hire or campus), one or more interviewers
source: cn/signals.md v1
language: en
---

# Pass / fail signals (cn)

> This is a translation of the cn market package with cultural notes; it is not a separate market package. Where it differs from the Chinese file, the Chinese file is authoritative.
> **The author's rules of thumb; hits are accumulated from zero.** From a small sample within a single function, with no statistical significance.
> Usage (PROTOCOL B-6): fill in the table row by row first, then predict. Any hard signal "yes" → straight to "fail"; with no hard signal, if more than half of the soft signals are "cannot judge" → "cannot predict".
> Meta-rule: **do not derive the outcome from delivery flaws.** Filler phrases, duration and loose structure never enter the basis of prediction. What the interviewer is buying is judgement structure and information-retrieval habits, not fluency.
> The "hit / miss" columns at the end of each table are for people not using a personal handbook to backfill locally; people using the handbook record hits in handbook section 6, and the two need not be kept in sync.

---

## Layer 1 · Hard signals (if any one appears, the prediction is "fail" outright, and soft signals are not consulted)

| Code | Signal | Counting rule | Hit | Miss |
|---|---|---|---|---|
| H1 | Capability mismatch between résumé and JD on ≥ 2 items | Post-hoc confirmation of Module A Table 1; no JD → cannot judge | | |
| H2 | The interviewer follows up on the same question for ≥ 3 rounds and the candidate never hits the point | Follow-up = the interviewer rephrases and re-asks the same question; only the transcript or the notes-template count fields are accepted | | |
| H3 | The candidate gets facts on their own résumé wrong ≥ 3 times | Numbers, dates, responsibilities, reporting lines; only the transcript or the notes-template count fields are accepted | | |
| H4 | The interviewer directly challenges the truthfulness of résumé experience or of an answer | Truthfulness challenge = phrasings such as "are you sure", "did you do this yourself", "you said X just now and Y now". **Appears once → the verdict card must carry a "high-risk alert", the prediction still goes through soft signals, and this ranks first among the core issues; appears ≥ 2 times → hard signal** | | |
| H5 | The interview actually ends ≥ 1/3 earlier than the planned duration | If either of the planned duration / actual duration fields is missing → cannot judge | | |

Follow-ups and truthfulness challenges are counted separately, never merged.

## Layer 2 · Soft signals (used when there is no hard signal)

The left column is the pass signal, the right column the corresponding fail signal. Each pair looks only at the interviewer's behaviour, not at attitude.

| Pass signal | Fail signal | Hit | Miss |
|---|---|---|---|
| Gives a list of "what you would need to fill in after joining" at the close | Gives structural feedback at the close but does not mention the role | | |
| Follows up on the résumé projects related to their business | Only reconstructs your experience along the timeline, without following up on projects | | |
| Discloses the real state of the business unprompted (e.g. traffic mix, what cannot be done) | Introduces the company structure unprompted for you to "choose" from (= the current role is already a no) | | |
| Asks about work location / start date | Asks "where do you want to go" (= is moving you to another position) | | |
| Listens to the case answer to the end without interrupting | Changes the question midway through the case | | |

## Harm ranking rule (fixed; the model may not decide on its own)

Triggered hard signal > triggered soft fail signal > cumulative count across interviews > distance from the close (the nearer the close, the greater the harm).

## Calibration reminder

When reviewing, fill in this table first, then draw a conclusion. There was once an interview with many flaws in which the case answer went off in the wrong direction; the prediction was "fail", and the actual outcome was a pass. The error was deriving the outcome from flaws rather than looking at the signals. That is why this table exists.

## Cultural notes

This taxonomy was written from experienced-hire interviews in the Chinese internet industry. The following items may not hold in other markets.

- The "truthfulness challenge" (H4) and the notion of a background check (背调) in this taxonomy differ from a reference check. A Chinese background check is typically run by a third-party firm after the offer, on employment dates, titles and reporting lines, whereas a reference check contacts people the candidate names. H4's harm weighting may therefore differ in markets where reference checks are the norm.
