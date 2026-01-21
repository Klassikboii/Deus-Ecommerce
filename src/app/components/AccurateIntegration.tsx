import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  ExternalLink,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';

interface AccurateIntegrationProps {
  clientId: string;
}

export function AccurateIntegration({ clientId }: AccurateIntegrationProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  const handleConnect = () => {
    // Mock OAuth flow
    toast.info('Connecting to Accurate Online...', {
      description: 'Redirecting to Accurate OAuth page'
    });
    
    // Simulate connection
    setTimeout(() => {
      setIsConnected(true);
      toast.success('Successfully connected to Accurate Online!', {
        description: 'You can now sync products, customers, and invoices'
      });
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setLastSync(null);
    toast.success('Disconnected from Accurate Online');
  };

  const handleSync = async (entityType: string) => {
    setIsSyncing(true);
    toast.loading(`Syncing ${entityType}...`);
    
    // Simulate sync
    setTimeout(() => {
      setIsSyncing(false);
      setLastSync(new Date());
      toast.success(`${entityType} synced successfully!`, {
        description: 'All data is up to date'
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-2">Integrasi Accurate Online</h2>
        <p className="text-gray-600">
          Sinkronisasi data e-commerce Anda dengan Accurate Online untuk pengelolaan keuangan yang lebih baik
        </p>
      </div>

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Status Koneksi</CardTitle>
              <CardDescription>
                {isConnected 
                  ? 'Terhubung dengan Accurate Online' 
                  : 'Belum terhubung dengan Accurate Online'}
              </CardDescription>
            </div>
            <Badge variant={isConnected ? 'default' : 'secondary'} className="gap-1">
              {isConnected ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Connected
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4" />
                  Disconnected
                </>
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {!isConnected ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Hubungkan akun Accurate Online Anda untuk mengaktifkan sinkronisasi otomatis
              </p>
              <Button onClick={handleConnect}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Hubungkan dengan Accurate Online
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Last synced:</span>
                <span className="font-medium">
                  {lastSync ? lastSync.toLocaleString('id-ID') : 'Never'}
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleDisconnect}>
                  Disconnect
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sync Options */}
      {isConnected && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sync Products</CardTitle>
              <CardDescription>
                Sinkronisasi produk dengan item di Accurate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => handleSync('Products')}
                disabled={isSyncing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                Sync Now
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sync Customers</CardTitle>
              <CardDescription>
                Sinkronisasi customer dengan kontak di Accurate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => handleSync('Customers')}
                disabled={isSyncing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                Sync Now
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sync Invoices</CardTitle>
              <CardDescription>
                Sinkronisasi order menjadi invoice di Accurate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => handleSync('Invoices')}
                disabled={isSyncing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                Sync Now
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Sync Logs */}
      {isConnected && (
        <Card>
          <CardHeader>
            <CardTitle>Sync History</CardTitle>
            <CardDescription>Recent synchronization activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm border-b pb-3">
                <div>
                  <p className="font-medium">Products synced</p>
                  <p className="text-gray-600 text-xs">24 items synchronized</p>
                </div>
                <div className="text-right">
                  <Badge variant="default" className="gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Success
                  </Badge>
                  <p className="text-xs text-gray-600 mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm border-b pb-3">
                <div>
                  <p className="font-medium">Customers synced</p>
                  <p className="text-gray-600 text-xs">12 contacts synchronized</p>
                </div>
                <div className="text-right">
                  <Badge variant="default" className="gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Success
                  </Badge>
                  <p className="text-xs text-gray-600 mt-1">3 hours ago</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">Invoices synced</p>
                  <p className="text-gray-600 text-xs">8 invoices created</p>
                </div>
                <div className="text-right">
                  <Badge variant="default" className="gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Success
                  </Badge>
                  <p className="text-xs text-gray-600 mt-1">5 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
