import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/header";
import NewsHome from "@/components/news/NewsHome";

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="relative">
        <NewsHome />
      </main>

      <Footer />
    </>
  );
}
