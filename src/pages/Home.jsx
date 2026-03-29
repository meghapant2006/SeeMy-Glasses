import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import Categories from '../components/Categories';
import Promotions from '../components/Promotions';
import NewArrivals from '../components/NewArrivals';
import SecondaryBanner from '../components/SecondaryBanner';

function Home() {
  return (
    <div className="home-page">
      <Hero />
      <TrustStrip />
      <Categories />
      <Promotions />
      <NewArrivals />
      <SecondaryBanner />
    </div>
  );
}

export default Home;
