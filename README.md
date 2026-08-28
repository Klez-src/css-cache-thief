# CSS Cache Thief

Proof of concept demonstrating CSS-based data exfiltration.

## What it does

Uses CSS attribute selectors to match input values and trigger background-image requests to a logging endpoint. Every character typed in a form field generates a unique request that reveals the character.

The demo shows five attack vectors:
- Character-by-character keylogging via input[value*="x"]
- Password field detection via :has() selector
- CSRF token theft from meta tags
- Focus tracking on form fields
- Form submission readiness detection

## How to run

Open index.html in any modern browser. Type in any form field and watch the log panel fill with stolen data. No JavaScript execution is required for the exfiltration itself.

## Why it matters

This works even with script-src: 'none' CSP policies. Most security scanners miss this because they only look for script-based attacks. The fix is to restrict style-src and avoid using background-image on user-input elements.

## Mitigations

- Content-Security-Policy: style-src 'self'
- Avoid background-image on form elements and inputs
- Sanitize CSS from untrusted sources
- Use sandbox attributes on iframes

## Technical notes

The attack relies on the browser making HTTP requests for background images. Each request includes the matched character in the URL parameters. A remote server can reconstruct the full input value from the request sequence.

The :has() selector allows detection of parent elements containing specific child patterns, enabling form structure analysis.
