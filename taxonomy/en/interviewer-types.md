---
market: cn
version: 1
file: interviewer-types
scope: experienced-hire (one candidate, one or more interviewers)
source: cn/interviewer-types.md v1
language: en
---

# Interviewer types (cn)

> This is a translation of the cn market package with cultural notes; it is not a separate market package. Where it differs from the Chinese file, the Chinese file is authoritative.
> Induced from a small sample within a single function and a single industry. **This is a seed, not a census.** When Module B makes a type judgement, prefer "Unclassified" over force-fitting.
> Fields are fixed: identifying behaviours / what a wrong hire looks like to them / follow-up chain / response pattern / don'ts / pass signals. Describe only the interviewer's behaviour; do not evaluate the interviewer.
> Fields marked † are not direct observations; they are inferred backwards from the other fields of the same entry, and hits are accumulated from zero. "To be accumulated" means the behaviour was not observed in the sample.
> Type codes follow the original induction order and do not indicate frequency. Submit new types via `templates/zh/contribute-type.md`.
> All eight types come from experienced-hire observations. Campus-specific interviewer types (for example the structured interviewer who works through a fixed question sheet with almost no follow-up, or the HR doing bulk screening) have no entry yet and **need continued sample intake**, iterating with contributions and feedback; when met, output "Unclassified" and describe the observable behaviours.

---

## Type A · Framework / Greenfield (0→1)

- **Identifying behaviours**: open-ended questions; volunteers that "industry match doesn't matter"; in the later part, discloses the real state of the business unprompted.
- **What a wrong hire looks like to them**: someone who can only run the fixed playbook of their old industry and cannot break new ground independently.
- **Follow-up chain**: open question → looks at the framework → follows up on one specific move → tests validation and stop-loss awareness → disclosure, to see whether you can pick it up.
- **Response pattern**: framework first → put a number into every layer → validation path and switch conditions (Skeleton A) → reverse questions that pick up the problem they disclosed.
- **Don'ts**: giving a framework without numbers; giving a conclusion without a reversal condition.
- **Pass signals**: discloses the real state of the business unprompted.

## Type A-2 · Live case (a variant of A)

- **Identifying behaviours**: the business owner interviews you in person; asks about your experience first, then in the middle throws a case question of the form "if it were you, under our constraints, how would you do X"; does not interrupt your plan and listens to the end; in the later part discloses the real situation unprompted (e.g. traffic mix, what cannot be done); at the close tells you "what you would need to fill in after joining".
- **What a wrong hire looks like to them**: someone who can only talk about their own industry and cannot rebuild a plan under new constraints after joining; someone who would work around red lines in a heavily regulated industry.
- **Follow-up chain**: experience → follows up on one piece of trade-off logic ("which few things are core, and how do you decide the trade-off") → follows up on industry constraints / understanding of regulation → case question → follows up on the résumé projects related to their business → motive for leaving → implicit user question ("do you use / buy it yourself") → reverse questions → work location.
- **Response pattern**: Skeleton H first (ask about the current state and the no-go areas before asking about the user profile) → framework split by route, each route ≤ 90 seconds → write the red line into the plan yourself ("this one cannot be done under regulation, so I would…") → close within 3 minutes → answer the implicit user question with Skeleton J → reverse questions that pick up their disclosure.
- **Don'ts**: in a heavily regulated industry, proposing any workaround of the "don't mention the brand directly" / "change the format" kind; answering the plan before asking about the current state; using products from an industry you don't know well as analogies (the industry-language gap is exposed most easily in analogies).
- **Pass signals**: gives a list of "what you would need to fill in after joining" at the close (already thinking in terms of onboarding); follows up on projects on your résumé (looking for plus points rather than minus points).

## Type B · Data breakdown

- **Identifying behaviours**: short questions, fast pace, presses on stated figures and wording, no reaction to stories, reacts to numbers.
- **What a wrong hire looks like to them** †: someone who substitutes stories for numbers and whose stated figures and wording do not survive follow-up.
- **Follow-up chain** †: asks for the number → presses on the stated figures and wording and the conversion basis → presses on attribution → presses on cost structure and ceiling.
- **Response pattern**: numbers first → volunteer your stated figures and wording plus the conversion rate → attribute with Skeleton B → for what you don't know, say "an estimate, error range X".
- **Don'ts**: clarifying questions; passing off a proxy metric as attribution; "it worked well" in place of a number.
- **Pass signals**: to be accumulated.

## Type C · Domain depth

- **Identifying behaviours**: adds constraints to case questions, presses on definitions of terms, probes the boundary of your capability.
- **What a wrong hire looks like to them** †: someone who mixes up concepts, has unclear boundaries, and cites sources that cannot be traced.
- **Follow-up chain** †: case question with constraints → presses on the definition of a term → adds constraints step by step to probe the boundary.
- **Response pattern**: restate all the constraints → attach every term to a case → close the boundary yourself when you reach it (Skeleton E) → every citation must be traceable.
- **Don'ts**: citing external data that cannot be verified; mixing up concepts; dropping a constraint in your answer.
- **Pass signals**: to be accumulated.

## Type D · HRBP

- **Identifying behaviours**: leads the conversation for a long time; asks about motive / stability / expectations; says of themselves "I can't assess business depth".
- **What a wrong hire looks like to them** †: someone who won't stay, whose stated figures and wording are inconsistent over time, or with whom levelling cannot be agreed.
- **Follow-up chain** †: motive → stability (reason for leaving, past tenures) → expectations (salary, start date) → basis for levelling.
- **Response pattern**: prepare a portable one-liner for each core piece of evidence (Skeleton D) → for complex mechanisms give only the result and the order of magnitude → a fixed departure narrative and fixed start-date wording → the salary lever is used only in this channel and only once they ask first.
- **Don'ts**: explaining the elegance of a mechanism design to HR; claim drift.
- **Pass signals**: asks about work location / start date.

## Type E · Verification

> The type with the fewest samples. Only "response pattern" is a direct observation; everything else is inferred.

- **Identifying behaviours** †: has already seen your work samples, written test or materials before the interview; questions revolve around "why was this done this way"; short duration.
- **What a wrong hire looks like to them** †: the work was not done by the candidate themselves.
- **Follow-up chain** †: points at one design choice → asks why → moves to another and asks again.
- **Response pattern**: let the work speak for itself; you only add one line on the "why" of the design decision.
- **Don'ts** †: adding reasons to the work that did not exist at the time; talking about experience outside the work.
- **Pass signals**: to be accumulated.

## Type F · Strategic abstraction / Advisory

- **Identifying behaviours**: questions are abstract at several layers; asks for cross-platform / cross-model comparisons; presses on "how would you evaluate / how would you falsify"; nods at hands-on cases without following up; gives structural feedback at the close.
- **What a wrong hire looks like to them** †: someone with only execution cases and no method for evaluation and falsification.
- **Follow-up chain** †: multi-layer abstract question → asks for a comparison → presses on evaluation metrics → presses on the falsification condition → structural feedback.
- **Response pattern**: enumerate layer by layer → framework first → an evaluation metric plus a falsification condition for every dimension (Skeleton F) → a case fills only one slot → in a perspective-switch question, genuinely stand in the other party's position.
- **Don'ts** †: propping up an abstract question with a single hands-on case; giving a judgement without an evaluation design.
- **Pass signals**: to be accumulated. For the opposite signal see `signals.md`: gives structural feedback at the close but does not mention the role.
- **Role-mismatch notice** (must be cited when Module B-2 judges the type to be F): the appearance of Type F = an advisory role. If the candidate's capability band is at the execution / strategy / mechanism layer, screen with reverse questions (Skeleton G) in the first round.

## Type G · Mismatch detection / Redirect

- **Identifying behaviours**: asks about your experience stage by stage in chronological order ("what were you responsible for when you first joined", "and then?", "which target were you accountable for"), reconstructing your real capability band; gives an overall assessment midway; then says outright "there is a capability mismatch with this role" and redirects you to other roles; introduces the company structure unprompted for you to choose from.
- **What a wrong hire looks like to them**: not afraid of hiring the wrong person; afraid of putting the right person in the wrong role. They are doing talent allocation for the company, not gatekeeping this role.
- **Follow-up chain**: reconstructs experience stage by stage → asks about reporting line and actual authority ("do the X people report to you", "is Y on your side") → judges the mismatch → asks where you want to go → redirect.
- **Response pattern**: answer reporting line and authority **truthfully** (this kind of interviewer verifies in fine detail and cross-checks); for the direction question, use Skeleton I to take the step up they offer; use Skeleton G as your reverse question to clarify the structure of the redirected role (parallel or under the same owner; whether the owner runs it personally); at the close, restate the direction they recommended to confirm you are aligned.
- **Don'ts**: forcing experience to fit the current role; answering the direction question with "I want to do something I haven't done"; saying the words "comfort zone" (to the interviewer's ear this equals "doesn't want to go deep").
- **Pass signals**: for the current role = a fail signal (introduces the structure for you to choose from, asks where you want to go; see `signals.md`); for the redirected role = to be accumulated.
- **Role-mismatch notice** (must be cited when Module B-2 judges the type to be G): the appearance of Type G usually means the role was mismatched at application time. Most common when a front-line execution role (directly accountable for specific operations) is misaligned with a candidate in the strategy / mechanism band. Intercepting with Module A Table 1 before applying is cheaper than being redirected in the interview.

## Cultural notes

This taxonomy was written from experienced-hire interviews in the Chinese internet industry. The following items may not hold in other markets.

- Type D (HRBP) usually comes **after** the business-round interviews in this taxonomy, whereas in many markets a recruiter screen comes **first**. The identifying behaviours and follow-up chain of Type D therefore may not map onto a recruiter screen.
- In Type G the redirect to another role is initiated by the interviewer. In other markets a redirect is more often initiated by the recruiter or by the candidate, so Type G's identifying behaviours may not appear.
- "Work location / start date" as a pass signal assumes the Chinese practice of asking the base city and the start date in the HR round.
