# Blades Character Results Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 12 result titles and verdicts with approved 《镖人》 character identities while preserving the existing question bank, scoring, assets, and public URL.

**Architecture:** Keep every result `id`, `profile`, calibration rule, asset path, symptom list, and CTA unchanged. Add one display-only `archetype` field to each result, update the existing `name`, `tagline`, and `final` fields, and route that data through the result card, sharing text, and download canvas. The reveal animation continues to use only `name` and `tagline` so the original archetype does not dilute the reveal.

**Tech Stack:** Static HTML, vanilla JavaScript, CSS, Node.js built-in test runner, Git, GitHub Pages.

---

## File Structure

- Modify `app.js`: result content data, result-card markup, share text, and download-card canvas text.
- Modify `styles.css`: compact original-archetype badge styling for desktop and mobile.
- Modify locally only `result-characters.test.cjs`: content, reveal, result-card, share, and download contracts. This file is currently untracked and must not be staged or pushed.
- Reference `docs/superpowers/specs/2026-08-06-blades-character-results-design.md`: approved mappings, wording, scope, and validation requirements.

The other local `*.test.cjs` files remain untracked under the current deployment convention. Do not stage them.

### Task 1: Lock The Approved Content Contract With Failing Local Tests

**Files:**
- Modify locally: `result-characters.test.cjs`
- Reference: `docs/superpowers/specs/2026-08-06-blades-character-results-design.md`

- [ ] **Step 1: Add a parser and the exact approved result content**

Append this data and parser below the existing `resultIds` declaration in `result-characters.test.cjs`:

```js
const expectedResultContent = [
  {
    id: "harvester",
    name: "老莫",
    archetype: "驿站钉子户",
    tagline: "镖可以晚到，队里的人必须一个不少。",
    final: "你不抢着出头，只会默默把水、路和退路都算好；等别人发现时，整支队伍早被你兜住了。",
  },
  {
    id: "red-dot",
    name: "竖",
    archetype: "悬赏哪有往哪钻",
    tagline: "别人追进度，你追的是一件必须亲手结清的旧账。",
    final: "一旦目标被你钉上，红点不消、旧账不清，系统下线也拦不住你。",
  },
  {
    id: "hoarder",
    name: "常贵人",
    archetype: "包袱守财奴",
    tagline: "安全感不在心里，在包袱最底下那格库存里。",
    final: "你相信世上没有废资源，只有暂时没轮到的宝贝；镖车超载不是问题，放下一件才是。",
  },
  {
    id: "stitcher",
    name: "刀马",
    archetype: "野路子带队人",
    tagline: "路书只负责指方向，怎么活着到达由你决定。",
    final: "你不迷信标准路线，能走、能打、能带人回来就是好路线；至于计划，通常在出发之后补。",
  },
  {
    id: "guide-rebel",
    name: "知世郎",
    archetype: "路书逆子",
    tagline: "别人照着规则赶路，你先研究规则能不能掀了。",
    final: "你读懂路书不是为了服从，而是为了找出哪一页最值得撕；队伍可能跟不上，但时代会被你拖着走。",
  },
  {
    id: "quitter",
    name: "阿育娅",
    archetype: "离队申请常客",
    tagline: "离队的话说得很重，回头救人的脚步更快。",
    final: "你情绪上来时真想把队伍扔在原地，可一听见有人出事，第一个折返的还是你。",
  },
  {
    id: "guild-roamer",
    name: "燕子娘",
    archetype: "茶摊情报头子",
    tagline: "路线图会过期，人情和消息不会。",
    final: "你走到哪都能把陌生人聊成情报点；镖局还在问路时，你已经知道前面谁撒谎、谁欠茶钱。",
  },
  {
    id: "reloader",
    name: "裴行俨",
    archetype: "原地劫匪劝退员",
    tagline: "一次没打穿就再来一次，直到对面先怀疑人生。",
    final: "你把失败理解成对手尚未充分认识你；策略可以晚点改，下一轮必须先开。",
  },
  {
    id: "forensic",
    name: "谛听",
    archetype: "镖局账房仵作",
    tagline: "别人看见打完了，你听见线索才刚开始说话。",
    final: "脚印、伤口、路线和异常都得对上；队伍已经庆功，你还在给战场做审计。",
  },
  {
    id: "brute",
    name: "阿罗汉",
    archetype: "闭眼开路哥",
    tagline: "门打不开就别研究门，先研究墙能不能倒。",
    final: "你解决问题的方法通常很短：确认方向，然后用力量删掉障碍；地图没看完不要紧，路已经被你打出来了。",
  },
  {
    id: "mystic",
    name: "小七",
    archetype: "黄历型镖师",
    tagline: "数到约定的数字，危险最好自己消失。",
    final: "你不是迷信，只是相信熟悉的仪式能让混乱变得可等；只要数还没完，这局就不能判输。",
  },
  {
    id: "looks-master",
    name: "胭脂刀",
    archetype: "镖队选美掌门",
    tagline: "胜负可以晚点结算，出场不能没有记忆点。",
    final: "强度会被版本改写，风格却会留下；别人配阵容看数值，你先确认这支队伍像不像一张海报。",
  },
];

function parseResults() {
  const match = app.match(/const results = (\[[\s\S]*?\n\]);\n\nconst app =/);
  assert.ok(match, "Unable to locate the results array");
  return JSON.parse(match[1]);
}
```

- [ ] **Step 2: Add tests for the content and output surfaces**

Append these tests to `result-characters.test.cjs`:

```js
test("all result identities use the approved Blades character copy", () => {
  const actual = parseResults().map(({ id, name, archetype, tagline, final }) => ({
    id,
    name,
    archetype,
    tagline,
    final,
  }));

  assert.deepEqual(actual, expectedResultContent);
  assert.equal(new Set(actual.map((item) => item.name)).size, 12);
  assert.equal(new Set(actual.map((item) => item.archetype)).size, 12);
});

test("result outputs preserve the reveal and expose the original archetype elsewhere", () => {
  const revealStart = app.indexOf('<div class="result-reveal"');
  const resultGridStart = app.indexOf('<div class="result-grid">', revealStart);
  assert.notEqual(revealStart, -1);
  assert.notEqual(resultGridStart, -1);
  assert.doesNotMatch(app.slice(revealStart, resultGridStart), /result\.archetype/);

  assert.match(app, /class="result-archetype">原人格 · \$\{result\.archetype\}/);
  assert.match(
    app,
    /经镖局鉴定，我是【\$\{result\.name\}】｜原人格：\$\{result\.archetype\}。\$\{result\.tagline\} 这趟镖你又是谁？/,
  );
});
```

- [ ] **Step 3: Run the focused test and verify it fails for the intended reason**

Run:

```powershell
& 'C:\Users\TU\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --test result-characters.test.cjs
```

Expected: FAIL because current result objects do not have `archetype`, still use the original persona names, and the result card does not render `result-archetype`.

- [ ] **Step 4: Leave the test harness local-only**

Run:

```powershell
git status --short
```

Expected: `result-characters.test.cjs` remains untracked. Do not stage or commit any `*.test.cjs` file.

### Task 2: Replace Result Identities Without Changing Scoring

**Files:**
- Modify: `app.js:1062-1305`
- Modify: `app.js:1787-1794`
- Modify: `app.js:1917-1926`
- Test locally: `result-characters.test.cjs`

- [ ] **Step 1: Replace the display fields for all 12 result objects**

For each existing object in `const results`, keep `id`, `character`, `symptoms`, `cta`, and `profile` byte-for-byte unchanged. Add or replace only the following fields with this exact mapping:

```js
const approvedResultCopy = {
  "harvester": {
    archetype: "驿站钉子户",
    name: "老莫",
    tagline: "镖可以晚到，队里的人必须一个不少。",
    final: "你不抢着出头，只会默默把水、路和退路都算好；等别人发现时，整支队伍早被你兜住了。",
  },
  "red-dot": {
    archetype: "悬赏哪有往哪钻",
    name: "竖",
    tagline: "别人追进度，你追的是一件必须亲手结清的旧账。",
    final: "一旦目标被你钉上，红点不消、旧账不清，系统下线也拦不住你。",
  },
  "hoarder": {
    archetype: "包袱守财奴",
    name: "常贵人",
    tagline: "安全感不在心里，在包袱最底下那格库存里。",
    final: "你相信世上没有废资源，只有暂时没轮到的宝贝；镖车超载不是问题，放下一件才是。",
  },
  "stitcher": {
    archetype: "野路子带队人",
    name: "刀马",
    tagline: "路书只负责指方向，怎么活着到达由你决定。",
    final: "你不迷信标准路线，能走、能打、能带人回来就是好路线；至于计划，通常在出发之后补。",
  },
  "guide-rebel": {
    archetype: "路书逆子",
    name: "知世郎",
    tagline: "别人照着规则赶路，你先研究规则能不能掀了。",
    final: "你读懂路书不是为了服从，而是为了找出哪一页最值得撕；队伍可能跟不上，但时代会被你拖着走。",
  },
  "quitter": {
    archetype: "离队申请常客",
    name: "阿育娅",
    tagline: "离队的话说得很重，回头救人的脚步更快。",
    final: "你情绪上来时真想把队伍扔在原地，可一听见有人出事，第一个折返的还是你。",
  },
  "guild-roamer": {
    archetype: "茶摊情报头子",
    name: "燕子娘",
    tagline: "路线图会过期，人情和消息不会。",
    final: "你走到哪都能把陌生人聊成情报点；镖局还在问路时，你已经知道前面谁撒谎、谁欠茶钱。",
  },
  "reloader": {
    archetype: "原地劫匪劝退员",
    name: "裴行俨",
    tagline: "一次没打穿就再来一次，直到对面先怀疑人生。",
    final: "你把失败理解成对手尚未充分认识你；策略可以晚点改，下一轮必须先开。",
  },
  "forensic": {
    archetype: "镖局账房仵作",
    name: "谛听",
    tagline: "别人看见打完了，你听见线索才刚开始说话。",
    final: "脚印、伤口、路线和异常都得对上；队伍已经庆功，你还在给战场做审计。",
  },
  "brute": {
    archetype: "闭眼开路哥",
    name: "阿罗汉",
    tagline: "门打不开就别研究门，先研究墙能不能倒。",
    final: "你解决问题的方法通常很短：确认方向，然后用力量删掉障碍；地图没看完不要紧，路已经被你打出来了。",
  },
  "mystic": {
    archetype: "黄历型镖师",
    name: "小七",
    tagline: "数到约定的数字，危险最好自己消失。",
    final: "你不是迷信，只是相信熟悉的仪式能让混乱变得可等；只要数还没完，这局就不能判输。",
  },
  "looks-master": {
    archetype: "镖队选美掌门",
    name: "胭脂刀",
    tagline: "胜负可以晚点结算，出场不能没有记忆点。",
    final: "强度会被版本改写，风格却会留下；别人配阵容看数值，你先确认这支队伍像不像一张海报。",
  },
};
```

The `approvedResultCopy` object above is the exact replacement data, not a new runtime abstraction. Apply its values directly inside the existing 12 result objects so the current data structure remains intact.

- [ ] **Step 2: Add the original-archetype label to the formal result card only**

Replace the `result-copy` markup with:

```js
<div class="result-copy">
  <p class="result-label">镖局分工</p>
  <p class="result-archetype">原人格 · ${result.archetype}</p>
  <h1 id="result-title">${result.name}</h1>
</div>
```

Do not add `result.archetype` anywhere inside `.result-reveal`; that animation must continue to show only the character name and short verdict.

- [ ] **Step 3: Update Web Share and clipboard fallback text from the same string**

Replace the first line of `shareResult` with:

```js
const text = `经镖局鉴定，我是【${result.name}】｜原人格：${result.archetype}。${result.tagline} 这趟镖你又是谁？`;
```

Keep the existing `navigator.share` and `copyText(text)` branches unchanged so both paths share the exact same content.

- [ ] **Step 4: Run the focused result contract tests**

Run:

```powershell
& 'C:\Users\TU\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --test result-characters.test.cjs
```

Expected: all focused tests PASS.

- [ ] **Step 5: Confirm scoring-related code has not changed**

Run:

```powershell
git diff -- app.js
```

Expected: changes are limited to `name`, new `archetype`, `tagline`, `final`, result-card markup, and share text. There must be no diff in `profile`, `resultCalibration`, `calculateResult`, `questionBank`, or `ACTIVE_QUESTION_COUNT`.

- [ ] **Step 6: Commit the identity and share changes**

```powershell
git add -- app.js
git commit -m "Update results to Blades character identities"
```

Do not stage the local test files.

### Task 3: Style And Export The Original-Archetype Label

**Files:**
- Modify: `styles.css:597-689`
- Modify: `app.js:1982-1995`
- Modify locally: `result-characters.test.cjs`

- [ ] **Step 1: Add a failing CSS and canvas contract test**

Append this test to `result-characters.test.cjs`:

```js
test("the original archetype is styled and included in the download card", () => {
  assert.match(styles, /\.result-archetype\s*\{/);
  assert.match(styles, /@media screen and \(max-width: 680px\)[\s\S]*\.result-archetype\s*\{/);
  assert.match(
    app,
    /ctx\.fillText\(`原人格 · \$\{result\.archetype\}`, 270, 270\);/,
  );
});
```

- [ ] **Step 2: Run the focused test and verify the new case fails**

Run:

```powershell
& 'C:\Users\TU\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --test result-characters.test.cjs
```

Expected: FAIL because `.result-archetype` and the download-card label do not exist yet.

- [ ] **Step 3: Add the compact black-red archetype badge**

Insert this rule after `.result-identity .result-label` in `styles.css`:

```css
.result-archetype {
  display: inline-flex;
  width: fit-content;
  max-width: 100%;
  margin: 0 0 12px;
  padding: 5px 9px 4px;
  border: 1px solid var(--accent-red);
  background: rgba(216, 74, 56, 0.08);
  color: var(--accent-red);
  font-size: 12px;
  font-weight: 900;
  line-height: 1.3;
  letter-spacing: 0;
  overflow-wrap: anywhere;
}
```

Add this rule inside the existing `@media screen and (max-width: 680px)` result section:

```css
.result-archetype {
  margin-bottom: 9px;
  padding: 4px 7px 3px;
  font-size: 11px;
}
```

- [ ] **Step 4: Add the archetype line to the 1080x1440 download canvas**

After drawing `resultId` and before drawing `result.name`, add:

```js
ctx.fillStyle = "#a52c24";
ctx.font = `800 24px ${font}`;
ctx.fillText(`原人格 · ${result.archetype}`, 270, 270);
```

Keep the existing character-name baseline at `y = 350`; the approved archetype names fit in the 690-pixel title width at 24 pixels.

- [ ] **Step 5: Run the complete local test suite**

Run:

```powershell
& 'C:\Users\TU\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --test
```

Expected: 19 tests PASS, 0 fail.

- [ ] **Step 6: Commit the badge and download-card changes**

```powershell
git add -- app.js styles.css
git commit -m "Add original persona labels to result cards"
```

Do not stage the local test files.

### Task 4: Browser QA, Publish, And Verify The Permanent Site

**Files:**
- Verify: `index.html`
- Verify: `app.js`
- Verify: `styles.css`
- Verify: `assets/result-characters/*.webp`

- [ ] **Step 1: Run pre-publish repository checks**

Run:

```powershell
git diff --check
git status --short --branch
git log -4 --oneline
```

Expected:

- `git diff --check` returns no output.
- `main` is ahead of `origin/main` by the approved design, plan, and implementation commits.
- Only the existing local `*.test.cjs` files remain untracked.

- [ ] **Step 2: Run desktop browser QA at 1440x900**

Start the existing static site locally, open it at 1440x900, and complete one full path: intro, 12 questions, bonus question, reveal animation, and final result.

Verify:

- The reveal shows only the character name and short verdict.
- The formal result card shows `原人格 · …` above the character name.
- The character name, badge, image, short verdict, evidence, and CTA do not overlap.
- Sharing produces the approved character and archetype format.
- The console has no errors.

- [ ] **Step 3: Run mobile browser QA at 390x844 and 320x700**

Repeat a full result flow at both viewports.

Verify:

- The longest approved character and archetype names wrap inside the result copy area.
- The badge never pushes the character image outside the card.
- No horizontal overflow appears at 320 pixels.
- Reduced-motion mode bypasses the reveal animation as before.

- [ ] **Step 4: Verify the downloaded result card**

Generate one result image and inspect the 1080x1440 PNG.

Verify:

- It contains the character name, `原人格 · …`, short verdict, final verdict, evidence, result ID, and bonus stone.
- Text stays inside the black border and does not collide with the divider at `y = 700`.

- [ ] **Step 5: Push the approved commits to the existing public repository**

Run:

```powershell
git push origin main
```

Expected: `main -> main` succeeds for `https://github.com/hahaye888/cishen-nbti-b.git`.

- [ ] **Step 6: Wait for GitHub Pages and verify the public site**

Verify `https://hahaye888.github.io/cishen-nbti-b/` after the Pages build reports `built`.

Check that the following return HTTP 200:

```text
/
/app.js
/styles.css
/assets/result-characters/harvester.webp
/assets/result-characters/looks-master.webp
```

Complete one public result flow and confirm the character name, original-archetype badge, new verdicts, share text, and downloaded card match the local build.

The permanent URL remains:

```text
https://hahaye888.github.io/cishen-nbti-b/
```
