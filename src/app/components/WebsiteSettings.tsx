import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Badge } from '@/app/components/ui/badge';
import { toast } from 'sonner';
import { 
  Save, 
  Image as ImageIcon, 
  Info, 
  Palette, 
  Globe,
  Upload,
  Trash2
} from 'lucide-react';
import type { Website } from '@/types';

interface WebsiteSettingsProps {
  website: Website;
  onUpdate: (website: Website) => void;
}

interface WebsiteContent {
  aboutUs: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  logo: string;
  bannerImages: string[];
  colors: {
    primary: string;
    secondary: string;
  };
}

export function WebsiteSettings({ website, onUpdate }: WebsiteSettingsProps) {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  // Mock initial content
  const [content, setContent] = useState<WebsiteContent>({
    aboutUs: 'Kami adalah toko online terpercaya yang menyediakan berbagai produk berkualitas tinggi dengan harga terjangkau. Didirikan sejak 2024, kami berkomitmen untuk memberikan pengalaman belanja terbaik bagi pelanggan kami.',
    contactEmail: 'hello@' + website.domain,
    contactPhone: '+62 812-3456-7890',
    address: 'Jl. Contoh No. 123, Jakarta Selatan, DKI Jakarta 12345',
    socialMedia: {
      facebook: 'https://facebook.com/yourstore',
      instagram: 'https://instagram.com/yourstore',
      twitter: 'https://twitter.com/yourstore'
    },
    logo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=400',
    bannerImages: [
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
      'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200',
      'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1200'
    ],
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6'
    }
  });

  const [generalSettings, setGeneralSettings] = useState({
    siteName: website.site_name,
    domain: website.domain,
    status: website.status
  });

  const handleSaveGeneral = () => {
    setIsSaving(true);
    setTimeout(() => {
      onUpdate({
        ...website,
        site_name: generalSettings.siteName,
        domain: generalSettings.domain,
        status: generalSettings.status as 'draft' | 'published' | 'unpublished'
      });
      toast.success('Pengaturan umum berhasil disimpan!');
      setIsSaving(false);
    }, 500);
  };

  const handleSaveAbout = () => {
    setIsSaving(true);
    setTimeout(() => {
      toast.success('Informasi About Us berhasil disimpan!');
      setIsSaving(false);
    }, 500);
  };

  const handleSaveDesign = () => {
    setIsSaving(true);
    setTimeout(() => {
      toast.success('Pengaturan desain berhasil disimpan!');
      setIsSaving(false);
    }, 500);
  };

  const handleAddBannerImage = () => {
    const url = prompt('Masukkan URL gambar banner:');
    if (url) {
      setContent({
        ...content,
        bannerImages: [...content.bannerImages, url]
      });
      toast.success('Banner image berhasil ditambahkan!');
    }
  };

  const handleRemoveBannerImage = (index: number) => {
    setContent({
      ...content,
      bannerImages: content.bannerImages.filter((_, i) => i !== index)
    });
    toast.success('Banner image berhasil dihapus');
  };

  const handlePublishWebsite = () => {
    if (website.status === 'published') {
      if (confirm('Apakah Anda yakin ingin unpublish website ini?')) {
        onUpdate({ ...website, status: 'unpublished' });
        toast.info('Website berhasil di-unpublish');
      }
    } else {
      onUpdate({ 
        ...website, 
        status: 'published',
        published_at: new Date().toISOString()
      });
      toast.success('Website berhasil dipublish!', {
        description: 'Website Anda sekarang dapat diakses oleh pengunjung'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-1">Website Settings</h2>
          <p className="text-gray-600">Kelola pengaturan dan konten website Anda</p>
        </div>
        <div className="flex gap-2">
          <Badge variant={website.status === 'published' ? 'default' : 'secondary'}>
            {website.status}
          </Badge>
          <Button 
            variant={website.status === 'published' ? 'outline' : 'default'}
            onClick={handlePublishWebsite}
          >
            <Globe className="w-4 h-4 mr-2" />
            {website.status === 'published' ? 'Unpublish' : 'Publish Website'}
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="general">
            <Info className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="about">
            <ImageIcon className="w-4 h-4 mr-2" />
            About & Contact
          </TabsTrigger>
          <TabsTrigger value="design">
            <Palette className="w-4 h-4 mr-2" />
            Design & Images
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Pengaturan dasar website Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Nama Website</Label>
                <Input
                  id="siteName"
                  value={generalSettings.siteName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                  placeholder="Nama website Anda"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="domain">Domain</Label>
                <Input
                  id="domain"
                  value={generalSettings.domain}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, domain: e.target.value })}
                  placeholder="yourdomain.mystore.id"
                />
                <p className="text-sm text-gray-600">
                  Domain Anda: <span className="font-mono font-semibold">{generalSettings.domain}</span>
                </p>
              </div>

              <div className="pt-4">
                <Button onClick={handleSaveGeneral} disabled={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Menyimpan...' : 'Simpan Pengaturan'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About & Contact */}
        <TabsContent value="about" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About Us</CardTitle>
              <CardDescription>
                Ceritakan tentang bisnis Anda kepada pengunjung
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aboutUs">Deskripsi Bisnis</Label>
                <Textarea
                  id="aboutUs"
                  value={content.aboutUs}
                  onChange={(e) => setContent({ ...content, aboutUs: e.target.value })}
                  rows={6}
                  placeholder="Ceritakan tentang bisnis Anda..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Informasi kontak yang akan ditampilkan di website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={content.contactEmail}
                    onChange={(e) => setContent({ ...content, contactEmail: e.target.value })}
                    placeholder="email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Telepon</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={content.contactPhone}
                    onChange={(e) => setContent({ ...content, contactPhone: e.target.value })}
                    placeholder="+62 812-3456-7890"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Alamat</Label>
                <Textarea
                  id="address"
                  value={content.address}
                  onChange={(e) => setContent({ ...content, address: e.target.value })}
                  rows={3}
                  placeholder="Alamat lengkap bisnis Anda"
                />
              </div>

              <div className="space-y-2">
                <Label>Social Media</Label>
                <div className="space-y-3">
                  <Input
                    value={content.socialMedia.facebook}
                    onChange={(e) => setContent({ 
                      ...content, 
                      socialMedia: { ...content.socialMedia, facebook: e.target.value }
                    })}
                    placeholder="Facebook URL"
                  />
                  <Input
                    value={content.socialMedia.instagram}
                    onChange={(e) => setContent({ 
                      ...content, 
                      socialMedia: { ...content.socialMedia, instagram: e.target.value }
                    })}
                    placeholder="Instagram URL"
                  />
                  <Input
                    value={content.socialMedia.twitter}
                    onChange={(e) => setContent({ 
                      ...content, 
                      socialMedia: { ...content.socialMedia, twitter: e.target.value }
                    })}
                    placeholder="Twitter URL"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={handleSaveAbout} disabled={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Menyimpan...' : 'Simpan Informasi'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Design & Images */}
        <TabsContent value="design" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logo</CardTitle>
              <CardDescription>
                Logo yang akan ditampilkan di website Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo">URL Logo</Label>
                <Input
                  id="logo"
                  type="url"
                  value={content.logo}
                  onChange={(e) => setContent({ ...content, logo: e.target.value })}
                  placeholder="https://example.com/logo.png"
                />
              </div>
              {content.logo && (
                <div className="p-4 border rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <img 
                    src={content.logo} 
                    alt="Logo" 
                    className="h-16 object-contain"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Banner Images</CardTitle>
              <CardDescription>
                Gambar banner untuk homepage carousel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {content.bannerImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={image} 
                      alt={`Banner ${index + 1}`} 
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveBannerImage(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" onClick={handleAddBannerImage}>
                <Upload className="w-4 h-4 mr-2" />
                Tambah Banner Image
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Color Scheme</CardTitle>
              <CardDescription>
                Warna utama untuk website Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={content.colors.primary}
                      onChange={(e) => setContent({ 
                        ...content, 
                        colors: { ...content.colors, primary: e.target.value }
                      })}
                      className="w-20 h-10"
                    />
                    <Input
                      type="text"
                      value={content.colors.primary}
                      onChange={(e) => setContent({ 
                        ...content, 
                        colors: { ...content.colors, primary: e.target.value }
                      })}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={content.colors.secondary}
                      onChange={(e) => setContent({ 
                        ...content, 
                        colors: { ...content.colors, secondary: e.target.value }
                      })}
                      className="w-20 h-10"
                    />
                    <Input
                      type="text"
                      value={content.colors.secondary}
                      onChange={(e) => setContent({ 
                        ...content, 
                        colors: { ...content.colors, secondary: e.target.value }
                      })}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={handleSaveDesign} disabled={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Menyimpan...' : 'Simpan Design'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
