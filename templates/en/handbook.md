<!-- source: templates/zh/handbook.md v1 · language: en · Where this differs from the Chinese template, the Chinese template is authoritative. -->

# Personal Handbook · <your name or alias>

> This is your private state carrier. The three modules output increments only; you merge them in yourself (PROTOCOL appendix: interfaces of the three modules).
> This file is not uploaded and not shared. Exporting it is your backup.
> The only source for every number is your résumé; any number that appears in this handbook must be findable in your résumé.
> Only useful to those willing to be honest with themselves: if you write things here that flatter you, you are training someone else, not yourself.

## 0. Basic information
- Function:
- Target role band: (e.g. execution / strategy / mechanism / advisory, per "role band" in PROTOCOL A-2 Table 1)
- Current résumé version number: (the only source of stated figures and wording; see Section 3)
- Registered filler phrases: (for B-5 counts; if none registered, the defaults are "其实 / 就是 / 然后 / 的话", roughly "actually / basically / then / like")
- Delivery target line: filler phrases ___ times / 3 minutes; single case ≤ ___ seconds; total case-question answering ≤ ___ minutes

## 1. Strength tracker (empty table; you fill it in yourself after each interview)

| Strength | First confirmed in (interview) | Evidence (with source tag) | Cumulative occurrences |
|---|---|---|---|
| | | | |

Note: Module B does not write to the strength tracker (B-7); only you add to it. "Progress signals" (weaknesses where the trigger was present but the pattern absent) do not go here; they go in the status column of Section 2.

## 2. Weakness tracker (Module A-5 reads the top 3 entries; Module B-4 / B-7 write increments)

| Pattern | First appeared in (interview) | Cumulative count | Most recent | Status |
|---|---|---|---|---|
| | | | | |

- Pattern names only as given in `taxonomy/en/pitfalls.md`; new findings go to Section 7 "Pending observations" first, not into this table.
- Status values: `active` / `trigger present, pattern absent for N consecutive interviews` (you backfill N; +1 whenever B-4 judges "trigger present, pattern absent"; resets to zero on any repeat).
- B-7 increment format: `Weakness tracker: <pattern> cumulative +1 / new` → update "Cumulative count" and "Most recent" accordingly; for a new pattern, add a row.

## 3. Consistency checklist (empty table; the only source is the résumé)

| Item | Résumé wording (verbatim text or number) | Conflict record: interview / what I said this time / my ruling |
|---|---|---|
| | | |

- Copy from the résumé only, not from memory. When the résumé is revised, update this table in step.
- B-7 increment format: `Claim conflict (if any): handbook says X, this interview said Y, ruled by the user` → write into the third column; after ruling, either revise the résumé or revise what you say, one or the other.

## 4. Interview log (Module B-7 adds rows; Module C-2 backfills "Actual")

| Date | Role category | Round | Interviewer type | Predicted | Actual | Notes |
|---|---|---|---|---|---|---|
| | | | | | to be backfilled | |

- B-7 increment format: `Interview log new row: <date> | <role category> | <type> | Predicted: <…> | Actual: to be backfilled`
- C-1 input, one of four: `pass` / `fail` / `reached round N` / `unknown`. For "reached round N", enter "pass" and write N in Notes. Interviewer feedback (if any) goes into Notes as one sentence.
- `unknown` must be logged too; unknown is itself data.

## 5. Calibration record (Module C-2 adds a row when prediction and actual disagree; Module A-4 reads by role category)

| Date | Role category | Predicted | Actual | Most likely wrong at | User note |
|---|---|---|---|---|---|
| | | | | | 【Blank · Thinking Gap】 |

- C-2 increment format: `<date> | Predicted | Actual | Most likely wrong at: <the signal Module B already wrote> | User note: 【Blank · Thinking Gap】`
- "Most likely wrong at" may only be filled with the signal Module B wrote down at the time; it cannot be swapped afterwards.
- Diagnosis and calibration coexist: do not go back and change B's diagnosis because of the outcome (C-3).
- A-4 reading rule: if the same role category has a record of "type forecast wrong", lower this round's confidence by one level.

## 6. Signal hit log (Module C-2 "hit +1" lands here)

| Signal code | Hit count | Most recent hit (interview) |
|---|---|---|
| H1 | 0 | |
| H2 | 0 | |
| H3 | 0 | |
| H4 | 0 | |
| H5 | 0 | |
| Soft signals (list individually) | 0 | |

- Only signals **cited in Module B's prediction basis** get a hit; other signals marked "yes" in the table are not counted (C-2).
- `unknown` updates no hit count.
- No cross-interview statistics, no hit rate (C-3: the sample is too small; statistics would be false precision). This table exists only to see "which signals have actually appeared on me".

## 7. Pending observations (not entered in tables; written by Module B-3 / B-4, referenced by the next Module A)

- <date> | question not forecast / suspected new pattern | source tag | observed reproducible features
-

- When the same observation recurs in ≥ 2 interviews → you decide whether to submit it as a new type / new pattern (`templates/en/contribute-type.md`); only after submission may it enter Section 2.

## 8. Challenge log (Module B-6 H4 writes here; Module A-2 Table 2 appendix "high-risk items table" reads from here)

| Interview date | Résumé item challenged | Challenge verbatim ([VERBATIM] / [NOTES]) | My answer at the time | Presentation adjusted? |
|---|---|---|---|---|
| | | | | No |

- This is one of only two bases Module A accepts for judging a "résumé high-risk item" (the other is a contradiction between an earlier interview's verbatim record and the résumé). If nothing is logged here, A outputs "no record".
- Log only the interviewer's actual phrasing; not your guesses about their motive.

## 9. Delivery count log (only when a transcript exists; Module B-5 writes here)

| Interview date | Total words spoken | Filler phrase count | Longest single case | Total case-question answering time | Clarifying question count |
|---|---|---|---|---|---|
| | | | | | |

- B-5 counts only, no interpretation; it outputs "this interview X / handbook previous interview Y / target line Z". The target line is in Section 0.
- Delivery flaws do not enter the outcome prediction (B-6). This table serves practice only, not judgement.
