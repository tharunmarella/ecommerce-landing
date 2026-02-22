import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DebugImage from '@/components/DebugImage';

export default function DebugPage() {
  const testUrls = [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=800&q=80',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Image Debug Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testUrls.map((url, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Test Image {index + 1}</h3>
              <DebugImage
                src={url}
                alt={`Test image ${index + 1}`}
                className="w-full h-64 object-cover rounded"
              />
              <div className="mt-4 text-xs text-muted-foreground font-mono break-all">
                {url}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">URL Encoding Test</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Original URL:</strong></p>
            <code className="block bg-muted p-2 rounded break-all">
              https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80
            </code>
            <p><strong>HTML Encoded:</strong></p>
            <code className="block bg-muted p-2 rounded break-all">
              https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&amp;fit=crop&amp;w=800&amp;q=80
            </code>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}