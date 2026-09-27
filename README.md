# قوّة — منصة نادي رياضي

منصة Next.js 14 (App Router + TypeScript) كاملة لإدارة نادي رياضي: عضويات، حجز حصص، تتبع تمارين، لوحة تقدم، ومدربون. التخزين حالياً في localStorage (بيانات تجريبية على جهاز المستخدم)، والكود مبني بحيث يسهل استبدال طبقة `lib/storage.ts` بطلبات API حقيقية لاحقاً.

## التشغيل محلياً

```bash
npm install
npm run dev
```

افتح http://localhost:3000

## النشر على Vercel

1. ارفع المشروع إلى مستودع GitHub.
2. من [vercel.com/new](https://vercel.com/new) اختر المستودع واضغط Deploy — لا حاجة لأي إعدادات إضافية (Next.js مكتشف تلقائياً).

أو عبر الأوامر:

```bash
npm i -g vercel
vercel
```

## هيكل المشروع

- `app/` — صفحات المسارات (الرئيسية، العضويات، الحصص، التمارين، تقدمي، المدربون، BMI)
- `components/` — كل المكونات القابلة لإعادة الاستخدام (ClassSchedule, MembershipPlans, WorkoutTracker, ProgressDashboard, TrainersGrid, BMICalculator, NotificationSystem...)
- `lib/` — الأنواع (`types.ts`)، البيانات التجريبية (`data.ts`)، وأدوات التخزين (`storage.ts`)

## ربط Backend لاحقاً

كل قراءة/كتابة تمر عبر `readStorage` / `writeStorage` في `lib/storage.ts`. لاستبدالها بـ API حقيقي، يكفي تعديل هاتين الدالتين (أو استبدال استدعاءاتهما بطلبات `fetch`) دون تغيير باقي المكونات.
