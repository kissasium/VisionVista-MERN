import './landing.css'
const Slideshow = () => {
  return (
    <div className='main-content'>
      <div className="header">
        <h1 className="title">Vision Vista</h1>
        <p className="Tagline">Capture the Essence of Every Moment ♡ </p>
      </div>
      <div className='overlay'></div>

      <div className="slideshow">
        <div className="slide" style={{ backgroundImage: `url('/Components/Assets/pic1.jpeg')` }}></div>
        <div className="slide" style={{ backgroundImage: `url('/Components/Assets/pic2.jpeg')` }}></div>
        <div className="slide" style={{ backgroundImage: `url('/Components/Assets/pic3.jpeg')` }}></div>
        <div className="slide" style={{ backgroundImage: `url('/Components/Assets/pic4.jpeg')` }}></div>
        <div className="slide" style={{ backgroundImage: `url('/Components/Assets/pic5.jpeg')` }}></div>
        <div className="slide" style={{ backgroundImage: `url('/Components/Assets/pic6.jpeg')` }}></div>
        <div className="slide" style={{ backgroundImage: `url('/Components/Assets/pic7.jpeg')` }}></div>
        <div className="slide" style={{ backgroundImage: `url('/Components/Assets/pic8.jpeg')` }}></div>
        <div className="slide" style={{ backgroundImage: `url('/Components/Assets/pic9.jpeg')` }}></div>
        <div className="slide" style={{ backgroundImage: `url('/Components/Assets/pic10.jpeg')` }}></div>
      </div>

      <footer>
        <p>&copy; 2024 Kissa Zahra&nbsp;&nbsp;&nbsp;&nbsp;Kalsoom Tariq&nbsp;&nbsp;&nbsp;&nbsp;Abtaal Aatif</p>
        <p>All rights reserved.</p>
      </footer>
      
    </div>
  );
}

export default Slideshow;



