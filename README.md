# Quantoom MVP

Διαδραστικό εκπαιδευτικό εργαστήριο κβαντικής υπολογιστικής σε Next.js.

## Τοπική εκτέλεση

Για το απλό τοπικό Next.js development απαιτείται Node.js 20.9 ή νεότερο.
Προτείνεται Node.js 22 LTS. Το `npm run dev` δεν χρησιμοποιεί πλέον Vinext/Vite,
ώστε να λειτουργεί και σε Node 20 χωρίς το `fs.promises.glob` error.

```bash
npm install
npm run dev
```

Άνοιξε τη διεύθυνση που θα εμφανίσει το terminal (συνήθως `http://localhost:3000`).

Αν χρησιμοποιείς `nvm` σε macOS:

```bash
nvm install 22
nvm use 22
rm -rf node_modules .next
npm install
npm run dev
```

Το `npm run dev:sites` παραμένει διαθέσιμο για το ειδικό Vinext/Cloudflare
περιβάλλον και απαιτεί Node.js 22.

Για production έλεγχο:

```bash
npm run build
npm start
```

## MVP δυνατότητες

- Visual circuit builder τριών qubits
- Πύλες H, X, Y, Z, S και T
- State-vector simulation στον browser
- Δυναμικό Bloch vector ανά qubit
- Measurement simulation με 100–4096 shots
- Παραδείγματα Grover, superposition και phase kickback
- Παραγωγή ισοδύναμου Qiskit, Cirq και Q# κώδικα
- Responsive UI χωρίς βάση δεδομένων ή API keys

## Επόμενο production στάδιο

Controlled gates (CNOT/CZ), drag-and-drop χρονογραμμή, Monaco editor με πραγματικό Python/Qiskit runtime μέσω Pyodide ή backend sandbox, πλήρες course system και προαιρετικό Supabase μόνο για λογαριασμούς και αποθήκευση προόδου.
