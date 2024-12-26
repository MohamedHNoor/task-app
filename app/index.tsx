import { Alert, Text, TouchableOpacity, View } from 'react-native'

export default function Index() {
  const handleDelete = () => {
    Alert.alert(
      'Are you sure you want to delete this?',
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
      ]
    )
  }
  return (
    <View className='flex-1 justify-center'>
      <View className='flex-row items-center justify-between border-b-2 border-gray-200 border-b-sky-200 px-4 py-2'>
        <Text className='text-3xl font-light'>Coffee</Text>
        <TouchableOpacity
          className='rounded-md p-4 bg-black'
          onPress={handleDelete}
        >
          <Text className=' text-white font-bold uppercase tracking-wider'>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
