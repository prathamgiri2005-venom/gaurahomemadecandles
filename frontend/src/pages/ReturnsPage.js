import React from 'react';

const ReturnsPage = () => {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-[900px] mx-auto px-6 md:px-12 lg:px-24">
        <h1 className="text-4xl md:text-5xl font-normal tracking-tight mb-12" data-testid="returns-title">Returns & Refund Policy</h1>
        
        <div className="space-y-8">
          <section className="bg-[#F0EFE9] p-8 rounded-sm">
            <h2 className="text-2xl font-normal mb-4 text-[#5D6E5E]">Our Guarantee</h2>
            <p className="text-base leading-relaxed">
              Your satisfaction is our priority. We stand behind the quality of our hand-poured candles and want you to love every purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-normal mb-4 text-[#5D6E5E]">Damage Claims</h2>
            <p className="text-base leading-relaxed mb-3">
              <strong>MANDATORY UNBOXING VIDEO REQUIRED</strong>
            </p>
            <p className="text-base leading-relaxed mb-3">
              If your candles arrive damaged, you must record an unboxing video from the moment you receive the package. Claims without video evidence cannot be processed.
            </p>
            <p className="text-base leading-relaxed">
              <strong>Timeline:</strong> Damage claims must be reported within 24 hours of delivery.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-normal mb-4 text-[#5D6E5E]">How to File a Claim</h2>
            <ol className="list-decimal list-inside space-y-3 text-base leading-relaxed ml-4">
              <li>Email us at support@gaurihomemadecandles.com with your order number</li>
              <li>Attach your unboxing video and clear photos of the damage</li>
              <li>Our team will review and respond within 48 hours</li>
              <li>Approved claims will receive a replacement or full refund</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-normal mb-4 text-[#5D6E5E]">Returns</h2>
            <p className="text-base leading-relaxed mb-3">
              Due to the handmade and custom nature of our candles, we do not accept returns or exchanges unless the product is damaged or defective.
            </p>
            <p className="text-base leading-relaxed">
              <strong>Non-returnable conditions:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4 mt-3">
              <li>Change of mind or fragrance preference</li>
              <li>Candles that have been lit or used</li>
              <li>Orders older than 24 hours without video evidence</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-normal mb-4 text-[#5D6E5E]">Refund Process</h2>
            <p className="text-base leading-relaxed mb-3">
              Approved refunds will be processed within 5-7 business days to your original payment method.
            </p>
            <p className="text-base leading-relaxed">
              <strong>Note:</strong> Shipping charges are non-refundable unless the damage was caused during transit.
            </p>
          </section>

          <section className="bg-[#F0EFE9] p-8 rounded-sm">
            <h2 className="text-2xl font-normal mb-4 text-[#5D6E5E]">Quality Issues</h2>
            <p className="text-base leading-relaxed mb-3">
              If you experience any quality issues (tunneling, poor burn, weak scent throw), please contact us with photos. We'll work with you to resolve the issue, which may include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
              <li>Troubleshooting and care tips</li>
              <li>Partial refund or store credit</li>
              <li>Replacement product (case by case basis)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-normal mb-4 text-[#5D6E5E]">Contact Us</h2>
            <p className="text-base leading-relaxed">
              For any questions about our returns policy, please email us at <strong>support@gaurihomemadecandles.com</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;