
# Set the responsive viewport meta tag

Without the viewport meta tag, mobile browsers render pages at desktop width (typically 980px) then shrink them, making text unreadable without zooming.

## Quick Reference

- Add `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Never use `maximum-scale=1` or `user-scalable=no` (breaks accessibility)
- Essential for mobile-responsive layouts

## Check

Verify that this HTML document includes a proper viewport meta tag for responsive design that controls how the page is displayed on mobile devices.

## Fix

Add the viewport meta tag: <meta name="viewport" content="width=device-width, initial-scale=1.0"> in the head section.

## Explain

Explain how the viewport meta tag enables responsive design and why it's essential for mobile-first web development.

## Code Review

Review templates, server-rendered HTML, and shared components that output markup related to Set the responsive viewport meta tag. Flag exact elements, attributes, and routes where the rendered HTML violates the rule.

---

For full implementation details, code examples, and framework-specific guidance,
see `references/rule.md`.

Rule page: https://frontendchecklist.io/rules/html/viewport
