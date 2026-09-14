import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import GlobalReach from "@/components/GlobalReach";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import RealPeople from "@/components/RealPeople";
import Trust from "@/components/Trust";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      <Hero />
      <Stats />
      <Services />
      <GlobalReach />
      <WhyChooseUs />
      <Process />
      <RealPeople />
      <Trust />
      <Contact />
    </main>
  );
}
