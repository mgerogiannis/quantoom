# Contributing / Συνεισφορές

## Ελληνικά

Το production branch είναι το `main`. Οι εξωτερικές συνεισφορές πρέπει να γίνονται σε ξεχωριστό branch και μέσω Pull Request.

Πριν από merge απαιτούνται:

1. Επιτυχές GitHub Actions status check `build`.
2. Έγκριση από τον CODEOWNER `@mgerogiannis`.
3. Επίλυση όλων των συζητήσεων του Pull Request.
4. Απαγόρευση force-push και διαγραφής του `main`.

Το GitHub App που χρησιμοποιείται από τον εξουσιοδοτημένο βοηθό ενεργεί μόνο μέσα στα δικαιώματα του ιδιοκτήτη· δεν αποτελεί ξεχωριστό ανθρώπινο approver.

Τοπικός έλεγχος πριν από Pull Request:

```bash
npm ci
npm run build
```

## English

`main` is the production branch. External contributions must use a separate branch and a Pull Request.

Before merging, require:

1. A successful GitHub Actions `build` status check.
2. Approval from CODEOWNER `@mgerogiannis`.
3. Resolution of all Pull Request conversations.
4. No force pushes or deletion of `main`.

The authorized assistant's GitHub App acts only within the repository owner's permissions; it is not a separate human approver.

Run locally before opening a Pull Request:

```bash
npm ci
npm run build
```
