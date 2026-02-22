import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen-minus-header-footer py-12">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">About Us</CardTitle>
            <CardDescription className="text-center mt-2">
              Learn more about our mission, vision, and values.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">Our Story</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Founded in [Year], our company started with a simple idea: to provide high-quality [products/services]
                that make a real difference in people's lives. From humble beginnings, we've grown into a passionate team
                dedicated to innovation and customer satisfaction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
              <p className="text-gray-700 dark:text-gray-300">
                To empower our customers with [specific benefit] through our commitment to excellence, integrity, and
                continuous improvement. We believe in creating lasting value and fostering a community around our brand.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
              <p className="text-gray-700 dark:text-gray-300">
                To be the leading provider of [products/services] globally, recognized for our innovation, quality, and
                unwavering dedication to our customers and the planet.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Meet the Team</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Our diverse team of experts is the heart of our company. We bring together a wealth of experience and a
                shared passion for [industry/values]. Each member plays a crucial role in bringing our vision to life.
              </p>
              <Link href="/team">
                <Button className="mt-4">View Team Members</Button>
              </Link>
            </section>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AboutPage;
