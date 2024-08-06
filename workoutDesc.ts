import { WorkoutDesc, WorkoutStepsInfo } from "./global";

const fullBodyWorkout: WorkoutStepsInfo[] = [
  {
    title: 'Squats',
    reps: 15,
    desc: 'A lower body exercise that targets the quadriceps, hamstrings, and glutes. Focus on proper form to maximize benefits and avoid injury.'
  },
  {
    title: 'Push-Ups',
    reps: 12,
    desc: 'An upper body exercise that strengthens the chest, shoulders, and triceps. Maintain a straight body line to maximize effectiveness.'
  },
  {
    title: 'Plank',
    reps: 30, 
    desc: 'A core exercise that engages the abdominal muscles, lower back, and shoulders. Hold a straight body position to build core strength and stability.'
  },
  {
    title: 'Lunges',
    reps: 12,
    desc: 'A lower body exercise that targets the quadriceps, hamstrings, and glutes. Ensure proper alignment to protect the knees and maximize muscle engagement.'
  }
];

const chestWorkout: WorkoutStepsInfo[] = [
  {
    title: 'Standard Push-Ups',
    reps: 15,
    desc: 'A basic push-up that targets the chest, shoulders, and triceps. Maintain a straight body and engage the core throughout.'
  },
  {
    title: 'Incline Push-Ups',
    reps: 15,
    desc: 'Push-ups with hands elevated to focus on the upper chest. Use a bench or step for elevation.'
  },
  {
    title: 'Decline Push-Ups',
    reps: 12,
    desc: 'Push-ups with feet elevated to emphasize the lower chest. Ensure a controlled movement for better muscle engagement.'
  },
  {
    title: 'Diamond Push-Ups',
    reps: 12,
    desc: 'Push-ups with hands close together to target the inner chest and triceps.'
  },
];


const bicepsWorkout: WorkoutStepsInfo[] = [
  {
    title: 'Chin-Ups',
    reps: 12,
    desc: 'Pull-ups with an underhand grip to focus on the biceps. Engage the core and pull yourself up until your chin is over the bar.'
  },
  {
    title: 'Bicep Curls',
    reps: 15,
    desc: 'Curls using bodyweight or resistance bands to target the biceps. Keep elbows close to the body and focus on a full range of motion.'
  },
  {
    title: 'Hammer Curls',
    reps: 15,
    desc: 'Curls with palms facing each other to engage the brachialis muscle in addition to the biceps.'
  },
  {
    title: 'Isometric Bicep Hold',
    reps: 30,
    desc: 'Hold the curl position with arms bent to build endurance and strength in the biceps.'
  }
];

const tricepsWorkout: WorkoutStepsInfo[] = [
  {
    title: 'Tricep Dips',
    reps: 12,
    desc: 'Dips using parallel bars or a sturdy chair to target the triceps. Keep elbows close to the body and lower down until arms are at 90 degrees.'
  },
  {
    title: 'Tricep Pushdowns',
    reps: 15,
    desc: 'Using a resistance band or cable machine, push the band or cable down to extend the triceps. Focus on a full range of motion.'
  },
  {
    title: 'Overhead Tricep Extensions',
    reps: 15,
    desc: 'Extend the arms overhead and lower the weight behind the head to target the triceps. Maintain a stable core throughout.'
  },
  {
    title: 'Close-Grip Push-Ups',
    reps: 15,
    desc: 'Push-ups with hands close together to emphasize the triceps. Keep your body straight and engage the triceps throughout the movement.'
  }
];

const backWorkout: WorkoutStepsInfo[] = [
  {
    title: 'Pull-Ups',
    reps: 12,
    desc: 'Pull-ups targeting the upper back and lats. Use an overhand grip and pull up until chin is over the bar.'
  },
  {
    title: 'Bodyweight Rows',
    reps: 15,
    desc: 'Using a bar or low surface, pull your chest up towards the bar to engage the back muscles. Maintain a straight body line.'
  },
  {
    title: 'Supermans',
    reps: 15,
    desc: 'Lie face down and lift your arms and legs off the ground simultaneously to target the lower back.'
  },
  {
    title: 'Reverse Snow Angels',
    reps: 15,
    desc: 'Lying face down, move your arms in a snow angel motion to strengthen the upper back and rear shoulders.'
  }
];


const shouldersWorkout: WorkoutStepsInfo[] = [
  {
    title: 'Pike Push-Ups',
    reps: 12,
    desc: 'Push-ups with hips elevated to target the shoulder muscles. Focus on pressing down and bringing your head close to the floor.'
  },
  {
    title: 'Handstand Push-Ups',
    reps: 10,
    desc: 'Perform push-ups while in a handstand position to intensely target the shoulders. Use a wall for support if needed.'
  },
  {
    title: 'Front Raises',
    reps: 15,
    desc: 'Lift weights or resistance bands straight up in front of you to engage the front deltoids.'
  },
  {
    title: 'Lateral Raises',
    reps: 15,
    desc: 'Raise weights or bands out to the sides to target the lateral deltoids and widen the shoulders.'
  }
];

const legWorkout: WorkoutStepsInfo[] = [
  {
    title: 'Squats',
    reps: 15-20,
    desc: 'A fundamental lower body exercise that targets the quadriceps, hamstrings, and glutes. Focus on depth and form.'
  },
  {
    title: 'Lunges',
    reps: 15,
    desc: 'Step forward into a lunge to work the quads, hamstrings, and glutes. Alternate legs and keep your torso upright.'
  },
  {
    title: 'Bulgarian Split Squats',
    reps: 12,
    desc: 'Rear foot elevated squats to isolate the quads and glutes. Ensure balance and control throughout the movement.'
  },
  {
    title: 'Calf Raises',
    reps: 20,
    desc: 'Raise up onto the toes to work the calf muscles. Perform on a flat surface or elevated for a greater range of motion.'
  },
  {
    title: 'Glute Bridges',
    reps: 20,
    desc: 'Lift your hips towards the ceiling while lying on your back to target the glutes and hamstrings. Squeeze the glutes at the top.'
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
  }
]
