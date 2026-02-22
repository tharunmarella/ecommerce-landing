import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

const TermsPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen-minus-header-footer py-12">
        <Card className="w-full max-w-4xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Terms & Conditions</CardTitle>
            <CardDescription className="mt-2">
              Please read these terms carefully before using our services.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
              <p>
                Welcome to [Your Company Name]! These Terms and Conditions ("Terms") govern your use of our website,
                products, and services. By accessing or using our services, you agree to be bound by these Terms.
                If you do not agree with any part of these Terms, you must not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, images, and software, is the property
                of [Your Company Name] or its content suppliers and protected by international copyright laws.
                You may not reproduce, distribute, modify, or create derivative works from any content without
                our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. User Accounts</h2>
              <p>
                To access certain features of our services, you may be required to create an account. You are
                responsible for maintaining the confidentiality of your account information and for all activities
                that occur under your account. You agree to notify us immediately of any unauthorized use of your
                account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Prohibited Conduct</h2>
              <p>
                You agree not to use our services for any unlawful purpose or in any way that could harm, disable,
                overburden, or impair the website. Prohibited conduct includes, but is not limited to:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Uploading or transmitting any malicious code or viruses.</li>
                <li>Attempting to gain unauthorized access to our systems or user data.</li>
                <li>Engaging in any activity that disrupts or interferes with our services.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Disclaimer of Warranties</h2>
              <p>
                Our services are provided "as is" and "as available" without any warranties of any kind, either
                express or implied. We do not warrant that our services will be uninterrupted, error-free, or
                secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Limitation of Liability</h2>
              <p>
                In no event shall [Your Company Name] be liable for any indirect, incidental, special, consequential,
                or punitive damages arising out of or in connection with your use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of [Your Country/State],
                without regard to its conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify you of any changes by posting
                the new Terms on this page. Your continued use of our services after any such modifications constitutes
                your acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at support@[yourcompany].com.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TermsPage;