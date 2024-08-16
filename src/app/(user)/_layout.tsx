import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, Redirect, Link } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { useAuth } from "@/src/providers/AuthProvider";
import Colors from "@/src/constants/Colors";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) => {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
};

const TabLayout = () => {
  const { session } = useAuth();
  const colorScheme = useColorScheme();

  if (!session) {
    return <Redirect href={"/"} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // tabBarShowLabel: false,
      }}
    >
      {/* you need to have an index screen, but we're hiding it */}
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          headerShown: false,

          tabBarIcon: ({ color }) => <TabBarIcon name="cutlery" color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      {/* <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      /> */}
    </Tabs>
  );
};

export default TabLayout;
