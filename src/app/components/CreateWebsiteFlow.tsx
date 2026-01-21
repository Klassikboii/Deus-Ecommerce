import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { TemplateGallery } from './TemplateGallery';
import type { WebsiteTemplate, Website } from '@/types';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CreateWebsiteFlowProps {
  templates: WebsiteTemplate[];
  onComplete: (website: Website) => void;
  onCancel: () => void;
}

export function CreateWebsiteFlow({ templates, onComplete, onCancel }: CreateWebsiteFlowProps) {
  const [step, setStep] = useState<'template' | 'details'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [siteName, setSiteName] = useState('');
  const [domain, setDomain] = useState('');

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setStep('details');
  };

  const handleCreate = () => {
    const newWebsite: Website = {
      website_id: `web-${Date.now()}`,
      client_id: 'client-1',
      template_id: selectedTemplate,
      domain: domain || `${siteName.toLowerCase().replace(/\s+/g, '-')}.mystore.id`,
      site_name: siteName,
      status: 'draft',
    };
    onComplete(newWebsite);
  };

  const selectedTemplateData = templates.find(t => t.template_id === selectedTemplate);

  return (
    <div className="py-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center gap-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'template' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
            }`}>
              1
            </div>
            <span className={step === 'template' ? 'font-medium' : 'text-gray-600'}>
              Pilih Template
            </span>
          </div>
          <div className="h-0.5 bg-gray-300 flex-1" />
          <div className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'details' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              2
            </div>
            <span className={step === 'details' ? 'font-medium' : 'text-gray-600'}>
              Detail Website
            </span>
          </div>
        </div>
      </div>

      {step === 'template' ? (
        <>
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={onCancel}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </div>
          <TemplateGallery 
            templates={templates} 
            onSelectTemplate={handleTemplateSelect} 
          />
        </>
      ) : (
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Detail Website</CardTitle>
              <CardDescription>
                Isi informasi dasar untuk website e-commerce Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Selected Template Preview */}
              {selectedTemplateData && (
                <div className="border rounded-lg p-4 bg-gray-50">
                  <Label className="text-sm text-gray-600 mb-2 block">Template Terpilih:</Label>
                  <div className="flex items-center gap-4">
                    <img 
                      src={selectedTemplateData.preview_image}
                      alt={selectedTemplateData.template_name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-medium">{selectedTemplateData.template_name}</h4>
                      <p className="text-sm text-gray-600">{selectedTemplateData.description}</p>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto mt-1"
                        onClick={() => setStep('template')}
                      >
                        Ganti template
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Site Name */}
              <div className="space-y-2">
                <Label htmlFor="siteName">Nama Website *</Label>
                <Input
                  id="siteName"
                  placeholder="Contoh: Toko Fashion Keren"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                />
                <p className="text-sm text-gray-600">
                  Nama yang akan ditampilkan di website Anda
                </p>
              </div>

              {/* Domain */}
              <div className="space-y-2">
                <Label htmlFor="domain">Domain (Opsional)</Label>
                <div className="flex gap-2">
                  <Input
                    id="domain"
                    placeholder="toko-saya"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                  />
                  <span className="flex items-center text-gray-600">.mystore.id</span>
                </div>
                <p className="text-sm text-gray-600">
                  {domain ? (
                    <>Domain Anda: <span className="font-medium">{domain}.mystore.id</span></>
                  ) : (
                    <>Biarkan kosong untuk menggunakan: <span className="font-medium">
                      {siteName.toLowerCase().replace(/\s+/g, '-') || 'nama-website'}.mystore.id
                    </span></>
                  )}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setStep('template')} className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali
                </Button>
                <Button 
                  onClick={handleCreate} 
                  className="flex-1"
                  disabled={!siteName}
                >
                  Buat Website
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}