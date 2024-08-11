import { View, Text } from 'react-native'
import React, { memo, useCallback, useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LineChart, lineDataItem } from 'react-native-gifted-charts';
import { useStore } from '@/src/store/store';

const statGraphs = memo(() => {

  const customDataPoint = useCallback(() => {
    return (
      <View className="w-5 h-5 bg-white border-4 rounded-full border-[#D5FF5F]" />
    );
  }, []);

  const { activityList } = useStore((state) => ({
    activityList: state.activityList
  }))

  if(activityList.length<10){
    return(
      <View className='flex-1 bg-background justify-center items-center'>
        <Text className='text-white text-center text-lg'>Atleast 10 days of progress is needed for graph View</Text>
      </View>
    )
  }

  const calGraphData = useMemo(() => {
    return activityList.map((activity) => ({
      value: activity.caloriesBurnt,
      label: activity.date?.slice(-5) ?? '',
      customDataPoint: customDataPoint,
      showStrip: true,
      stripColor: 'black',
      dataPointLabelComponent: () => (
        <Text className='text-white font-bold'>{activity.caloriesBurnt}</Text>
      ),
      dataPointLabelShiftY: -25,
      dataPointLabelShiftX: 10,
    }));
  }, []);

  const stepGraphData = useMemo(() => {
    return activityList.map((activity) => ({
      value: activity.steps,
      label: activity.date?.slice(-5) ?? '',
      customDataPoint: customDataPoint,
      showStrip: true,
      stripColor: 'black',
      dataPointLabelComponent: () => (
        <Text className='text-white font-bold'>{activity.caloriesBurnt}</Text>
      ),
      dataPointLabelShiftY: -25,
      dataPointLabelShiftX: 10,
    }));
  }, []);

  const disttanceGraphData = useMemo(() => {
    return activityList.map((activity) => ({
      value: activity.distance,
      label: activity.date?.slice(-5) ?? '',
      customDataPoint: customDataPoint,
      showStrip: true,
      stripColor: 'black',
      dataPointLabelComponent: () => (
        <Text className='text-white font-bold'>{activity.caloriesBurnt}</Text>
      ),
      dataPointLabelShiftY: -25,
      dataPointLabelShiftX: 10,
    }));
  }, []);

  const Chart = useCallback((data: lineDataItem[]) => {
    return (
      <LineChart
        data={data}
        thickness={6}
        color="#D5FF5F"
        noOfSections={5}
        areaChart
        isAnimated={false}
        yAxisTextStyle={{ color: 'lightgray' }}
        xAxisLabelTextStyle={{ color: 'lightgray' }}
        curved
        startFillColor={'#D5FF5F'}
        endFillColor={'#D5FF5F'}
        startOpacity={0.4}
        endOpacity={0.4}
        spacing={55}
        backgroundColor="#414141"
        rulesColor="gray"
        rulesType="solid"
      />
    );
  }, []);

  return (
    <SafeAreaView className=' align-middle p-2 flex-1 bg-background'>
      <Text className='text-palelime my-2 text-lg'>Steps</Text>
      {Chart(stepGraphData)}
      <Text className='text-palelime my-2 text-lg'>Calories</Text>
      {Chart(calGraphData)}
      <Text className='text-palelime my-2 text-lg'>Distance</Text>
      {Chart(disttanceGraphData)}
    </SafeAreaView>
  )
})

export default statGraphs