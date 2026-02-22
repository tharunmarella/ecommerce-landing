import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

const ShippingPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen-minus-header-footer py-12">
        <Card className="w-full max-w-3xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Shipping & Returns</CardTitle>
            <CardDescription className="mt-2">
              Detailed information regarding our shipping methods and return policy.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-3">Shipping Information</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  We offer various shipping options to meet your needs. All orders are processed within 1-2 business days.
                  You will receive a confirmation email with tracking information once your order has shipped.
                </p>
                <h3 className="text-xl font-medium">Domestic Shipping (within [Your Country])</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Standard Shipping: 3-7 business days, [Cost]</li>
                  <li>Expedited Shipping: 2-3 business days, [Cost]</li>
                  <li>Overnight Shipping: 1 business day, [Cost]</li>
                </ul>
                <h3 className="text-xl font-medium mt-4">International Shipping</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Standard International: 7-21 business days, [Cost]</li>
                  <li>Expedited International: 3-7 business days, [Cost]</li>
                </ul>
                <p>
                  Please note that international customers are responsible for any customs duties, taxes, or fees
                  imposed by their country of residence.
                </p>
              </div>
            </section>

            <hr className="my-6" />

            <section>
              <h2 className="text-2xl font-semibold mb-3">Return Policy</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  We want you to be completely satisfied with your purchase. If you are not happy for any reason,
                  you may return eligible items within 30 days of delivery for a full refund or exchange.
                </p>
                <h3 className="text-xl font-medium">Eligibility for Returns</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Items must be unused, unwashed, and in their original condition with all tags attached.</li>
                  <li>Original packaging must be intact.</li>
                  <li>Proof of purchase is required.</li>
                </ul>
                <h3 className="text-xl font-medium mt-4">How to Initiate a Return</h3>
                <p>
                  To initiate a return, please contact our customer support team at support@[yourcompany].com with
                  your order number and the reason for your return. We will provide you with instructions and a
                  return shipping label if applicable.
                </p>
                <p>
                  Refunds will be processed within 5-7 business days after we receive and inspect the returned item.
                </p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ShippingPage;