import { Check } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import type { SubscriptionPlan } from '@/types';

interface PricingSectionProps {
  plans: SubscriptionPlan[];
  onSelectPlan: (planId: string) => void;
}

export function PricingSection({ plans, onSelectPlan }: PricingSectionProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4">Pilih Paket yang Sesuai</h2>
          <p className="text-xl text-gray-600">
            Mulai dengan free trial 14 hari, tidak perlu kartu kredit
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.plan_id}
              className={plan.plan_name === 'Professional' ? 'border-blue-500 border-2 relative' : ''}
            >
              {plan.plan_name === 'Professional' && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500">
                  Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle>{plan.plan_name}</CardTitle>
                <CardDescription>
                  {plan.price === 0 ? (
                    <span className="text-3xl">Gratis</span>
                  ) : (
                    <>
                      <span className="text-3xl">{formatPrice(plan.price)}</span>
                      <span className="text-gray-600">/bulan</span>
                    </>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  variant={plan.plan_name === 'Professional' ? 'default' : 'outline'}
                  onClick={() => onSelectPlan(plan.plan_id)}
                >
                  {plan.price === 0 ? 'Mulai Free Trial' : 'Pilih Paket'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
