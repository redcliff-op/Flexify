import { View, Text, Image, ScrollView, Pressable } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { workoutDesc } from '@/workoutDesc'
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut, LinearTransition } from 'react-native-reanimated'
import * as Speech from 'expo-speech';
import { useStore } from '@/src/store/store'

const performWorkouts = memo(() => {

  const { index } = useLocalSearchParams()
  const workout = workoutDesc[parseInt(index as string)]
  const [progress, setProgress] = useState<number>(-1)
  const [rest, setRest] = useState<boolean>(false)
  const [timer, setTimer] = useState<number>(60)
  let intervalId: NodeJS.Timeout;

  const timerExec = (): Promise<void> => {
    setTimer(60);
    return new Promise((resolve) => {
      intervalId = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer === 30) {
            Speech.speak('30 more seconds')
          }
          if (prevTimer === 4) {
            Speech.speak("3")
          }
          if (prevTimer === 3) {
            Speech.speak("2")
          }
          if (prevTimer === 2) {
            Speech.speak("1")
          }
          if(prevTimer === 1){
            Speech.speak(`You are done with ${workout.steps[progress].title}`)
          }
          if (prevTimer <= 1) {
            clearInterval(intervalId as NodeJS.Timeout);
            resolve();
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    });
  };

  const beginRest = (): Promise<void> => {
    setRest(true);
    setTimer(60);
    Speech.speak("Take a break for 60 seconds")
    return new Promise((resolve) => {
      intervalId = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer === 11) {
            Speech.speak("Get Ready for the Next Exercise")
          }
          if (prevTimer === 4) {
            Speech.speak("3")
          }
          if (prevTimer === 3) {
            Speech.speak("2")
          }
          if (prevTimer === 2) {
            Speech.speak("1")
          }
          if (prevTimer <= 1) {
            clearInterval(intervalId as NodeJS.Timeout);
            setRest(false);
            resolve();
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    });
  };
  const handleWorkout = async () => {
    if (!(await Speech.isSpeakingAsync())) {
      if (!rest) {
        if (progress === -1) {
          Speech.speak(
            `You are about to Start ${workout.title} Workout. Remember, its always good to warm your body up before any exercise. click the warm up button to do so, otherwise click start to start the exercise. All the Best!, `
          )
          setProgress(progress + 1)
          return;
        }
        if (progress === 5) {
          Speech.speak(
            `Voila! You just finished your ${workout.title} Workout! Think you can do more? Go ahead!`
          )
          setProgress(progress + 1)
          return;
        }
        if (progress === 0 || progress === 6) {
          setRest(false)
        } else {
          await beginRest()
        }
        if (progress < 6) {
          Speech.speak("Lets Start " + workout.steps[progress].title)
          Speech.speak(workout.steps[progress].desc)
          Speech.speak("Click Done after the exercise")
          setProgress(progress + 1)
        } else if (progress === 6) {
          setProgress(-1)
        }
        if(workout.steps[progress]?.timer === true){
          await timerExec()
        }
      }
    }
  }

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
      Speech.stop()
    };
  }, []);

  return (
    <View className='flex-1 px-2 bg-background'>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.Image
          entering={FadeInUp}
          source={workout.image}
          className='rounded-b-[40] w-[100%] self-center h-[300] mb-2'
        />
        <Animated.View entering={FadeInDown}>
          <View
            className='p-6 mb-2 bg-darkgray rounded-t-[40] rounded-b-[40]'
          >
            <Text className='text-3xl mb-5 font-bold text-palelime'>
              {workout.title}
            </Text>
            <Text className='text-white text-lg'>
              About
            </Text>
            <Text className='text-gray-300 text-base'>
              {workout.desc}
            </Text>
          </View>
          <View
            className='p-5 bg-darkgray justify-between rounded-t-[40] rounded-b-[40]'
          >
            <View
              style={{ borderWidth: (progress === 0) ? 3 : 0 }}
              className=' mb-2 p-5 rounded-3xl bg-background border-palelime'
            >
              <Text className='text-palelime text-lg '>Start!</Text>
            </View>
            {workout.steps?.map((item, index) =>
              <View
                style={{ borderWidth: (progress === index + 1) ? 3 : 0 }}
                className='bg-background border-palelime mb-2 p-5 rounded-3xl'
              >
                <Text className='text-palelime text-base '>{item.title}</Text>
                <Text className='text-gray-300 mb-3 text-base '>{item.desc}</Text>
                <Text className='text-palelime text-base '>{item.reps}</Text>
              </View>
            )}
            <View
              style={{ borderWidth: (progress === 6) ? 3 : 0 }}
              className='bg-background border-palelime mb-2 p-5 rounded-3xl'
            >
              <Text className='text-palelime text-lg '>End!</Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
      <View className='flex-row'>
        <Pressable
          onPress={() => {
            handleWorkout()
          }}
          style={{ justifyContent: (timer !== 0 && timer !== 60) ? 'space-between' : 'center' }}
          className='bg-palelime flex-row flex-auto mx-1 rounded-full mb-2 items-center'
        >
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: 100,
            }}
          >
            <Animated.View
              layout={LinearTransition}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${(progress / 6) * 100}%`,
                height: '100%',
                backgroundColor: '#4CAF50',
                borderRadius: 100,
              }}
            />
          </Animated.View>
          <Animated.Text
            entering={FadeIn}
            exiting={FadeOut}
            layout={LinearTransition}
            className='text-lg p-5 font-bold text-black'
          >
            {(progress === 6) ? (
              'Another Set?'
            ) : (
              (progress === 0 || progress === -1) ? (
                'Start Workout'
              ) : (
                (rest) ? (
                  'Rest for 60 seconds'
                ) : (
                  'Done'
                )
              )
            )}
          </Animated.Text>
          {(timer !== 0 && timer !== 60) ? (
            <Animated.View
              entering={FadeIn}
              exiting={FadeOut}
              className='rounded-full items-center justify-center m-2 bg-black p-3'
            >
              <Text className='text-lg text-black'>888</Text>
              <Text className='text-lg font-bold text-palelime absolute'>{timer}</Text>
            </Animated.View>
          ) : null}
        </Pressable>
        {(progress === 0) ? (
          <Pressable
            onPress={() => {
              useStore.setState({ currentExercise: 'sprint' })
              router.navigate(`/exercise`)
            }}
            className='bg-palelime mx-1 flex-auto rounded-full mb-2 items-center'
          >
            <Animated.Text
              entering={FadeIn}
              exiting={FadeOut}
              layout={LinearTransition}
              className='text-lg p-5 font-bold text-black'
            >
              Warm Up!
            </Animated.Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  )
})

export default performWorkouts