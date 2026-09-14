import React from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ValueStrip } from "./components/ValueStrip";
import { Showcase } from "./components/Showcase";
import { Steps } from "./components/Steps";
import { About } from "./components/About";
import { Financing } from "./components/Financing";
import { Visit } from "./components/Visit";
import { Footer } from "./components/Footer";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ValueStrip />
        <Showcase />
        <Steps />
        <About />
        <Financing />
        <Visit />
      </main>
      <Footer />
    </>
  );
};

export default App;
