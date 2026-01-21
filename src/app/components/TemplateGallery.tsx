import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import type { WebsiteTemplate } from '@/types';
import { Eye } from 'lucide-react';

interface TemplateGalleryProps {
  templates: WebsiteTemplate[];
  onSelectTemplate: (templateId: string) => void;
}

export function TemplateGallery({ templates, onSelectTemplate }: TemplateGalleryProps) {
  return (
    <div className="py-8">
      <div className="mb-8">
        <h2 className="text-3xl mb-2">Pilih Template Website</h2>
        <p className="text-gray-600">
          Pilih template yang sesuai dengan bisnis Anda. Semua template sudah siap untuk langsung dipublish.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.template_id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <img 
                src={template.preview_image}
                alt={template.template_name}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-3 right-3 bg-white text-gray-800">
                {template.category}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle>{template.template_name}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardFooter className="gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {/* Preview functionality */}}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button 
                className="flex-1"
                onClick={() => onSelectTemplate(template.template_id)}
              >
                Gunakan Template
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
