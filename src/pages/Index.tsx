import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Signature {
  id: number;
  name: string;
  comment: string;
  date: string;
}

const Index = () => {
  const [signatures, setSignatures] = useState<Signature[]>([
    { id: 1, name: "Алексей Петров", comment: "Поддерживаю! Екатеринбург - отличный город", date: "2025-01-28" },
    { id: 2, name: "Мария Иванова", comment: "Маша заслуживает переехать в этот прекрасный город", date: "2025-01-28" },
    { id: 3, name: "Дмитрий Сидоров", comment: "За переезд!", date: "2025-01-27" },
    { id: 4, name: "Анна Козлова", comment: "Уральские горы ждут Машу", date: "2025-01-27" },
    { id: 5, name: "Игорь Белов", comment: "Екатеринбург - город возможностей", date: "2025-01-26" }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    comment: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    
    // Симуляция отправки
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newSignature: Signature = {
      id: signatures.length + 1,
      name: formData.name.trim(),
      comment: formData.comment.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    setSignatures(prev => [newSignature, ...prev]);
    setFormData({ name: '', comment: '' });
    setIsSubmitting(false);
  };

  const stats = {
    total: signatures.length,
    today: signatures.filter(s => s.date === new Date().toISOString().split('T')[0]).length,
    goal: 100
  };

  const progressPercentage = Math.min((stats.total / stats.goal) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* Героический заголовок */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Петиция: Переезд Маши 
            <br />
            <span className="text-primary">в Екатеринбург</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Поддержите Машу в её стремлении переехать в один из самых динамичных городов России. 
            Каждая подпись приближает её к мечте!
          </p>
          
          {/* Статистика */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="hover-scale">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="Users" size={24} className="text-primary" />
                  <h3 className="font-semibold text-gray-900">Подписи</h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-1">{stats.total}</div>
                <div className="text-sm text-gray-500">из {stats.goal} подписей</div>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="Calendar" size={24} className="text-primary" />
                  <h3 className="font-semibold text-gray-900">Сегодня</h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-1">{stats.today}</div>
                <div className="text-sm text-gray-500">новых подписей</div>
              </CardContent>
            </Card>

            <Card className="hover-scale">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="Target" size={24} className="text-primary" />
                  <h3 className="font-semibold text-gray-900">Прогресс</h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-1">{progressPercentage.toFixed(0)}%</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-primary rounded-full h-2 transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Форма подписи */}
        <Card className="mb-12 animate-fade-in shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-bold text-center text-gray-900 flex items-center justify-center space-x-2">
              <Icon name="PenTool" size={28} className="text-primary" />
              <span>Подписать петицию</span>
            </h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Ваше имя *
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Введите ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="h-12 text-lg"
                />
              </div>
              
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  Комментарий (необязательно)
                </label>
                <Textarea
                  id="comment"
                  placeholder="Поделитесь своими мыслями о переезде Маши..."
                  value={formData.comment}
                  onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                  rows={4}
                  className="text-lg resize-none"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-14 text-lg font-semibold"
                disabled={isSubmitting || !formData.name.trim()}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Подписываю...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Icon name="Check" size={20} />
                    <span>Подписать петицию</span>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Список подписавшихся */}
        <div className="animate-fade-in">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 flex items-center justify-center space-x-2">
            <Icon name="Heart" size={32} className="text-red-500" />
            <span>Уже поддержали</span>
          </h2>
          
          <div className="grid gap-4">
            {signatures.map((signature, index) => (
              <Card 
                key={signature.id} 
                className={`hover-scale transition-all duration-300 ${
                  index === 0 ? 'ring-2 ring-primary ring-opacity-50 bg-blue-50' : ''
                }`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: 'fade-in 0.6s ease-out both'
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {signature.name}
                        </h3>
                        {index === 0 && (
                          <Badge variant="secondary" className="bg-primary text-white">
                            Новая подпись
                          </Badge>
                        )}
                      </div>
                      {signature.comment && (
                        <p className="text-gray-600 mb-3 leading-relaxed">
                          "{signature.comment}"
                        </p>
                      )}
                      <div className="flex items-center text-sm text-gray-500">
                        <Icon name="Calendar" size={16} className="mr-1" />
                        <span>{new Date(signature.date).toLocaleDateString('ru-RU')}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Призыв к действию */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-primary/10 to-blue-100 rounded-2xl">
          <Icon name="MapPin" size={48} className="text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Помогите Маше осуществить мечту!</h3>
          <p className="text-gray-600 mb-4">
            Екатеринбург ждёт нового жителя. Ваша поддержка важна!
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Icon name="Share2" size={16} />
            <span>Поделитесь петицией с друзьями</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;