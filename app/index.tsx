import { ShoppingListItem } from '@/components/ShoppingListItem';
import { getFromStorage, saveToStorage } from '@/utils/storage';
import { useEffect, useState } from 'react';
import { TextInput, View, FlatList, Text } from 'react-native';

type ShoppingListItemType = {
  id: string;
  name: string;
  completedTimeStamps?: number;
  lastUpdatedTimestamp: number;
};

const storageKey = 'shopping-list';

function orderShoppingList(shoppingList: ShoppingListItemType[]) {
  return shoppingList.sort((a, b) => {
    if (a.completedTimeStamps && b.completedTimeStamps) {
      return b.completedTimeStamps - a.completedTimeStamps;
    }

    if (a.completedTimeStamps && !b.completedTimeStamps) {
      return 1;
    }

    if (!a.completedTimeStamps && b.completedTimeStamps) {
      return -1;
    }

    if (!a.completedTimeStamps && !b.completedTimeStamps) {
      return b.lastUpdatedTimestamp - a.lastUpdatedTimestamp;
    }

    return 0;
  });
}

export default function Index() {
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFromStorage(storageKey);
      if (data) {
        setShoppingList(data);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = () => {
    if (value) {
      const newShoppingList = [
        {
          id: new Date().toISOString(),
          name: value,
          lastUpdatedTimestamp: Date.now(),
        },
        ...shoppingList,
      ];
      saveToStorage(storageKey, newShoppingList);
      setShoppingList(newShoppingList);
      setValue('');
    }
  };

  const handleDelete = (id: string) => {
    const newShoppingList = shoppingList.filter((item) => item.id !== id);
    saveToStorage(storageKey, newShoppingList);
    setShoppingList(newShoppingList);
  };

  const handleToggleComplete = (id: string) => {
    const newShoppingList = shoppingList.map((item) => {
      if (item.id === id) {
        return {
          ...item,

          completedTimeStamps: item.completedTimeStamps
            ? undefined
            : Date.now(),
          lastUpdatedTimestamp: Date.now(),
        };
      }
      return item;
    });
    saveToStorage(storageKey, newShoppingList);
    setShoppingList(newShoppingList);
  };

  return (
    <FlatList
      data={orderShoppingList(shoppingList)}
      className='flex-1  gap-6 pt-6'
      contentContainerClassName='pb-12'
      stickyHeaderIndices={[0]}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <TextInput
          className='border-2 border-gray-300 p-5 mx-4 rounded-full text-md bg-white'
          placeholder='E.g Coffee'
          value={value}
          onChangeText={setValue}
          returnKeyType='done'
          onSubmitEditing={handleSubmit}
        />
      }
      ListEmptyComponent={
        <View className='justify-center items-center mt-12 mx-4'>
          <Text className='font-bold text-xl mb-2'>
            Your shopping list is empty.
          </Text>
          <Text>Start adding items by typing in the input above.</Text>
        </View>
      }
      renderItem={({ item }) => (
        <ShoppingListItem
          name={item.name}
          onDelete={() => handleDelete(item.id)}
          onToggleComplete={() => handleToggleComplete(item.id)}
          isCompleted={Boolean(item.completedTimeStamps)}
        />
      )}
    />
  );
}
