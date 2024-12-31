import { Text, FlatList, View, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import {
  countdownStorageKey,
  type PersistedCountdownState,
} from '@/app/count/index';
import { getFromStorage } from '@/utils/storage';
import { format } from 'date-fns';

const fullDateFormat = 'LLL d yyyy, h:mm aaa';

export default function HistoryScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [countdownState, setCountdownState] =
    useState<PersistedCountdownState>();

  useEffect(() => {
    const init = async () => {
      const value = await getFromStorage(countdownStorageKey);
      setCountdownState(value);
      setIsLoading(false);
    };
    init();
  }, []);

  if (isLoading) {
    return (
      <View className='flex-1 items-center justify-center'>
        <ActivityIndicator size='large' color='#0ea5e9' />
      </View>
    );
  }

  return (
    <FlatList
      data={countdownState?.completedAtTimestamps}
      contentContainerClassName='mt-6'
      className='flex-1 bg-white px-4'
      keyExtractor={(item) => item.toString()}
      renderItem={({ item }) => {
        return (
          <View className='py-2 mb-6 items-center bg-slate-300 rounded-md'>
            <Text className='text-xl'>{format(item, fullDateFormat)}</Text>
          </View>
        );
      }}
      ListEmptyComponent={
        <View className='jc-center items-center'>
          <Text className='font-semibold'>No history yet.</Text>
        </View>
      }
    />
  );
}
