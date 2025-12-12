import { WorkoutPlan, WeeklySchedule, SubstitutionMatrix } from './types';

export const SCHEDULE: WeeklySchedule = {
  1: 'monday',    // Mon
  3: 'wednesday', // Wed
  5: 'friday',    // Fri
  6: 'saturday',  // Sat
};

// --- SUBSTITUTION MATRIX (FROM PDF) ---
export const SUBSTITUTION_MATRIX: SubstitutionMatrix = {
  monday: {
    '1A': [
      { id: 'MON_1A_ALT1', order: '1A', name: 'Weighted Dips', sets: 3, reps: '8-10', tempo: '3-0-X', notes: 'Load Bias: Lean chest forward. Keep elbows slightly tucked.', weightGuide: 'Body + 10-20kg' },
      { id: 'MON_1A_ALT2', order: '1A', name: 'Landmine Press', sets: 3, reps: '8 / side', tempo: '2-1-X', notes: 'Stability Bias: Half-kneeling position. Drive bar up and slightly forward.', weightGuide: '15-25 kg' },
      { id: 'MON_1A_ALT3', order: '1A', name: 'Explosive Push-Up', sets: 3, reps: '6', tempo: 'X-X-X', notes: 'Velocity Bias: Hands leave ground. Absorb landing softly.', weightGuide: 'Body' },
      { id: 'MON_1A_ALT4', order: '1A', name: 'DB Floor Press', sets: 3, reps: '10', tempo: '3-1-1', notes: 'Limited Equip: Neutral grip. Elbows touch floor, then drive.', weightGuide: '20-30 kg (DBs)' }
    ],
    '1B': [
      { id: 'MON_1B_ALT1', order: '1B', name: 'KB Windmill', sets: 3, reps: '5 / side', tempo: '3-1-1', notes: 'Load Bias: Hinge hips back. Keep eyes on the top hand.', weightGuide: '12-16 kg' },
      { id: 'MON_1B_ALT2', order: '1B', name: 'Open Book Stretch', sets: 3, reps: '8 / side', tempo: '2-2-2', notes: 'Stability Bias: Lie on side. Rotate top arm back to floor.', weightGuide: 'Body' },
      { id: 'MON_1B_ALT3', order: '1B', name: 'Dynamic Thread Needle', sets: 3, reps: '8 / side', tempo: '1-0-1', notes: 'Velocity Bias: Quadruped position. Reach through, then open up fast.', weightGuide: 'Body' },
      { id: 'MON_1B_ALT4', order: '1B', name: 'Wall Slides', sets: 3, reps: '10', tempo: '2-2-2', notes: 'Limited Equip: Back against wall. Slide arms up in "W" to "Y" shape.', weightGuide: 'Body' }
    ],
    '2A': [
      { id: 'MON_2A_ALT1', order: '2A', name: 'Landmine Punch', sets: 3, reps: '6 / side', tempo: 'X-X-X', notes: 'Load Bias: Standing. Rotate hips and punch bar across body.', weightGuide: '10-20 kg' },
      { id: 'MON_2A_ALT2', order: '2A', name: 'Cable Woodchop', sets: 3, reps: '8 / side', tempo: '2-0-X', notes: 'Stability Bias: Horizontal line of pull. Keep arms straight.', weightGuide: '15-20 kg' },
      { id: 'MON_2A_ALT3', order: '2A', name: 'Tire Slams', sets: 3, reps: '10', tempo: 'X-X-X', notes: 'Velocity Bias: Sledgehammer. Max force downward.', weightGuide: '6-10 kg Hammer' },
      { id: 'MON_2A_ALT4', order: '2A', name: 'Band Rotation Punch', sets: 3, reps: '10 / side', tempo: 'X-1-X', notes: 'Limited Equip: Anchor band. Punch out and across.', weightGuide: 'Red/Black Band' }
    ],
    '2B': [
      { id: 'MON_2B_ALT1', order: '2B', name: 'Rear Delt Fly', sets: 3, reps: '12', tempo: '2-1-1', notes: 'Load Bias: Chest supported on incline bench. Squeeze blades.', weightGuide: '8-12 kg (DBs)' },
      { id: 'MON_2B_ALT2', order: '2B', name: 'Band Pull-Apart', sets: 3, reps: '20', tempo: '1-0-1', notes: 'Stability Bias: Palms up (supinated). Pull band to chest.', weightGuide: 'Red Band' },
      { id: 'MON_2B_ALT3', order: '2B', name: 'Ski-Erg Intervals', sets: 3, reps: '30s', tempo: 'Max', notes: 'Velocity Bias: Upper body only. High turnover rate.', weightGuide: 'Damper 6-8' },
      { id: 'MON_2B_ALT4', order: '2B', name: 'Prone Y-Raise', sets: 3, reps: '12', tempo: '2-2-1', notes: 'Limited Equip: Lie on floor. Lift arms in "Y" shape.', weightGuide: 'Body' }
    ],
    '3A': [
      { id: 'MON_3A_ALT1', order: '3A', name: 'Plate Halo (Kneeling)', sets: 3, reps: '10 / side', tempo: '2-1-1', notes: 'Load Bias: Tall-kneel. Circle plate around head. Core tight.', weightGuide: '10-15 kg Plate' },
      { id: 'MON_3A_ALT2', order: '3A', name: 'Landmine Rainbows', sets: 3, reps: '8 / side', tempo: '2-0-2', notes: 'Stability Bias: Arc bar from hip to hip overhead.', weightGuide: 'Bar + 5-10 kg' },
      { id: 'MON_3A_ALT3', order: '3A', name: 'KB High-Pull', sets: 3, reps: '8 / side', tempo: 'X-0-X', notes: 'Velocity Bias: Explode hips, pull elbow high.', weightGuide: '16-20 kg' },
      { id: 'MON_3A_ALT4', order: '3A', name: 'Band Diagonal Lift', sets: 3, reps: '12 / side', tempo: '1-0-1', notes: 'Limited Equip: Step on band. Lift diagonally across body.', weightGuide: 'Red/Black Band' }
    ],
    '3B': [
      { id: 'MON_3B_ALT1', order: '3B', name: 'Suitcase Carry', sets: 3, reps: '40m / side', tempo: 'Walk', notes: 'Load Bias: Heavy DB in one hand. Shoulders level. Walk straight.', weightGuide: '24-32 kg' },
      { id: 'MON_3B_ALT2', order: '3B', name: 'Dead Bug (Wall Press)', sets: 3, reps: '12 / side', tempo: '3-1-1', notes: 'Stability Bias: Press hands into wall. Lower opposite leg.', weightGuide: 'Body' },
      { id: 'MON_3B_ALT3', order: '3B', name: 'Russian Twist (Weighted)', sets: 3, reps: '20 total', tempo: '1-0-1', notes: 'Velocity Bias: Feet off floor if possible. Rotate shoulders, not just arms.', weightGuide: '5-10 kg Plate' },
      { id: 'MON_3B_ALT4', order: '3B', name: 'Side Plank Leg Lift', sets: 3, reps: '10 / side', tempo: '2-1-1', notes: 'Limited Equip: Hold side plank. Lift top leg up and down.', weightGuide: 'Body' }
    ],
    'FINISHER': [
      { id: 'MON_FIN_ALT1', order: 'FINISHER', name: 'Pigeon Stretch (Elevated)', sets: 1, reps: '2 min / side', tempo: 'Hold', notes: 'Load Bias: Leg on bench/box. Lean forward. Deep hip stretch.', weightGuide: 'Body' },
      { id: 'MON_FIN_ALT2', order: 'FINISHER', name: 'Seated Piriformis Stretch', sets: 1, reps: '2 min / side', tempo: 'Hold', notes: 'Stability Bias: Seated on chair. Cross ankle over knee. Lean forward.', weightGuide: 'Body' },
      { id: 'MON_FIN_ALT3', order: 'FINISHER', name: 'Leg Swings (Front/Back)', sets: 2, reps: '20 / side', tempo: 'Dynamic', notes: 'Velocity Bias: Swing leg forward and back. Loosen hip flexors.', weightGuide: 'Body' },
      { id: 'MON_FIN_ALT4', order: 'FINISHER', name: 'Frog Stretch', sets: 1, reps: '2 min', tempo: 'Hold', notes: 'Limited Equip: Knees wide on floor. Hips back toward heels.', weightGuide: 'Body' }
    ]
  },
  wednesday: {
    '1A': [
      { id: 'WED_1A_ALT1', order: '1A', name: 'Walking Lunges', sets: 3, reps: '10 / leg', tempo: '2-0-1', notes: 'Load Bias: Keep torso upright. Knee touches floor gently.', weightGuide: '20-25 kg (DBs)' },
      { id: 'WED_1A_ALT2', order: '1A', name: 'Box Step-Ups', sets: 3, reps: '8 / leg', tempo: '2-1-1', notes: 'Stability Bias: Drive through heel. Avoid pushing off back foot.', weightGuide: '15-20 kg (DBs)' },
      { id: 'WED_1A_ALT3', order: '1A', name: 'Jumping Lunges', sets: 3, reps: '6 / leg', tempo: 'X-X-X', notes: 'Velocity Bias: Switch legs in air. Land and explode immediately.', weightGuide: 'Body' },
      { id: 'WED_1A_ALT4', order: '1A', name: '1-Leg Glute Bridge', sets: 3, reps: '12 / leg', tempo: '2-1-1', notes: 'Limited Equip: Foot on floor or bench. Drive hips high.', weightGuide: 'Body' }
    ],
    '1B': [
      { id: 'WED_1B_ALT1', order: '1B', name: 'Quadruped Hydrant', sets: 3, reps: '10 / side', tempo: '2-1-2', notes: 'Load Bias: Hands and knees. Lift leg to side like a dog.', weightGuide: 'Body' },
      { id: 'WED_1B_ALT2', order: '1B', name: 'Banded Clamshell', sets: 3, reps: '12 / side', tempo: '2-1-2', notes: 'Stability Bias: Side lying. Knees bent. Open knees against band.', weightGuide: 'Mini-Band' },
      { id: 'WED_1B_ALT3', order: '1B', name: 'Lateral Leg Swing', sets: 3, reps: '10 / side', tempo: '1-0-1', notes: 'Velocity Bias: Swing leg across body and out to side.', weightGuide: 'Body' },
      { id: 'WED_1B_ALT4', order: '1B', name: 'Butterfly Stretch', sets: 2, reps: '30s', tempo: 'Hold', notes: 'Limited Equip: Seated. Soles of feet together. Press knees down.', weightGuide: 'Body' }
    ],
    '2A': [
      { id: 'WED_2A_ALT1', order: '2A', name: 'Heiden Jumps', sets: 3, reps: '6 / side', tempo: 'X-0-X', notes: 'Load Bias: Continuous skater jumps. Minimize ground contact time.', weightGuide: 'Body' },
      { id: 'WED_2A_ALT2', order: '2A', name: 'Curtsy Lunge', sets: 3, reps: '8 / side', tempo: '3-1-1', notes: 'Stability Bias: Step back and across. Feel stretch in glute.', weightGuide: '10-15 kg (DBs)' },
      { id: 'WED_2A_ALT3', order: '2A', name: 'Lateral Box Jump', sets: 3, reps: '5 / side', tempo: 'X-X-X', notes: 'Velocity Bias: Jump sideways onto box. Step down.', weightGuide: 'Box Height' },
      { id: 'WED_2A_ALT4', order: '2A', name: 'Slideboard Lunge', sets: 3, reps: '8 / side', tempo: '3-0-1', notes: 'Limited Equip: Slider under one foot. Slide out to side.', weightGuide: 'Body' }
    ],
    '2B': [
      { id: 'WED_2B_ALT1', order: '2B', name: 'Cable Hi-Lo Chop', sets: 3, reps: '10 / side', tempo: 'X-1-X', notes: 'Load Bias: High pulley to low opposite hip. Rotational crunch.', weightGuide: '15-20 kg' },
      { id: 'WED_2B_ALT2', order: '2B', name: 'Pallof Circles', sets: 3, reps: '8 / side', tempo: '3-3-3', notes: 'Stability Bias: Draw circles with hands while holding Pallof position.', weightGuide: '10-12 kg' },
      { id: 'WED_2B_ALT3', order: '2B', name: 'Med Ball Slam', sets: 3, reps: '10', tempo: 'X-X-X', notes: 'Velocity Bias: Lift ball high, slam straight down with core.', weightGuide: '6-8 kg' },
      { id: 'WED_2B_ALT4', order: '2B', name: 'Band Wood Chop', sets: 3, reps: '12 / side', tempo: '1-0-1', notes: 'Limited Equip: Band anchored high. Chop down across body.', weightGuide: 'Red/Black Band' }
    ],
    '3A': [
      { id: 'WED_3A_ALT1', order: '3A', name: 'T-Bar Row', sets: 3, reps: '10', tempo: '2-1-1', notes: 'Load Bias: Chest on pad. Pull elbows back. Squeeze mid-back.', weightGuide: '20-40 kg' },
      { id: 'WED_3A_ALT2', order: '3A', name: 'Single-Arm DB Row', sets: 3, reps: '10 / side', tempo: '2-1-1', notes: 'Stability Bias: Hand and knee on bench. Flat back. Pull to hip.', weightGuide: '20-30 kg' },
      { id: 'WED_3A_ALT3', order: '3A', name: 'Pendlay Row', sets: 3, reps: '8', tempo: 'X-0-X', notes: 'Velocity Bias: Bar on floor. Explosive pull to chest. Return to floor.', weightGuide: '40-60 kg' },
      { id: 'WED_3A_ALT4', order: '3A', name: 'Inverted Row', sets: 3, reps: '10', tempo: '2-1-1', notes: 'Limited Equip: (TRX/Bar). Keep body straight. Pull chest to bar/handles.', weightGuide: 'Bodyweight' }
    ],
    '3B': [
      { id: 'WED_3B_ALT1', order: '3B', name: 'Sumo Goblet Squat', sets: 3, reps: '10', tempo: '3-0-1', notes: 'Load Bias: Wide stance. Toes out. Hold heavy DB at chest. Sink deep.', weightGuide: '20-30 kg' },
      { id: 'WED_3B_ALT2', order: '3B', name: 'Lateral Lunge (Slider)', sets: 3, reps: '8 / side', tempo: '3-0-1', notes: 'Stability Bias: Slider under one foot. Slide out. Keep other leg straight.', weightGuide: 'Body' },
      { id: 'WED_3B_ALT3', order: '3B', name: 'Monster Walk (Banded)', sets: 3, reps: '15 / side', tempo: '1-1-1', notes: 'Velocity Bias: Band around ankles. Wide stance. Walk sideways. Keep tension.', weightGuide: 'Heavy Band' },
      { id: 'WED_3B_ALT4', order: '3B', name: 'Adductor Machine', sets: 3, reps: '12', tempo: '2-1-1', notes: 'Limited Equip: Seated machine. Squeeze legs together.', weightGuide: 'Machine Weight' }
    ],
    'FINISHER': [
      { id: 'WED_FIN_ALT1', order: 'FINISHER', name: 'Overhead Waiter\'s Walk', sets: 3, reps: '30m / side', tempo: 'Walk', notes: 'Load Bias: Heavy DB/KB held overhead. Arm locked out. Core tight.', weightGuide: '16-24 kg' },
      { id: 'WED_FIN_ALT2', order: 'FINISHER', name: 'Rack Carry', sets: 3, reps: '40m / side', tempo: 'Walk', notes: 'Stability Bias: KB held in front rack position (chest height). Elbow tucked.', weightGuide: '20-28 kg' },
      { id: 'WED_FIN_ALT3', order: 'FINISHER', name: 'Farmer\'s Walk', sets: 3, reps: '40m', tempo: 'Walk', notes: 'Velocity Bias: Heavy weights in both hands. Walk fast but controlled.', weightGuide: '24-32 kg / hand' },
      { id: 'WED_FIN_ALT4', order: 'FINISHER', name: 'Plank Drag', sets: 3, reps: '10 / side', tempo: '1-1-1', notes: 'Limited Equip: High plank. Drag weight (sandbag/plate) across under body.', weightGuide: '10-20 kg' }
    ]
  },
  friday: {
    '1A': [
      { id: 'FRI_1A_ALT1', order: '1A', name: 'Barbell Hip Thrust', sets: 3, reps: '10', tempo: '2-1-1', notes: 'Load Bias: Shoulders on bench. Drive hips up. Squeeze glutes.', weightGuide: '60-80 kg' },
      { id: 'FRI_1A_ALT2', order: '1A', name: 'Single-Leg RDL', sets: 3, reps: '8 / side', tempo: '3-1-1', notes: 'Stability Bias: One leg planted. Hinge back. Keep hips square.', weightGuide: '16-20 kg (KB)' },
      { id: 'FRI_1A_ALT3', order: '1A', name: 'KB Swing', sets: 3, reps: '15', tempo: 'X-X-X', notes: 'Velocity Bias: Russian style (to chest height). Snap hips.', weightGuide: '20-24 kg' },
      { id: 'FRI_1A_ALT4', order: '1A', name: 'Nordic Curl Neg', sets: 3, reps: '5', tempo: '5-0-X', notes: 'Limited Equip: Lower slowly (5s) until you fall. Push back up.', weightGuide: 'Body' }
    ],
    '1B': [
      { id: 'FRI_1B_ALT1', order: '1B', name: 'Jefferson Curl', sets: 3, reps: '8', tempo: '4-1-1', notes: 'Load Bias: Stand on box. Curl spine down slowly segment by segment.', weightGuide: '8-12 kg' },
      { id: 'FRI_1B_ALT2', order: '1B', name: 'Scorpion Stretch', sets: 3, reps: '6 / side', tempo: '2-2-2', notes: 'Stability Bias: Prone. Reach foot across to opposite hand.', weightGuide: 'Body' },
      { id: 'FRI_1B_ALT3', order: '1B', name: 'Foam Roll Ext', sets: 1, reps: '2 mins', tempo: 'Slow', notes: 'Velocity Bias: Roll upper back. Extension over roller.', weightGuide: 'Body' },
      { id: 'FRI_1B_ALT4', order: '1B', name: 'Child\'s to Cobra', sets: 3, reps: '8', tempo: '2-2-2', notes: 'Limited Equip: Flow between child\'s pose and cobra pose.', weightGuide: 'Body' }
    ],
    '2A': [
      { id: 'FRI_2A_ALT1', order: '2A', name: 'Landmine Rotation', sets: 3, reps: '8 / side', tempo: '2-0-X', notes: 'Load Bias: Standing. Rotate bar in full arc hip-to-hip.', weightGuide: '10-15 kg + Bar' },
      { id: 'FRI_2A_ALT2', order: '2A', name: 'Cable Push-Pull', sets: 3, reps: '10 / side', tempo: '2-1-1', notes: 'Stability Bias: Push one cable, pull other. Rotate torso.', weightGuide: '15-20 kg' },
      { id: 'FRI_2A_ALT3', order: '2A', name: 'Tornado Ball', sets: 3, reps: '20s', tempo: 'Max', notes: 'Velocity Bias: Back to wall. Slam ball side-to-side rapidly.', weightGuide: '3-4 kg' },
      { id: 'FRI_2A_ALT4', order: '2A', name: 'Band Walkout', sets: 3, reps: '6 / side', tempo: '2-2-2', notes: 'Limited Equip: Hold band at chest (Pallof). Walk sideways out/in.', weightGuide: 'Red/Black Band' }
    ],
    '2B': [
      { id: 'FRI_2B_ALT1', order: '2B', name: 'Dumbbell Fly', sets: 3, reps: '10', tempo: '3-1-1', notes: 'Load Bias: Flat bench. Slight bend in elbows. Stretch chest.', weightGuide: '12-16 kg (DBs)' },
      { id: 'FRI_2B_ALT2', order: '2B', name: 'Pec Dec Machine', sets: 3, reps: '12', tempo: '2-1-1', notes: 'Stability Bias: Machine fly. Focus on squeezing chest at center.', weightGuide: '40-50 kg' },
      { id: 'FRI_2B_ALT3', order: '2B', name: 'Ring/TRX Fly', sets: 3, reps: '10', tempo: '3-1-1', notes: 'Velocity Bias: Bodyweight suspension. Keep core tight.', weightGuide: 'Body' },
      { id: 'FRI_2B_ALT4', order: '2B', name: 'Wide Push-Up', sets: 3, reps: '12', tempo: '2-1-1', notes: 'Limited Equip: Hands wider than shoulders. Chest to floor.', weightGuide: 'Body' }
    ],
    '3A': [
      { id: 'FRI_3A_ALT1', order: '3A', name: 'Ab Wheel Rollout', sets: 3, reps: '10', tempo: '2-1-1', notes: 'Load Bias: Kneeling. Roll out until flat. Pull back with abs.', weightGuide: 'Body' },
      { id: 'FRI_3A_ALT2', order: '3A', name: 'Bird-Dog Row', sets: 3, reps: '10 / side', tempo: '2-1-1', notes: 'Stability Bias: Bench. Opposite arm/leg extended. Row with free hand.', weightGuide: '10-15 kg' },
      { id: 'FRI_3A_ALT3', order: '3A', name: 'Stir-the-Pot', sets: 3, reps: '10 circles', tempo: 'Slow', notes: 'Velocity Bias: Plank on physioball. Rotate elbows in circles.', weightGuide: 'Body' },
      { id: 'FRI_3A_ALT4', order: '3A', name: 'Dead Bug (Limb Drop)', sets: 3, reps: '12 / side', tempo: '3-1-1', notes: 'Limited Equip: Back flat. Drop opposite arm/leg. Core braced.', weightGuide: 'Body' }
    ],
    '3B': [
      { id: 'FRI_3B_ALT1', order: '3B', name: 'Leg Extension Machine', sets: 3, reps: '12', tempo: '2-0-1', notes: 'Load Bias: Seated. Kick legs out. Squeeze quads (VMO) at top.', weightGuide: 'Machine Weight' },
      { id: 'FRI_3B_ALT2', order: '3B', name: 'Poliquin Step-Up', sets: 3, reps: '10 / leg', tempo: '2-1-1', notes: 'Stability Bias: Heel elevated on plate. Step up, drive knee.', weightGuide: 'Body + DBs' },
      { id: 'FRI_3B_ALT3', order: '3B', name: 'Reverse Sled Drag', sets: 3, reps: '30m', tempo: 'Walk', notes: 'Velocity Bias: Walk backwards dragging sled. Quads burn.', weightGuide: 'Sled + Weight' },
      { id: 'FRI_3B_ALT4', order: '3B', name: 'Reverse Nordic Curl', sets: 3, reps: '8', tempo: '3-0-1', notes: 'Limited Equip: Kneeling. Lean back keeping hips extended.', weightGuide: 'Body' }
    ],
    'FINISHER': [
      { id: 'FRI_FIN_ALT1', order: 'FINISHER', name: 'Face Pull (Ext Rot)', sets: 3, reps: '15', tempo: '1-1-2', notes: 'Load Bias: Rope to forehead. Rotate hands up at end range.', weightGuide: '15-25 kg' },
      { id: 'FRI_FIN_ALT2', order: 'FINISHER', name: 'TRX Y-Fly', sets: 3, reps: '12', tempo: '2-1-2', notes: 'Stability Bias: Suspension trainer. Arms straight in "Y". Squeeze lower trap.', weightGuide: 'Body' },
      { id: 'FRI_FIN_ALT3', order: 'FINISHER', name: 'Rear Delt Machine', sets: 3, reps: '15', tempo: '1-0-1', notes: 'Velocity Bias: Reverse Pec Dec. Keep arms straight. Squeeze back.', weightGuide: 'Machine Weight' },
      { id: 'FRI_FIN_ALT4', order: 'FINISHER', name: 'Band No-Money', sets: 3, reps: '20', tempo: '1-1-1', notes: 'Limited Equip: Elbows at sides. Rotate hands out against band.', weightGuide: 'Mini-Band' }
    ]
  }
};

// --- ORIGINAL WORKOUTS (FROM TEXT) ---

const V1_MONDAY = [
  { id: 'MON_1A_V1', order: '1A', name: 'Smith-Machine Bench Press', sets: 3, reps: '8', tempo: '3-0-X', notes: 'Strength. Control bar down to nipple line (3s). Drive up fast.', weightGuide: '50-60 kg' },
  { id: 'MON_1B_V1', order: '1B', name: 'Bench T-Spine Rotation', sets: 3, reps: '6 / side', tempo: '2-1-2', notes: 'Mobility. Active Rest. Keep hips square. Exhale as you rotate arm to ceiling.', weightGuide: 'Body' },
  { id: 'V1_R1', order: 'REST', name: 'Rest', sets: 0, reps: '0', tempo: '', notes: '90 Seconds', weightGuide: '', isRest: true },
  { id: 'MON_2A_V1', order: '2A', name: 'Med-Ball Rotational Throw', sets: 3, reps: '6 / side', tempo: 'X-X-X', notes: 'Power. Tall-kneeling. Use core to slam ball into wall sideways. MAX velocity.', weightGuide: '4 kg' },
  { id: 'MON_2B_V1', order: '2B', name: 'Standing Face Pull', sets: 3, reps: '15', tempo: '1-1-2', notes: 'Posture. Pull rope to forehead. Squeeze rear delts for 1s.', weightGuide: '25 kg' },
  { id: 'V1_R2', order: 'REST', name: 'Rest', sets: 0, reps: '0', tempo: '', notes: '90 Seconds', weightGuide: '', isRest: true },
  { id: 'MON_3A_V1', order: '3A', name: 'Half-Kneel Cable Lift', sets: 3, reps: '10 / side', tempo: '2-0-1', notes: 'Pattern. Low-to-High diagonal. Follow hands with eyes.', weightGuide: '12.5 kg' },
  { id: 'MON_3B_V1', order: '3B', name: 'Pallof Press (ISO)', sets: 3, reps: '30s / side', tempo: 'ISO', notes: 'Anti-Rotation. Hold handle at chest center. Brace abs hard.', weightGuide: '12.5 kg' },
  { id: 'MON_FIN_V1', order: 'FINISHER', name: '90/90 Hip Switch', sets: 2, reps: '10 / side', tempo: 'Smooth', notes: 'Recovery. No hands if possible. Flosses the hip capsule.', weightGuide: 'Body' },
];

const V1_WEDNESDAY = [
  { id: 'WED_1A_V1', order: '1A', name: 'Rear-Foot Split Squat', sets: 3, reps: '8 / leg', tempo: '3-1-X', notes: 'Stability. Drive through the front heel. Keep torso upright.', weightGuide: '15 kg (DBs)' },
  { id: 'WED_1B_V1', order: '1B', name: 'Hip CARs (Standing)', sets: 3, reps: '3 / side', tempo: '5-0-5', notes: 'Mobility. Active Rest. Very Slow, controlled circles.', weightGuide: 'Body' },
  { id: 'V1_W_R1', order: 'REST', name: 'Rest', sets: 0, reps: '0', tempo: '', notes: '90 Seconds', weightGuide: '', isRest: true },
  { id: 'WED_2A_V1', order: '2A', name: 'Lateral Skater Bounds', sets: 3, reps: '6 / side', tempo: 'X-1-X', notes: 'Weight Shift. Jump sideways. Land softly and stick the balance for 1s.', weightGuide: 'Body' },
  { id: 'WED_2B_V1', order: '2B', name: 'KB Wood-Chop (Diagonal)', sets: 3, reps: '10 / side', tempo: 'X-0-1', notes: 'Core Speed. High-to-Low diagonal. Simulate the downswing crunch.', weightGuide: '15 kg' },
  { id: 'V1_W_R2', order: 'REST', name: 'Rest', sets: 0, reps: '0', tempo: '', notes: '90 Seconds', weightGuide: '', isRest: true },
  { id: 'WED_3A_V1', order: '3A', name: 'Seated Cable Row', sets: 3, reps: '10', tempo: '2-1-1', notes: 'Posture. Neutral grip. Retract scapula fully. Pause at chest for 1s.', weightGuide: '45-50 kg' },
  { id: 'WED_3B_V1', order: '3B', name: 'Cossack Squat', sets: 3, reps: '6 / side', tempo: '2-0-1', notes: 'Adductors. Keep straight-leg heel on ground. Go as deep as mobility allows.', weightGuide: 'Body / 8kg' },
  { id: 'WED_FIN_V1', order: 'FINISHER', name: 'Single-Arm Carry', sets: 3, reps: '30m / side', tempo: 'Walk', notes: 'Obliques. Hold heavy KB in one hand. Walk perfectly straight.', weightGuide: '20-24 kg' },
];

const V1_FRIDAY = [
  { id: 'FRI_1A_V1', order: '1A', name: 'DB Romanian Deadlift (RDL)', sets: 3, reps: '10', tempo: '3-1-1', notes: 'Hinge. Hold DBs. Push hips back until hamstrings stretch (3s). Flat back.', weightGuide: '20-24 kg' },
  { id: 'FRI_1B_V1', order: '1B', name: 'Cat-Cow Mobility', sets: 3, reps: '8', tempo: '2-2-2', notes: 'Spine Health. Active Rest. Full flexion/extension of spine.', weightGuide: 'Body' },
  { id: 'V1_F_R1', order: 'REST', name: 'Rest', sets: 0, reps: '0', tempo: '', notes: '90 Seconds', weightGuide: '', isRest: true },
  { id: 'FRI_2A_V1', order: '2A', name: 'Cable Resisted Rotation', sets: 3, reps: '10 / side', tempo: '2-0-X', notes: 'Control. Rotate out fast, resist slowly on the way back (2s eccentric).', weightGuide: '12.5 kg' },
  { id: 'FRI_2B_V1', order: '2B', name: 'Cable Fly', sets: 3, reps: '12', tempo: '2-1-1', notes: 'Pec Length. Step forward. Stretch chest fully. Slight bend in elbows.', weightGuide: '10-15 kg' },
  { id: 'V1_F_R2', order: 'REST', name: 'Rest', sets: 0, reps: '0', tempo: '', notes: '90 Seconds', weightGuide: '', isRest: true },
  { id: 'FRI_3A_V1', order: '3A', name: 'Pallof Press + Step Out', sets: 3, reps: '8 / side', tempo: 'Controlled', notes: 'Dynamic Stability. Press hands out, take a lateral step, step back, return.', weightGuide: '12.5 kg' },
  { id: 'FRI_3B_V1', order: '3B', name: 'Bodyweight Sissy Squat', sets: 3, reps: '10', tempo: '3-0-1', notes: 'Knee Health. Lean back slow (3s), knees over toes. Strengthens VMO.', weightGuide: 'Body' },
  { id: 'FRI_FIN_V1', order: 'FINISHER', name: 'Cable Reverse Fly', sets: 3, reps: '15', tempo: '1-1-1', notes: 'Posture. Set cables high. Cross arms and pull apart.', weightGuide: 'Light' },
];

const RUNNING = [
  { id: 'RUN_1', order: 'Warm Up', name: 'Walk + Drills', sets: 1, reps: '5 min', tempo: 'Easy', notes: 'Prepare the body.', weightGuide: '-' },
  { id: 'RUN_2', order: 'Main Set', name: '10k Pace Interval', sets: 1, reps: '10 min', tempo: '6:15/km', notes: 'Steady pace.', weightGuide: '-' },
  { id: 'RUN_3', order: 'Recovery', name: 'Walk', sets: 1, reps: '2 min', tempo: 'Walk', notes: 'Active recovery.', weightGuide: '-' },
  { id: 'RUN_4', order: 'Main Set', name: '10k Pace Interval', sets: 1, reps: '10 min', tempo: '6:15/km', notes: 'Steady pace.', weightGuide: '-' },
  { id: 'RUN_5', order: 'Cool Down', name: 'Walk', sets: 1, reps: '5 min', tempo: 'Easy', notes: 'Cool down.', weightGuide: '-' },
];

const V2_MONDAY = [
  { id: 'MON_1A_V2', order: '1A', name: 'Machine Chest Press', sets: 3, reps: '8', tempo: '3-0-X', notes: 'Strength. Control eccentric (3s). Drive out fast.', weightGuide: '[MS]' },
  { id: 'MON_1B_V2', order: '1B', name: 'DB Bench T-Spine Rotation', sets: 3, reps: '6 / side', tempo: '2-1-2', notes: 'Mobility. Lie on bench, hold 1 DB straight up. Rotate other arm open.', weightGuide: '[DB]' },
  { id: 'V2_R1', order: 'REST', name: 'Rest', sets: 0, reps: '0', tempo: '', notes: '90 Seconds', weightGuide: '', isRest: true },
  { id: 'MON_2A_V2', order: '2A', name: 'Cable Rotational Chop', sets: 3, reps: '8 / side', tempo: 'X-1-X', notes: 'Power. Set cable at chest height. Explode rotation horizontally. Reset.', weightGuide: '[FT]' },
  { id: 'MON_2B_V2', order: '2B', name: 'Cable Face Pull', sets: 3, reps: '15', tempo: '1-1-2', notes: 'Posture. Use rope attachment on high pulley. Pull to forehead.', weightGuide: '[FT]' },
  { id: 'V2_R2', order: 'REST', name: 'Rest', sets: 0, reps: '0', tempo: '', notes: '90 Seconds', weightGuide: '', isRest: true },
  { id: 'MON_3A_V2', order: '3A', name: 'Half-Kneel Cable Lift', sets: 3, reps: '10 / side', tempo: '2-0-1', notes: 'Pattern. Low pulley. Lift diagonally up across body.', weightGuide: '[FT]' },
  { id: 'MON_3B_V2', order: '3B', name: 'Pallof Press (ISO)', sets: 3, reps: '30s / side', tempo: 'ISO', notes: 'Anti-Rotation. Chest-height pulley. Press out and hold.', weightGuide: '[FT]' },
  { id: 'MON_FIN_V2', order: 'FINISHER', name: '90/90 Hip Switch', sets: 2, reps: '10 / side', tempo: 'Smooth', notes: 'Recovery. Floor mobility. Flosses the hip capsule.', weightGuide: 'Body' },
];

const V2_WEDNESDAY = [
  { id: 'WED_1A_V2', order: '1A', name: 'DB Rear-Foot Split Squat', sets: 3, reps: '8 / leg', tempo: '3-1-X', notes: 'Stability. Hold DBs in "Suitcase" carry. Back foot on bench.', weightGuide: '[DB]' },
  { id: 'WED_1B_V2', order: '1B', name: 'Standing Hip CARs', sets: 3, reps: '3 / side', tempo: '5-0-5', notes: 'Mobility. Slow, controlled circles of the hip. Use machine for balance.', weightGuide: 'Body' },
  { id: 'V2_W_R1', order: 'REST', name: 'Rest', sets: 0, reps: '0', tempo: '', notes: '90 Seconds', weightGuide: '', isRest: true },
  { id: 'WED_2A_V2', order: '2A', name: 'Lateral Skater Jumps', sets: 3, reps: '6 / side', tempo: 'X-1-X', notes: 'Weight Shift. Jump sideways, stick the landing. Focus on power transfer.', weightGuide: 'Body' },
  { id: 'WED_2B_V2', order: '2B', name: 'Cable Wood-Chop (Hi-Lo)', sets: 3, reps: '10 / side', tempo: 'X-0-1', notes: 'Core Speed. High pulley. Chop diagonally down to opposite hip.', weightGuide: '[FT]' },
  { id: 'V2_W_R2', order: 'REST', name: 'Rest', sets: 0, reps: '0', tempo: '', notes: '90 Seconds', weightGuide: '', isRest: true },
  { id: 'WED_3A_V2', order: '3A', name: 'Seated Cable Row', sets: 3, reps: '10', tempo: '2-1-1', notes: 'Posture. Use low pulley or specific station on [MS]. Retract scapula fully.', weightGuide: '[FT]' },
  { id: 'WED_3B_V2', order: '3B', name: 'DB Cossack Squat', sets: 3, reps: '6 / side', tempo: '2-0-1', notes: 'Adductors. Hold one DB at goblet position (chest). Side lunge deeply.', weightGuide: '[DB]' },
  { id: 'WED_FIN_V2', order: 'FINISHER', name: 'DB Suitcase Carry', sets: 3, reps: '45s / side', tempo: 'Walk', notes: 'Obliques. Hold heavy DB in one hand. Walk perfectly straight.', weightGuide: '[DB]' },
];

const V2_FRIDAY = [
  { id: 'FRI_1A_V2', order: '1A', name: 'DB Romanian Deadlift', sets: 3, reps: '10', tempo: '3-1-1', notes: 'Hinge. Hold DBs in front of thighs. Hinge hips back. Flat back.', weightGuide: '[DB]' },
  { id: 'FRI_1B_V2', order: '1B', name: 'Cat-Cow Mobility', sets: 3, reps: '8', tempo: '2-2-2', notes: 'Spine Health. Floor mobility for spine.', weightGuide: 'Body' },
  { id: 'V2_F_R1', order: 'REST', name: 'Rest', sets: 0, reps: '0', tempo: '', notes: '90 Seconds', weightGuide: '', isRest: true },
  { id: 'FRI_2A_V2', order: '2A', name: 'Cable Resisted Rotation', sets: 3, reps: '10 / side', tempo: '2-0-X', notes: 'Control. Chest height pulley. Walk out. Rotate torso away from machine.', weightGuide: '[FT]' },
  { id: 'FRI_2B_V2', order: '2B', name: 'Cable Fly', sets: 3, reps: '12', tempo: '2-1-1', notes: 'Pec Length. Use both pulleys. Step forward. Stretch chest, squeeze hands.', weightGuide: '[FT]' },
  { id: 'V2_F_R2', order: 'REST', name: 'Rest', sets: 0, reps: '0', tempo: '', notes: '90 Seconds', weightGuide: '', isRest: true },
  { id: 'FRI_3A_V2', order: '3A', name: 'Pallof Press + Step Out', sets: 3, reps: '8 / side', tempo: 'Dynamic', notes: 'Dynamic Stability. Press cable out, take lateral step, return.', weightGuide: '[FT]' },
  { id: 'FRI_3B_V2', order: '3B', name: 'Machine Leg Extension', sets: 3, reps: '12', tempo: '2-1-2', notes: 'Knee Health. Use leg attachment. Focus on quads (VMO) for knee stability.', weightGuide: '[MS]' },
  { id: 'FRI_FIN_V2', order: 'FINISHER', name: 'Cable Reverse Fly', sets: 3, reps: '15', tempo: '1-1-1', notes: 'Posture. Set cables high. Cross arms and pull apart (rear delts).', weightGuide: '[FT]' },
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
    wednesday: { id: 'wednesday', title: 'Legs + Ground Force (Limited)', focus: 'Stability & Power', exercises: V2_WEDNESDAY },
    friday: { id: 'friday', title: 'Posterior Chain (Limited)', focus: 'The Engine', exercises: V2_FRIDAY },
    saturday: { id: 'saturday', title: '10k Pace Strategy', focus: 'Cardio', exercises: RUNNING },
  },
};