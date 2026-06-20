import React from 'react';
import products from '../data/products';

const FOUNDER_IMAGE = "https://customer-assets.emergentagent.com/job_8eeb0272-cf67-41ff-94cf-bd521a76ca7c/artifacts/j43poiq4_IMG-20260617-WA0027.jpg";

const AboutPage = () => {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-24">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-medium tracking-tight leading-[1.1] mb-12" data-testid="about-title">The Gaura Story</h1>
        
        <div className="space-y-20">
          {/* Meet the Maker */}
          <div data-testid="meet-the-maker">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
              <div className="lg:col-span-3">
                <img
                  src={FOUNDER_IMAGE}
                  alt="Gauri Kamesh — Founder, Gaura Homemade Candles"
                  className="w-full object-contain"
                />
              </div>
              <div className="lg:col-span-2 space-y-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">The Maker</p>
                <h2 className="text-3xl font-heading font-normal">Gauri Kamesh</h2>
                <div className="w-12 h-[2px] bg-[#D4AF37]" />
                <p className="text-base leading-relaxed font-light">
                  Looking for something unique to brighten your home? Our homemade candles are crafted with care, using only the finest ingredients for a soothing and elegant touch.
                </p>
                <p className="text-base leading-relaxed font-light">
                  Whether you're looking to set the mood or gift something special, Gaura candles are perfect for any occasion. Each piece is hand-poured with love.
                </p>
              </div>
            </div>
          </div>

          {/* Where It All Began */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 space-y-6">
              <h2 className="text-3xl font-heading font-normal">Where It All Began</h2>
              <p className="text-base leading-relaxed font-light">
                Gaura Homemade Candles was born from a simple love for natural living and the warm glow of candlelight. What started in a small home kitchen has blossomed into a passion for creating candles that bring peace, warmth, and beauty into people's lives.
              </p>
              <p className="text-base leading-relaxed font-light">
                Every candle tells a story of dedication to craftsmanship, commitment to sustainability, and the belief that the simplest things in life often bring the greatest joy.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src={products[3].image}
                alt="Gaura Signature Candle"
                className="w-full aspect-square object-cover"
              />
            </div>
          </div>

          {/* Values */}
          <div className="bg-[#F0EFE9] p-12">
            <h2 className="text-3xl font-heading font-normal mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <h3 className="text-lg font-heading font-normal text-[#5D6E5E]">100% Natural</h3>
                <p className="text-sm leading-relaxed">
                  We use only pure soy wax, natural essential oils, and eco-friendly materials in every candle.
                </p>
              </div>
              <div className="text-center space-y-3">
                <h3 className="text-lg font-heading font-normal text-[#5D6E5E]">Handcrafted</h3>
                <p className="text-sm leading-relaxed">
                  Each candle is hand-poured in small batches, ensuring quality and attention to detail.
                </p>
              </div>
              <div className="text-center space-y-3">
                <h3 className="text-lg font-heading font-normal text-[#5D6E5E]">Sustainable</h3>
                <p className="text-sm leading-relaxed">
                  We're committed to reducing our environmental impact through recyclable packaging and eco-conscious practices.
                </p>
              </div>
            </div>
          </div>

          {/* Commitment */}
          <div className="space-y-6">
            <h2 className="text-3xl font-heading font-normal">Our Commitment to You</h2>
            <p className="text-base leading-relaxed font-light">
              When you choose Gaura Homemade Candles, you're not just buying a product — you're supporting a small business dedicated to quality, sustainability, and the art of slow living. Each candle is made to order, ensuring freshness and allowing us to minimize waste.
            </p>
            <p className="text-base leading-relaxed font-light">
              We believe in transparency, from sourcing our materials to sharing our process. Our "Recycle Your Jar" initiative encourages customers to return empty containers for a discount on their next purchase, closing the loop on sustainability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
