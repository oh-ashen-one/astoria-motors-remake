import React from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { ShoppingTools } from "./components/ShoppingTools";
import { Showcase } from "./components/Showcase";
import { About } from "./components/About";
import { Financing } from "./components/Financing";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <ShoppingTools />
        <Showcase />
        <About />
        <Financing />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default App;
