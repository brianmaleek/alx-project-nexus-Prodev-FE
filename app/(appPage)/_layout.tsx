import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import { Image, ImageBackground, Text, View } from 'react-native'

function TabIcon({ focused, icon, title }: any) {
    if (focused) {
        return (
            <ImageBackground
                source={images.highlight}
                className='flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden'
            >
                <Image source={icon} tintColor="#151312" className='size-5' />
                <Text className='text-secondary text-base font-semibold ml-2'>{title}</Text>
            </ImageBackground>
        )
    }

    return (
        <View className='size-full justify-center items-center mt-4 rounded-full'>
            <Image source={icon} tintColor="#A3A3A3" className='size-5' />
        </View>
    )
}

const tabs = [
    { name: 'index', title: 'Home', icon: icons.home },
    { name: 'search', title: 'Search', icon: icons.search },
    { name: 'saved', title: 'Saved', icon: icons.save },
    { name: 'profile', title: 'Profile', icon: icons.person },
]

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                },
                tabBarStyle: {
                    backgroundColor: "#1E325C",
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 36,
                    height: 52,
                    position: "absolute",
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: "#1E325C",
                    display: "flex",
                    bottom: 0,
                },
            }}
        >
            {tabs.map((tab) => (
                <Tabs.Screen
                    key={tab.name}
                    name={tab.name}
                    options={{
                        title: tab.title,
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <TabIcon focused={focused} icon={tab.icon} title={tab.title} />
                        ),
                    }}
                />
            ))}
        </Tabs>
    )
}