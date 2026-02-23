import * as React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { 
  Users, 
  Target, 
  Lightbulb, 
  ShieldCheck, 
  Globe, 
  TrendingUp, 
  ArrowRight,
  Heart,
  Award,
  Zap
} from 'lucide-react';
import Link from 'next/link';

const AboutPage = () => {
  const values = [
    {
      icon: <Target className="h-6 w-6 text-primary" />,
      title: "Our Mission",
      description: "To empower our customers by providing premium quality products that enhance their lifestyle."
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-primary" />,
      title: "Our Vision",
      description: "To become the global leader in sustainable e-commerce and environmental responsibility."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: "Quality First",
      description: "Every item in our catalog is rigorously tested to meet our high standards."
    },
    {
      icon: <Heart className="h-6 w-6 text-primary" />,
      title: "Customer Obsessed",
      description: "Your satisfaction is our priority. Our team is always ready to go the extra mile."
    }
  ];

  const stats = [
    { label: "Happy Customers", value: "50K+" },
    { label: "Products Sold", value: "120K+" },
    { label: "Global Offices", value: "5" },
    { label: "Years of Excellence", value: "10+" }
  ];

  return (
    <Layout>
      <div className="flex flex-col w-full pb-20 overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative h-[500px] flex items-center justify-center bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <Badge className="mb-6 px-4 py-1 text-sm font-semibold uppercase tracking-wider" variant="outline">
              Our Journey Since 2014
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight">
              Crafting <span className="text-primary italic">Better</span> Experiences
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              We started with a simple goal: to create a shopping experience that combines quality, sustainability, and unparalleled service.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link href="/shop">
                <Button size="lg" className="rounded-full px-10 h-14 text-lg font-medium shadow-lg shadow-primary/20">
                  Explore Products
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="rounded-full px-10 h-14 text-lg font-medium bg-white/5 text-white border-white/30 backdrop-blur-sm hover:bg-white/20 transition-all">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Brand Philosophy Section */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="w-full max-w-md mx-auto lg:mx-0">
                <AspectRatio ratio={4 / 5} className="rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80" 
                    alt="Team Collaboration" 
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
                <div className="absolute -bottom-10 -right-4 p-8 bg-card border shadow-xl rounded-2xl max-w-[280px] hidden md:block z-20">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="h-8 w-8 text-primary" />
                    <span className="font-bold text-lg">Award Winning</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Recognized for excellence in sustainable design and customer experience three years in a row.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8">
              <div className="space-y-4">
                <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm">Our Philosophy</h2>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                  Why We Do What We Do
                </h3>
              </div>
              <p className="text-muted-foreground text-xl leading-relaxed">
                We believe that the products you use every day should be beautiful, functional, and responsibly made. Our journey began in a small workshop with a single mission: to cut out the middlemen and bring premium goods directly to you.
              </p>
              <div className="grid grid-cols-2 gap-10 py-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <span className="font-bold">Fast Innovation</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Always staying ahead with the latest trends and tech.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    <span className="font-bold">Global Reach</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Connecting quality with customers worldwide.</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-4xl font-black text-primary">10y+</p>
                  <p className="text-sm font-medium uppercase tracking-tighter text-muted-foreground">Experience</p>
                </div>
                <div className="h-10 w-[1px] bg-border" />
                <div>
                  <p className="text-4xl font-black text-primary">50+</p>
                  <p className="text-sm font-medium uppercase tracking-tighter text-muted-foreground">Countries</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section - Dark */}
        <section className="bg-slate-950 text-white py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-3 group">
                  <div className="text-5xl md:text-6xl font-black text-primary group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-slate-400 font-medium tracking-widest uppercase text-xs">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values Grid */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
              <Badge variant="secondary" className="px-4 py-1">Our DNA</Badge>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Built on Core Principles</h3>
              <p className="text-muted-foreground text-xl leading-relaxed">
                Everything we build and every product we ship is guided by these four foundational values.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, i) => (
                <Card key={i} className="group border-none shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-background overflow-hidden">
                  <div className="h-2 w-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader className="pb-4">
                    <div className="mb-6 p-4 bg-primary/10 w-fit rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      {value.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold">{value.title}</CardTitle>
                    <CardDescription className="text-base pt-2">
                      {value.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center text-primary font-semibold text-sm cursor-pointer group/link">
                      Learn More 
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="relative rounded-[3rem] overflow-hidden bg-primary px-8 py-20 md:py-32 text-center text-primary-foreground">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
              <div className="flex flex-wrap gap-10 justify-center p-10">
                {Array.from({length: 20}).map((_, i) => (
                  <Users key={i} className="h-12 w-12" />
                ))}
              </div>
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-10">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                Ready to join our community?
              </h2>
              <p className="text-xl md:text-2xl opacity-90 leading-relaxed font-light">
                Discover why over 50,000 customers trust us for their daily essentials. Join us on our mission to redefine modern shopping.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/team">
                  <Button size="lg" variant="secondary" className="h-16 px-10 rounded-full text-lg font-bold group">
                    Meet Our Team
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button size="lg" variant="outline" className="h-16 px-10 rounded-full text-lg font-bold bg-white/10 border-white/40 hover:bg-white/20">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;