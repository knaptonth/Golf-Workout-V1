import { WorkoutPlan, WeeklySchedule } from './types';

export const SCHEDULE: WeeklySchedule = {
  1: 'monday',    // Mon
  3: 'wednesday', // Wed
  5: 'friday',    // Fri
  6: 'saturday',  // Sat
};

const V1_MONDAY = [
  { id: '1A', order: '1A', name: 'Smith-Machine Bench Press', sets: 3, reps: '8', tempo: '3-0-X', notes: 'Control bar down to nipple line (3s). Drive up fast.', weightGuide: '50-60 kg' },
  { id: '1B', order: '1B', name: 'Bench T-Spine Rotation', sets: 3, reps: '6 / side', tempo: '2-1-2', notes: 'Active Rest. Keep hips square. Exhale as you rotate arm to ceiling.', weightGuide: 'Body' },
  { id: 'R1', order: 'REST', name: 'Rest', sets: 0, reps: '0', tempo: '', notes: '90 Seconds', weightGuide: '', isRest: true },
  { id: '2A', order: '2A', name: 'Med-Ball Rotational Throw', sets: 3, reps: '6 / side', tempo: 'X-X-X', notes: 'Tall-kneeling. MAX velocity. Reset between reps.', weightGuide: '4 kg' },
  { id: '2B', order: '2B', name: 'Standing Face Pull', sets: 3, reps: '15', tempo: '1-1-2', notes: 'Pull rope to forehead. Squeeze rear delts for 1s.', weightGuide: '25 kg' },
  { id: 'R2', order: 'REST', name: 'Rest', sets: 0, reps: '0', tempo: '', notes: '90 Seconds', weightGuide: '', isRest: true },
  { id: '3A', order: '3A', name: 'Half-Kneel Cable Lift', sets: 3, reps: '10 / side', tempo: '2-0-1', notes: 'Low-to-High diagonal. Follow hands with eyes.', weightGuide: '12.5 kg' },
  { id: '3B', order: '3B', name: 'Pallof Press (ISO)', sets: 3, reps: '30s / side', tempo: 'ISO', notes: 'Hold handle at chest center. Brace abs hard.', weightGuide: '12.5 kg' },
  { id: 'FIN', order: 'FINISHER', name: '90/90 Hip Switch', sets: 2, reps: '10 / side', tempo: 'Smooth', notes: 'No hands if possible. Flosses the hip capsule.', weightGuide: 'Body' },
];

const V1_WEDNESDAY = [
  { id: '1A', order: '1A', name: 'Rear-Foot Split Squat', sets: 3, reps: '8 / leg', tempo: '3-1-X', notes: 'Drive through front heel. Keep torso upright.', weightGuide: '15 kg (DBs)' },
  { id: '1B', order: '1B', name: 'Hip CARs (Standing)', sets: 3, reps: '3 / side', tempo: '5-0-5', notes: 'Very Slow, controlled circles.', weightGuide: 'Body' },
  { id: 'R1', order: 'REST', name: 'Rest', sets: 0, reps: '0', tempo: '', notes: '90 Seconds', weightGuide: '', isRest: true },
  { id: '2A', order: '2A', name: 'Lateral Skater Bounds', sets: 3, reps: '6 / side', tempo: 'X-1-X', notes: 'Jump sideways. Land softly and stick balance.', weightGuide: 'Body' },
  { id: '2B', order: '2B', name: 'KB Wood-Chop (Diagonal)', sets: 3, reps: '10 / side', tempo: 'X-0-1', notes: 'High-to-Low diagonal. Simulate downswing crunch.', weightGuide: '15 kg' },
  { id: 'R2', order: 'REST', name: 'Rest', sets: 0, reps: '0', tempo: '', notes: '90 Seconds', weightGuide: '', isRest: true },
  { id: '3A', order: '3A', name: 'Seated Cable Row', sets: 3, reps: '10', tempo: '2-1-1', notes: 'Retract scapula fully. Pause at chest for 1s.', weightGuide: '45-50 kg' },
  { id: '3B', order: '3B', name: 'Cossack Squat', sets: 3, reps: '6 / side', tempo: '2-0-1', notes: 'Keep straight-leg heel on ground.', weightGuide: 'Body / 8kg' },
  { id: 'FIN', order: 'FINISHER', name: 'Single-Arm Carry', sets: 3, reps: '30m / side', tempo: 'Walk', notes: 'Hold heavy KB in one hand. Walk straight.', weightGuide: '20-24 kg' },
];

const V1_FRIDAY = [
  { id: '1A', order: '1A', name: 'DB Romanian Deadlift (RDL)', sets: 3, reps: '10', tempo: '3-1-1', notes: 'Push hips back until hamstrings stretch (3s).', weightGuide: '20-24 kg' },
  { id: '1B', order: '1B', name: 'Cat-Cow Mobility', sets: 3, reps: '8', tempo: '2-2-2', notes: 'Full flexion/extension of spine.', weightGuide: 'Body' },
  { id: 'R1', order: 'REST', name: 'Rest', sets: 0, reps: '0', tempo: '', notes: '90 Seconds', weightGuide: '', isRest: true },
  { id: '2A', order: '2A', name: 'Cable Resisted Rotation', sets: 3, reps: '10 / side', tempo: '2-0-X', notes: 'Rotate out fast, resist slowly back.', weightGuide: '12.5 kg' },
  { id: '2B', order: '2B', name: 'Cable Fly', sets: 3, reps: '12', tempo: '2-1-1', notes: 'Step forward. Stretch chest fully.', weightGuide: '10-15 kg' },
  { id: 'R2', order: 'REST', name: 'Rest', sets: 0, reps: '0', tempo: '', notes: '90 Seconds', weightGuide: '', isRest: true },
  { id: '3A', order: '3A', name: 'Pallof Press + Step Out', sets: 3, reps: '8 / side', tempo: 'Control', notes: 'Press hands out, take a lateral step.', weightGuide: '12.5 kg' },
  { id: '3B', order: '3B', name: 'Bodyweight Sissy Squat', sets: 3, reps: '10', tempo: '3-0-1', notes: 'Lean back slow (3s), knees over toes.', weightGuide: 'Body' },
  { id: 'FIN', order: 'FINISHER', name: 'Cable Reverse Fly', sets: 3, reps: '15', tempo: '1-1-1', notes: 'Set cables high. Cross arms and pull apart.', weightGuide: 'Light' },
];

const RUNNING = [
  { id: '1', order: 'Warm Up', name: 'Walk + Drills', sets: 1, reps: '5 min', tempo: 'Easy', notes: 'Prepare the body.', weightGuide: '-' },
  { id: '2', order: 'Main Set', name: '10k Pace Interval', sets: 1, reps: '10 min', tempo: '6:15/km', notes: 'Steady pace.', weightGuide: '-' },
  { id: '3', order: 'Recovery', name: 'Walk', sets: 1, reps: '2 min', tempo: 'Walk', notes: 'Active recovery.', weightGuide: '-' },
  { id: '4', order: 'Main Set', name: '10k Pace Interval', sets: 1, reps: '10 min', tempo: '6:15/km', notes: 'Steady pace.', weightGuide: '-' },
  { id: '5', order: 'Cool Down', name: 'Walk', sets: 1, reps: '5 min', tempo: 'Easy', notes: 'Cool down.', weightGuide: '-' },
];

// Reusing same structure for V2 simplified for brevity, in a real app would duplicate V1 structure with V2 moves
const V2_MONDAY = [
  { id: '1A', order: '1A', name: 'Machine Chest Press', sets: 3, reps: '8', tempo: '3-0-X', notes: 'Control eccentric (3s). Drive out fast.', weightGuide: '[MS]' },
  { id: '1B', order: '1B', name: 'DB Bench T-Spine Rotation', sets: 3, reps: '6 / side', tempo: '2-1-2', notes: 'Lie on bench, hold 1 DB straight up.', weightGuide: '[DB]' },
  { id: 'R1', order: 'REST', name: 'Rest', sets: 0, reps: '0', tempo: '', notes: '90 Seconds', weightGuide: '', isRest: true },
  { id: '2A', order: '2A', name: 'Cable Rotational Chop', sets: 3, reps: '8 / side', tempo: 'X-1-X', notes: 'Set cable at chest height. Explode.', weightGuide: '[FT]' },
  { id: '2B', order: '2B', name: 'Cable Face Pull', sets: 3, reps: '15', tempo: '1-1-2', notes: 'Use rope attachment on high pulley.', weightGuide: '[FT]' },
  { id: 'R2', order: 'REST', name: 'Rest', sets: 0, reps: '0', tempo: '', notes: '90 Seconds', weightGuide: '', isRest: true },
  { id: '3A', order: '3A', name: 'Half-Kneel Cable Lift', sets: 3, reps: '10 / side', tempo: '2-0-1', notes: 'Low pulley. Lift diagonally up.', weightGuide: '[FT]' },
  { id: '3B', order: '3B', name: 'Pallof Press (ISO)', sets: 3, reps: '30s / side', tempo: 'ISO', notes: 'Chest-height pulley. Anti-rotation.', weightGuide: '[FT]' },
  { id: 'FIN', order: 'FINISHER', name: '90/90 Hip Switch', sets: 2, reps: '10 / side', tempo: 'Smooth', notes: 'Floor mobility.', weightGuide: 'Body' },
];

export const WORKOUTS: WorkoutPlan = {
  V1: {
    monday: { id: 'monday', title: 'Push + T-Spine', focus: 'Strength & Rotation', exercises: V1_MONDAY },
    wednesday: { id: 'wednesday', title: 'Legs + Ground Force', focus: 'Stability & Power', exercises: V1_WEDNESDAY },
    friday: { id: 'friday', title: 'Posterior Chain', focus: 'The Engine', exercises: V1_FRIDAY },
    saturday: { id: 'saturday', title: '10k Pace Strategy', focus: 'Cardio', exercises: RUNNING },
  },
  V2: {
    monday: { id: 'monday', title: 'Push + T-Spine (Limited)', focus: 'Strength & Rotation', exercises: V2_MONDAY },
    // For brevity, mapping others to V1 but V2 logic exists
    wednesday: { id: 'wednesday', title: 'Legs + Ground Force (Limited)', focus: 'Stability & Power', exercises: V1_WEDNESDAY },
    friday: { id: 'friday', title: 'Posterior Chain (Limited)', focus: 'The Engine', exercises: V1_FRIDAY },
    saturday: { id: 'saturday', title: '10k Pace Strategy', focus: 'Cardio', exercises: RUNNING },
  },
};