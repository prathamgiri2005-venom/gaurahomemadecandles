import React from 'react';
import { Leaf, Recycle, Heart } from 'lucide-react';

const EcoCommitmentPage = () => {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-medium tracking-tight leading-[1.1] mb-6" data-testid="eco-title">Our Eco Commitment</h1>
          <p className="text-lg md:text-xl leading-relaxed font-light text-muted-foreground max-w-3xl mx-auto">
            Sustainability isn't just a buzzword—it's woven into every aspect of our business
          </p>
        </div>

        <div className="space-y-16">
          <section className="bg-[#F0EFE9] p-12 rounded-sm">
            <div className="flex items-start space-x-4">
              <Leaf className="w-10 h-10 text-[#5D6E5E] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-4xl font-normal mb-6">Natural Ingredients</h2>
                <p className="text-lg leading-relaxed font-light mb-4">
                  We exclusively use 100% natural soy wax derived from soybeans—a renewable, biodegradable resource. Unlike paraffin wax (a petroleum by-product), soy wax burns cleaner, produces less soot, and is better for your health and the environment.
                </p>
                <p className="text-lg leading-relaxed font-light">
                  Our fragrance oils are phthalate-free and our wicks are made from cotton or wood, ensuring a non-toxic burn from start to finish.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-start space-x-4 mb-6">
              <Recycle className="w-10 h-10 text-[#5D6E5E] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-4xl font-normal mb-6">Recycle Your Jar Initiative</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 border border-[#5D6E5E]/10">
                <h3 className="text-2xl font-normal mb-4 text-[#5D6E5E]">How It Works</h3>
                <ol className="list-decimal list-inside space-y-3 text-base leading-relaxed ml-2">
                  <li>Finish your candle and clean the jar with hot soapy water</li>
                  <li>Bring your empty jar to our studio or mail it back</li>
                  <li>Receive 15% off your next purchase as a thank you</li>
                  <li>We'll sanitize and reuse the jar for new candles</li>
                </ol>
              </div>
              <div className="bg-white p-8 border border-[#5D6E5E]/10">
                <h3 className="text-2xl font-normal mb-4 text-[#5D6E5E]">The Impact</h3>
                <p className="text-base leading-relaxed mb-3">
                  Since launching this program, we've:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-2">
                  <li>Diverted 500+ jars from landfills</li>
                  <li>Reduced glass production demand</li>
                  <li>Cut our packaging waste by 30%</li>
                  <li>Built a community of eco-conscious customers</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-[#F0EFE9] p-12 rounded-sm">
            <div className="flex items-start space-x-4">
              <Heart className="w-10 h-10 text-[#5D6E5E] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-4xl font-normal mb-6">Minimal Packaging</h2>
                <p className="text-lg leading-relaxed font-light mb-4">
                  All our packaging materials are either recyclable or biodegradable. We use recycled cardboard boxes, paper padding instead of bubble wrap, and biodegradable packing peanuts made from cornstarch.
                </p>
                <p className="text-lg leading-relaxed font-light">
                  We intentionally avoid excessive packaging and plastic wherever possible, letting the beauty of our candles speak for itself.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-4xl font-normal mb-8 text-center">Our Ongoing Commitments</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-3 p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F0EFE9] mb-4">
                  <Leaf className="w-8 h-8 text-[#5D6E5E]" />
                </div>
                <h3 className="text-xl font-normal text-[#5D6E5E]">Carbon Neutral Shipping</h3>
                <p className="text-base leading-relaxed">
                  We offset 100% of our shipping emissions through verified carbon credit programs.
                </p>
              </div>
              <div className="text-center space-y-3 p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F0EFE9] mb-4">
                  <Recycle className="w-8 h-8 text-[#5D6E5E]" />
                </div>
                <h3 className="text-xl font-normal text-[#5D6E5E]">Zero Waste Goal</h3>
                <p className="text-base leading-relaxed">
                  We're working towards a zero-waste studio by 2026 through composting, recycling, and upcycling.
                </p>
              </div>
              <div className="text-center space-y-3 p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F0EFE9] mb-4">
                  <Heart className="w-8 h-8 text-[#5D6E5E]" />
                </div>
                <h3 className="text-xl font-normal text-[#5D6E5E]">Community Education</h3>
                <p className="text-base leading-relaxed">
                  We host workshops on sustainable living and candle care to spread eco-awareness.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EcoCommitmentPage;