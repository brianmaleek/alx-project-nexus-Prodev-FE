import { icons } from '@/constants/icons'
import { Image, TextInput, View } from 'react-native'
import SearchBarProps from '@/interfaces/SearchBarProps'


const SearchBar = ({
                       placeholder,
                       value,
                       onChangeText,
                       onPress }: SearchBarProps) => {
    return (
        <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
            <Image source={icons.search} className="size-5"
                   resizeMode="contain"
                   tintColor="#ab8bff" />
            <TextInput
                onPress={onPress}
                placeholder={placeholder}
                placeholderTextColor="black"
                value={value}
                onChangeText={onChangeText}
                className='flex-1 ml-3 text-black font-semibold'
            />
        </View>
    )
}

export default SearchBar
