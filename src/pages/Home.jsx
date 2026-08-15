import Hero from '../sections/home/Hero'
import WhyTrustUs from '../sections/home/WhyTrustUs'
import OurServices from '../sections/home/OurServices'
import OurProducts from '../sections/home/OurProducts'
import AboutUs from '../sections/home/AboutUs'
import Experts from '../sections/home/Experts'
import Reviews from '../sections/home/Reviews'
import ServicesInDetail from '../sections/home/ServicesInDetail'
import Awards from '../sections/home/Awards'
import Gallery from '../sections/home/Gallery'
import Videos from '../sections/home/Videos'
import FAQ from '../sections/home/FAQ'

export default function Home() {
  return (
    <>
      <Hero />
      <WhyTrustUs />
      <OurServices />
      <OurProducts />
      <AboutUs />
      <Experts />
      <Awards />
      <Gallery />
      <Reviews />
      <ServicesInDetail />
      <Videos />
      <FAQ />
    </>
  )
}
