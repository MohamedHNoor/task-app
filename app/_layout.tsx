import { Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
// Import your global CSS file
import '../global.css';

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Shopping List',
          tabBarIcon: ({ color, size }) => (
            <Feather name='list' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='count'
        options={{
          title: 'Counter',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='clockcircleo' size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
