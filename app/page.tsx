import Hero from '../components/Landing-page/Hero/Hero'
import LabTests from '../components/Landing-page/LabTests/LabTests'
import TestFinder from '../components/Landing-page/LabTests/TestFinder'
import TrustAndTech from '../components/Landing-page/Trust/TrustAndTech'
import Departments from '../components/Landing-page/Departments/Departments'
import PackagesPreview from '../components/Landing-page/PackagesPreview/PackagesPreview'
import InsurancePartners from '../components/Landing-page/Insurance/InsurancePartners'
import NewsInsights from '../components/Landing-page/NewsInsights/NewsInsights'
import ReviewsSection from '../components/Landing-page/Reviews/ReviewsSection'
import ContactCTA from '../components/Landing-page/ContactCTA/ContactCTA'
import Footer from '../components/Landing-page/Footer/Footer'
import { client } from '@/lib/sanity'
import { allPackagesQuery, allLabTestsQuery, homepageResourcesQuery, homepageTestFinderQuery } from '@/lib/queries'

export const revalidate = 60

export default async function Home() {
  const [packages, tests, resources, featuredTests] = await Promise.all([
    client.fetch(allPackagesQuery),
    client.fetch(allLabTestsQuery),
    client.fetch(homepageResourcesQuery),
    client.fetch(homepageTestFinderQuery)
  ])

  return (
    <main>
      <Hero />
      <ContactCTA />
      <LabTests tests={tests} />
      <TestFinder tests={tests} featuredTests={featuredTests} />
      <InsurancePartners />
      <TrustAndTech />
      <Departments />
      <PackagesPreview packages={packages} />
      <ReviewsSection />
      <NewsInsights posts={resources} />
      <Footer />
    </main>
  )
}
