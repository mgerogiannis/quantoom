export type Complex = { r: number; i: number };
export type GateName = "H"|"X"|"Y"|"Z"|"S"|"T"|"RX"|"RY"|"RZ"|"CX"|"CZ"|"CP"|"SWAP"|"CCX"|"CSWAP";
export type Operation = { id: string; name: GateName; targets: number[]; angle?: number };

const c=(r:number,i=0):Complex=>({r,i});
const add=(a:Complex,b:Complex)=>c(a.r+b.r,a.i+b.i);
const mul=(a:Complex,b:Complex)=>c(a.r*b.r-a.i*b.i,a.r*b.i+a.i*b.r);
const conj=(a:Complex)=>c(a.r,-a.i);
const SQ=Math.SQRT1_2;

export const gateCatalog:Record<GateName,{label:string;description:string;arity:number;matrix:string;group:string}>={
  H:{label:"Hadamard",description:"Creates equal superposition",arity:1,matrix:"1/√2 [1  1; 1 −1]",group:"Single-qubit"},
  X:{label:"Pauli X",description:"Bit flip — quantum NOT",arity:1,matrix:"[0  1; 1  0]",group:"Single-qubit"},
  Y:{label:"Pauli Y",description:"π rotation around Y",arity:1,matrix:"[0 −i; i  0]",group:"Single-qubit"},
  Z:{label:"Pauli Z",description:"Phase flip",arity:1,matrix:"[1  0; 0 −1]",group:"Single-qubit"},
  S:{label:"S phase",description:"π/2 phase rotation",arity:1,matrix:"[1  0; 0  i]",group:"Phase"},
  T:{label:"T phase",description:"π/4 phase rotation",arity:1,matrix:"[1  0; 0  eⁱπ⁄⁴]",group:"Phase"},
  RX:{label:"Rotate X",description:"Parameterized X rotation",arity:1,matrix:"Rx(θ)",group:"Rotation"},
  RY:{label:"Rotate Y",description:"Parameterized Y rotation",arity:1,matrix:"Ry(θ)",group:"Rotation"},
  RZ:{label:"Rotate Z",description:"Parameterized Z rotation",arity:1,matrix:"Rz(θ)",group:"Rotation"},
  CX:{label:"Controlled X",description:"CNOT — entangles two qubits",arity:2,matrix:"control • target ⊕",group:"Controlled"},
  CZ:{label:"Controlled Z",description:"Conditional phase flip",arity:2,matrix:"control • target Z",group:"Controlled"},
  CP:{label:"Controlled phase",description:"Conditional phase rotation",arity:2,matrix:"CP(θ)",group:"Controlled"},
  SWAP:{label:"SWAP",description:"Exchanges two qubit states",arity:2,matrix:"× ─ ×",group:"Controlled"},
  CCX:{label:"Toffoli",description:"Double-controlled NOT",arity:3,matrix:"• • ⊕",group:"Multi-qubit"},
  CSWAP:{label:"Fredkin",description:"Controlled SWAP gate",arity:3,matrix:"• × ×",group:"Multi-qubit"},
};

function singleMatrix(name:GateName,angle=Math.PI/2):Complex[][]{
  const co=Math.cos(angle/2),si=Math.sin(angle/2);
  const matrices:Partial<Record<GateName,Complex[][]>>={
    H:[[c(SQ),c(SQ)],[c(SQ),c(-SQ)]],X:[[c(0),c(1)],[c(1),c(0)]],
    Y:[[c(0),c(0,-1)],[c(0,1),c(0)]],Z:[[c(1),c(0)],[c(0),c(-1)]],
    S:[[c(1),c(0)],[c(0),c(0,1)]],T:[[c(1),c(0)],[c(0),c(SQ,SQ)]],
    RX:[[c(co),c(0,-si)],[c(0,-si),c(co)]],RY:[[c(co),c(-si)],[c(si),c(co)]],
    RZ:[[c(Math.cos(-angle/2),Math.sin(-angle/2)),c(0)],[c(0),c(Math.cos(angle/2),Math.sin(angle/2))]],
  };return matrices[name]!;
}

export function simulate(ops:Operation[],qubits:number){let state=Array.from({length:2**qubits},(_,i)=>c(i===0?1:0));
  for(const op of ops){
    if(gateCatalog[op.name].arity===1){const bit=1<<(qubits-op.targets[0]-1),m=singleMatrix(op.name,op.angle),next=state.map(v=>({...v}));for(let i=0;i<state.length;i++){if(i&bit)continue;const j=i|bit;next[i]=add(mul(m[0][0],state[i]),mul(m[0][1],state[j]));next[j]=add(mul(m[1][0],state[i]),mul(m[1][1],state[j]))}state=next;continue}
    const bits=op.targets.map(q=>1<<(qubits-q-1)),next=state.map(v=>({...v}));
    if(op.name==="CX"){const[control,target]=bits;for(let i=0;i<state.length;i++)if((i&control)&&!(i&target)){const j=i|target;next[i]=state[j];next[j]=state[i]}}
    if(op.name==="CZ"){const[control,target]=bits;for(let i=0;i<state.length;i++)if((i&control)&&(i&target))next[i]=c(-state[i].r,-state[i].i)}
    if(op.name==="CP"){const[control,target]=bits,phase=c(Math.cos(op.angle??Math.PI/2),Math.sin(op.angle??Math.PI/2));for(let i=0;i<state.length;i++)if((i&control)&&(i&target))next[i]=mul(state[i],phase)}
    if(op.name==="SWAP"){const[a,b]=bits;for(let i=0;i<state.length;i++)if(!(i&a)&&(i&b)){const j=(i|a)&~b;next[i]=state[j];next[j]=state[i]}}
    if(op.name==="CCX"){const[a,b,target]=bits;for(let i=0;i<state.length;i++)if((i&a)&&(i&b)&&!(i&target)){const j=i|target;next[i]=state[j];next[j]=state[i]}}
    if(op.name==="CSWAP"){const[control,a,b]=bits;for(let i=0;i<state.length;i++)if((i&control)&&!(i&a)&&(i&b)){const j=(i|a)&~b;next[i]=state[j];next[j]=state[i]}}
    state=next;
  }return state;
}

export function blochVector(state:Complex[],qubit:number,qubits:number){const bit=1<<(qubits-qubit-1);let x=0,y=0,z=0;for(let i=0;i<state.length;i++){const p=state[i].r**2+state[i].i**2;z+=(i&bit)?-p:p;if(!(i&bit)){const j=i|bit,cross=mul(state[i],conj(state[j]));x+=2*cross.r;y+=2*cross.i}}const purity=Math.sqrt(x*x+y*y+z*z);return{x,y,z,purity,theta:Math.acos(Math.max(-1,Math.min(1,z/(purity||1)))),phi:Math.atan2(y,x)}}

export function measure(state:Complex[],qubits:number,shots:number){const ps=state.map(v=>v.r**2+v.i**2),out:Record<string,number>={};for(let n=0;n<shots;n++){let r=Math.random(),i=0;while(r>ps[i]&&i<ps.length-1)r-=ps[i++];const key=i.toString(2).padStart(qubits,"0");out[key]=(out[key]||0)+1}return out}
export const probability=(v:Complex)=>v.r**2+v.i**2;
export const format=(n:number)=>Math.abs(n)<.0005?"0":n.toFixed(3).replace(/0+$/,"").replace(/\.$/,"");

const angleText=(op:Operation)=>op.angle===Math.PI?"pi":op.angle===Math.PI/2?"pi/2":op.angle===Math.PI/4?"pi/4":String(op.angle??Math.PI/2);
export function generateCode(ops:Operation[],qubits:number,framework:"Qiskit"|"Cirq"|"Q#"){
  if(framework==="Qiskit")return `from qiskit import QuantumCircuit\nfrom qiskit_aer import AerSimulator\n\nqc = QuantumCircuit(${qubits}, ${qubits})\n${ops.map(o=>`qc.${o.name.toLowerCase()}(${["RX","RY","RZ","CP"].includes(o.name)?`${angleText(o)}, `:""}${o.targets.join(", ")})`).join("\n")}\nqc.measure(range(${qubits}), range(${qubits}))\n\nsimulator = AerSimulator()\nresult = simulator.run(qc, shots=1024).result()\nprint(result.get_counts())`;
  if(framework==="Cirq")return `import cirq\n\nq = cirq.LineQubit.range(${qubits})\ncircuit = cirq.Circuit(\n${ops.map(o=>`    ${cirqLine(o)},`).join("\n")}\n    cirq.measure(*q, key='result')\n)\nresult = cirq.Simulator().run(circuit, repetitions=1024)\nprint(result.histogram(key='result'))`;
  return `namespace Quantoom {\n  open Microsoft.Quantum.Intrinsic;\n  open Microsoft.Quantum.Measurement;\n  operation Main() : Result[] {\n    use q = Qubit[${qubits}];\n${ops.map(o=>`    ${qsharpLine(o)}`).join("\n")}\n    return MResetEachZ(q);\n  }\n}`;
}
function cirqLine(o:Operation){const t=o.targets.map(q=>`q[${q}]`);if(o.name==="CX")return`cirq.CNOT(${t.join(", ")})`;if(o.name==="CZ")return`cirq.CZ(${t.join(", ")})`;if(o.name==="CP")return`cirq.CZPowGate(exponent=${(o.angle??Math.PI/2)/Math.PI})(${t.join(", ")})`;if(o.name==="CCX")return`cirq.TOFFOLI(${t.join(", ")})`;if(o.name==="CSWAP")return`cirq.FREDKIN(${t.join(", ")})`;if(o.name==="SWAP")return`cirq.SWAP(${t.join(", ")})`;if(["RX","RY","RZ"].includes(o.name))return`cirq.r${o.name[1].toLowerCase()}(${angleText(o)})(${t[0]})`;return`cirq.${o.name}(${t[0]})`}
function qsharpLine(o:Operation){const t=o.targets.map(q=>`q[${q}]`);if(o.name==="CX")return`CNOT(${t.join(", ")});`;if(o.name==="CZ")return`Controlled Z([${t[0]}], ${t[1]});`;if(o.name==="CP")return`Controlled R1([${t[0]}], (${angleText(o)}, ${t[1]}));`;if(o.name==="CCX")return`CCNOT(${t.join(", ")});`;if(o.name==="CSWAP")return`Controlled SWAP([${t[0]}], (${t[1]}, ${t[2]}));`;if(o.name==="SWAP")return`SWAP(${t.join(", ")});`;if(["RX","RY","RZ"].includes(o.name))return`R(Pauli${o.name[1]}, ${angleText(o)}, ${t[0]});`;return`${o.name}(${t[0]});`}

export function parseCode(code:string,framework:"Qiskit"|"Cirq"|"Q#"):Operation[]{const ops:Operation[]=[];const addOp=(name:string,nums:number[],angle?:number)=>{if(name in gateCatalog)ops.push({id:crypto.randomUUID(),name:name as GateName,targets:nums,angle})};
  if(framework==="Qiskit"){for(const match of code.matchAll(/qc\.(h|x|y|z|s|t|rx|ry|rz|cx|cz|cp|swap|ccx|cswap)\(([^)]*)\)/gi)){const name=match[1].toUpperCase(),parts=match[2].split(",").map(x=>x.trim()),rotation=["RX","RY","RZ","CP"].includes(name),angle=rotation?parseAngle(parts.shift()!):undefined;addOp(name,parts.map(Number).filter(Number.isFinite),angle)}}
  else if(framework==="Cirq"){for(const match of code.matchAll(/cirq\.(H|X|Y|Z|S|T|CNOT|CZ|SWAP|TOFFOLI|FREDKIN)\(([^)]*)\)/g)){const map:Record<string,string>={CNOT:"CX",TOFFOLI:"CCX",FREDKIN:"CSWAP"},nums=[...match[2].matchAll(/q\[(\d+)\]/g)].map(m=>+m[1]);addOp(map[match[1]]||match[1],nums)}for(const match of code.matchAll(/cirq\.r([xyz])\(([^)]*)\)\(q\[(\d+)\]\)/g))addOp(`R${match[1].toUpperCase()}`,[+match[3]],parseAngle(match[2]));for(const match of code.matchAll(/cirq\.CZPowGate\(exponent=([^)]*)\)\(([^)]*)\)/g)){const nums=[...match[2].matchAll(/q\[(\d+)\]/g)].map(m=>+m[1]);addOp("CP",nums,Number(match[1])*Math.PI)}}
  else {for(const line of code.split("\n")){let m=line.match(/\b(H|X|Y|Z|S|T|CNOT|CCNOT|SWAP)\(([^)]*)\)/);if(m){const map:Record<string,string>={CNOT:"CX",CCNOT:"CCX"},nums=[...m[2].matchAll(/q\[(\d+)\]/g)].map(v=>+v[1]);addOp(map[m[1]]||m[1],nums);continue}m=line.match(/R\(Pauli([XYZ]),\s*([^,]+),\s*q\[(\d+)\]\)/);if(m){addOp(`R${m[1]}`,[+m[3]],parseAngle(m[2]));continue}m=line.match(/Controlled Z\(\[q\[(\d+)\]\],\s*q\[(\d+)\]\)/);if(m){addOp("CZ",[+m[1],+m[2]]);continue}m=line.match(/Controlled R1\(\[q\[(\d+)\]\],\s*\(([^,]+),\s*q\[(\d+)\]\)\)/);if(m){addOp("CP",[+m[1],+m[3]],parseAngle(m[2]));continue}m=line.match(/Controlled SWAP\(\[q\[(\d+)\]\],\s*\(q\[(\d+)\],\s*q\[(\d+)\]\)\)/);if(m)addOp("CSWAP",[+m[1],+m[2],+m[3]])}}return ops}
function parseAngle(v:string){if(v.includes("pi/4"))return Math.PI/4;if(v.includes("pi/2"))return Math.PI/2;if(v.includes("pi"))return Math.PI;const n=Number(v);return Number.isFinite(n)?n:Math.PI/2}

export const presets:Record<string,{description:string;qubits:number;ops:Omit<Operation,"id">[]}>= {
  "Bell state":{description:"Maximally entangled pair |Φ⁺⟩",qubits:2,ops:[{name:"H",targets:[0]},{name:"CX",targets:[0,1]}]},
  "GHZ state":{description:"Three-qubit entanglement",qubits:3,ops:[{name:"H",targets:[0]},{name:"CX",targets:[0,1]},{name:"CX",targets:[1,2]}]},
  "Grover search":{description:"2-qubit amplitude amplification",qubits:2,ops:[{name:"H",targets:[0]},{name:"H",targets:[1]},{name:"CZ",targets:[0,1]},{name:"H",targets:[0]},{name:"H",targets:[1]},{name:"X",targets:[0]},{name:"X",targets:[1]},{name:"CZ",targets:[0,1]},{name:"X",targets:[0]},{name:"X",targets:[1]},{name:"H",targets:[0]},{name:"H",targets:[1]}]},
  "Toffoli logic":{description:"Reversible AND with CCX",qubits:3,ops:[{name:"X",targets:[0]},{name:"X",targets:[1]},{name:"CCX",targets:[0,1,2]}]},
  "Quantum teleportation":{description:"Entanglement + state transfer core",qubits:3,ops:[{name:"H",targets:[1]},{name:"CX",targets:[1,2]},{name:"H",targets:[0]},{name:"CX",targets:[0,1]},{name:"H",targets:[0]}]},
  "Shor N=15":{description:"Compiled period finding for N=15, a=2",qubits:8,ops:[
    {name:"X",targets:[7]},
    {name:"H",targets:[0]},{name:"H",targets:[1]},{name:"H",targets:[2]},{name:"H",targets:[3]},
    {name:"CSWAP",targets:[0,4,5]},{name:"CSWAP",targets:[0,5,6]},{name:"CSWAP",targets:[0,6,7]},
    {name:"CSWAP",targets:[1,4,5]},{name:"CSWAP",targets:[1,5,6]},{name:"CSWAP",targets:[1,6,7]},
    {name:"CSWAP",targets:[1,4,5]},{name:"CSWAP",targets:[1,5,6]},{name:"CSWAP",targets:[1,6,7]},
    {name:"SWAP",targets:[0,3]},{name:"SWAP",targets:[1,2]},
    {name:"H",targets:[0]},
    {name:"CP",targets:[0,1],angle:-Math.PI/2},{name:"H",targets:[1]},
    {name:"CP",targets:[0,2],angle:-Math.PI/4},{name:"CP",targets:[1,2],angle:-Math.PI/2},{name:"H",targets:[2]},
    {name:"CP",targets:[0,3],angle:-Math.PI/8},{name:"CP",targets:[1,3],angle:-Math.PI/4},{name:"CP",targets:[2,3],angle:-Math.PI/2},{name:"H",targets:[3]}
  ]},
};
