import { View, Text, TouchableOpacity, Alert } from 'react-native';

export function ShoppingListItem({ name }: { name: string }) {
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
    <View className="flex-row items-center justify-between border-b-2 border-gray-200 border-b-black/10 px-4 py-2">
      <Text className="text-3xl font-light">{name}</Text>
      <TouchableOpacity
        className="rounded-md p-4 bg-black"
        onPress={handleDelete}
      >
        <Text className=" text-white font-bold uppercase tracking-wider">
          Delete
        </Text>
      </TouchableOpacity>
    </View>
  );
}
