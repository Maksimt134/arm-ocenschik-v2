import React from 'react';

interface AnalogueCardProps {
  photoUrl?: string;
  address: string;
  price?: string | number;
  onOpen?: () => void;
  className?: string;
}

const AnalogueCard: React.FC<AnalogueCardProps> = ({
  photoUrl,
  address,
  price,
  onOpen,
  className = '',
}) => {
  return (
    <div className={`group rounded-xl overflow-hidden border bg-slate-900/60 cursor-pointer transition-all active:scale-[0.985] hover:border-slate-600 text-xs ${className}`}>
      {/* Image area — always an <img> element per requirements */}
      <img
        src={photoUrl || '/images/no-photo-placeholder.png'}
        alt={address}
        className="w-full h-48 object-cover rounded-t-xl"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/images/no-photo-placeholder.png';
        }}
      />

      {/* Info section — unchanged UI (address, price, button) */}
      <div className="p-3 space-y-1">
        <div className="font-black text-sm leading-tight line-clamp-2 text-white group-hover:text-sky-300">
          {address}
        </div>

        {price && (
          <div className="pt-0.5 text-emerald-400 font-mono text-[10px] font-bold whitespace-nowrap">
            {typeof price === 'number' ? `${(price / 1000000).toFixed(0)} млн ₽` : price}
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpen?.();
          }}
          className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-2 px-4 text-center text-sm font-medium mt-2 block w-full transition-colors"
        >
          Перейти к паспорту
        </button>
      </div>
    </div>
  );
};

export default AnalogueCard;
