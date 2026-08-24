import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"Quantoom — Interactive Quantum Learning Lab",description:"Μάθε κβαντική υπολογιστική οπτικά: χτίσε κυκλώματα, εξερεύνησε τη σφαίρα Bloch και τρέξε προσομοιώσεις.",icons:{icon:"/favicon.svg"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="el"><body>{children}</body></html>}
