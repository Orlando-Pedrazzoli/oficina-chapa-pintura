import Carousel from '../components/Carousel';
import Hero from '../components/Hero';
import Location from '../components/Location';
import Orcamento from '../components/Orcamento';
import Reviews from '../components/Reviews';

const Homepage = () => {
  return (
    <div className='homepage'>
      <Hero />
      <Carousel />
      <Reviews />
      <Orcamento />
      <Location />
    </div>
  );
};

export default Homepage;
