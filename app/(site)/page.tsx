import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { WelcomeSection } from "@/components/welcome-section";
import ServicesOverview from "@/components/services-overview";
import ProgramsSection from "@/components/programs-section";
import { MissionSection } from "@/components/mission-section";

import { GetInvolvedSection } from "@/components/get-involved-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
	return (
		<div className="min-h-screen">
			<Header />
			<main>
				<HeroSection />
				<WelcomeSection />
				<ServicesOverview />
				<ProgramsSection />
				<MissionSection />

				<GetInvolvedSection />
			</main>
			<Footer />
		</div>
	);
}
