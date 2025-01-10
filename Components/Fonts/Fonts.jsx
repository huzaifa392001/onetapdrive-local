"use client";
import { Poppins, Manrope } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin", "latin-ext"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap", // Optional: Improves font rendering
});

const manrope = Manrope({
    subsets: ["latin", "latin-ext"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap", // Optional: Improves font rendering
});

export default function Fonts() {
    return (
        <style jsx global>{`
            html,
            body {
                font-family: ${poppins.style.fontFamily}, sans-serif;
            }
            p {
                font-family: ${poppins.style.fontFamily}, sans-serif;
                font-weight: 300; /* Regular */
            }
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
                font-family: ${manrope.style.fontFamily}, sans-serif;
            }
        `}</style>
    );
}
