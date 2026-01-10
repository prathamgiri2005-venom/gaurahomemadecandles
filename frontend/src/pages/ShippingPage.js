import React from 'react';

const ShippingPage = () => {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-[900px] mx-auto px-6 md:px-12 lg:px-24">
        <h1 className="text-4xl md:text-5xl font-normal tracking-tight mb-12" data-testid="shipping-title">Shipping Policy</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-normal mb-4 text-[#5D6E5E]">Hand-Poured to Order</h2>
            <p className="text-base leading-relaxed">
              All our candles are hand-poured fresh when you order. This ensures you receive the highest quality product with maximum fragrance throw and burn time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-normal mb-4 text-[#5D6E5E]">Processing Time</h2>
            <p className="text-base leading-relaxed mb-3">
              <strong>3-5 Business Days:</strong> Your order will be prepared and shipped within 3-5 business days from the date of purchase.
            </p>
            <p className="text-base leading-relaxed">
              Please note that weekends and holidays are not included in processing time. During peak seasons, processing may take slightly longer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-normal mb-4 text-[#5D6E5E]">Delivery Time</h2>
            <p className="text-base leading-relaxed mb-3">
              Once shipped, delivery typically takes 3-7 business days depending on your location:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
              <li>Metro cities: 3-4 business days</li>
              <li>Other cities: 5-7 business days</li>
              <li>Remote areas: 7-10 business days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-normal mb-4 text-[#5D6E5E]">Shipping Charges</h2>
            <p className="text-base leading-relaxed">
              We offer <strong>FREE SHIPPING</strong> on all orders across India. No minimum order value required!
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-normal mb-4 text-[#5D6E5E]">Order Tracking</h2>
            <p className="text-base leading-relaxed">
              Once your order is shipped, you'll receive a tracking number via email. You can track your order status anytime from your account dashboard.
            </p>
          </section>

          <section className="bg-[#F0EFE9] p-8 rounded-sm">
            <h2 className="text-2xl font-normal mb-4 text-[#5D6E5E]">Important Notes</h2>
            <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
              <li>Orders cannot be modified or cancelled once processing begins</li>
              <li>Please ensure your shipping address is correct before placing an order</li>
              <li>We ship Monday through Friday (excluding holidays)</li>
              <li>During summer months, candles may arrive slightly softened due to heat—this is normal and doesn't affect quality</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;