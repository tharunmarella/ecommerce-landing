import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

const faqItems = [
  {
    question: 'What is your return policy?',
    answer: 'You can return most items within 30 days of purchase for a full refund. Some exclusions apply, please check our terms and conditions for more details.',
  },
  {
    question: 'How do I track my order?',
    answer: 'Once your order has shipped, you will receive an email with a tracking number. You can use this number to track your order on the carrier\'s website.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we offer international shipping to many countries. Shipping costs and delivery times vary depending on the destination.',
  },
  {
    question: 'How can I contact customer support?',
    answer: 'You can reach our customer support team via email at support@[yourcompany].com or by phone at [your-phone-number]. Our support hours are Monday-Friday, 9 AM - 5 PM EST.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.',
  },
];

const FaqPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen-minus-header-footer py-12">
        <Card className="w-full max-w-3xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Frequently Asked Questions</CardTitle>
            <CardDescription className="mt-2">
              Find answers to the most common questions about our products and services.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {faqItems.map((item, index) => (
              <Card key={index} className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default FaqPage;