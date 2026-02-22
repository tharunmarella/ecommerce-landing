import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import Link from 'next/link';

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "CEO & Founder",
    bio: "Alex has over 15 years of experience in the fashion industry and is passionate about sustainable style.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  },
  {
    name: "Sarah Chen",
    role: "Head of Design",
    bio: "Sarah brings a unique perspective to our collections, blending modern trends with timeless elegance.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    name: "Michael Smith",
    role: "Operations Manager",
    bio: "Michael ensures everything runs smoothly, from sourcing high-quality materials to delivery.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
  },
  {
    name: "Emily Davis",
    role: "Customer Success Lead",
    bio: "Emily is dedicated to making sure every LuxeStore customer has an exceptional experience.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
  }
];

const TeamPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Meet Our Team</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our diverse team of experts is dedicated to bringing you the best in fashion and quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-square bg-muted relative">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{member.name}</CardTitle>
                <p className="text-sm font-medium text-primary">{member.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/about">
            <Button variant="outline">Back to About Us</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default TeamPage;
