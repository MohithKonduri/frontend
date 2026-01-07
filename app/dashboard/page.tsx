import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"

export default function Dashboard() {
    return (
        <main className="flex flex-col min-h-screen">
            <Header />
            <HeroSection />
            <Footer />
        </main>
    )
}
