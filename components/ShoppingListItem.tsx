import { View, Text, TouchableOpacity, Alert, Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import * as Haptics from 'expo-haptics';

type Props = {
  name: string;
  isCompleted?: boolean;
  onDelete: () => void;
  onToggleComplete?: () => void;
};
export function ShoppingListItem({
  name,
  isCompleted,
  onDelete,
  onToggleComplete,
}: Props) {
  const handleDelete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      `Are you sure you want to delete ${name} ?`,
      'It will be gone for good',
      [
        {
          text: 'Yes',
          onPress: () => onDelete(),
          style: 'destructive',
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
    );
  };
  return (
    <Pressable
      className={
        'flex-row items-center justify-between border-b-2 border-gray-200 border-b-black/10 px-4 py-2 '
      }
      onPress={onToggleComplete}
    >
      <View className='flex-row flex-1 items-center gap-4'>
        <Entypo
          name={isCompleted ? 'check' : 'circle'}
          size={24}
          color={isCompleted ? '#94a3b8' : '#06b6d4'}
        />
        <Text
          className={`text-3xl font-light flex-1  ${isCompleted ? 'line-through text-slate-400' : 'text-slate-700'}`}
          numberOfLines={2}
        >
          {name}
        </Text>
      </View>
      <TouchableOpacity
        className={`rounded-md p-4  ${isCompleted ? 'opacity-50' : 'opacity-100'}`}
        onPress={handleDelete}
      >
        <AntDesign
          name='closecircle'
          size={24}
          color={isCompleted ? '#94a3b8' : '#ef4444'}
        />
      </TouchableOpacity>
    </Pressable>
  );
}
