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

Το προεπιλεγμένο build είναι πλέον το κανονικό `next build` και δημιουργεί τον
φάκελο `.next` που περιμένει το Vercel. Για το ειδικό Sites/Cloudflare build
χρησιμοποίησε `npm run build:sites`.

## MVP δυνατότητες

- Visual circuit builder 1–5 qubits
- Πύλες H, X, Y, Z, S, T, RX, RY, RZ, CNOT, CZ, SWAP και Toffoli
- State-vector simulation στον browser και step-through εκτέλεση
- Περιστρεφόμενη 3D Bloch sphere και reduced-state purity ανά qubit
- Measurement simulation με 100–10.000 shots
- Bell, GHZ, Grover, Toffoli και quantum teleportation experiments
- Αμφίδρομη μετατροπή circuit ↔ Qiskit/Cirq/Q# για τις υποστηριζόμενες εντολές
- Download runnable source code
- Responsive UI χωρίς βάση δεδομένων ή API keys

## Χρήση του workbench

1. Διάλεξε 1–5 qubits από το επάνω μέρος.
2. Επίλεξε πύλη από το Gate Library, όρισε target/control qubits και πάτησε **Add gate**.
3. Πάτησε ένα `q0`, `q1`, κ.λπ. και σύρε τη Bloch sphere για να εξετάσεις την κατάσταση.
4. Χρησιμοποίησε **Step through** για να παρακολουθήσεις την εξέλιξη του state vector.
5. Στο Code Lab άλλαξε framework ή επεξεργάσου τον κώδικα και πάτησε **Apply code → circuit**.
6. Πάτησε **Download** για το `.py` ή `.qs` αρχείο.
7. Διάλεξε shots και πάτησε **Simulate & measure** για histogram μετρήσεων.
8. Από το Experiment Library φόρτωσε έτοιμο Bell, GHZ, Grover, Toffoli ή teleportation circuit.

## Επόμενο production στάδιο

Controlled gates (CNOT/CZ), drag-and-drop χρονογραμμή, Monaco editor με πραγματικό Python/Qiskit runtime μέσω Pyodide ή backend sandbox, πλήρες course system και προαιρετικό Supabase μόνο για λογαριασμούς και αποθήκευση προόδου.
