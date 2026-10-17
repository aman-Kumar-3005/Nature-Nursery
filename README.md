# Nature Nursery website

## Overview

Static nursery catalogue and landscaping website with plant filters, gallery views and WhatsApp enquiry links. Content is maintained in HTML and browser scripts.

## System architecture and modules

- `plants.html` and `bonsai-shop.html`: plant categories and catalogue pages.
- `landscaping-services.html`, `gallery.html`, `blog.html`, `blog-details.html`: service and editorial pages.
- `assets/js/main.js`: navigation, filters and enquiry UI.
- `assets/js/validation.js`: contact validation and WhatsApp message formatting.
- `assets/js/animations.js`: scroll reveals and counters.
- `assets/css/`: shared styles and responsive rules.

## Tech stack

HTML5, CSS3 and JavaScript. The application is static; there is no server API, database or dependency-install step.

## Local setup

Requires Python 3 for the local static server and a modern browser. No Node.js build step is required.

```sh
git clone https://github.com/shreyasingh3005/Nature-Nursery.git
cd Nature-Nursery
python3 -m http.server 8000 --bind 127.0.0.1
```

Open <http://127.0.0.1:8000/>. External fonts, icons, embeds and remote images still need Internet access where referenced by the HTML.

## Implementation notes

The success state is generated in the browser; it does not prove an enquiry was delivered. The WhatsApp link still requires the visitor to send the message. No stock, payment or order-processing backend is present. Review catalogue prices, contact details and review claims before publishing.

## Manual checks

Check desktop and mobile navigation, page links, image loading and browser console errors. Use synthetic form values. Inspect the intended request or message before submitting; do not send test enquiries to the configured business contacts.
