import { ShoppingListItem } from "@/components/ShoppingListItem";
import { View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center gap-6">
      <ShoppingListItem name="Coffee" />
      <ShoppingListItem name="Tea" />
      <ShoppingListItem name="Sugar" />
    </View>
  );
}
