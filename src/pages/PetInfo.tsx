import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, Dog, Cat, GenderMale, GenderFemale, Pencil } from 'phosphor-react';

interface PetData {
  name: string;
  species: 'dog' | 'cat' | '';
  breed: string;
  gender: 'male' | 'female' | '';
  age: string;
}

const PetInfo: FC = () => {
  const navigate = useNavigate();
  const [pet, setPet] = useState<PetData>({
    name: '',
    species: '',
    breed: '',
    gender: '',
    age: '',
  });

  const isValid = pet.name && pet.species && pet.gender && pet.age;

  const handleNext = () => {
    if (!isValid) return;
    navigate('/photo-capture');
  };

  const updateField = <K extends keyof PetData>(key: K, value: PetData[K]) => {
    setPet((prev) => ({ ...prev, [key]: value }));
  };

  const speciesOptions: { value: 'dog' | 'cat'; label: string; icon: typeof Dog }[] = [
    { value: 'dog', label: '狗狗', icon: Dog },
    { value: 'cat', label: '狗狗', icon: Cat },
  ];

  const genderOptions: { value: 'male' | 'female'; label: string; icon: typeof GenderMale }[] = [
    { value: 'male', label: '男孩', icon: GenderMale },
    { value: 'female', label: '女孩', icon: GenderFemale },
  ];

  // Avatar preview based on species and gender
  const getAvatarEmoji = () => {
    if (pet.species === 'dog') return pet.gender === 'female' ? '🐕‍🦺' : '🐕';
    if (pet.species === 'cat') return pet.gender === 'female' ? '🐈' : '🐈‍⬛';
    return '🐾';
  };

  return (
    <div className="min-h-[100dvh] bg-cream max-w-[430px] mx-auto relative flex flex-col">
      {/* Header */}
      <div className="pt-6 px-6 flex items-center gap-3">
        <button
          onClick={() => navigate('/device-pairing')}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blush transition-colors active:scale-95"
          aria-label="返回"
        >
          <ArrowLeft size={24} className="text-taupe" weight="regular" />
        </button>
        <h1 className="text-[22px] font-semibold text-espresso tracking-[-0.01em] leading-[1.3]">
          认识{pet.name ? ` ${pet.name}` : ' TA'}
        </h1>
      </div>

      {/* Avatar preview */}
      <motion.div
        className="flex items-center justify-center py-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
      >
        <div className="w-[100px] h-[100px] bg-warmWhite rounded-full flex items-center justify-center text-[48px]"
          style={{ boxShadow: '0 2px 16px rgba(61,43,31,0.06)' }}
        >
          <motion.span
            key={getAvatarEmoji()}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            {getAvatarEmoji()}
          </motion.span>
        </div>
      </motion.div>

      {/* Form */}
      <div className="flex-1 px-6 flex flex-col gap-5 pb-6">
        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-espresso text-[16px] font-semibold mb-2">
            TA 叫什么名字？<span className="text-alert">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={pet.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="例如：Bella、旺财、Luna..."
              className="w-full h-12 bg-cream rounded-[12px] px-4 text-espresso text-[16px] placeholder:text-sand border-2 border-transparent focus:border-amber outline-none transition-colors"
            />
            <Pencil size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-sand" weight="regular" />
          </div>
        </motion.div>

        {/* Species */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-espresso text-[16px] font-semibold mb-2">
            TA 是什么物种？<span className="text-alert">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {speciesOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = pet.species === opt.value;
              return (
                <motion.button
                  key={opt.value}
                  onClick={() => updateField('species', opt.value)}
                  className={`h-20 rounded-[12px] flex flex-col items-center justify-center gap-1 transition-colors ${
                    isSelected
                      ? 'bg-blush border-2 border-amber'
                      : 'bg-warmWhite border-2 border-transparent'
                  }`}
                  style={{ boxShadow: isSelected ? '0 2px 16px rgba(61,43,31,0.06)' : 'none' }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Icon size={32} className={isSelected ? 'text-amber' : 'text-taupe'} weight="regular" />
                  <span className={`text-[12px] font-medium ${isSelected ? 'text-espresso' : 'text-taupe'}`}>
                    {opt.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Breed */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-espresso text-[16px] font-semibold mb-2">品种（选填）</label>
          <input
            type="text"
            value={pet.breed}
            onChange={(e) => updateField('breed', e.target.value)}
            placeholder="搜索品种..."
            className="w-full h-12 bg-cream rounded-[12px] px-4 text-espresso text-[16px] placeholder:text-sand border-2 border-transparent focus:border-amber outline-none transition-colors"
          />
        </motion.div>

        {/* Gender */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <label className="block text-espresso text-[16px] font-semibold mb-2">
            性别 <span className="text-alert">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {genderOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = pet.gender === opt.value;
              return (
                <motion.button
                  key={opt.value}
                  onClick={() => updateField('gender', opt.value)}
                  className={`h-20 rounded-[12px] flex flex-col items-center justify-center gap-1 transition-colors ${
                    isSelected
                      ? 'bg-blush border-2 border-amber'
                      : 'bg-warmWhite border-2 border-transparent'
                  }`}
                  style={{ boxShadow: isSelected ? '0 2px 16px rgba(61,43,31,0.06)' : 'none' }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Icon size={32} className={isSelected ? 'text-amber' : 'text-taupe'} weight="regular" />
                  <span className={`text-[12px] font-medium ${isSelected ? 'text-espresso' : 'text-taupe'}`}>
                    {opt.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Age */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-espresso text-[16px] font-semibold mb-2">
            年龄 <span className="text-alert">*</span>
          </label>
          <input
            type="text"
            value={pet.age}
            onChange={(e) => updateField('age', e.target.value)}
            placeholder="例如：2岁3个月"
            className="w-full h-12 bg-cream rounded-[12px] px-4 text-espresso text-[16px] placeholder:text-sand border-2 border-transparent focus:border-amber outline-none transition-colors"
          />
        </motion.div>

        {/* Next button */}
        <motion.div
          className="mt-auto pt-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={handleNext}
            className="w-full h-12 bg-amber rounded-full text-espresso font-semibold text-base flex items-center justify-center disabled:opacity-40"
            style={{ boxShadow: '0 8px 32px rgba(61,43,31,0.10)' }}
            whileTap={{ scale: 0.95 }}
            disabled={!isValid}
          >
            下一步
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default PetInfo;
