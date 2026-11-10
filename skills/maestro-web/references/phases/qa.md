# Phase: qa

## Purpose
Prove it works and looks right before anyone else sees it.

## Entry
Build exit reached.

## Steps
1. Run the full test suite and a production build. Record the result lines.
2. Visual check: if a browser or screenshot tool is available, open key pages at mobile and desktop widths; compare with the design (`docs/design.md` or spec §Design direction). Otherwise list what the user should click through.
3. Accessibility basics: contrast, focus states, labels, alt text, keyboard nav.
4. Review the diff against the spec (tweak: against the checklist) — requesting-code-review if installed. Fix Critical/Important; list Minor for the user.
5. Bugs: systematic-debugging. Hard or repeated bugs → escalate to Deep with a switch message.
6. Update state: `qa ✓`, `evidence:`, `minors:`.

## Skills
verification-before-completion, requesting-code-review, systematic-debugging, web-design-guidelines (see `skills-catalog.md` → qa, design).

## Fallback
Tests + build output pasted; key pages checked at 375px and 1280px; diff re-read against spec; issues listed by severity.

## Exit
Evidence recorded (test + build results, visual check), no open Critical/Important issues.

## Tier
From `models.md` → Budget modes (balanced: Balanced, Deep for hard bugs; quality: Deep; thrift: Balanced). Next is ship: switch only if ship has real work (deploy setup, SEO) per Switch rule 2; ship needs user approvals, so it is a switch, not a delegation.
