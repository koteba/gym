import { Trainer, GymClass, Exercise, PlanTier } from './types';

export const trainers: Trainer[] = [
  {
    id: 't1',
    name: 'كريم الشريف',
    specialty: 'CrossFit & Strength',
    years: 8,
    certs: ['CrossFit L2', 'Personal Trainer'],
    bio: 'متخصص في بناء القوة الوظيفية، درّب أكثر من ٣٠٠ عضو نحو أهدافهم.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 't2',
    name: 'سارة منصور',
    specialty: 'Yoga & Mobility',
    years: 6,
    certs: ['RYT 500', 'Mobility Coach'],
    bio: 'تجمع بين اليوغا وتمارين المرونة لتحسين الأداء وتقليل الإصابات.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 't3',
    name: 'يوسف حداد',
    specialty: 'Boxing & HIIT',
    years: 10,
    certs: ['Boxing Coach L3', 'HIIT Specialist'],
    bio: 'مدرب ملاكمة سابق، يحوّل الحصص إلى تجربة عالية الطاقة والانضباط.',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e6349?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 't4',
    name: 'لينا خوري',
    specialty: 'Cardio & Nutrition',
    years: 5,
    certs: ['Nutrition Coach', 'Cardio Specialist'],
    bio: 'تركز على الأداء القلبي والتغذية المتوازنة لنتائج مستدامة.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop',
  },
];

export const classes: GymClass[] = [
  { id: 'c1', name: 'كروسفت', nameEn: 'CrossFit', day: 'السبت', time: '07:00', trainerId: 't1', capacity: 16, booked: 11, difficulty: 'متقدم' },
  { id: 'c2', name: 'يوغا', nameEn: 'Yoga', day: 'السبت', time: '09:00', trainerId: 't2', capacity: 20, booked: 8, difficulty: 'مبتدئ' },
  { id: 'c3', name: 'هيت', nameEn: 'HIIT', day: 'الأحد', time: '18:00', trainerId: 't3', capacity: 18, booked: 17, difficulty: 'متوسط' },
  { id: 'c4', name: 'تمارين قوة', nameEn: 'Strength Training', day: 'الإثنين', time: '17:00', trainerId: 't1', capacity: 14, booked: 6, difficulty: 'متوسط' },
  { id: 'c5', name: 'كارديو بلاست', nameEn: 'Cardio Blast', day: 'الثلاثاء', time: '19:00', trainerId: 't4', capacity: 20, booked: 12, difficulty: 'مبتدئ' },
  { id: 'c6', name: 'ملاكمة', nameEn: 'Boxing', day: 'الأربعاء', time: '18:30', trainerId: 't3', capacity: 12, booked: 12, difficulty: 'متقدم' },
  { id: 'c7', name: 'يوغا مسائية', nameEn: 'Yoga', day: 'الخميس', time: '20:00', trainerId: 't2', capacity: 20, booked: 5, difficulty: 'مبتدئ' },
  { id: 'c8', name: 'كروسفت', nameEn: 'CrossFit', day: 'الجمعة', time: '10:00', trainerId: 't1', capacity: 16, booked: 9, difficulty: 'متقدم' },
];

export const exercises: Exercise[] = [
  { id: 'e1', name: 'ضغط بنش', nameEn: 'Bench Press', muscle: 'صدر', difficulty: 'متوسط', description: 'استلقِ على المقعد وادفع البار للأعلى مع تثبيت الكتفين.', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500&auto=format&fit=crop' },
  { id: 'e2', name: 'تجديف بار', nameEn: 'Barbell Row', muscle: 'ظهر', difficulty: 'متوسط', description: 'انحنِ للأمام واسحب البار نحو البطن مع تثبيت الظهر مستقيماً.', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=500&auto=format&fit=crop' },
  { id: 'e3', name: 'سكوات', nameEn: 'Squat', muscle: 'أرجل', difficulty: 'متوسط', description: 'انزل بالوركين للخلف والأسفل مع إبقاء الصدر مرفوعاً.', image: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?q=80&w=500&auto=format&fit=crop' },
  { id: 'e4', name: 'ضغط كتف', nameEn: 'Shoulder Press', muscle: 'أكتاف', difficulty: 'متوسط', description: 'ادفع الدمبل أو البار للأعلى فوق الرأس بحركة متحكمة.', image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=500&auto=format&fit=crop' },
  { id: 'e5', name: 'بايسبس كيرل', nameEn: 'Bicep Curl', muscle: 'ذراعين', difficulty: 'مبتدئ', description: 'ثبّت المرفقين وارفع الدمبل بحركة معزولة للأعلى.', image: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=500&auto=format&fit=crop' },
  { id: 'e6', name: 'بلانك', nameEn: 'Plank', muscle: 'Core', difficulty: 'مبتدئ', description: 'ثبّت جسمك بخط مستقيم على الساعدين وأصابع القدمين.', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500&auto=format&fit=crop' },
  { id: 'e7', name: 'ديدليفت', nameEn: 'Deadlift', muscle: 'ظهر', difficulty: 'متقدم', description: 'ارفع البار من الأرض بظهر مستقيم ودفع من الوركين.', image: 'https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?q=80&w=500&auto=format&fit=crop' },
  { id: 'e8', name: 'لانجز', nameEn: 'Lunges', muscle: 'أرجل', difficulty: 'مبتدئ', description: 'تقدّم بخطوة للأمام وانزل حتى تصل الركبة الخلفية قرب الأرض.', image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?q=80&w=500&auto=format&fit=crop' },
];

export const plans: PlanTier[] = [
  { id: 'p1', name: 'شهرية', price: 49, period: 'شهر', features: ['دخول غير محدود', 'حجز حصص جماعية', 'متابعة تمارين أساسية'] },
  { id: 'p2', name: '٣ أشهر', price: 129, period: '٣ أشهر', features: ['كل ميزات الباقة الشهرية', 'جلسة تقييم شخصية', 'خصم ١٠٪ على الجلسات الخاصة'], highlight: true },
  { id: 'p3', name: 'سنوية', price: 449, period: 'سنة', features: ['كل ميزات باقة ٣ أشهر', 'جلستان خاصتان شهرياً', 'أولوية حجز الحصص المزدحمة'] },
];
