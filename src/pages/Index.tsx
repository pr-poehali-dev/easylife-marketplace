import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

type UserRole = 'buyer' | 'seller' | null;
type Page = 'home' | 'catalog' | 'orders' | 'profile' | 'create-product';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  sellerId: string;
}

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [userName, setUserName] = useState('');
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Смартфон Premium X',
      price: 45990,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
      description: 'Флагманский смартфон с передовыми технологиями',
      sellerId: 'seller1'
    },
    {
      id: '2',
      name: 'Беспроводные наушники Pro',
      price: 12990,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      description: 'Премиальное звучание и шумоподавление',
      sellerId: 'seller1'
    },
    {
      id: '3',
      name: 'Умные часы Sport',
      price: 18990,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      description: 'Мониторинг здоровья и активности 24/7',
      sellerId: 'seller2'
    }
  ]);

  const navigateToPage = (page: Page) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsAnimating(false);
    }, 300);
  };

  const handleRegister = (role: UserRole, name: string, code?: string) => {
    if (role === 'seller' && code !== 'EasyLife') {
      alert('Неверный код продавца!');
      return;
    }
    setUserRole(role);
    setUserName(name);
  };

  const handleAddProduct = (product: Omit<Product, 'id' | 'sellerId'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      sellerId: 'currentUser'
    };
    setProducts([...products, newProduct]);
    navigateToPage('catalog');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                EasyLife
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={currentPage === 'home' ? 'default' : 'ghost'}
                onClick={() => navigateToPage('home')}
                className="gap-2"
              >
                <Icon name="Home" size={18} />
                Главная
              </Button>

              <Button
                variant={currentPage === 'catalog' ? 'default' : 'ghost'}
                onClick={() => navigateToPage('catalog')}
                className="gap-2"
              >
                <Icon name="ShoppingBag" size={18} />
                Каталог
              </Button>

              {userRole && (
                <Button
                  variant={currentPage === 'orders' ? 'default' : 'ghost'}
                  onClick={() => navigateToPage('orders')}
                  className="gap-2"
                >
                  <Icon name="Package" size={18} />
                  Мои заказы
                </Button>
              )}

              {userRole === 'seller' && (
                <Button
                  variant={currentPage === 'create-product' ? 'default' : 'ghost'}
                  onClick={() => navigateToPage('create-product')}
                  className="gap-2"
                >
                  <Icon name="PlusCircle" size={18} />
                  Создать товар
                </Button>
              )}

              <Button
                variant={currentPage === 'profile' ? 'default' : 'ghost'}
                onClick={() => navigateToPage('profile')}
                className="gap-2"
              >
                <Icon name="User" size={18} />
                Личный кабинет
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className={`container mx-auto px-4 py-8 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} transition-all duration-300`}>
        {currentPage === 'home' && <HomePage userRole={userRole} />}
        {currentPage === 'catalog' && <CatalogPage products={products} userRole={userRole} />}
        {currentPage === 'orders' && <OrdersPage />}
        {currentPage === 'profile' && <ProfilePage userRole={userRole} userName={userName} onRegister={handleRegister} />}
        {currentPage === 'create-product' && userRole === 'seller' && <CreateProductPage onAddProduct={handleAddProduct} />}
      </main>
    </div>
  );
};

function HomePage({ userRole }: { userRole: UserRole }) {
  return (
    <div className="space-y-16 animate-fade-in">
      <section className="text-center py-20">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
          Добро пожаловать в EasyLife
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Удобный маркетплейс с системой QR-кодов для безопасной купли-продажи
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-6">
            <Icon name="ShoppingBag" size={20} className="mr-2" />
            Начать покупки
          </Button>
          {!userRole && (
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-purple-600 text-purple-600 hover:bg-purple-50">
              <Icon name="UserPlus" size={20} className="mr-2" />
              Зарегистрироваться
            </Button>
          )}
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <Card className="hover-lift border-purple-100">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
              <Icon name="QrCode" size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">QR-идентификация</h3>
            <p className="text-gray-600">
              Каждый товар защищен уникальным QR-кодом для отслеживания и проверки подлинности
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift border-pink-100">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4">
              <Icon name="Shield" size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Безопасность</h3>
            <p className="text-gray-600">
              Трехступенчатая система проверки товара на всех этапах доставки
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift border-orange-100">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4">
              <Icon name="Zap" size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Быстро и удобно</h3>
            <p className="text-gray-600">
              Простая регистрация и интуитивный интерфейс для покупателей и продавцов
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Станьте продавцом</h2>
        <p className="text-xl mb-6 opacity-90">
          Зарегистрируйтесь как продавец и начните продавать свои товары уже сегодня
        </p>
        <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
          <Icon name="Store" size={20} className="mr-2" />
          Стать продавцом
        </Button>
      </section>
    </div>
  );
}

function CatalogPage({ products, userRole }: { products: Product[]; userRole: UserRole }) {
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

function OrdersPage() {
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

function ProfilePage({ 
  userRole, 
  userName,
  onRegister 
}: { 
  userRole: UserRole;
  userName: string;
  onRegister: (role: UserRole, name: string, code?: string) => void;
}) {
  const [formData, setFormData] = useState({ name: '', role: 'buyer' as 'buyer' | 'seller', code: '' });

  if (userRole) {
    return (
      <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Личный кабинет
        </h1>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-3xl font-bold">{userName.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{userName}</h2>
                <Badge className={userRole === 'seller' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}>
                  {userRole === 'seller' ? 'Продавец' : 'Покупатель'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center">
        Регистрация
      </h1>
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Ваше имя</Label>
            <Input
              id="name"
              placeholder="Введите имя и фамилию"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-4">
            <Label>Выберите роль</Label>
            <div className="grid grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer transition-all ${formData.role === 'buyer' ? 'border-purple-600 border-2 bg-purple-50' : 'hover:border-purple-300'}`}
                onClick={() => setFormData({ ...formData, role: 'buyer' })}
              >
                <CardContent className="pt-6 text-center">
                  <Icon name="ShoppingBag" size={32} className="mx-auto mb-2 text-purple-600" />
                  <h3 className="font-bold">Покупатель</h3>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all ${formData.role === 'seller' ? 'border-orange-600 border-2 bg-orange-50' : 'hover:border-orange-300'}`}
                onClick={() => setFormData({ ...formData, role: 'seller' })}
              >
                <CardContent className="pt-6 text-center">
                  <Icon name="Store" size={32} className="mx-auto mb-2 text-orange-600" />
                  <h3 className="font-bold">Продавец</h3>
                </CardContent>
              </Card>
            </div>
          </div>

          {formData.role === 'seller' && (
            <div className="space-y-2">
              <Label htmlFor="code">Код продавца</Label>
              <Input
                id="code"
                placeholder="Введите код EasyLife"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
              <p className="text-sm text-gray-500">Подсказка: код состоит из 8 символов</p>
            </div>
          )}

          <Button 
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            onClick={() => onRegister(formData.role, formData.name, formData.code)}
            disabled={!formData.name}
          >
            <Icon name="UserPlus" size={18} className="mr-2" />
            Зарегистрироваться
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function CreateProductPage({ onAddProduct }: { onAddProduct: (product: Omit<Product, 'id' | 'sellerId'>) => void }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  });
  const [qrScanned, setQrScanned] = useState(false);

  const handleSubmit = () => {
    if (!qrScanned) {
      alert('Пожалуйста, отсканируйте QR-код товара!');
      return;
    }
    onAddProduct({
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      image: formData.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
    });
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Создать товар
      </h1>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="productName">Название товара</Label>
            <Input
              id="productName"
              placeholder="Например: Смартфон iPhone 15 Pro"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Цена (₽)</Label>
            <Input
              id="price"
              type="number"
              placeholder="45990"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              placeholder="Опишите характеристики товара..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">URL изображения</Label>
            <Input
              id="image"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </div>

          <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center">
            <Icon name="QrCode" size={64} className="mx-auto mb-4 text-purple-600" />
            <h3 className="font-bold text-lg mb-2">Сканирование QR-кода</h3>
            <p className="text-gray-600 mb-4">Отсканируйте уникальный QR-код товара для его идентификации</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={qrScanned ? 'default' : 'outline'} className={qrScanned ? 'bg-green-600 hover:bg-green-700' : ''}>
                  {qrScanned ? (
                    <>
                      <Icon name="CheckCircle" size={18} className="mr-2" />
                      QR-код отсканирован
                    </>
                  ) : (
                    <>
                      <Icon name="Camera" size={18} className="mr-2" />
                      Сканировать QR-код
                    </>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Сканирование QR-кода</DialogTitle>
                  <DialogDescription>
                    В реальной версии здесь будет камера для сканирования QR-кода
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center py-8">
                  <Button onClick={() => { setQrScanned(true); }}>
                    <Icon name="CheckCircle" size={18} className="mr-2" />
                    Симуляция сканирования
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Button 
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            onClick={handleSubmit}
            disabled={!formData.name || !formData.price || !qrScanned}
          >
            <Icon name="PlusCircle" size={18} className="mr-2" />
            Добавить товар
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Index;