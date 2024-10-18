import React from "react";
import Header from "../CustomerLandingPage/Header";
import Hero from "../CustomerLandingPage/Hero";
import About from "../CustomerLandingPage/About";
import Contact from "../CustomerLandingPage/Contact";
import Services from "../CustomerLandingPage/Services";
import Improvements from "../CustomerLandingPage/Improvements";
import SignInSection from "../CustomerLandingPage/SignInSection";
//import CustomerLogin from "./CustomerLogin";

const TestLogin = () => {
  return (
    <>
      <Header />

      <div className="overflow-x-hidden text-neutral-300 antialiased lg:mt-[100px] selection:Gg-cyan-300 selection:text-cyan-900">
        <div className="fixed top-0 -z-10 h-full w-full">
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        </div>

        <div className="container mx-auto px-8">
          <Hero />
          <About />
          <Services />
          <Improvements />
          <SignInSection />
          <Contact />
        </div>
      </div>
    </>
  );
};

export default TestLogin;
