import { Link } from "expo-router";
import { Text, Image, TouchableOpacity, View } from "react-native";

import { icons } from "@/constants/icons";
import { GENRE_MAP } from "@/constants/genres";
// import type { Movie } from "@/types";

const MovieCard = ({
                       id,
                       poster_path,
                       title,
                       vote_average,
                       release_date,
                       overview,
                       genre_ids,
                   }: Movie) => {
    const genreNames = genre_ids
        ?.slice(0, 2)
        ?.map((id) => GENRE_MAP[id])
        .filter(Boolean)
        .join(", ");

    return (
        <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity
                className="w-[30%] mb-4"
                accessibilityRole="button"
                accessibilityLabel={`View details for ${title}`}
            >
                <Image
                    source={{
                        uri: poster_path
                            ? `https://image.tmdb.org/t/p/w500${poster_path}`
                            : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
                    }}
                    className="w-full h-52 rounded-lg mb-2"
                    resizeMode="cover"
                    accessibilityLabel={`${title} poster`}
                />

                <Text className="text-sm font-bold text-white mb-1" numberOfLines={1}>
                    {title || "Untitled"}
                </Text>

                <Text className="text-xs text-light-300 mb-2" numberOfLines={2}>
                    {overview || "No description available"}
                </Text>

                <View className="flex-row items-center gap-x-1 mb-2">
                    <Image source={icons.star} className="size-3" />
                    <Text className="text-xs text-white font-semibold">
                        {vote_average ? (vote_average / 2).toFixed(1) : "N/A"}
                    </Text>
                    <Text className="text-xs text-light-300 ml-1">
                        • {release_date?.split("-")[0] || "TBA"}
                    </Text>
                </View>

                <View className="flex-row items-center">
                    <Text className="text-xs font-medium text-light-300 capitalize" numberOfLines={1}>
                        {genreNames || "N/A"}
                    </Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
};

export default MovieCard;
