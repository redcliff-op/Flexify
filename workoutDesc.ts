import { WorkoutDesc, WorkoutStepsInfo } from "./global";

const fullBodyWorkout: WorkoutStepsInfo[] = [
  {
    title: 'Squats',
    reps: '15 reps',
    desc: 'Stand with feet shoulder-width apart. Bend knees and lower your body as if sitting back into a chair. Keep chest up and knees aligned with toes. Push through heels to return to standing.'
  },
  {
    title: 'Push-Ups',
    reps: '12 reps',
    desc: 'Place hands shoulder-width apart on the floor. Lower your body until chest nearly touches the ground. Keep elbows at a 45-degree angle and body in a straight line. Push up to return to start.'
  },
  {
    title: 'Plank',
    reps: '60 seconds',
    desc: 'Hold a push-up position with your body in a straight line from head to heels. Engage your core and maintain the position without letting your hips sag.',
    timer: true
  },
  {
    title: 'Lunges',
    reps: '12 reps',
    desc: 'Step forward with one leg and lower your body until both knees are at 90 degrees. Keep your torso upright and back straight. Push off the front foot to return to the starting position and switch legs.'
  },
  {
    title: 'Burpees',
    reps: '10 reps',
    desc: 'Start in a standing position, drop into a squat, place hands on the floor, jump feet back into a plank, perform a push-up, jump feet back to hands, and explode up into a jump. Repeat with control.'
  }
];

const chestWorkout: WorkoutStepsInfo[] = [
  {
    title: 'Standard Push-Ups',
    reps: '15 reps',
    desc: 'Place hands slightly wider than shoulder-width. Lower your chest towards the floor, then push back up to the start position. Keep your body straight and core engaged.'
  },
  {
    title: 'Incline Push-Ups',
    reps: '15 reps',
    desc: 'Place hands on an elevated surface like a bench. Perform a push-up by lowering your chest towards the bench and then pushing back up. Keep body straight and core engaged.'
  },
  {
    title: 'Decline Push-Ups',
    reps: '12 reps',
    desc: 'Place your feet on an elevated surface and hands on the floor. Lower your chest towards the ground, then push back up. Keep your body straight and core tight.'
  },
  {
    title: 'Diamond Push-Ups',
    reps: '12 reps',
    desc: 'Place hands close together under your chest, forming a diamond shape with your fingers. Lower your chest towards your hands and push back up. Keep elbows close to your body.'
  },
  {
    title: 'Chest Flyes',
    reps: '15 reps',
    desc: 'Lie on a bench with arms extended above chest holding weights. Open arms wide to lower weights towards the sides, then bring them back together. Keep a slight bend in elbows.'
  }
];

const bicepsWorkout: WorkoutStepsInfo[] = [
  {
    title: 'Chin-Ups',
    reps: '12 reps',
    desc: 'Hang from a bar with palms facing you. Pull yourself up until your chin is above the bar, then lower back down with control. Engage your biceps and core.'
  },
  {
    title: 'Bicep Curls',
    reps: '15 reps',
    desc: 'Hold weights or bands with palms facing up. Curl the weights towards your shoulders, keeping elbows close to your body. Lower back down slowly.'
  },
  {
    title: 'Hammer Curls',
    reps: '15 reps',
    desc: 'Hold weights with palms facing each other. Curl the weights towards your shoulders, then lower slowly. Keep elbows close to your body.'
  },
  {
    title: 'Isometric Bicep Hold',
    reps: '60 seconds',
    desc: 'Hold a curl position with elbows bent at 90 degrees. Keep biceps contracted and hold the position to build endurance and strength.',
    timer: true
  },
  {
    title: 'Concentration Curls',
    reps: '12 reps per arm',
    desc: 'Sit on a bench, lean forward, and rest your elbow on your inner thigh. Curl the weight towards your shoulder, then lower slowly. Focus on isolating the bicep.'
  }
];

const tricepsWorkout: WorkoutStepsInfo[] = [
  {
    title: 'Tricep Dips',
    reps: '12 reps',
    desc: 'Use parallel bars or a chair. Lower your body by bending your elbows to 90 degrees, then push back up. Keep elbows close to your body throughout.'
  },
  {
    title: 'Tricep Pushdowns',
    reps: '15 reps',
    desc: 'Using a resistance band or cable machine, push the band or cable down until arms are fully extended. Focus on fully extending your triceps.'
  },
  {
    title: 'Overhead Tricep Extensions',
    reps: '15 reps',
    desc: 'Hold a weight or band overhead. Lower the weight behind your head by bending your elbows, then extend arms back up. Keep core stable.'
  },
  {
    title: 'Close-Grip Push-Ups',
    reps: '15 reps',
    desc: 'Place hands close together under your chest. Lower your body towards the floor, keeping elbows close to your body, then push back up.'
  },
  {
    title: 'Tricep Kickbacks',
    reps: '15 reps',
    desc: 'Lean forward with one hand and knee on a bench. Hold a weight in the opposite hand, extend your arm straight back, then return to starting position. Keep elbow fixed and close to your body.'
  }
];

const backWorkout: WorkoutStepsInfo[] = [
  {
    title: 'Pull-Ups',
    reps: '12 reps',
    desc: 'Hang from a bar with an overhand grip. Pull yourself up until your chin is over the bar, then lower back down with control.'
  },
  {
    title: 'Bodyweight Rows',
    reps: '15 reps',
    desc: 'Use a bar or low surface. Pull your chest up towards the bar, keeping your body in a straight line. Lower back down slowly.'
  },
  {
    title: 'Supermans',
    reps: '15 reps',
    desc: 'Lie face down and lift your arms and legs simultaneously. Hold for a moment, then lower back down. Engage your lower back muscles.'
  },
  {
    title: 'Reverse Snow Angels',
    reps: '15 reps',
    desc: 'Lie face down with arms extended. Move your arms in a snow angel motion while keeping them elevated. Focus on engaging your upper back.'
  },
  {
    title: 'Lat Pulldowns',
    reps: '15 reps',
    desc: 'Sit at a lat pulldown machine with a wide grip. Pull the bar down towards your chest, then slowly return to starting position. Engage your back muscles throughout.'
  }
];

const shouldersWorkout: WorkoutStepsInfo[] = [
  {
    title: 'Pike Push-Ups',
    reps: '12 reps',
    desc: 'Start in a push-up position and lift your hips to form an inverted V. Lower your head towards the floor, then push back up. Engage your shoulders.'
  },
  {
    title: 'Handstand Push-Ups',
    reps: '10 reps',
    desc: 'Kick up into a handstand position against a wall. Lower your head towards the ground, then push back up. Maintain balance and control.'
  },
  {
    title: 'Front Raises',
    reps: '15 reps',
    desc: 'Hold weights or bands in front of you. Lift them straight up to shoulder height, then lower back down. Keep arms straight and core engaged.'
  },
  {
    title: 'Lateral Raises',
    reps: '15 reps',
    desc: 'Hold weights or bands at your sides. Lift them out to shoulder height, then lower back down. Focus on isolating the lateral deltoids.'
  },
  {
    title: 'Arnold Press',
    reps: '12 reps',
    desc: 'Start with weights in front of your shoulders, palms facing you. Rotate palms outward as you press weights overhead, then lower back down with control.'
  }
];

const legWorkout: WorkoutStepsInfo[] = [
  {
    title: 'Squats',
    reps: '15-20 reps',
    desc: 'Stand with feet shoulder-width apart. Lower your body by bending knees, keeping chest up and back straight. Push through heels to return to standing.'
  },
  {
    title: 'Lunges',
    reps: '15 reps',
    desc: 'Step forward with one leg and lower your body until both knees form right angles. Return to standing and switch legs. Keep torso upright.'
  },
  {
    title: 'Calf Raises',
    reps: '20 reps',
    desc: 'Stand on flat ground or an elevated surface. Rise onto the balls of your feet, then lower back down. Perform slowly for full range of motion.'
  },
  {
    title: 'Glute Bridges',
    reps: '20 reps',
    desc: 'Lie on your back with knees bent and feet flat on the floor. Lift hips towards the ceiling, squeezing glutes at the top. Lower hips back down.'
  },
  {
    title: 'Step-Ups',
    reps: '15 reps per leg',
    desc: 'Step up onto a bench or elevated surface with one foot, then step back down. Alternate legs and keep your torso upright.'
  }
];

const abdominalWorkout: WorkoutStepsInfo[] = [
  {
    title: 'Crunches',
    reps: '20 reps',
    desc: 'Lie on your back with knees bent and feet flat. Place hands behind your head, lift shoulders towards knees, then lower back down slowly.'
  },
  {
    title: 'Leg Raises',
    reps: '15 reps',
    desc: 'Lie on your back with legs straight and arms by your sides. Lift legs towards the ceiling, then lower them back down without touching the floor.'
  },
  {
    title: 'Bicycle Crunches',
    reps: '20 reps (10 per side)',
    desc: 'Lie on your back with legs elevated and bent. Alternate bringing elbows to opposite knees while extending the other leg.'
  },
  {
    title: 'Plank',
    reps: '60 seconds',
    desc: 'Hold a push-up position with body in a straight line from head to heels. Engage core and avoid letting hips sag.',
    timer: true
  },
  {
    title: 'Russian Twists',
    reps: '20 reps (10 per side)',
    desc: 'Sit on the floor with knees bent and lean back slightly. Rotate your torso to each side while holding a weight or without, tapping the floor beside you with your hands.'
  }
];


export const workoutDesc: WorkoutDesc[] = [
  {
    title: 'Full Body',
    image: require('./assets/images/fullbody.jpg'),
    desc: 'Designed to engage multiple muscle groups across the entire body in a single session. This approach not only maximizes calorie burn but also enhances overall strength, balance, and coordination. By targeting different muscles, it promotes balanced muscle development and prevents overuse injuries. Additionally, full-body workouts can be time-efficient, making them ideal for busy schedules. Regularly incorporating these workouts helps improve cardiovascular health, boost metabolism, and increase functional fitness, which translates to better performance in daily activities.',
    steps: fullBodyWorkout
  },
  {
    title: 'Chest',
    image: require('./assets/images/chest.jpg'),
    desc: 'A chest workout focuses on exercises that target the pectoral muscles, which are crucial for upper body strength and stability. By isolating and challenging these muscles through movements like bench presses, push-ups, and chest flies, this workout enhances muscle definition and strength. Strengthening the chest can improve posture, support better performance in other upper body exercises, and contribute to a balanced physique. Additionally, a strong chest plays a key role in activities involving pushing motions and can help prevent injuries by stabilizing the shoulder joints.',
    steps: chestWorkout
  },
  {
    title: 'Biceps',
    image: require('./assets/images/biceps.jpg'),
    desc: 'A biceps workout concentrates on exercises that target the bicep muscles located in the upper arm. By performing movements such as bicep curls, hammer curls, and chin-ups, this workout enhances arm strength and muscle definition. Strengthening the biceps not only improves the appearance of the arms but also contributes to better functional performance in various activities that involve pulling or lifting. A well-developed biceps muscle also supports elbow joint stability and can help in achieving a balanced upper body physique.',
    steps: bicepsWorkout
  },
  {
    title: 'Triceps',
    image: require('./assets/images/triceps.jpg'),
    desc: 'A triceps workout targets the muscles on the back of the upper arm, focusing on exercises like tricep dips, pushdowns, and overhead extensions. Strengthening the triceps is essential for balanced arm development, as they complement the biceps and contribute to overall upper body strength. Well-developed triceps improve the ability to perform pushing movements, enhance arm stability, and support joint health, particularly in the elbows and shoulders. Additionally, strong triceps contribute to a more defined arm appearance and help in achieving a well-rounded physique.',
    steps: tricepsWorkout
  },
  {
    title: 'Back',
    image: require('./assets/images/back.jpg'),
    desc: 'A back workout targets the muscles along the spine and across the upper body, including the latissimus dorsi, rhomboids, and trapezius. Exercises such as pull-ups, rows, and lat pulldowns focus on strengthening these muscles, which play a crucial role in maintaining good posture, supporting the spine, and facilitating a range of upper body movements. Strengthening the back not only improves overall strength and stability but also helps prevent injuries by promoting balance and reducing strain on the lower back. Additionally, a strong back contributes to a more defined physique and enhances performance in various physical activities.',
    steps: backWorkout
  },
  {
    title: 'Shoulders',
    image: require('./assets/images/shoulder.png'),
    desc: 'A shoulder workout focuses on strengthening the deltoid muscles, which are essential for a full range of arm movements and stability. Key exercises such as overhead presses, lateral raises, and front raises target different parts of the shoulder, improving muscle definition and strength. A well-developed shoulder complex enhances overall upper body functionality, supports better posture, and reduces the risk of shoulder injuries. Strengthening the shoulders also improves performance in various athletic activities and contributes to a balanced, aesthetically pleasing physique.',
    steps: shouldersWorkout
  },
  {
    title: 'Leg',
    image: require('./assets/images/leg.jpg'),
    desc: 'A leg workout targets the major muscle groups in the lower body, including the quadriceps, hamstrings, glutes, and calves. Exercises like squats, lunges, and deadlifts focus on these muscles, enhancing overall leg strength, power, and endurance. Strengthening the legs improves mobility, supports better balance and stability, and contributes to a strong foundation for athletic performance. Additionally, a comprehensive leg workout boosts metabolism, aids in injury prevention, and helps in achieving a balanced, well-proportioned physique.',
    steps: legWorkout
  },
  {
    title: 'Abdominal',
    image: require('./assets/images/abdominal.jpg'),
    desc: 'An abdominal workout targets the core muscles, including the rectus abdominis, obliques, and transverse abdominis. Strengthening these muscles is crucial for overall core stability, posture, and balance. Key exercises such as crunches, leg raises, and planks enhance core strength, improve functional movement, and contribute to a well-defined midsection. A strong core supports better performance in various physical activities and helps in injury prevention by stabilizing the spine and pelvis.',
    steps: abdominalWorkout
  }
]
