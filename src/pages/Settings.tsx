import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Envelope,
  Phone,
  LockKey,
  SignOut,
  DeviceMobile,
  BatteryFull,
  WifiHigh,
  HardDrives,
  Cpu,
  MapPin,
  Crosshair,
  Microphone,
  UserCircle,
  DownloadSimple,
  Trash,
  Clock,
  Users,
  WarningOctagon,
  Crown,
  Check,
  Star,
  BookBookmark,
  Printer,
  Translate,
  Question,
  Headset,
  Info,
  CaretRight,
} from 'phosphor-react';

/* ------------------------------------------------------------------ */
/*  Animated toggle switch (amber active)                               */
/* ------------------------------------------------------------------ */
interface ToggleProps {
  active: boolean;
  onChange: () => void;
}

const Toggle: FC<ToggleProps> = ({ active, onChange }) => {
  return (
    <button
      onClick={onChange}
      className={`relative w-12 h-7 rounded-full transition-colors duration-200 flex items-center px-0.5 ${
        active ? 'bg-amber' : 'bg-sand'
      }`}
      aria-label={active ? '关闭' : '开启'}
    >
      <motion.div
        className="w-6 h-6 bg-white rounded-full shadow-sm"
        animate={{ x: active ? 18 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  );
};

/* ------------------------------------------------------------------ */
/*  Section card wrapper                                               */
/* ------------------------------------------------------------------ */
interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

const SectionCard: FC<SectionCardProps> = ({ title, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
      className="bg-warmWhite rounded-2xl shadow-[0_2px_16px_rgba(61,43,31,0.06)] overflow-hidden"
    >
      <div className="px-4 pt-3 pb-1">
        <span className="text-[12px] font-medium text-taupe tracking-wide">{title}</span>
      </div>
      <div className="px-4 pb-3">{children}</div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  List item with arrow (navigational)                                */
/* ------------------------------------------------------------------ */
interface ArrowItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onClick?: () => void;
  danger?: boolean;
}

const ArrowItem: FC<ArrowItemProps> = ({ icon, label, value, onClick, danger }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between py-3 group active:scale-[0.98] transition-transform"
    >
      <div className="flex items-center gap-3">
        <span className="text-taupe">{icon}</span>
        <span className={`text-[16px] ${danger ? 'text-alert' : 'text-espresso'}`}>{label}</span>
      </div>
      <div className="flex items-center gap-1">
        {value && <span className="text-[14px] text-taupe">{value}</span>}
        <CaretRight size={16} className="text-sand group-hover:text-taupe transition-colors" />
      </div>
    </button>
  );
};

/* ------------------------------------------------------------------ */
/*  List item with toggle                                              */
/* ------------------------------------------------------------------ */
interface ToggleItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onChange: () => void;
}

const ToggleItem: FC<ToggleItemProps> = ({ icon, label, active, onChange }) => {
  return (
    <div className="w-full flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <span className="text-taupe">{icon}</span>
        <span className="text-[16px] text-espresso">{label}</span>
      </div>
      <Toggle active={active} onChange={onChange} />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Divider                                                            */
/* ------------------------------------------------------------------ */
const Divider: FC = () => <div className="h-px bg-sand mx-4" />;

/* ------------------------------------------------------------------ */
/*  Settings Page                                                      */
/* ------------------------------------------------------------------ */
const Settings: FC = () => {
  const navigate = useNavigate();

  /* ---- toggles state ---- */
  const [petFinderOn, setPetFinderOn] = useState(true);
  const [fenceOn, setFenceOn] = useState(false);
  const [micAuth, setMicAuth] = useState(true);
  const [faceBlur, setFaceBlur] = useState(true);
  const [communityNotify, setCommunityNotify] = useState(true);
  const [emergencyAlert, setEmergencyAlert] = useState(true);
  const [langEn, setLangEn] = useState(false);

  /* ---- subscription ---- */
  const [pushTime, setPushTime] = useState('19:00');

  const handleLogout = () => {
    if (confirm('确定要退出登录吗？')) {
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-[100dvh] bg-cream max-w-[430px] mx-auto">
      {/* Header */}
      <div className="h-[48px] bg-warmWhite/80 backdrop-blur-[12px] border-b border-sand flex items-center px-4 sticky top-0 z-50">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blush transition-colors active:scale-95"
        >
          <ArrowLeft size={24} className="text-taupe" />
        </button>
        <h1 className="text-[18px] font-semibold text-espresso ml-2">设置</h1>
      </div>

      <div className="px-6 py-6 space-y-4">
        {/* ========== Account ========== */}
        <SectionCard title="账号与安全">
          <ArrowItem
            icon={<Envelope size={20} />}
            label="邮箱"
            value="user@auren.app"
          />
          <Divider />
          <ArrowItem
            icon={<Phone size={20} />}
            label="手机号"
            value="+86 138****8888"
          />
          <Divider />
          <ArrowItem
            icon={<LockKey size={20} />}
            label="修改密码"
          />
          <Divider />
          <ArrowItem
            icon={<SignOut size={20} />}
            label="退出登录"
            onClick={handleLogout}
            danger
          />
        </SectionCard>

        {/* ========== Device ========== */}
        <SectionCard title="设备管理">
          <div className="py-3">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blush rounded-full flex items-center justify-center">
                <DeviceMobile size={20} className="text-espresso" />
              </div>
              <div>
                <p className="text-[16px] font-medium text-espresso">AUREN Collar Pro</p>
                <p className="text-[12px] text-taupe">已配对 · 在线</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <div className="w-2 h-2 bg-safe rounded-full" />
                <span className="text-[12px] text-safe font-medium">正常</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-cream rounded-xl p-3 flex items-center gap-2">
                <BatteryFull size={18} className="text-amber" />
                <div>
                  <p className="text-[14px] font-semibold text-espresso">78%</p>
                  <p className="text-[10px] text-taupe">电量</p>
                </div>
              </div>
              <div className="bg-cream rounded-xl p-3 flex items-center gap-2">
                <WifiHigh size={18} className="text-sky" />
                <div>
                  <p className="text-[14px] font-semibold text-espresso">已连接</p>
                  <p className="text-[10px] text-taupe">WiFi</p>
                </div>
              </div>
              <div className="bg-cream rounded-xl p-3 flex items-center gap-2">
                <HardDrives size={18} className="text-taupe" />
                <div>
                  <p className="text-[14px] font-semibold text-espresso">4.2GB</p>
                  <p className="text-[10px] text-taupe">已用存储</p>
                </div>
              </div>
              <div className="bg-cream rounded-xl p-3 flex items-center gap-2">
                <Cpu size={18} className="text-taupe" />
                <div>
                  <p className="text-[14px] font-semibold text-espresso">v2.1.4</p>
                  <p className="text-[10px] text-taupe">固件版本</p>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ========== Pet Finder ========== */}
        <SectionCard title="寻宠模式">
          <ToggleItem
            icon={<MapPin size={20} />}
            label="寻宠模式"
            active={petFinderOn}
            onChange={() => setPetFinderOn(!petFinderOn)}
          />
          <Divider />
          <ToggleItem
            icon={<Crosshair size={20} />}
            label="电子围栏"
            active={fenceOn}
            onChange={() => setFenceOn(!fenceOn)}
          />
          {fenceOn && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-4 pb-3"
            >
              <div className="bg-cream rounded-xl p-3 space-y-3">
                <div>
                  <label className="text-[12px] text-taupe block mb-1">围栏中心地址</label>
                  <input
                    type="text"
                    defaultValue="北京市朝阳区中央公园北门"
                    className="w-full h-10 bg-warmWhite rounded-lg px-3 text-[14px] text-espresso border border-sand focus:border-amber focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[12px] text-taupe block mb-1">围栏半径</label>
                  <input
                    type="range"
                    min={100}
                    max={2000}
                    step={100}
                    defaultValue={500}
                    className="w-full accent-amber"
                  />
                  <div className="flex justify-between text-[10px] text-taupe mt-1">
                    <span>100m</span>
                    <span>500m</span>
                    <span>2000m</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </SectionCard>

        {/* ========== Privacy ========== */}
        <SectionCard title="隐私与数据">
          <ToggleItem
            icon={<Microphone size={20} />}
            label="麦克风授权"
            active={micAuth}
            onChange={() => setMicAuth(!micAuth)}
          />
          <Divider />
          <ToggleItem
            icon={<UserCircle size={20} />}
            label="人脸脱敏"
            active={faceBlur}
            onChange={() => setFaceBlur(!faceBlur)}
          />
          <Divider />
          <ArrowItem
            icon={<DownloadSimple size={20} />}
            label="下载我的数据"
          />
          <Divider />
          <ArrowItem
            icon={<Trash size={20} />}
            label="删除账户与数据"
            danger
          />
        </SectionCard>

        {/* ========== Notifications ========== */}
        <SectionCard title="通知设置">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-taupe" />
              <span className="text-[16px] text-espresso">每日推送时间</span>
            </div>
            <input
              type="time"
              value={pushTime}
              onChange={(e) => setPushTime(e.target.value)}
              className="bg-cream rounded-lg px-2 py-1 text-[14px] text-espresso border border-sand focus:border-amber focus:outline-none"
            />
          </div>
          <Divider />
          <ToggleItem
            icon={<Users size={20} />}
            label="社区互动通知"
            active={communityNotify}
            onChange={() => setCommunityNotify(!communityNotify)}
          />
          <Divider />
          <ToggleItem
            icon={<WarningOctagon size={20} />}
            label="紧急警示通知"
            active={emergencyAlert}
            onChange={() => setEmergencyAlert(!emergencyAlert)}
          />
        </SectionCard>

        {/* ========== Subscription ========== */}
        <SectionCard title="订阅计划">
          <div className="py-3 space-y-3">
            {/* Free Plan */}
            <div className="bg-cream rounded-xl p-4 border border-sand relative">
              <div className="absolute top-3 right-3 flex items-center gap-1 text-[12px] text-safe font-medium">
                <Check size={14} weight="bold" />
                当前计划
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Star size={18} className="text-taupe" />
                <span className="text-[16px] font-semibold text-espresso">Free</span>
              </div>
              <ul className="space-y-1">
                <li className="text-[14px] text-taupe flex items-center gap-2">
                  <Check size={14} className="text-safe" />
                  每日基础故事
                </li>
                <li className="text-[14px] text-taupe flex items-center gap-2">
                  <Check size={14} className="text-safe" />
                  实时位置追踪
                </li>
                <li className="text-[14px] text-taupe flex items-center gap-2">
                  <Check size={14} className="text-safe" />
                  7天数据存储
                </li>
              </ul>
            </div>

            {/* Premium Plan */}
            <div className="bg-blush rounded-xl p-4 border border-amber/30 relative">
              <div className="flex items-center gap-2 mb-2">
                <Crown size={18} className="text-amber" />
                <span className="text-[16px] font-semibold text-espresso">Premium</span>
              </div>
              <ul className="space-y-1">
                <li className="text-[14px] text-espresso flex items-center gap-2">
                  <BookBookmark size={14} className="text-amber" />
                  LoRA 深度训练
                </li>
                <li className="text-[14px] text-espresso flex items-center gap-2">
                  <Star size={14} className="text-amber" />
                  年度回忆录
                </li>
                <li className="text-[14px] text-espresso flex items-center gap-2">
                  <Printer size={14} className="text-amber" />
                  纸质打印故事
                </li>
              </ul>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="mt-3 w-full h-10 bg-amber rounded-full text-[14px] font-semibold text-espresso shadow-[0_2px_8px_rgba(240,168,84,0.3)] active:shadow-none"
              >
                升级 Premium
              </motion.button>
            </div>
          </div>
        </SectionCard>

        {/* ========== Language ========== */}
        <SectionCard title="语言">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Translate size={20} className="text-taupe" />
              <span className="text-[16px] text-espresso">语言 / Language</span>
            </div>
            <div className="flex items-center bg-cream rounded-lg p-0.5">
              <button
                onClick={() => setLangEn(false)}
                className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-all ${
                  !langEn ? 'bg-amber text-espresso' : 'text-taupe'
                }`}
              >
                中文
              </button>
              <button
                onClick={() => setLangEn(true)}
                className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-all ${
                  langEn ? 'bg-amber text-espresso' : 'text-taupe'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </SectionCard>

        {/* ========== Help ========== */}
        <SectionCard title="帮助与反馈">
          <ArrowItem
            icon={<Question size={20} />}
            label="帮助中心"
          />
          <Divider />
          <ArrowItem
            icon={<Headset size={20} />}
            label="联系客服"
          />
          <Divider />
          <ArrowItem
            icon={<Info size={20} />}
            label="关于 AUREN"
            value="v1.2.0"
          />
        </SectionCard>

        {/* Bottom breathing room */}
        <div className="h-8" />
      </div>
    </div>
  );
};

export default Settings;
