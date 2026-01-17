import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type UserRole = 'buyer' | 'seller' | null;

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  sellerId: string;
}

export function CatalogPage({ products, userRole }: { products: Product[]; userRole: UserRole }) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Каталог товаров
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Icon name="Filter" size={18} />
            Фильтры
          </Button>
          <Button variant="outline" className="gap-2">
            <Icon name="ArrowUpDown" size={18} />
            Сортировка
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Card key={product.id} className="hover-lift overflow-hidden animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="aspect-square overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-xl">{product.name}</h3>
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                  <Icon name="QrCode" size={14} className="mr-1" />
                  QR
                </Badge>
              </div>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-purple-600">
                  {product.price.toLocaleString('ru-RU')} ₽
                </span>
                {userRole === 'buyer' && (
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    Купить
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function OrdersPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Мои заказы
      </h1>
      <Card>
        <CardContent className="pt-6 text-center py-12">
          <Icon name="Package" size={64} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 text-lg">У вас пока нет заказов</p>
        </CardContent>
      </Card>
    </div>
  );
}
