import Preloader from "./src/sections/Preloader/priloader";
import Navbar from "./src/sections/Navbar/navbar";
import Home from "./src/components/Pages/Home/home";
import Story from "./src/components/Pages/Story/story";
import Education from "./src/components/Pages/Education/education";
import Skills from "./src/components/Pages/Skills/skills";
import Projects from "./src/components/Pages/Projects/projects";
import Contact from "./src/components/Pages/Contact/contact";
import Footer from "./src/sections/Footer/footer";
import BackToTop from "./src/components/Common/BackToTop/backToTop";

export default function Page() {
  return (
    <main>
      <Preloader />
      <Navbar />
      <Home />
      <Story />
      <Education />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  );
}

