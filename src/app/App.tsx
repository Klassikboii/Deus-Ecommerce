import { useState } from 'react';
import { LandingPage } from '@/app/components/LandingPage';
import { PricingSection } from '@/app/components/PricingSection';
import { ClientDashboard } from '@/app/components/ClientDashboard';
import { CreateWebsiteFlow } from '@/app/components/CreateWebsiteFlow';
import { StorefrontPreview } from '@/app/components/StorefrontPreview';
import { WebsiteManagement } from '@/app/components/WebsiteManagement';
import { 
  mockSubscriptionPlans, 
  mockWebsiteTemplates, 
  mockClient,
  mockWebsites,
  mockProducts,
  mockCategories,
  mockOrders
} from '@/data/mockData';
import type { Website, Product } from '@/types';
import { Toaster } from '@/app/components/ui/sonner';
import { toast } from 'sonner';

type View = 
  | { type: 'landing' }
  | { type: 'pricing' }
  | { type: 'dashboard' }
  | { type: 'create-website' }
  | { type: 'preview-website'; websiteId: string }
  | { type: 'manage-website'; websiteId: string };

export default function App() {
  const [currentView, setCurrentView] = useState<View>({ type: 'landing' });
  const [websites, setWebsites] = useState<Website[]>(mockWebsites);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleGetStarted = () => {
    setCurrentView({ type: 'pricing' });
  };

  const handleSelectPlan = (planId: string) => {
    const plan = mockSubscriptionPlans.find(p => p.plan_id === planId);
    if (plan) {
      toast.success(`Paket ${plan.plan_name} berhasil dipilih!`, {
        description: plan.price === 0 
          ? 'Anda mendapatkan free trial 14 hari' 
          : `Langganan bulanan: ${new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0
            }).format(plan.price)}`
      });
      setIsAuthenticated(true);
      setCurrentView({ type: 'dashboard' });
    }
  };

  const handleCreateWebsite = () => {
    setCurrentView({ type: 'create-website' });
  };

  const handleWebsiteCreated = (website: Website) => {
    setWebsites(prev => [...prev, website]);
    toast.success('Website berhasil dibuat!', {
      description: `${website.site_name} siap untuk dikustomisasi`
    });
    setCurrentView({ type: 'dashboard' });
  };

  const handleViewWebsite = (websiteId: string) => {
    setCurrentView({ type: 'preview-website', websiteId });
  };

  const handleManageWebsite = (websiteId: string) => {
    setCurrentView({ type: 'manage-website', websiteId });
  };

  const handleBackToDashboard = () => {
    setCurrentView({ type: 'dashboard' });
  };

  const renderView = () => {
    switch (currentView.type) {
      case 'landing':
        return <LandingPage onGetStarted={handleGetStarted} />;
      
      case 'pricing':
        return (
          <div className="min-h-screen bg-gray-50">
            <nav className="border-b bg-white">
              <div className="max-w-7xl mx-auto px-4 py-4">
                <button 
                  onClick={() => setCurrentView({ type: 'landing' })}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Kembali
                </button>
              </div>
            </nav>
            <PricingSection 
              plans={mockSubscriptionPlans} 
              onSelectPlan={handleSelectPlan}
            />
          </div>
        );
      
      case 'dashboard':
        return (
          <div className="min-h-screen bg-gray-50">
            <nav className="border-b bg-white">
              <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">WebCommerce Platform</span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsAuthenticated(false);
                      setCurrentView({ type: 'landing' });
                    }}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </nav>
            <div className="max-w-7xl mx-auto px-4">
              <ClientDashboard 
                client={mockClient}
                websites={websites}
                orders={mockOrders}
                products={products}
                onCreateWebsite={handleCreateWebsite}
                onViewWebsite={handleViewWebsite}
                onManageWebsite={handleManageWebsite}
              />
            </div>
          </div>
        );
      
      case 'create-website':
        return (
          <div className="min-h-screen bg-gray-50">
            <nav className="border-b bg-white">
              <div className="max-w-7xl mx-auto px-4 py-4">
                <span className="text-xl">Buat Website Baru</span>
              </div>
            </nav>
            <div className="max-w-7xl mx-auto px-4">
              <CreateWebsiteFlow 
                templates={mockWebsiteTemplates}
                onComplete={handleWebsiteCreated}
                onCancel={handleBackToDashboard}
              />
            </div>
          </div>
        );
      
      case 'preview-website':
        const website = websites.find(w => w.website_id === currentView.websiteId);
        if (!website) {
          return <div>Website not found</div>;
        }
        return (
          <StorefrontPreview 
            website={website}
            products={products.filter(p => p.website_id === website.website_id)}
            categories={mockCategories.filter(c => c.website_id === website.website_id)}
            onBack={handleBackToDashboard}
          />
        );
      
      case 'manage-website':
        const manageWebsite = websites.find(w => w.website_id === currentView.websiteId);
        if (!manageWebsite) {
          return <div>Website not found</div>;
        }
        return (
          <WebsiteManagement 
            website={manageWebsite}
            products={products}
            categories={mockCategories.filter(c => c.website_id === manageWebsite.website_id)}
            orders={mockOrders}
            onBack={handleBackToDashboard}
            onPreview={() => handleViewWebsite(currentView.websiteId)}
            onWebsiteUpdate={(updatedWebsite) => {
              setWebsites(prev => prev.map(w => 
                w.website_id === updatedWebsite.website_id ? updatedWebsite : w
              ));
            }}
            onProductsChange={setProducts}
          />
        );
      
      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <>
      {renderView()}
      <Toaster richColors position="top-right" />
    </>
  );
}