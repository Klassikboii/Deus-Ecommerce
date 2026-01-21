import { Button } from '@/app/components/ui/button';
import { ArrowRight, Check, Globe, ShoppingCart, TrendingUp, Zap } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-8 h-8 text-blue-600" />
              <span className="text-xl">WebCommerce</span>
            </div>
            <Button onClick={onGetStarted}>
              Mulai Sekarang
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl mb-6">
              Buat Toko Online Anda dalam Hitungan Menit
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Platform SaaS e-commerce terlengkap dengan integrasi Accurate Online. 
              Pilih template, atur produk, dan langsung jualan!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" onClick={onGetStarted}>
                Mulai Free Trial 14 Hari
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline">
                Lihat Demo
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Tidak perlu kartu kredit • Setup dalam 5 menit
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Fitur Lengkap untuk Bisnis Anda</h2>
            <p className="text-xl text-gray-600">
              Semua yang Anda butuhkan untuk menjalankan toko online
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl mb-2">Setup Cepat</h3>
              <p className="text-gray-600">
                Pilih template, atur produk, dan publish dalam hitungan menit. Tidak perlu coding!
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl mb-2">Multi-Website</h3>
              <p className="text-gray-600">
                Kelola banyak toko online dari satu dashboard. Cocok untuk reseller dan dropshipper.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl mb-2">Integrasi Accurate</h3>
              <p className="text-gray-600">
                Sinkronisasi otomatis dengan Accurate Online untuk pengelolaan keuangan yang lebih baik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Cara Kerja</h2>
            <p className="text-xl text-gray-600">
              Hanya 3 langkah untuk memulai
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4 text-xl">
                1
              </div>
              <h3 className="text-xl mb-2">Pilih Paket</h3>
              <p className="text-gray-600">
                Mulai dengan free trial 14 hari atau langsung pilih paket berbayar sesuai kebutuhan.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4 text-xl">
                2
              </div>
              <h3 className="text-xl mb-2">Pilih Template</h3>
              <p className="text-gray-600">
                Pilih dari berbagai template yang sudah siap pakai. Fashion, elektronik, makanan, dan lainnya.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4 text-xl">
                3
              </div>
              <h3 className="text-xl mb-2">Publish & Jualan</h3>
              <p className="text-gray-600">
                Tambahkan produk Anda dan publish website. Customer sudah bisa langsung berbelanja!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl mb-4">Siap Memulai Bisnis Online Anda?</h2>
          <p className="text-xl mb-8 opacity-90">
            Bergabung dengan ribuan seller yang sudah sukses menggunakan platform kami
          </p>
          <Button size="lg" variant="secondary" onClick={onGetStarted}>
            Mulai Free Trial Sekarang
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="w-6 h-6" />
                <span className="text-lg">WebCommerce</span>
              </div>
              <p className="text-gray-400 text-sm">
                Platform SaaS e-commerce terlengkap untuk bisnis Indonesia
              </p>
            </div>
            <div>
              <h4 className="mb-4">Produk</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Templates</li>
                <li>Fitur</li>
                <li>Pricing</li>
                <li>Accurate Integration</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Tentang Kami</li>
                <li>Blog</li>
                <li>Karir</li>
                <li>Kontak</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Bantuan</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Dokumentasi</li>
                <li>FAQ</li>
                <li>Support</li>
                <li>Status</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2026 WebCommerce. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
