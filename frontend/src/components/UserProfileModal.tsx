import React, { useEffect, useState } from 'react';

import {
  Award,
  Briefcase,
  Calendar,
  CheckCircle,
  Edit,
  FileText,
  Mail,
  Phone,
  ShieldCheck,
  Star,
  Trophy,
  User,
  X,
} from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName?: string;
  onSave?: (name: string) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ 
  isOpen, 
  onClose,
  currentName = 'Иванов Алексей Владимирович',
  onSave 
}) => {
  const [name, setName] = useState(currentName);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'personal' | 'reports'>('personal');
  
  // Динамический список отчётов
  const [reports] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    name: name,
    email: 'a.ivanov@gbu-mos.ru',
    phone: '+7 (495) 123-45-67',
    dateJoined: '2012-03-15'
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Сбрасываем стейт при закрытии модалки
  useEffect(() => {
    if (!isOpen) {
      setIsEditing(false);
      setActiveTab('personal');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setName(formData.name);
    if (onSave) onSave(formData.name);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden relative animate-slideUp flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {!isEditing ? (
          // --- РЕЖИМ ПРОСМОТРА ПРОФИЛЯ ---
          <>
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition"
              title="Закрыть"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Profile Info Container */}
            <div className="px-8 pb-8 pt-8 relative overflow-y-auto">
              {/* Avatar */}
              <div className="h-24 w-24 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center shadow-lg mb-6 relative">
                <User className="h-12 w-12 text-sky-400" />
                <div className="absolute bottom-0 right-0 h-5 w-5 bg-emerald-500 border-4 border-slate-900 rounded-full" title="В сети"></div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white">{name}</h2>
                  <div className="flex items-center flex-wrap gap-3 mt-1">
                    <p className="text-sky-400 font-medium flex items-center gap-2">
                      Ведущий оценщик ГБУ «Центр кадастровой оценки»
                    </p>
                    <span className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
                      <ShieldCheck className="h-3 w-3" />
                      Аттестат № 0034-789
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-xl transition border border-slate-700 whitespace-nowrap shadow-sm hover:shadow-md"
                >
                  <Edit className="h-4 w-4" />
                  Редактировать
                </button>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column: Contact & General */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Контактная информация</h3>
                  
                  <div className="flex items-center gap-3 text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 hover:border-slate-700 transition">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span className="text-sm font-mono">{formData.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 hover:border-slate-700 transition">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span className="text-sm font-mono">{formData.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 hover:border-slate-700 transition">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span className="text-sm">В организации с: <strong className="text-slate-200">15 марта 2012 г.</strong></span>
                  </div>
                </div>

                {/* Right Column: Professional Stats */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Профессиональная сводка</h3>
                  
                  <div className="flex items-center gap-3 text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 hover:border-slate-700 transition">
                    <Briefcase className="h-4 w-4 text-sky-400" />
                    <div className="text-sm">
                      <span className="text-slate-400">Опыт работы:</span> <strong className="text-slate-200">14 лет (с 2012 года)</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 hover:border-slate-700 transition">
                    <Trophy className="h-4 w-4 text-emerald-400" />
                    <div className="text-sm">
                      <span className="text-slate-400">Оценено объектов:</span> <strong className="text-slate-200">347</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 hover:border-slate-700 transition">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400/20" />
                    <div className="text-sm flex items-center gap-1.5">
                      <span className="text-slate-400">Рейтинг:</span>
                      <strong className="text-slate-200">4.92 / 5.0</strong>
                      <span className="text-xs text-slate-500">(128 отзывов)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="mt-8">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Специализация и достижения</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-3 bg-gradient-to-br from-sky-900/20 to-slate-900 border border-sky-500/20 p-4 rounded-xl hover:border-sky-500/40 transition">
                    <Award className="h-5 w-5 text-sky-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">Оценка ОКН</h4>
                      <p className="text-xs text-slate-400 mt-1">Профилирующая специализация (объекты культурного наследия).</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-gradient-to-br from-emerald-900/20 to-slate-900 border border-emerald-500/20 p-4 rounded-xl hover:border-emerald-500/40 transition">
                    <Trophy className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">Лучший оценщик 2024</h4>
                      <p className="text-xs text-slate-400 mt-1">Награда ГБУ за проведение более 200 сложнейших экспертиз.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // --- РЕЖИМ РЕДАКТИРОВАНИЯ ---
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800 flex-shrink-0">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <User className="h-5 w-5 text-sky-500" />
                Редактирование профиля
              </h2>
              <button 
                onClick={() => setIsEditing(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center border-b border-slate-800 px-6 flex-shrink-0">
              <button
                onClick={() => setActiveTab('personal')}
                className={`px-4 py-4 text-sm font-semibold transition border-b-2 ${
                  activeTab === 'personal' 
                    ? 'text-sky-400 border-sky-400' 
                    : 'text-slate-400 border-transparent hover:text-slate-200'
                }`}
              >
                Личные данные
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`px-4 py-4 text-sm font-semibold transition border-b-2 ${
                  activeTab === 'reports' 
                    ? 'text-sky-400 border-sky-400' 
                    : 'text-slate-400 border-transparent hover:text-slate-200'
                }`}
              >
                Журнал отчётов
              </button>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 overflow-y-auto overflow-x-hidden">
              {activeTab === 'personal' ? (
                <div className="space-y-6">
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                      <User className="h-4 w-4 text-slate-500" />
                      ФИО
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-slate-950/50 border border-slate-700 focus:border-sky-500 rounded-xl px-4 py-3 text-slate-200 outline-none transition"
                      placeholder="Введите ваше ФИО"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-500" />
                      Электронная почта
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-slate-950/50 border border-slate-700 focus:border-sky-500 rounded-xl px-4 py-3 text-slate-200 outline-none transition"
                      placeholder="example@mail.com"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                      <Phone className="h-4 w-4 text-slate-500" />
                      Телефон
                    </label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-slate-950/50 border border-slate-700 focus:border-sky-500 rounded-xl px-4 py-3 text-slate-200 outline-none transition"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      В организации с
                    </label>
                    <input 
                      type="date" 
                      name="dateJoined"
                      value={formData.dateJoined}
                      onChange={handleChange}
                      className="bg-slate-950/50 border border-slate-700 focus:border-sky-500 rounded-xl px-4 py-3 text-slate-200 outline-none transition"
                    />
                  </div>

                </div>
              ) : (
                <div className="animate-fadeIn">
                  {reports.length > 0 ? (
                    <div className="space-y-4">
                      {reports.map((report, idx) => (
                        <div key={idx} className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
                          Отчёт {report.id}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-center px-4">
                      <div className="bg-slate-800/50 p-6 rounded-full mb-4 border border-slate-700/50">
                        <FileText className="h-12 w-12 text-slate-500" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-200 mb-2">Вы ещё не сформировали ни одного отчёта</h3>
                      <p className="text-sm text-slate-400 max-w-sm mx-auto">
                        Отчёты будут автоматически сохраняться здесь после создания.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {activeTab === 'personal' && (
              <div className="p-6 border-t border-slate-800 flex items-center justify-end gap-3 bg-slate-900/50 flex-shrink-0">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-800 transition"
                >
                  Отмена
                </button>
                <button 
                  onClick={handleSave}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 shadow-lg shadow-sky-500/20 active:scale-95 transition flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Сохранить изменения
                </button>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Click outside to close */}
      <div className="absolute inset-0 z-[-1]" onClick={onClose}></div>
    </div>
  );
};
