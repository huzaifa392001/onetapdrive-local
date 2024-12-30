"use client";
import localFont from "next/font/local";
import { Manrope } from "next/font/google"
import { useEffect } from "react";
const poppins = localFont({
    src: [
        {
            path: "./fonts/Poppins-Bold.ttf",
            weight: "700",
        },
        {
            path: "./fonts/Poppins-Medium.ttf",
            weight: "500",
        },
        {
            path: "./fonts/Poppins-Regular.ttf",
            weight: "400",
        },
        {
            path: "./fonts/Poppins-SemiBold.ttf",
            weight: "600",
        },
    ],
});

const montserrat = localFont({
    src: [
        {
            path: "./fonts/Montserrat-Medium.ttf",
            weight: "500",
        },
        {
            path: "./fonts/Montserrat-SemiBold.ttf",
            weight: "600",
        },
        {
            path: "./fonts/Montserrat-Bold.ttf",
            weight: "700",
        },
        {
            path: "./fonts/Montserrat-Black.ttf",
            weight: "900",
        },
        {
            path: "./fonts/Montserrat-ExtraBold.ttf",
            weight: "800",
        },
    ],
});

const manrope = Manrope({
    subsets: ['latin', 'latin-ext'], // Specify the subsets you want to preload
});

export default function Fonts() {

    return (
        <style jsx global>{`
      html,
      body {
        font-family: ${poppins.style.fontFamily}, sans-serif;
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
