import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

type UserRole = 'buyer' | 'seller' | null;

export function ProfilePage({ 
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
