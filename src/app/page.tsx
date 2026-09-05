import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import GlobalReach from "@/components/GlobalReach";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import RealPeople from "@/components/RealPeople";
import Trust from "@/components/Trust";
import Cta from "@/components/Cta";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <Stats />
      <Services />
      <GlobalReach />
      <WhyChooseUs />
      <Process />
      <RealPeople />
      <Trust />
      <Cta />
    </main>
  );
}
