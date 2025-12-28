import { HeroSection } from "@/components/hero-section";
import { WelcomeSection } from "@/components/welcome-section";
import ServicesOverview from "@/components/services-overview";
import ProgramsSection from "@/components/programs-section";
import { MissionSection } from "@/components/mission-section";

import { GetInvolvedSection } from "@/components/get-involved-section";

export default function HomePage() {
	return (
		<>
			<HeroSection />
			<WelcomeSection />
			<ServicesOverview />
			<ProgramsSection />
			<MissionSection />

			<GetInvolvedSection />
		</>
	);
}
