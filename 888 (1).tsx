import React, { useState, useEffect, useMemo, useRef } from 'react';

// Icon Components
const IconWallet = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const IconPlus = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
  </svg>
);

const IconFlame = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconFood = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const IconTrash = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const IconAlertTriangle = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const IconDice = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const IconDownload = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const IconUpload = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

const DEFAULT_CATEGORIES = [
  { id: 'food', name: 'อาหาร & ชาไข่มุก', allocatedPercent: 40, icon: '🍜', color: 'from-emerald-400 to-teal-500' },
  { id: 'travel', name: 'เดินทาง & เติมน้ำมัน', allocatedPercent: 20, icon: '🚌', color: 'from-blue-400 to-indigo-500' },
  { id: 'shopping', name: 'F ของออนไลน์ & ของใช้', allocatedPercent: 15, icon: '🛍️', color: 'from-amber-400 to-orange-500' },
  { id: 'party', name: 'บันเทิง/เกม/สังสรรค์', allocatedPercent: 15, icon: '🎮', color: 'from-purple-400 to-violet-500' },
  { id: 'savings', name: 'เงินออม & เซฟกระปุก', allocatedPercent: 10, icon: '🛡️', color: 'from-cyan-400 to-blue-500' }
];

const DEFAULT_TRANSACTIONS = [
  { id: 't1', title: 'ค่าหอพัก + ค่าน้ำไฟ', amount: 3500, type: 'expense', categoryId: 'food', date: '2026-09-01' },
  { id: 't2', title: 'ผู้ปกครองโอนค่าขนม', amount: 9000, type: 'income', categoryId: 'savings', date: '2026-09-01' },
  { id: 't3', title: 'ชาไข่มุกหวาน 100%', amount: 95, type: 'expense', categoryId: 'food', date: '2026-09-20' },
  { id: 't4', title: 'เติมน้ำมันมอเตอร์ไซค์', amount: 120, type: 'expense', categoryId: 'travel', date: '2026-09-21' },
  { id: 't5', title: 'ข้าวไข่เจียวทรงเครื่อง', amount: 40, type: 'expense', categoryId: 'food', date: '2026-09-21' }
];

const CHEAP_MENU_LIST = [
  { name: 'ข้าวไข่เจียวทรงเครื่องใส่พริกสด', price: 35, tip: 'ขอน้ำซุปฟรี + น้ำพริกเผาราชฉ่ำๆ', level: 'เซฟงบขั้นเทพ' },
  { name: 'มาม่าต้มยำปลากระป๋องใส่ไข่', price: 28, tip: 'ซื้อจาก 7-11 ต้มเองที่หอ ได้สารอาหารครบถ้วน', level: 'สูตรต้มในตำนาน' },
  { name: 'ข้าวผัดไข่ใส่โบโลน่า', price: 40, tip: 'สั่งพิเศษข้าว เพิ่มอิ่มยาวนานถึงดึก', level: 'อิ่มจุกๆ' },
  { name: 'ก๋วยเตี๋ยวเรือน้ำตกหมูธรรมดา', price: 45, tip: 'เน้นหยิบผักโหระพาและถั่วงอกฟรีไม่อั้น', level: 'อร่อยเด็ด' },
  { name: 'ข้าวราดแกง 1 อย่าง เน้นหมูทอด', price: 40, tip: 'ขอน้ำแกงราดข้าวเยอะๆ เพิ่มรสชาติ', level: 'ประหยัดสุด' },
  { name: 'ปลากระป๋องยำมะนาว + ข้าวสวย', price: 32, tip: 'จัดจ้านแก้เลี่ยน ประหยัดงบสุดขีด', level: 'อร่อยประหยัด' }
];

const CHEEKY_QUOTES = [
  "ไม่หล่อแต่ก่อกวน วันนี้เงินยังไม่หมด ถือว่ายังเก๋า!",
  "ถ้าใช้เงินเกินงบวันนี้ มื้อเย็นโปรดสวดมนต์กินน้ำเปล่า",
  "ความรักกินไม่ได้ แต่ชาไข่มุกกินแล้วสดชื่นกระปรี้กระเปร่า",
  "เงินก้อนสุดท้ายของเดือน ห้ามแตะถ้านึกไม่อยากกินมาม่าแห้ง",
  "หล่อไม่มาก แต่วางแผนการเงินเป๊ะ บอกเลยว่าเท่สุดๆ"
];

const QUICK_PRESETS = [
  { title: '🍜 มาม่าต้มยำ', amount: 15, categoryId: 'food' },
  { title: '🧋 ชาไข่มุก', amount: 45, categoryId: 'food' },
  { title: '🍛 ข้าวราดแกง', amount: 40, categoryId: 'food' },
  { title: '⛽ เติมน้ำมัน', amount: 50, categoryId: 'travel' },
  { title: '🛍️ ของใช้หอพัก', amount: 100, categoryId: 'shopping' }
];

export default function App() {
  const STORAGE_KEY = 'mihlaw888_finance_v3';
  const fileInputRef = useRef(null);

  // Core Financial States
  const [monthlyIncome, setMonthlyIncome] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_income');
    return saved ? Number(saved) : 9000;
  });

  const [fixedExpenses, setFixedExpenses] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_fixed');
    return saved ? Number(saved) : 3500;
  });

  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_txs');
      return saved ? JSON.parse(saved) : DEFAULT_TRANSACTIONS;
    } catch {
      return DEFAULT_TRANSACTIONS;
    }
  });

  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_cats');
      return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
    } catch {
      return DEFAULT_CATEGORIES;
    }
  });

  const [savingsGoal, setSavingsGoal] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_savings');
      return saved ? JSON.parse(saved) : { title: 'เที่ยวปิดเทอม & คอนเสิร์ต', target: 5000, current: 1800 };
    } catch {
      return { title: 'เที่ยวปิดเทอม & คอนเสิร์ต', target: 5000, current: 1800 };
    }
  });

  const [emergencyFund, setEmergencyFund] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_efund');
      return saved ? JSON.parse(saved) : { target: 3000, current: 1200 };
    } catch {
      return { target: 3000, current: 1200 };
    }
  });

  // UI Interactive States
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  // Form Inputs
  const [txType, setTxType] = useState('expense');
  const [txAmount, setTxAmount] = useState('');
  const [txTitle, setTxTitle] = useState('');
  const [txCategory, setTxCategory] = useState('food');

  // Meal Generator State
  const [randomMenu, setRandomMenu] = useState(CHEAP_MENU_LIST[0]);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => { localStorage.setItem(STORAGE_KEY + '_income', monthlyIncome); }, [monthlyIncome]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY + '_fixed', fixedExpenses); }, [fixedExpenses]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY + '_txs', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY + '_cats', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY + '_savings', JSON.stringify(savingsGoal)); }, [savingsGoal]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY + '_efund', JSON.stringify(emergencyFund)); }, [emergencyFund]);

  // Toast Handler
  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const { spentToday, totalExpense, totalIncome, categoryStats, totalCategoryAllocatedPct } = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    let spentToday = 0;
    let totalExpense = 0;
    let totalIncome = 0;

    const catMap = {};
    categories.forEach(c => {
      catMap[c.id] = { ...c, spent: 0 };
    });

    transactions.forEach(tx => {
      const amt = Number(tx.amount) || 0;
      if (tx.type === 'expense') {
        totalExpense += amt;
        if (tx.date === todayStr) {
          spentToday += amt;
        }
        if (catMap[tx.categoryId]) {
          catMap[tx.categoryId].spent += amt;
        }
      } else if (tx.type === 'income') {
        totalIncome += amt;
      }
    });

    const totalEffectiveIncome = Number(monthlyIncome) + totalIncome;
    const remainingBudget = Math.max(0, totalEffectiveIncome - Number(fixedExpenses) - totalExpense);

    let totalAllocatedPct = 0;
    const categoryStats = categories.map(c => {
      const allocatedPercent = Number(c.allocatedPercent) || 0;
      totalAllocatedPct += allocatedPercent;
      const budgetLimit = Math.round((remainingBudget + totalExpense) * (allocatedPercent / 100));
      const spent = catMap[c.id] ? catMap[c.id].spent : 0;
      const remaining = Math.max(0, budgetLimit - spent);
      const percentUsed = budgetLimit > 0 ? Math.min(100, Math.round((spent / budgetLimit) * 100)) : 0;

      return {
        ...c,
        allocatedPercent,
        budgetLimit,
        spent,
        remaining,
        percentUsed
      };
    });

    return {
      spentToday,
      totalExpense,
      totalIncome,
      categoryStats,
      totalCategoryAllocatedPct: totalAllocatedPct
    };
  }, [transactions, categories, monthlyIncome, fixedExpenses]);

  const totalEffectiveIncome = Number(monthlyIncome) + totalIncome;
  const remainingBudget = totalEffectiveIncome - Number(fixedExpenses) - totalExpense;

  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const currentDayOfMonth = now.getDate();
  const daysLeft = Math.max(1, daysInMonth - currentDayOfMonth + 1);

  const dailyAllowance = Math.round(Math.max(0, remainingBudget) / daysLeft);
  const todayRemaining = dailyAllowance - spentToday;

  const spendingPercentage = (totalEffectiveIncome - fixedExpenses) > 0
    ? Math.min(100, Math.round((totalExpense / (totalEffectiveIncome - fixedExpenses)) * 100))
    : 0;

  const handleAddTransaction = (e) => {
    if (e) e.preventDefault();
    if (!txAmount || isNaN(Number(txAmount)) || Number(txAmount) <= 0) {
      triggerToast('⚠️ กรุณากรอกจำนวนเงินให้ถูกต้อง');
      return;
    }
    const newTx = {
      id: 'tx_' + Date.now(),
      title: txTitle.trim() || (txType === 'income' ? 'รายรับ' : 'รายจ่ายทั่วไป'),
      amount: Number(txAmount),
      type: txType,
      categoryId: txCategory,
      date: new Date().toISOString().split('T')[0]
    };
    setTransactions(prev => [newTx, ...prev]);
    setTxAmount('');
    setTxTitle('');
    setShowAddModal(false);
    triggerToast(`✅ บันทึก${txType === 'income' ? 'รายรับ' : 'รายจ่าย'} ฿${newTx.amount} เรียบร้อย!`);
  };

  const handleAddPreset = (preset) => {
    const newTx = {
      id: 'tx_' + Date.now(),
      title: preset.title,
      amount: Number(preset.amount),
      type: 'expense',
      categoryId: preset.categoryId,
      date: new Date().toISOString().split('T')[0]
    };
    setTransactions(prev => [newTx, ...prev]);
    triggerToast(`⚡ บันทึกเร็ว: ${preset.title} ฿${preset.amount} แล้ว!`);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    triggerToast('🗑️ ลบรายการเรียบร้อยแล้ว');
  };

  const handleCategorySliderChange = (id, newPct) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, allocatedPercent: Number(newPct) } : c));
  };

  const handleExportCSV = () => {
    if (transactions.length === 0) {
      triggerToast('⚠️ ยังไม่มีรายการให้ส่งออก');
      return;
    }
    let csvContent = "\uFEFFวันที่,ประเภท,รายการ,หมวดหมู่,จำนวนเงิน(บาท)\n";
    transactions.forEach(tx => {
      const cat = categories.find(c => c.id === tx.categoryId);
      const catName = tx.type === 'income' ? 'รายรับ' : (cat ? cat.name : 'ทั่วไป');
      const typeStr = tx.type === 'income' ? 'รายรับ' : 'รายจ่าย';
      csvContent += `"${tx.date}","${typeStr}","${tx.title}","${catName}",${tx.amount}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Finance888_Transactions_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    triggerToast('📊 ส่งออกไฟล์ CSV เรียบร้อยแล้ว!');
  };

  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'ไม่หล่อแต่ก่อกวน ไฟแนนซ์ 888',
        text: 'เว็บบันทึกงบรายวันฉบับเด็กหอ ไม่หล่อแต่ก่อกวน!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      triggerToast('🔗 คัดลอกลิงก์เรียบร้อยแล้ว!');
    }
  };

  const handleExportData = () => {
    const exportData = { monthlyIncome, fixedExpenses, categories, transactions, savingsGoal, emergencyFund };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = dataStr;
    downloadAnchor.download = `Finance888_Backup_${new Date().toISOString().split('T')[0]}.json`;
    downloadAnchor.click();
    triggerToast('📥 ส่งออกไฟล์สำรองข้อมูลเรียบร้อยแล้ว!');
  };

  const handleImportData = (e) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed.monthlyIncome) setMonthlyIncome(parsed.monthlyIncome);
          if (parsed.fixedExpenses) setFixedExpenses(parsed.fixedExpenses);
          if (parsed.categories) setCategories(parsed.categories);
          if (parsed.transactions) setTransactions(parsed.transactions);
          if (parsed.savingsGoal) setSavingsGoal(parsed.savingsGoal);
          if (parsed.emergencyFund) setEmergencyFund(parsed.emergencyFund);
          triggerToast('🎉 นำเข้าข้อมูลสำเร็จเรียบร้อย!');
        } catch {
          triggerToast('❌ ไฟล์ JSON ไม่ถูกต้อง');
        }
      };
    }
  };

  const spinCheapMenu = () => {
    setIsSpinning(true);
    let count = 0;
    const interval = setInterval(() => {
      const randIdx = Math.floor(Math.random() * CHEAP_MENU_LIST.length);
      setRandomMenu(CHEAP_MENU_LIST[randIdx]);
      count++;
      if (count > 10) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 90);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-400 selection:text-slate-950">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-sm bg-emerald-400 text-slate-950 px-4 py-3 rounded-2xl shadow-2xl font-bold flex items-center justify-between text-xs sm:text-sm border border-emerald-300">
          <span>{String(toastMsg)}</span>
          <button onClick={() => setToastMsg(null)} className="ml-2 px-2 py-0.5 hover:bg-emerald-500 rounded-lg">✕</button>
        </div>
      )}

      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-400 via-teal-400 to-cyan-400 flex items-center justify-center font-black text-slate-950 text-lg shadow-lg shadow-emerald-500/20">
              888
            </div>
            <div>
              <h1 className="font-extrabold text-base tracking-tight bg-gradient-to-r from-emerald-400 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                ไม่หล่อแต่ก่อกวน <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">FINANCE</span>
              </h1>
              <p className="text-[11px] text-slate-400">ระบบคำนวณเงินรายวันฉบับเด็กหอ</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button onClick={handleShareApp} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-xs text-slate-300 transition active:scale-95">
              📤
            </button>
            <button onClick={() => setShowSettingsModal(true)} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-xs text-slate-300 transition active:scale-95">
              ⚙️
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-md mx-auto px-4 py-5 pb-28 space-y-5">
        
        {/* Quote Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-emerald-500/20 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
            <IconFlame className="w-5 h-5 animate-pulse" />
          </div>
          <p className="text-xs font-medium text-slate-300">
            "{CHEEKY_QUOTES[currentDayOfMonth % CHEEKY_QUOTES.length]}"
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {[
            { id: 'dashboard', label: '📊 งบรายวัน' },
            { id: 'partition', label: '🍕 หมวดหมู่งบ' },
            { id: 'tracker', label: '💸 รายการ' },
            { id: 'savings', label: '🎯 เป้าหมายออม' },
            { id: 'hacks', label: '🍜 เมนูรอดตาย' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================= VIEW 1: DASHBOARD ================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-5">
            <div className={`relative p-5 rounded-3xl border shadow-2xl transition-all ${
              dailyAllowance < 0 ? 'bg-gradient-to-br from-rose-950/80 via-slate-900 to-slate-950 border-rose-500/40 shadow-rose-950/30' : 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-emerald-500/30 shadow-emerald-950/20'
            }`}>
              <div className="flex justify-between items-start mb-2">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  ⚡ งบปลอดภัยใช้ได้วันนี้
                </span>
                <span className="text-[11px] text-slate-400">เหลือ {daysLeft} วันในเดือนนี้</span>
              </div>

              <div className="flex items-baseline gap-2 my-2">
                <span className={`text-4xl sm:text-5xl font-black tracking-tight ${dailyAllowance < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  ฿{dailyAllowance.toLocaleString()}
                </span>
                <span className="text-slate-400 text-xs font-semibold">/ วัน</span>
              </div>

              <div className="space-y-1.5 mt-3">
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>จ่ายวันนี้แล้ว: ฿{spentToday.toLocaleString()}</span>
                  <span className={todayRemaining < 0 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {todayRemaining < 0 ? `เกินงบ ฿${Math.abs(todayRemaining)}` : `ช้อปต่อได้อีก ฿${todayRemaining}`}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      spentToday > dailyAllowance ? 'bg-rose-500' : 'bg-gradient-to-r from-emerald-400 to-teal-400'
                    }`}
                    style={{ width: `${Math.min(100, (spentToday / (dailyAllowance || 1)) * 100)}%` }}
                  />
                </div>
              </div>

              <p className="text-[10px] text-slate-400 italic mt-3">
                💡 คำนวณจาก (เงินคงเหลือหลังหักค่าใช้จ่ายประจำ ฿{remainingBudget.toLocaleString()}) ÷ ({daysLeft} วัน)
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-medium">💵 รายรับรวมสุทธิ</span>
                <p className="text-base font-bold text-slate-100 mt-0.5">฿{totalEffectiveIncome.toLocaleString()}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-medium">🏠 ค่าหอ & ประจำ</span>
                <p className="text-base font-bold text-rose-400 mt-0.5">฿{fixedExpenses.toLocaleString()}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-medium">🛒 จ่ายไปแล้วเดือนนี้</span>
                <p className="text-base font-bold text-amber-400 mt-0.5">฿{totalExpense.toLocaleString()}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 font-medium">💰 เงินคงเหลือใช้สอย</span>
                <p className="text-base font-bold text-emerald-400 mt-0.5">฿{remainingBudget.toLocaleString()}</p>
              </div>
            </div>

            {/* Warning Alert */}
            {spendingPercentage > 75 && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                <IconAlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <b className="block text-rose-200">โหมดต้มมาม่าทำงาน!</b>
                  คุณใช้เงินไปแล้ว {spendingPercentage}% ของงบเดือนนี้ แนะนำสุ่มเมนูรอดตายด่วน!
                </div>
              </div>
            )}

            {/* Category Quick Scroll Cards */}
            <div className="space-y-2">
              <span className="text-xs text-slate-400 font-semibold block">หมวดหมู่งบประมาณ</span>
              <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                {categoryStats.map(cat => (
                  <div key={cat.id} className="min-w-[130px] p-3 rounded-2xl bg-slate-900 border border-slate-800 flex-shrink-0 space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{typeof cat.icon === 'string' ? cat.icon : '📌'}</span>
                      <span className="text-xs font-bold truncate text-slate-200">{typeof cat.name === 'string' ? cat.name : ''}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-100">
                      ฿{cat.spent.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">/ ฿{cat.budgetLimit.toLocaleString()}</span>
                    </p>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${cat.color || 'from-emerald-400 to-teal-500'}`}
                        style={{ width: `${Math.min(100, cat.percentUsed)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions Feed */}
            <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-200">📜 รายการล่าสุด</span>
                <span className="text-slate-400">{transactions.length} รายการ</span>
              </div>

              <div className="space-y-2">
                {transactions.length === 0 ? (
                  <p className="text-center py-6 text-slate-500 text-xs">ยังไม่มีรายการบันทึก</p>
                ) : (
                  transactions.slice(0, 5).map(tx => {
                    const categoryObj = categories.find(c => c.id === tx.categoryId);
                    const catIcon = categoryObj && typeof categoryObj.icon === 'string' ? categoryObj.icon : '💸';
                    return (
                      <div key={tx.id} className="p-2.5 rounded-xl bg-slate-850 border border-slate-800 flex items-center justify-between text-xs hover:bg-slate-800/80 transition">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sm">
                            {tx.type === 'income' ? '💵' : catIcon}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-200">{String(tx.title || '')}</p>
                            <span className="text-[10px] text-slate-400">{String(tx.date || '')}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {tx.type === 'income' ? '+' : '-'}฿{(Number(tx.amount) || 0).toLocaleString()}
                          </span>
                          <button onClick={() => handleDeleteTransaction(tx.id)} className="p-1 text-slate-500 hover:text-rose-400">
                            <IconTrash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>
        )}

        {/* ================= VIEW 2: PARTITION SLIDERS ================= */}
        {activeTab === 'partition' && (
          <div className="space-y-4">
            <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
              <h3 className="font-bold text-sm text-slate-100">🍕 ปรับสัดส่วนหมวดหมู่งบ (Budget Sliders)</h3>
              <p className="text-xs text-slate-400">ลากสไลเดอร์ปรับเปอร์เซ็นต์โควต้าของแต่ละหมวดได้ทันที</p>
            </div>

            <div className={`p-3 rounded-2xl text-xs font-bold flex justify-between items-center ${
              totalCategoryAllocatedPct === 100
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
            }`}>
              <span>รวมสัดส่วนตอนนี้: {totalCategoryAllocatedPct}%</span>
              <span>{totalCategoryAllocatedPct === 100 ? '✓ ครบ 100% พอดี' : '⚠️ ปรับให้รวมได้ 100%'}</span>
            </div>

            <div className="space-y-3">
              {categoryStats.map(cat => (
                <div key={cat.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="flex items-center gap-1.5">
                      <span>{typeof cat.icon === 'string' ? cat.icon : '📌'}</span>
                      <span>{typeof cat.name === 'string' ? cat.name : ''}</span>
                    </span>
                    <span className="text-emerald-400">{cat.allocatedPercent}% (฿{cat.budgetLimit.toLocaleString()})</span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={cat.allocatedPercent}
                    onChange={(e) => handleCategorySliderChange(cat.id, e.target.value)}
                    className="w-full accent-emerald-400 bg-slate-800 rounded-lg cursor-pointer h-2"
                  />

                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>ใช้ไปแล้ว: ฿{cat.spent.toLocaleString()}</span>
                    <span>คงเหลือหมวดนี้: ฿{cat.remaining.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= VIEW 3: TRACKER ================= */}
        {activeTab === 'tracker' && (
          <div className="space-y-4">
            
            <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-200 block">⚡ บันทึกด่วน (Quick Presets)</span>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {QUICK_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAddPreset(preset)}
                    className="px-3 py-2 rounded-xl bg-slate-850 hover:bg-emerald-500/10 border border-slate-750 hover:border-emerald-500/40 text-xs font-medium whitespace-nowrap text-slate-200 transition active:scale-95 flex items-center gap-1.5"
                  >
                    <span>{preset.title}</span>
                    <span className="text-emerald-400 font-bold">฿{preset.amount}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-sm text-slate-100">💸 บันทึกรายการใหม่</h3>
              
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-800 rounded-xl">
                <button
                  onClick={() => setTxType('expense')}
                  className={`py-2 rounded-lg text-xs font-bold transition ${txType === 'expense' ? 'bg-rose-500 text-white' : 'text-slate-400'}`}
                >
                  รายจ่าย (-)
                </button>
                <button
                  onClick={() => setTxType('income')}
                  className={`py-2 rounded-lg text-xs font-bold transition ${txType === 'income' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'}`}
                >
                  รายรับ (+)
                </button>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">จำนวนเงิน (บาท)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={txAmount}
                  onChange={(e) => setTxAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 font-bold text-xl text-center focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">ชื่อรายการ / โน้ต</label>
                <input
                  type="text"
                  placeholder="เช่น ข้าวหมูกรอบ, เบิกเงินผู้ปกครอง"
                  value={txTitle}
                  onChange={(e) => setTxTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              {txType === 'expense' && (
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">เลือกหมวดหมู่</label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map(c => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setTxCategory(c.id)}
                        className={`p-2.5 rounded-xl border text-xs text-left font-medium flex items-center gap-2 ${
                          txCategory === c.id
                            ? 'bg-emerald-500/10 border-emerald-400 text-emerald-300'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        <span>{typeof c.icon === 'string' ? c.icon : '📌'}</span>
                        <span className="truncate">{typeof c.name === 'string' ? c.name : ''}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleAddTransaction}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold text-xs hover:brightness-110 active:scale-95 transition"
              >
                บันทึกรายการทันที
              </button>
            </div>

            {/* Transactions History Full List */}
            <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs text-slate-200">📜 ประวัติรายการทั้งหมด</span>
                <button
                  onClick={handleExportCSV}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[11px] text-emerald-400 font-bold flex items-center gap-1"
                >
                  <IconDownload className="w-3.5 h-3.5" />
                  <span>โหลด CSV</span>
                </button>
              </div>
              <div className="space-y-2">
                {transactions.map(tx => {
                  const cat = categories.find(c => c.id === tx.categoryId);
                  const iconStr = cat && typeof cat.icon === 'string' ? cat.icon : '💸';
                  return (
                    <div key={tx.id} className="p-3 rounded-2xl bg-slate-850 border border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sm">
                          {tx.type === 'income' ? '💵' : iconStr}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-200">{String(tx.title || '')}</p>
                          <span className="text-[10px] text-slate-400">{String(tx.date || '')} • {cat ? String(cat.name || '') : 'รายรับ'}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {tx.type === 'income' ? '+' : '-'}฿{(Number(tx.amount) || 0).toLocaleString()}
                        </span>
                        <button onClick={() => handleDeleteTransaction(tx.id)} className="p-1 text-slate-500 hover:text-rose-400">
                          <IconTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* ================= VIEW 4: SAVINGS ================= */}
        {activeTab === 'savings' && (
          <div className="space-y-4">
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3">
              <span className="font-bold text-sm text-slate-100 block">🎯 เป้าหมายการออมเงิน</span>
              
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-36 h-36 transform -rotate-90">
                  <circle cx="72" cy="72" r="58" stroke="#1e293b" strokeWidth="12" fill="transparent" />
                  <circle
                    cx="72"
                    cy="72"
                    r="58"
                    stroke="#34d399"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={364.4}
                    strokeDashoffset={364.4 - (364.4 * Math.min(1, (savingsGoal.current || 0) / (savingsGoal.target || 1)))}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-slate-100">
                    {Math.round(((savingsGoal.current || 0) / (savingsGoal.target || 1)) * 100)}%
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">ของเป้าหมาย</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-200 text-sm">{String(savingsGoal.title || '')}</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  เก็บได้แล้ว ฿{(savingsGoal.current || 0).toLocaleString()} / เป้าหมาย ฿{(savingsGoal.target || 0).toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    setSavingsGoal(prev => ({ ...prev, current: (prev.current || 0) + 100 }));
                    triggerToast('🎉 หยอดกระปุก +100 บาท!');
                  }}
                  className="py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition active:scale-95"
                >
                  +100 บาท
                </button>
                <button
                  onClick={() => {
                    setSavingsGoal(prev => ({ ...prev, current: (prev.current || 0) + 500 }));
                    triggerToast('🚀 หยอดกระปุก +500 บาท!');
                  }}
                  className="py-2.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/30 text-xs font-bold transition active:scale-95"
                >
                  +500 บาท
                </button>
              </div>
            </div>

            {/* Emergency Fund Card */}
            <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-100">🛡️ เงินสำรองฉุกเฉิน</span>
                <span className="text-emerald-400 font-bold">
                  ฿{(emergencyFund.current || 0).toLocaleString()} / ฿{(emergencyFund.target || 0).toLocaleString()}
                </span>
              </div>

              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
                  style={{ width: `${Math.min(100, ((emergencyFund.current || 0) / (emergencyFund.target || 1)) * 100)}%` }}
                />
              </div>

              <button
                onClick={() => {
                  setEmergencyFund(prev => ({ ...prev, current: (prev.current || 0) + 200 }));
                  triggerToast('🛡️ เพิ่มเงินสำรองฉุกเฉิน +200 บาท');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold text-xs border border-slate-700 transition"
              >
                + ฝากเงินสำรองฉุกเฉิน 200 บาท
              </button>
            </div>
          </div>
        )}

        {/* ================= VIEW 5: CHEAP MEAL GENERATOR ================= */}
        {activeTab === 'hacks' && (
          <div className="space-y-4">
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3">
              <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 text-amber-400">
                <IconDice className="w-7 h-7" />
              </div>
              
              <h3 className="text-base font-extrabold text-slate-100">🎰 สุ่มเมนูรอดตายประจำวัน</h3>
              <p className="text-xs text-slate-400">เมื่อคิดไม่ออกว่าจะกินอะไรให้ประหยัดงบ กดสุ่มได้เลย!</p>

              <div className="p-4 rounded-2xl bg-slate-850 border border-amber-500/30 space-y-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                  {String(randomMenu.level || '')}
                </span>
                <h4 className="text-xl font-black text-amber-400">{String(randomMenu.name || '')}</h4>
                <p className="text-sm font-bold text-slate-200">ประมาณ ฿{randomMenu.price}</p>
                <p className="text-[11px] text-slate-400 italic">💡 ทริกเด็ด: {String(randomMenu.tip || '')}</p>
              </div>

              <button
                onClick={spinCheapMenu}
                disabled={isSpinning}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold hover:brightness-110 active:scale-95 transition shadow-lg shadow-amber-500/20 text-xs"
              >
                {isSpinning ? '🎲 กำลังสุ่ม...' : '🔄 สุ่มเมนูใหม่!'}
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Floating Bottom Navigation Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-sm bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-2 shadow-2xl flex items-center justify-between">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex-1 py-1.5 text-[11px] font-medium rounded-xl flex flex-col items-center gap-0.5 ${activeTab === 'dashboard' ? 'text-emerald-400' : 'text-slate-400'}`}
        >
          <IconWallet className="w-4 h-4" />
          <span>หน้าหลัก</span>
        </button>

        <button
          onClick={() => { setTxType('expense'); setShowAddModal(true); }}
          className="w-12 h-12 -mt-6 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-400 text-slate-950 font-black shadow-lg shadow-emerald-500/40 flex items-center justify-center hover:scale-110 active:scale-95 transition"
        >
          <IconPlus className="w-6 h-6" />
        </button>

        <button
          onClick={() => setActiveTab('hacks')}
          className={`flex-1 py-1.5 text-[11px] font-medium rounded-xl flex flex-col items-center gap-0.5 ${activeTab === 'hacks' ? 'text-emerald-400' : 'text-slate-400'}`}
        >
          <IconFood className="w-4 h-4" />
          <span>เมนูรอดตาย</span>
        </button>
      </div>

      {/* ================= MODAL: ADD TRANSACTION ================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-end justify-center sm:items-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-100 text-sm">➕ บันทึกรายการ</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-200">✕</button>
            </div>

            <form onSubmit={handleAddTransaction} className="space-y-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">จำนวนเงิน (บาท)</label>
                <input
                  type="number"
                  required
                  placeholder="0.00"
                  value={txAmount}
                  onChange={(e) => setTxAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 font-bold text-xl text-center focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">ชื่อรายการ</label>
                <input
                  type="text"
                  placeholder="เช่น ชาไข่มุก, ข้าวเย็น"
                  value={txTitle}
                  onChange={(e) => setTxTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">หมวดหมู่</label>
                <select
                  value={txCategory}
                  onChange={(e) => setTxCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-emerald-400"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>
                      {typeof c.icon === 'string' ? c.icon : '📌'} {typeof c.name === 'string' ? c.name : ''}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold text-xs hover:brightness-110 active:scale-95 transition"
              >
                บันทึกทันที
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: SETTINGS & BACKUP ================= */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-100 text-sm">⚙️ ตั้งค่างบประมาณ & สำรองข้อมูล</h3>
              <button onClick={() => setShowSettingsModal(false)} className="text-slate-400 hover:text-slate-200">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">รายรับหลักประจำเดือน (บาท)</label>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">ค่าใช้จ่ายประจำ (ค่าหอ/ค่าน้ำไฟ) (บาท)</label>
                <input
                  type="number"
                  value={fixedExpenses}
                  onChange={(e) => setFixedExpenses(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-2">
                <span className="font-bold text-slate-300 block">💾 สำรองข้อมูล (Backup / Restore)</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleExportData}
                    className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium flex items-center justify-center gap-1.5"
                  >
                    <IconDownload className="w-4 h-4 text-emerald-400" />
                    <span>ส่งออกข้อมูล</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium flex items-center justify-center gap-1.5"
                  >
                    <IconUpload className="w-4 h-4 text-teal-400" />
                    <span>นำเข้าข้อมูล</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImportData}
                    accept="application/json"
                    className="hidden"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  setShowSettingsModal(false);
                  triggerToast('⚙️ บันทึกการตั้งค่าเรียบร้อย!');
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold text-xs hover:brightness-110 active:scale-95 transition"
              >
                ตกลง
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}