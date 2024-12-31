import { Stack } from 'expo-router';
import { Pressable } from 'react-native';
import { Link } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function CountLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Counter',
          headerRight: () => {
            return (
              <Link href='/count/history' asChild>
                <Pressable hitSlop={20}>
                  <MaterialIcons name='history' size={32} color='gray' />
                </Pressable>
              </Link>
            );
          },
        }}
      />
      <Stack.Screen
        name='history'
        options={{ title: 'Groceries History', presentation: 'modal' }}
      />
    </Stack>
  );
}
