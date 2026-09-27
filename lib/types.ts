export type Difficulty = 'مبتدئ' | 'متوسط' | 'متقدم';

export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  years: number;
  certs: string[];
  bio: string;
  image: string;
}

export interface GymClass {
  id: string;
  name: string;
  nameEn: string;
  day: string;
  time: string;
  trainerId: string;
  capacity: number;
  booked: number;
  difficulty: Difficulty;
}

export interface Exercise {
  id: string;
  name: string;
  nameEn: string;
  muscle: 'صدر' | 'ظهر' | 'أرجل' | 'أكتاف' | 'ذراعين' | 'Core';
  difficulty: Difficulty;
  description: string;
  image: string;
}

export interface PlanTier {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  highlight?: boolean;
}

export interface Booking {
  id: string;
  classId: string;
  bookedAt: string;
}

export interface RoutineExercise {
  exerciseId: string;
  sets: number;
  reps: number;
}

export interface Routine {
  id: string;
  name: string;
  exercises: RoutineExercise[];
}

export interface SetLog {
  weight: number;
  reps: number;
}

export interface SessionLog {
  id: string;
  routineId: string;
  routineName: string;
  date: string;
  sets: { exerciseId: string; logs: SetLog[] }[];
  totalVolume: number;
}

export interface BodyMeasurement {
  date: string;
  weight: number;
  bodyFat?: number;
  waist?: number;
  chest?: number;
  arm?: number;
}

export interface Membership {
  name: string;
  phone: string;
  goal: string;
  planId: string;
  startDate: string;
  status: 'نشطة' | 'منتهية' | 'معلقة';
}
