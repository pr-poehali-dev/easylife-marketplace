import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  sellerId: string;
}

export function CreateProductPage({ onAddProduct }: { onAddProduct: (product: Omit<Product, 'id' | 'sellerId'>) => void }) {
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
