import type { FC } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Heartbeat,
  Barbell,
  
  Pill,
  Syringe,
  CaretRight
} from 'phosphor-react';
import { useNavigate } from 'react-router';

const TaMore: FC = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: '健康记录',
      icon: <Heartbeat size={20} className="text-alert" />,
      items: [
        { label: '疫苗接种', value: '已完成 · 下次 2025.08', status: 'safe' },
        { label: '体内驱虫', value: '2025.01.15 · 已过期', status: 'warn' },
        { label: '体外驱虫', value: '2025.02.01 · 有效', status: 'safe' },
        { label: '年度体检', value: '2024.11.20 · 一切正常', status: 'safe' },
      ]
    },
    {
      title: '训练记录',
      icon: <Barbell size={20} className="text-amber" />,
      items: [
        { label: '坐下', value: '已掌握 · 成功率 95%', status: 'safe' },
        { label: '握手', value: '已掌握 · 成功率 88%', status: 'safe' },
        { label: '等待', value: '学习中 · 成功率 60%', status: 'warn' },
        { label: '召回', value: '已掌握 · 成功率 92%', status: 'safe' },
      ]
    },
    {
      title: '饮食记录',
      icon: <span className="text-coral text-[20px]">🥣</span>,
      items: [
        { label: '今日摄入', value: '380g 狗粮 + 零食', status: 'safe' },
        { label: '饮水量', value: '1.2L · 充足', status: 'safe' },
        { label: '最爱零食', value: '鸡肉干、胡萝卜', status: 'safe' },
        { label: '禁食食物', value: '巧克力、葡萄、洋葱', status: 'alert' },
      ]
    },
    {
      title: '医疗记录',
      icon: <Pill size={20} className="text-sky" />,
      items: [
        { label: '过敏史', value: '无已知过敏', status: 'safe' },
        { label: '既往疾病', value: '无', status: 'safe' },
        { label: '绝育状态', value: '已绝育 · 2024.12', status: 'safe' },
        { label: '保险信息', value: 'AUREN Care · 生效中', status: 'safe' },
      ]
    },
  ];

  return (
    <div className="min-h-[100dvh] bg-cream max-w-[430px] mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-warmWhite/90 backdrop-blur border-b border-sand">
        <div className="flex items-center px-4 h-12">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center -ml-2">
            <ArrowLeft size={24} className="text-espresso" />
          </button>
          <h1 className="flex-1 text-center text-[16px] font-semibold text-espresso pr-6">Bella 的更多</h1>
        </div>
      </div>

      <div className="px-4 pt-4 pb-8 space-y-4">
        {sections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.1 }}
            className="bg-warmWhite rounded-2xl border border-sand overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-sand">
              {section.icon}
              <p className="text-[15px] font-semibold text-espresso">{section.title}</p>
            </div>
            <div>
              {section.items.map((item, ii) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between px-4 py-3 ${
                    ii < section.items.length - 1 ? 'border-b border-sand/50' : ''
                  }`}
                >
                  <div>
                    <p className="text-[14px] text-espresso">{item.label}</p>
                    <p className="text-[12px] text-taupe mt-0.5">{item.value}</p>
                  </div>
                  <div className={`w-2.5 h-2.5 rounded-full ${
                    item.status === 'safe' ? 'bg-safe' :
                    item.status === 'warn' ? 'bg-warn' :
                    'bg-alert'
                  }`} />
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-warmWhite rounded-2xl border border-sand overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-sand">
            <p className="text-[15px] font-semibold text-espresso">快捷操作</p>
          </div>
          {[
            { label: '添加疫苗记录', icon: <Syringe size={18} /> },
            { label: '记录训练进度', icon: <Barbell size={18} /> },
            { label: '更新饮食日志', icon: <span className='text-[16px]'>🥣</span> },
          ].map((action) => (
            <button
              key={action.label}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-cream/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-taupe">{action.icon}</span>
                <span className="text-[14px] text-espresso">{action.label}</span>
              </div>
              <CaretRight size={16} className="text-sand" />
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TaMore;
