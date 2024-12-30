import { Text, View } from 'react-native';

type Props = {
  number: number;
  unit: string;
  textStyle?: string;
};

export default function TimerSegment({ number, unit, textStyle }: Props) {
  return (
    <View className='p-4 rounded justify-center items-center'>
      <Text className={`text-3xl font-bold ${textStyle}`}>{number}</Text>
      <Text className={`text-sm ${textStyle}`}>{unit}</Text>
    </View>
  );
}
