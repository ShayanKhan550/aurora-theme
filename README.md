# Aurora Theme

A modern per-user appearance layer for **Frappe and ERPNext v16**.

Custom colours, typography, spacing, corner radius, light/dark mode, enhanced charts, and a fully redesigned Desk experience — all without modifying Frappe core files.

One custom app. Hooks only.

```bash
bench get-app https://github.com/your-username/aurora-theme --branch version-16

bench --site your-site.local install-app aurora_theme

bench build --app aurora_theme
```

Then clear cache and refresh your browser:

```bash
bench --site your-site.local clear-cache
```

---

## Features

### 🎨 Per-User Appearance

Each user can have their own theme settings:

* Accent colour
* Typography / custom fonts
* Light / Dark / System mode
* Corner radius presets
* Density presets
* Background styles
* Icon colouring

Preferences are stored per user, so changes affect only the current user.

---

### ✨ Modern Desk Experience

* Redesigned sidebar
* Improved cards and widgets
* Better spacing
* Smooth transitions
* Enhanced buttons and inputs
* Modern dashboard appearance

No core file modifications are required.

---

### 📊 Enhanced Charts

Charts automatically adapt to the selected accent colour.

Features include:

* Dynamic series colours
* Rounded bars
* Smoothed lines
* Improved grid styling
* Better readability
* Live chart updates

---

### ⚡ Animations & Effects

Optional UI enhancements:

* Page transitions
* Loading indicators
* Ripple effects
* Animated counters
* Card effects
* Toast improvements
* Quick actions
* Auto-hide panels

All animations respect:

```text
prefers-reduced-motion
```

for accessibility.

---

## Requirements

* Frappe v16
* ERPNext (optional)
* Python 3.14+

Aurora Theme is designed specifically for Frappe v16 and may not work with older versions.

---

## Installation

### 1. Go to your bench

```bash
cd ~/frappe-bench
```

### 2. Get the app

```bash
bench get-app https://github.com/your-username/aurora-theme
```

or copy the local app into:

```text
apps/aurora_theme
```

---

### 3. Install Python package

```bash
bench pip install -e apps/aurora_theme
```

---

### 4. Add to apps.txt

```bash
echo "aurora_theme" >> sites/apps.txt
```

---

### 5. Install on site

```bash
bench --site your-site.local install-app aurora_theme
```

---

### 6. Build assets

```bash
bench build --app aurora_theme
```

---

### 7. Clear cache

```bash
bench --site your-site.local clear-cache
```

---

### 8. Start bench

```bash
bench start
```

Open:

```text
http://your-site.local
```

Hard refresh:

```text
Ctrl + Shift + R
```

---

## Development

Enable developer mode:

```bash
bench set-config -g developer_mode 1
```

Build after changes:

```bash
bench build --app aurora_theme
```

Clear cache:

```bash
bench --site your-site.local clear-cache
```

---

## Project Structure

```text
aurora_theme/
│
├── hooks.py
├── modules.txt
├── public/
│   ├── scss/
│   ├── js/
│   ├── css/
│   └── images/
│
├── templates/
├── patches.txt
└── __init__.py
```

---

## Troubleshooting

### App not in apps.txt

```bash
echo "aurora_theme" >> sites/apps.txt
```

---

### ModuleNotFoundError

```bash
bench pip install -e apps/aurora_theme
```

---

### Theme changes not appearing

```bash
bench --site your-site.local clear-cache

bench build --app aurora_theme
```

Then refresh the browser:

```text
Ctrl + Shift + R
```

---

## License

GPL v3 License

Free for personal and commercial use.

Modify, distribute, and deploy freely under the GPL license terms.

---

## Support

Issues and pull requests are welcome.

GitHub:

```text
https://github.com/your-username/aurora-theme
```
