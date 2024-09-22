import React from 'react'

const Home = () => {
  const headerStyle = {
    backgroundColor: '#4CAF50',
    padding: '20px',
    textAlign: 'center',
    color: 'white',
  };

  const titleStyle = {
    fontSize: '3rem',
    margin: '0',
    fontWeight: 'bold',
  };

  const subtitleStyle = {
    fontSize: '1.5rem',
    marginTop: '10px',
  };

  const sectionStyle = {
    padding: '50px 0',
    textAlign: 'center',
  };

  const productCardStyle = {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '15px',
    margin: '10px',
    textAlign: 'center',
    width: '300px',
  };

  const cardContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#ff5722',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const testimonialCardStyle = {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '15px',
    margin: '10px',
    textAlign: 'center',
    width: '200px',
  };

  const celebsCardStyle = {
    width: '150px',
    margin: '10px',
  };

  const imageStyle = {
    width: '100%',
    borderRadius: '10px',
  };

  return (
    <div>
      {/* Header Section */}
      <header style={headerStyle}>
        <h1 style={titleStyle}>Plan a Plant</h1>
        <p style={subtitleStyle}>We sell stories - Not sell products</p>
      </header>

      {/* Best Selling Products Section */}
      <section style={sectionStyle}>
        <h2>Best Selling</h2>
        <div style={cardContainerStyle}>
          <div style={productCardStyle}>
            <img src="indoor-plants.jpg" alt="Indoor Plants" style={imageStyle} />
            <h3>Indoor Plants</h3>
            <button style={buttonStyle}>Shop Now</button>
          </div>
          <div style={productCardStyle}>
            <img src="air-purifying-plants.jpg" alt="Air Purifying Plants" style={imageStyle} />
            <h3>Air Purifying Plants</h3>
            <button style={buttonStyle}>Shop Now</button>
          </div>
          <div style={productCardStyle}>
            <img src="flowering-plants.jpg" alt="Flowering Plants" style={imageStyle} />
            <h3>Flowering Plants</h3>
            <button style={buttonStyle}>Shop Now</button>
          </div>
        </div>
      </section>

      {/* Trending Plants Section */}
      <section style={sectionStyle}>
        <h2>Trending Plants</h2>
        <div style={cardContainerStyle}>
          <div style={productCardStyle}>
            <img src="jade-terrarium.jpg" alt="Jade Terrarium" style={imageStyle} />
            <h3>Jade Terrarium</h3>
            <p>$350</p>
            <button style={buttonStyle}>Buy</button>
          </div>
          <div style={productCardStyle}>
            <img src="ficus-benjamina.jpg" alt="Ficus Benjamina" style={imageStyle} />
            <h3>Ficus Benjamina</h3>
            <p>$350</p>
            <button style={buttonStyle}>Buy</button>
          </div>
          <div style={productCardStyle}>
            <img src="syngonium-plant.jpg" alt="Syngonium Plant" style={imageStyle} />
            <h3>Syngonium Plant</h3>
            <p>$350</p>
            <button style={buttonStyle}>Buy</button>
          </div>
        </div>
      </section>

      {/* Personality-based Consultation Section */}
      <section style={sectionStyle}>
        <h2>Personality-based Plant Selection Consultation</h2>
        <p>We provide personalized plant recommendations based on your personality, space, and preferences.</p>
        <button style={buttonStyle}>Order Now</button>
      </section>

      {/* Testimonials Section */}
      <section style={sectionStyle}>
        <h2>What Our Customers Say</h2>
        <div style={cardContainerStyle}>
          <div style={testimonialCardStyle}>
            <img src="yasuo.jpg" alt="Yasuo" style={imageStyle} />
            <h4>Yasuo</h4>
            <p>Lorem ipsum is the best way to go to the point where...</p>
          </div>
          <div style={testimonialCardStyle}>
            <img src="rell.jpg" alt="Rell" style={imageStyle} />
            <h4>Rell</h4>
            <p>Lorem ipsum is the best way to go to the point where...</p>
          </div>
          <div style={testimonialCardStyle}>
            <img src="taliyah.jpg" alt="Taliyah" style={imageStyle} />
            <h4>Taliyah</h4>
            <p>Lorem ipsum is the best way to go to the point where...</p>
          </div>
        </div>
      </section>

      {/* Celebs You Love Section */}
      <section style={sectionStyle}>
        <h2>Celebs You Love, Love Us</h2>
        <div style={cardContainerStyle}>
          <div style={celebsCardStyle}>
            <img src="celeb1.jpg" alt="Celeb 1" style={imageStyle} />
          </div>
          <div style={celebsCardStyle}>
            <img src="celeb2.jpg" alt="Celeb 2" style={imageStyle} />
          </div>
          <div style={celebsCardStyle}>
            <img src="celeb3.jpg" alt="Celeb 3" style={imageStyle} />
          </div>
          <div style={celebsCardStyle}>
            <img src="celeb4.jpg" alt="Celeb 4" style={imageStyle} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home