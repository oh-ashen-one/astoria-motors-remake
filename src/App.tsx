import React from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Statement } from "./components/Statement";
import { Showcase } from "./components/Showcase";
import { Lot } from "./components/Lot";
import { Financing } from "./components/Financing";
import { Visit } from "./components/Visit";
import { Footer } from "./components/Footer";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Statement />
        <Showcase />
        <Lot />
        <Financing />
        <Visit />
      </main>
      <Footer />
    </>
  );
};

export default App;
