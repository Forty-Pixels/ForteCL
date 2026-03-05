import Hero from '../components/Landing-page/Hero/Hero'
import Stats from '../components/Landing-page/Stats/Stats'
import LabTests from '../components/Landing-page/LabTests/LabTests'
import TrustAndTech from '../components/Landing-page/Trust/TrustAndTech'
import Departments from '../components/Landing-page/Departments/Departments'
import NewsInsights from '../components/Landing-page/NewsInsights/NewsInsights'
import Footer from '../components/Landing-page/Footer/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <LabTests />
      <TrustAndTech />
      <Departments />
      <NewsInsights />
      <Footer />
    </main>
  )
}
