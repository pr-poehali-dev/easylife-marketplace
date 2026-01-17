import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { HomePage } from '@/components/HomePage';
import { CatalogPage, OrdersPage } from '@/components/CatalogPage';
import { ProfilePage } from '@/components/ProfilePage';
import { CreateProductPage } from '@/components/CreateProductPage';

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

export default Index;