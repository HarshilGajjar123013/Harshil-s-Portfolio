import type { Metadata } from "next";
import Navbar from "../src/sections/Navbar/navbar";
import Contact from "../src/components/Pages/Contact/contact";
import Footer from "../src/sections/Footer/footer";
import BackToTop from "../src/components/Common/BackToTop/backToTop";

export const metadata: Metadata = {
  title: "Contact Me | Harshil Gajjar",
  description:
    "Get in touch with Harshil Gajjar for full-stack development, AI engineering, or technical collaboration inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "clamp(4.5rem, 8vh, 6.5rem)" }}>
        <Contact />
      </div>
      <Footer />
      <BackToTop />
    </>
  );
}
