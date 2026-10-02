import type { Metadata } from "next";
import Navbar from "../src/sections/Navbar/navbar";
import Celebration from "../src/components/Pages/Celebration/celebration";
import Footer from "../src/sections/Footer/footer";
import BackToTop from "../src/components/Common/BackToTop/backToTop";

export const metadata: Metadata = {
  title: "Celebrate & Collaboration Launchpad | Harshil Gajjar",
  description:
    "Initiate an enterprise software partnership, custom AI engineering, or full-stack web project with Harshil Gajjar.",
};

export default function CelebratePage() {
  return (
    <>
      <Navbar />
      <Celebration />
      <Footer />
      <BackToTop />
    </>
  );
}
