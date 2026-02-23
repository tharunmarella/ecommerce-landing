import * as React from 'react';
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { 
  Loader2, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  const contactDetails = [
    {
      icon: <Mail className="h-5 w-5 text-primary" />,
      title: "Email Us",
      value: "support@example.com",
      description: "Our team usually responds within 24 hours."
    },
    {
      icon: <Phone className="h-5 w-5 text-primary" />,
      title: "Call Us",
      value: "+1 (555) 000-0000",
      description: "Mon-Fri from 9am to 6pm EST."
    },
    {
      icon: <MapPin className="h-5 w-5 text-primary" />,
      title: "Visit Our Studio",
      value: "123 Design Street, NY 10001",
      description: "Come say hi at our New York headquarters."
    }
  ];

  return (
    <Layout>
      <div className="flex flex-col w-full pb-20">
        {/* Header Section */}
        <section className="bg-slate-900 py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Let's Start a <span className="text-primary">Conversation</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
              Have a question about a product, or just want to say hello? Our team is here to help you every step of the way.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white dark:bg-slate-950 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 h-full">
                <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
                
                <div className="space-y-8">
                  {contactDetails.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="mt-1 p-2 bg-primary/10 rounded-lg">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-primary font-medium">{item.value}</p>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-8" />

                <div>
                  <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Follow Us</h3>
                  <div className="flex gap-4">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Instagram className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-none rounded-2xl overflow-hidden">
                <CardHeader className="bg-white dark:bg-slate-950 pb-2">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <MessageSquare className="h-5 w-5" />
                    <span className="text-sm font-bold uppercase tracking-wider">Send a message</span>
                  </div>
                  <CardTitle className="text-3xl font-bold">Get in Touch</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          placeholder="John Doe" 
                          required
                          className="bg-slate-50 dark:bg-slate-900 border-none h-12"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="john@example.com" 
                          required
                          className="bg-slate-50 dark:bg-slate-900 border-none h-12"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input 
                        id="subject" 
                        placeholder="How can we help?" 
                        required
                        className="bg-slate-50 dark:bg-slate-900 border-none h-12"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message</Label>
                      <textarea
                        id="message"
                        required
                        placeholder="Tell us more about your inquiry..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="flex min-h-[160px] w-full rounded-md border-none bg-slate-50 dark:bg-slate-900 px-3 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      ></textarea>
                    </div>

                    <Button type="submit" className="w-full h-12 text-lg rounded-xl transition-all hover:scale-[1.01]" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="max-w-4xl mx-auto px-4 py-24 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Quick answers to common questions about shipping, returns, and order tracking.
            </p>
            <Button variant="outline" size="lg" className="rounded-full px-8">
              View FAQ
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ContactPage;