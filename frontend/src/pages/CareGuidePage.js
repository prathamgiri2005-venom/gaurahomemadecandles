import React from 'react';
import { Leaf, Package, Shield } from 'lucide-react';
import products from '../data/products';

const CareGuidePage = () => {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-medium tracking-tight leading-[1.1] mb-6" data-testid="care-guide-title">Candle Care Guide</h1>
          <p className="text-base md:text-lg leading-relaxed font-light text-muted-foreground max-w-3xl mx-auto">
            Maximize your candle's burn time and fragrance with our expert care tips
          </p>
        </div>

        {/* Image */}
        <div className="mb-16">
          <img
            src={products[2].image}
            alt="Gaura candle burning"
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Care Tips */}
        <div className="space-y-16">
          {/* First Burn */}
          <section className="bg-[#F0EFE9] p-12 rounded-sm">
            <div className="flex items-start space-x-4 mb-6">
              <Leaf className="w-8 h-8 text-[#5D6E5E] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-normal mb-4">The First Burn is Crucial</h2>
                <p className="text-lg leading-relaxed font-light mb-4">
                  The first time you light your candle sets the foundation for all future burns. Allow the entire top surface to melt to the edges of the container (this usually takes 2-4 hours).
                </p>
                <p className="text-lg leading-relaxed font-light">
                  This prevents "tunneling" and ensures an even burn throughout the candle's life. Your patience during the first burn will be rewarded with optimal performance.
                </p>
              </div>
            </div>
          </section>

          {/* Wick Care */}
          <section>
            <h2 className="text-3xl font-normal mb-6">Wick Trimming for Perfect Burns</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-normal text-[#5D6E5E]">Why Trim?</h3>
                <p className="text-base leading-relaxed">
                  Trimming your wick to 1/4 inch before each burn prevents mushrooming, reduces soot, and maintains a clean, steady flame. It also extends your candle's burn time.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-normal text-[#5D6E5E]">How to Trim</h3>
                <p className="text-base leading-relaxed">
                  Use wick trimmers or scissors to carefully snip the wick when the wax is cool and solid. Remove any debris before relighting.
                </p>
              </div>
            </div>
          </section>

          {/* Burn Time */}
          <section className="bg-white p-12 border border-[#5D6E5E]/10">
            <div className="flex items-start space-x-4">
              <Package className="w-8 h-8 text-[#5D6E5E] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-normal mb-4">Optimal Burn Time</h2>
                <p className="text-lg leading-relaxed font-light mb-4">
                  Burn your candle for 2-4 hours at a time for the best results. Burning for less than 2 hours can cause tunneling, while burning for more than 4 hours can overheat the container.
                </p>
                <p className="text-lg leading-relaxed font-light">
                  Allow the wax to cool and solidify completely before relighting. This typically takes 2-3 hours.
                </p>
              </div>
            </div>
          </section>

          {/* Safety */}
          <section>
            <div className="flex items-start space-x-4 mb-6">
              <Shield className="w-8 h-8 text-[#5D6E5E] flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-normal mb-4">Safety First</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-3 list-disc list-inside text-base leading-relaxed">
                <li>Never leave a burning candle unattended</li>
                <li>Keep away from flammable materials</li>
                <li>Place on a stable, heat-resistant surface</li>
                <li>Keep out of reach of children and pets</li>
              </ul>
              <ul className="space-y-3 list-disc list-inside text-base leading-relaxed">
                <li>Avoid drafts and air currents</li>
                <li>Don't move a lit candle</li>
                <li>Extinguish if flame becomes too high</li>
                <li>Stop use when 1/2 inch of wax remains</li>
              </ul>
            </div>
          </section>

          {/* Storage */}
          <section className="bg-[#F0EFE9] p-12 rounded-sm">
            <h2 className="text-3xl font-normal mb-6">Storage & Maintenance</h2>
            <p className="text-lg leading-relaxed font-light mb-4">
              Store your candles in a cool, dry place away from direct sunlight to preserve their color and fragrance. Cover with a lid when not in use to prevent dust accumulation.
            </p>
            <p className="text-lg leading-relaxed font-light">
              If the surface develops "frosting" (white crystallization), this is a natural characteristic of pure soy wax and doesn't affect performance.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CareGuidePage;