"use client"

import { usePortfolioData } from "@/hooks/usePortfolioData"
import Header from "@/components/Header"
import LoadingScreen from "@/components/LoadingScreen"
import HeroSection from "@/components/sections/HeroSection"
import OctoMindBanner from "@/components/sections/OctoMindBanner"
import RepositoryStatus from "@/components/sections/RepositoryStatus"
import ChallengesSection from "@/components/sections/ChallengesSection"
import ProjectsSection from "@/components/sections/ProjectsSection"
import LanguagesSection from "@/components/sections/LanguagesSection"
import SkillsSection from "@/components/sections/SkillsSection"
import OctoMindSection from "@/components/sections/OctoMindSection"
import ContactSection from "@/components/sections/ContactSection"
import Footer from "@/components/Footer"

export default function Portfolio() {
  const { repos, loading, error, authStatus, diagnosticInfo } = usePortfolioData()
  const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "meuphilim"

  if (loading) {
    return <LoadingScreen diagnosticInfo={diagnosticInfo} />
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header username={GITHUB_USERNAME} />

      <main>
        <HeroSection username={GITHUB_USERNAME} />
        <OctoMindBanner repos={repos} username={GITHUB_USERNAME} />
        <ChallengesSection />
        <RepositoryStatus repos={repos} authStatus={authStatus} diagnosticInfo={diagnosticInfo} />
        <ProjectsSection repos={repos} username={GITHUB_USERNAME} />
        <LanguagesSection repos={repos} />
        {/* <SkillsSection /> */}
        <OctoMindSection authStatus={authStatus} repoCount={repos.length} />
        <ContactSection username={GITHUB_USERNAME} />
      </main>

      <Footer username={GITHUB_USERNAME} />
    </div>
  )
}
