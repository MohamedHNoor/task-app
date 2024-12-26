import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

type Props = {
  name: string;
  isCompleted?: boolean;
};
export function ShoppingListItem({ name, isCompleted }: Props) {
  const handleDelete = () => {
    Alert.alert(
      `Are you sure you want to delete ${name} ?`,
      'It will be gone for good',
      [
        {
          text: 'Yes',
          onPress: () => console.log('Yes Pressed, Delete the item'),
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
    <View
      className={
        'flex-row items-center justify-between border-b-2 border-gray-200 border-b-black/10 px-4 py-2 '
      }
    >
      <View className='flex-row items-center gap-4'>
        <Entypo
          name={isCompleted ? 'check' : 'circle'}
          size={24}
          color={isCompleted ? '#94a3b8' : '#06b6d4'}
        />
        <Text
          className={`text-3xl font-light  ${isCompleted ? 'line-through text-slate-400' : 'text-slate-700'}`}
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
    </View>
  );
}
