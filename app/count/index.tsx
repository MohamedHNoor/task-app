import { registerForPushNotificationsAsync } from '@/utils/registerForPushNotificationsAsync';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useEffect, useState } from 'react';
import { intervalToDuration, isBefore } from 'date-fns';
import TimerSegment from '@/components/TimerSegment';
import { getFromStorage, saveToStorage } from '@/utils/storage';

const frequency = 10 * 1000;

export const countdownStorageKey = 'countdown';

export type PersistedCountdownState = {
  currentNotificationId: string | undefined;
  completedAtTimestamps: number[];
};

type CountdownStatus = {
  isOverdue: boolean;
  distance: ReturnType<typeof intervalToDuration>;
};

export default function Count() {
  const [isLoading, setIsLoading] = useState(true);
  const [countdownState, setCountdownState] =
    useState<PersistedCountdownState>();
  const [status, setStatus] = useState<CountdownStatus>({
    isOverdue: false,
    distance: {},
  });

  useEffect(() => {
    const init = async () => {
      const value = await getFromStorage(countdownStorageKey);
      setCountdownState(value);
    };
    init();
  }, []);

  const lastCompletedAt = countdownState?.completedAtTimestamps[0];

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timestamp = lastCompletedAt
        ? lastCompletedAt + frequency
        : Date.now();
      if (lastCompletedAt) {
        setIsLoading(false);
      }
      const isOverdue = isBefore(timestamp, Date.now());

      const distance = intervalToDuration(
        isOverdue
          ? { end: Date.now(), start: timestamp }
          : { start: Date.now(), end: timestamp },
      );

      setStatus({ isOverdue, distance });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [lastCompletedAt]);

  const scheduleNotification = async () => {
    let pushNotificationId;
    const result = await registerForPushNotificationsAsync();
    if (result === 'granted') {
      pushNotificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'The thing is due!',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: frequency / 1000,
        },
      });
    } else {
      if (Device.isDevice) {
        Alert.alert(
          'Unable to schedule notification',
          'Enable the notifications permission for Expo Go in settings',
        );
      }
    }

    if (countdownState?.currentNotificationId) {
      await Notifications.cancelScheduledNotificationAsync(
        countdownState.currentNotificationId,
      );
    }

    const newCountdownState = {
      currentNotificationId: pushNotificationId,
      completedAtTimestamps: countdownState
        ? [Date.now(), ...countdownState.completedAtTimestamps]
        : [Date.now()],
    };
    setCountdownState(newCountdownState);
    await saveToStorage(countdownStorageKey, newCountdownState);
  };

  if (isLoading) {
    return (
      <View className='flex-1 items-center justify-center'>
        <ActivityIndicator size='large' color='#0ea5e9' />
      </View>
    );
  }

  return (
    <View
      className={`flex-1 items-center justify-center ${status.isOverdue ? 'bg-red-500' : 'undefined'}`}
    >
      {!status.isOverdue ? (
        <Text className='text-3xl font-bold mb-4'>Things due in...</Text>
      ) : (
        <Text className='text-3xl font-bold mb-4 text-white'>
          Things overdue by...
        </Text>
      )}
      <View className='flex flex-row gap-x-4 mb-4'>
        <TimerSegment
          number={status.distance.days ?? 0}
          unit='Days'
          textStyle={status.isOverdue ? 'text-white' : undefined}
        />
        <TimerSegment
          number={status.distance.hours ?? 0}
          unit='Hours'
          textStyle={status.isOverdue ? 'text-white' : undefined}
        />
        <TimerSegment
          number={status.distance.minutes ?? 0}
          unit='Minutes'
          textStyle={status.isOverdue ? 'text-white' : undefined}
        />
        <TimerSegment
          number={status.distance.seconds ?? 0}
          unit='Seconds'
          textStyle={status.isOverdue ? 'text-white' : undefined}
        />
      </View>
      <TouchableOpacity
        className='bg-sky-500 px-8 py-4 rounded-md'
        onPress={scheduleNotification}
      >
        <Text className='text-white font-bold'>I've done the thing!</Text>
      </TouchableOpacity>
    </View>
  );
}
