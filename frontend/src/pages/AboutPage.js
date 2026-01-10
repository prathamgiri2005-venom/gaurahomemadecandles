import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-24">
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight leading-[1.1] mb-12" data-testid="about-title">The Gauri Story</h1>
        
        <div className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1669151432266-cd991ea149ad?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxhcnRpc2FuYWwlMjBjYW5kbGUlMjBtYWtpbmclMjBoYW5kcyUyMHBvdXJpbmclMjB3YXh8ZW58MHx8fHwxNzY4MDQyODQ2fDA&ixlib=rb-4.1.0&q=85"
                alt="Candle making"
                className="w-full h-[500px] object-cover rounded-sm"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-normal">Where It All Began</h2>
              <p className="text-lg leading-relaxed font-light">
                Gauri Homemade Candles was born from a simple love for natural living and the warm glow of candlelight. What started in a small home kitchen has blossomed into a passion for creating candles that bring peace, warmth, and beauty into people's lives.
              </p>
              <p className="text-lg leading-relaxed font-light">
                Every candle tells a story of dedication to craftsmanship, commitment to sustainability, and the belief that the simplest things in life often bring the greatest joy.
              </p>
            </div>
          </div>

          <div className="bg-[#F0EFE9] p-12 rounded-sm">
            <h2 className="text-4xl font-normal mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <h3 className="text-2xl font-normal text-[#5D6E5E]">100% Natural</h3>
                <p className="text-base leading-relaxed">
                  We use only pure soy wax, natural essential oils, and eco-friendly materials in every candle.
                </p>
              </div>
              <div className="text-center space-y-3">
                <h3 className="text-2xl font-normal text-[#5D6E5E]">Handcrafted</h3>
                <p className="text-base leading-relaxed">
                  Each candle is hand-poured in small batches, ensuring quality and attention to detail.
                </p>
              </div>
              <div className="text-center space-y-3">
                <h3 className="text-2xl font-normal text-[#5D6E5E]">Sustainable</h3>
                <p className="text-base leading-relaxed">
                  We're committed to reducing our environmental impact through recyclable packaging and eco-conscious practices.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-normal">Our Commitment to You</h2>
            <p className="text-lg leading-relaxed font-light">
              When you choose Gauri Homemade Candles, you're not just buying a product—you're supporting a small business dedicated to quality, sustainability, and the art of slow living. Each candle is made to order, ensuring freshness and allowing us to minimize waste.
            </p>
            <p className="text-lg leading-relaxed font-light">
              We believe in transparency, from sourcing our materials to sharing our process. Our "Recycle Your Jar" initiative encourages customers to return empty containers for a discount on their next purchase, closing the loop on sustainability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;