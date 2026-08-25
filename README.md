# Quantoom

Το Quantoom είναι ένα δίγλωσσο, διαδραστικό εργαστήριο κβαντικής υπολογιστικής για εκπαίδευση, έρευνα και τεχνική διερεύνηση. Επιτρέπει οπτική σύνθεση κυκλωμάτων, βηματική εκτέλεση, επιθεώρηση στη σφαίρα Bloch, προσομοίωση statevector, μετρήσεις και αμφίδρομη εργασία με Qiskit, Cirq και Q#.

Quantoom is a bilingual interactive quantum-computing workbench for education, research, and technical exploration. It combines visual circuit composition, step-by-step playback, Bloch-sphere inspection, statevector simulation, measurement, and round-trip Qiskit, Cirq, and Q# workflows.

## Ελληνικά

### Τι προσφέρει

- Register σχεδίασης από 1 έως 1.200 qubits.
- Ακριβής τοπική προσομοίωση statevector έως 16 qubits.
- Πύλες H, X, Y, Z, S, T, RX, RY, RZ, CX, CZ, CP, SWAP, CCX/Toffoli και CSWAP/Fredkin.
- Οπτικό κύκλωμα με control/target συνδέσεις και measurements σε κάθε wire.
- Media player με αναπαραγωγή, παύση, προηγούμενο/επόμενο βήμα, timeline και ταχύτητες 0.5×–4×.
- Διαδραστική σφαίρα Bloch, συντεταγμένες x/y/z, καθαρότητα και μαθηματική παραμετροποίηση.
- Statevector, ακριβείς πιθανότητες και histogram μετρήσεων πολλαπλών shots.
- Αυτόματη παραγωγή κώδικα Qiskit, Cirq και Q#, λήψη αρχείου και υποστηριζόμενη αντίστροφη εισαγωγή κώδικα στο κύκλωμα.
- Έτοιμα πειράματα Bell, GHZ, Grover, Toffoli, Quantum Teleportation και Shor για N=15, a=2.
- Ελληνικό και αγγλικό περιβάλλον χωρίς μετάφραση καθιερωμένων τεχνικών όρων όταν αυτή θα δημιουργούσε ασάφεια.

### Γιατί υπάρχουν δύο όρια qubits

Η σχεδίαση και η παραγωγή κώδικα φτάνουν τα 1.200 qubits, ώστε να καλύπτουν registers στην κλίμακα σύγχρονου hardware. Η ακριβής statevector προσομοίωση αυξάνεται ως `2^n`: στα 16 qubits αποθηκεύονται 65.536 πλάτη, ενώ στα 50 θα απαιτούνταν πάνω από ένα τετράκις εκατομμύριο πλάτη. Γι’ αυτό, πάνω από 16 qubits το Quantoom μεταβαίνει σε **Λειτουργία σχεδίασης** και απενεργοποιεί Bloch/statevector/measurement simulation χωρίς να περιορίζει το κύκλωμα ή τον κώδικα.

### Εγκατάσταση και τοπική εκτέλεση

Απαιτείται Node.js 20.9 ή νεότερο· προτείνεται Node.js 22 LTS.

```bash
git clone https://github.com/mgerogiannis/quantoom.git
cd quantoom
npm install
npm run dev
```

Άνοιξε το [http://localhost:3000](http://localhost:3000).

Production build:

```bash
npm run build
npm start
```

### Πλήρης οδηγός χρήσης

1. **Γλώσσα:** Από το επάνω δεξί menu επίλεξε `Ελληνικά` ή `English`.
2. **Μέγεθος register:** Γράψε αριθμό 1–1.200. Έως 16 qubits εμφανίζεται `Ακριβής προσομοίωση`. Πάνω από 16 εμφανίζεται `Λειτουργία σχεδίασης`.
3. **Προσθήκη πύλης:** Επίλεξε πύλη από τη βιβλιοθήκη, δήλωσε αριθμούς target/control qubits και, για RX/RY/RZ/CP, διάλεξε γωνία. Πάτησε `Προσθήκη πύλης`.
4. **Μεγάλα registers:** Το κύκλωμα εμφανίζει παράθυρο 20 wires. Χρησιμοποίησε τα `← q` και `q →` για τις επόμενες ομάδες qubits.
5. **Αναπαραγωγή:** Πάτησε ▶ για αυτόματη βηματική εκτέλεση. Ρύθμισε 0.5×, 1×, 2× ή 4×, μετακίνησε το timeline ή χρησιμοποίησε προηγούμενο/επόμενο βήμα.
6. **Επιθεώρηση qubit:** Πάτησε το όνομα ενός wire ή ένα tab `qN`. Η σφαίρα Bloch δείχνει τη μειωμένη κατάσταση αυτού του qubit. Σύρε τη σφαίρα για περιστροφή.
7. **Μετρήσεις:** Τα meter symbols στο τέλος των wires δηλώνουν μέτρηση στην υπολογιστική βάση. Διάλεξε shots και πάτησε `Προσομοίωση και μέτρηση`.
8. **Κώδικας:** Επίλεξε Qiskit, Cirq ή Q#. Ο κώδικας ενημερώνεται αυτόματα με το κύκλωμα. Μπορείς να επεξεργαστείς υποστηριζόμενες εντολές και να πατήσεις `Εφαρμογή κώδικα → κύκλωμα`.
9. **Λήψη:** Πάτησε `Λήψη` για αρχείο `.py` ή `.qs`, έτοιμο να προσαρμοστεί στο αντίστοιχο SDK.
10. **Διαγραφή πύλης:** Πάτησε πάνω στο σύμβολο μιας πύλης στο κύκλωμα.

### Προτεινόμενα πειράματα

#### 1. Superposition ενός qubit

Δημιούργησε register 1 qubit, καθάρισε το κύκλωμα και πρόσθεσε H στο q0. Η σφαίρα μετακινείται από τον βόρειο πόλο στον άξονα x. Με 1.024 shots αναμένονται περίπου 50% `0` και 50% `1`.

#### 2. Bell state και διεμπλοκή

Φόρτωσε `Bell state` και πάτησε Play. Η H δημιουργεί superposition και η CX συσχετίζει τα δύο qubits. Οι μετρήσεις πρέπει να δίνουν μόνο `00` και `11`, περίπου 50/50. Η καθαρότητα κάθε μεμονωμένου qubit πέφτει, επειδή η συνολική κατάσταση είναι διεμπλεγμένη.

#### 3. GHZ state

Φόρτωσε `GHZ state`. Μετά τις H και δύο CX, οι κυρίαρχες εκβάσεις είναι `000` και `111`. Δοκίμασε 100 και 10.000 shots για να δεις πώς μειώνεται ο στατιστικός θόρυβος.

#### 4. Grover search

Φόρτωσε `Grover search`. Παρακολούθησε το oracle και το diffusion βήμα-βήμα. Το histogram δείχνει την ενίσχυση της σημειωμένης κατάστασης σε σχέση με τις υπόλοιπες.

#### 5. Toffoli ως αναστρέψιμη AND

Φόρτωσε `Toffoli logic`. Τα q0 και q1 τίθενται σε `1` και η CCX αναστρέφει το q2 μόνο επειδή και τα δύο controls είναι ενεργά. Άλλαξε ή αφαίρεσε ένα X για να επιβεβαιώσεις τον πίνακα αλήθειας.

#### 6. Quantum teleportation

Φόρτωσε `Quantum teleportation`. Το demo παρουσιάζει τον κβαντικό πυρήνα προετοιμασίας, διεμπλοκής και μετασχηματισμού βάσης. Η πλήρης τηλεμεταφορά απαιτεί ενδιάμεσες μετρήσεις, δύο classical bits και feed-forward διορθώσεις X/Z, τα οποία αποτελούν επόμενο βήμα της πλατφόρμας.

#### 7. Shor για N=15, a=2

Φόρτωσε `Shor N=15`. Τα πρώτα qubits λειτουργούν ως counting register και τα υπόλοιπα ως work register. Το κύκλωμα δείχνει compiled controlled modular operations με Fredkin gates και αντίστροφο QFT με CP gates. Οι φάσεις χρησιμοποιούνται για την εκτίμηση της περιόδου `r`. Στον πλήρη αλγόριθμο, η κλασική μετεπεξεργασία υπολογίζει `gcd(a^(r/2) ± 1, N)` και ανακτά τους παράγοντες 3 και 5. Πρόκειται για εκπαιδευτική, μεταγλωττισμένη περίπτωση N=15 και όχι γενικό compiler αυθαίρετου N.

### Εκτέλεση του παραγόμενου Qiskit κώδικα

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install qiskit qiskit-aer
python quantoom-circuit.py
```

### Deploy στο Vercel

- Framework preset: `Next.js`
- Build command: `npm run build`
- Output directory: άφησέ το κενό — το Vercel εντοπίζει αυτόματα το `.next`
- Install command: `npm install`
- Node.js: 22.x

Κάθε εγκεκριμένο push στο `main` ενεργοποιεί νέο production deployment.

## English

### Features

- Circuit-authoring registers from 1 to 1,200 qubits.
- Exact local statevector simulation up to 16 qubits.
- H, X, Y, Z, S, T, RX, RY, RZ, CX, CZ, CP, SWAP, CCX/Toffoli, and CSWAP/Fredkin gates.
- Visual control/target wiring and terminal measurement meters on every qubit.
- Media-style execution with play, pause, previous/next, timeline scrubbing, and 0.5×–4× speed.
- Interactive Bloch sphere, x/y/z coordinates, reduced-state purity, and mathematical parametrization.
- Statevector probabilities and sampled measurement histograms.
- Synchronized Qiskit, Cirq, and Q# generation, source download, and supported code-to-circuit import.
- Bell, GHZ, Grover, Toffoli, Quantum Teleportation, and compiled Shor N=15 experiments.
- Greek and English UI.

### Register and simulation limits

Circuit design and code generation support up to 1,200 qubits. Exact statevector simulation scales as `2^n`, so the browser simulator is intentionally limited to 16 qubits. Larger registers enter **Design mode**: circuit composition and code generation continue, while statevector, Bloch, and local measurement panels are disabled with a clear explanation.

### Install and run locally

Node.js 20.9+ is required; Node.js 22 LTS is recommended.

```bash
git clone https://github.com/mgerogiannis/quantoom.git
cd quantoom
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

### How to use Quantoom

1. Select Greek or English from the top-right language menu.
2. Enter a register size between 1 and 1,200.
3. Select a gate, assign target/control indices, choose an angle where applicable, and add it.
4. For large registers, navigate the circuit in 20-qubit windows.
5. Use Play or the timeline to inspect state evolution operation by operation.
6. Select a wire to inspect its reduced state on the Bloch sphere.
7. Choose a shot count and run measurement simulation for registers up to 16 qubits.
8. Switch between Qiskit, Cirq, and Q#. Edit supported calls and apply them back to the visual circuit.
9. Download the generated `.py` or `.qs` source.
10. Click a visual gate to remove it.

### Experiment checklist

- **Single-qubit superposition:** H on q0 should produce approximately 50% `0`, 50% `1`.
- **Bell state:** expect correlated `00`/`11` outcomes and mixed reduced single-qubit states.
- **GHZ:** expect primarily `000`/`111`; compare sampling noise across shot counts.
- **Grover:** step through oracle and diffusion to inspect marked-state amplification.
- **Toffoli:** verify that the target flips only when both controls equal 1.
- **Teleportation:** inspect the circuit core; classical feed-forward is not yet modeled.
- **Shor N=15:** inspect counting/work registers, compiled controlled modular operations, inverse QFT, and the classical period-to-factor reasoning. This is an educational compiled case, not a general arbitrary-N implementation.

### Run downloaded Qiskit code

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install qiskit qiskit-aer
python quantoom-circuit.py
```

### Vercel

Use the Next.js preset, `npm run build`, `npm install`, and Node.js 22.x. Leave Output Directory empty so Vercel uses `.next` automatically.

## Development and production safety

Pull requests are checked with a production Next.js build. `CODEOWNERS` assigns ownership to `@mgerogiannis`. Repository rules should require a pull request, one code-owner approval, and the `build` status check before `main` can change. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Current scope and roadmap

Quantoom is an educational browser simulator, not a substitute for validated hardware execution. Near-term production work includes mid-circuit measurements, classical feed-forward, noise models, density-matrix/tensor-network backends, OpenQASM 3, hardware-provider jobs, authentication and private enterprise workspaces.

## License

No open-source license has been granted yet. All rights are reserved by the repository owner.
