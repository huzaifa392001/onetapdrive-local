import Fonts from "@/Components/Fonts/Fonts";
import HomeWrapper from "@/Components/FrontComponents/HomeWrapper/HomeWrapper";
import MainWrapper from "@/Components/MainWrapper/MainWrapper";
import "@/app/global.scss"
import Head from "next/head";

export const metadata = {
  title: "Rent a Car in UAE with OnetapDrive - Easy & Affordable",
  description: "Rent a car in UAE effortlessly with OnetapDrive. Experience affordable rates and convenient service for all your travel needs in the United Arab Emirates.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        
      </Head>
      <body>
        <Fonts />
        <MainWrapper>
          <HomeWrapper>
            {children}
          </HomeWrapper>
        </MainWrapper>
      </body>
    </html>
  );
}
