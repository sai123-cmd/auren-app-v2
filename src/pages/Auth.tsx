import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { AppleLogo, Envelope, Eye, EyeSlash, ArrowLeft, PawPrint } from 'phosphor-react';

const Auth: FC = () => {
  const navigate = useNavigate();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAppleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/device-pairing');
    }, 1500);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/device-pairing');
    }, 1500);
  };

  return (
    <div className="min-h-[100dvh] bg-cream max-w-[430px] mx-auto relative flex flex-col">
      {/* Header */}
      <div className="pt-6 px-6 flex items-center gap-3">
        <button
          onClick={() => navigate('/onboarding')}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blush transition-colors active:scale-95"
          aria-label="返回"
        >
          <ArrowLeft size={24} className="text-taupe" weight="regular" />
        </button>
        <h1 className="text-[22px] font-semibold text-espresso tracking-[-0.01em] leading-[1.3]">创建账号</h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-6 pt-10">
        {/* Logo */}
        <motion.div
          className="flex items-center justify-center mb-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
        >
          <div className="w-16 h-16 bg-amber/20 rounded-full flex items-center justify-center">
            <PawPrint size={36} className="text-amber" weight="fill" />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showEmailForm ? (
            <motion.div
              key="options"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              <p className="text-espresso text-[16px] font-semibold mb-2">选择注册方式</p>

              {/* Apple ID */}
              <motion.button
                onClick={handleAppleSignIn}
                className="w-full h-[72px] bg-warmWhite rounded-[16px] flex items-center gap-4 px-4"
                style={{ boxShadow: '0 2px 16px rgba(61,43,31,0.06)' }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                <AppleLogo size={24} className="text-espresso" weight="fill" />
                <div className="text-left">
                  <p className="text-espresso text-[16px] font-semibold">使用 Apple ID 注册</p>
                  <p className="text-taupe text-[14px]">最快捷的方式</p>
                </div>
              </motion.button>

              {/* Email */}
              <motion.button
                onClick={() => setShowEmailForm(true)}
                className="w-full h-[72px] bg-warmWhite rounded-[16px] flex items-center gap-4 px-4"
                style={{ boxShadow: '0 2px 16px rgba(61,43,31,0.06)' }}
                whileTap={{ scale: 0.98 }}
              >
                <Envelope size={24} className="text-espresso" weight="regular" />
                <div className="text-left">
                  <p className="text-espresso text-[16px] font-semibold">使用邮箱注册</p>
                  <p className="text-taupe text-[14px]">需要验证邮箱</p>
                </div>
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              key="emailForm"
              onSubmit={handleEmailSubmit}
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
              className="flex flex-col gap-5"
            >
              {/* Email */}
              <div>
                <label className="block text-espresso text-[16px] font-semibold mb-2">邮箱地址</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full h-12 bg-cream rounded-[12px] px-4 text-espresso text-[16px] placeholder:text-sand border-2 border-transparent focus:border-amber outline-none transition-colors"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-espresso text-[16px] font-semibold mb-2">密码</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 bg-cream rounded-[12px] px-4 pr-12 text-espresso text-[16px] placeholder:text-sand border-2 border-transparent focus:border-amber outline-none transition-colors"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-blush transition-colors"
                    aria-label={showPassword ? '隐藏密码' : '显示密码'}
                  >
                    {showPassword ? (
                      <EyeSlash size={20} className="text-taupe" weight="regular" />
                    ) : (
                      <Eye size={20} className="text-taupe" weight="regular" />
                    )}
                  </button>
                </div>
                <p className="text-taupe text-[12px] mt-1">至少8位，包含字母和数字</p>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                className="w-full h-12 bg-amber rounded-full text-espresso font-semibold text-base flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                style={{ boxShadow: '0 8px 32px rgba(61,43,31,0.10)' }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading || !email || !password}
              >
                {isLoading ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-espresso border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                ) : (
                  '创建账号'
                )}
              </motion.button>

              <button
                type="button"
                onClick={() => setShowEmailForm(false)}
                className="text-taupe text-[14px] text-center mt-2 hover:text-amber transition-colors"
              >
                返回其他注册方式
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Terms */}
        <p className="text-taupe text-[12px] text-center mt-8 leading-relaxed">
          注册即表示同意{' '}
          <span className="text-amber cursor-pointer">服务条款</span>
          {' '}和{' '}
          <span className="text-amber cursor-pointer">隐私政策</span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
