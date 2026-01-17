import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

type UserRole = 'buyer' | 'seller' | null;

export function HomePage({ userRole }: { userRole: UserRole }) {
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
