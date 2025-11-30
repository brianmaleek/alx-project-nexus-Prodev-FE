import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import {useLocalSearchParams, router} from "expo-router";
import {fetchMovieDetails} from "@/servicesApi/api";
import useFetch from "@/servicesApi/useFetch";
import {icons} from "@/constants/icons";
import MovieInfoProps from "@/interfaces/MovieInfoProps";

const MovieDetails = () => {
	const MovieInfo = ({ label, value }: MovieInfoProps) => (
		<View className="flex-col items-start justify-center mt-5">
			<Text className="text-light-200 font-semibold text-sm">
				{label}
			</Text>

			<Text className={"text-light-100 font-bold text-sm mt-2"}>
				{value || "N/A"}
			</Text>

		</View>

	)

	const { id } = useLocalSearchParams();

	const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string));

    return (
        <View className={"bg-primary flex-1"}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
	            <View>
		            <Image source={{uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`}}
		                   className={"w-full h-[400px]"}
		                   resizeMode={"stretch"}>

		            </Image>
	            </View>

	            <View className={"flex-col items-start justify-center mt-5 px-5"}>
		            <Text className={"text-white text-2xl font-bold"}>{movie?.title}</Text>
	            </View>

	            <View className="flex-row items-center gap-x-2 mt-2 px-5">
		            {movie?.release_date && (
			            <Text className="text-light-200 text-sm">
				            {movie.release_date.split('-')[0]}
			            </Text>
		            )}

		            {movie?.release_date && movie?.runtime && (
			            <Text className="text-light-200 text-sm">•</Text>
		            )}

		            {movie?.runtime && (
			            <Text className="text-light-200 text-sm">
				            {movie.runtime} Minutes
			            </Text>
		            )}

		            {movie?.vote_average && (
			            <>
				            <Text className="text-light-200 text-sm">•</Text>
				            <View className="flex-row items-center gap-x-1">
					            <Image source={icons.star} className="size-4" />
					            <Text className="text-light-200 text-sm">
						            {movie.vote_average.toFixed(1)}
					            </Text>
					            <Text className="text-light-200 text-sm">
						            ({movie?.vote_count} Votes)
					            </Text>
				            </View>
			            </>
		            )}
	            </View>

	            <View className="px-5">
		            <MovieInfo label={"Overview"} value={movie?.overview} />
		            <MovieInfo label={"Genres"} value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"} />

		            <View className="flex-row gap-x-0 mt-5">
			            <View className="flex-1">
				            <Text className="text-light-200 font-semibold text-sm">
					            Budget
				            </Text>
				            <Text className="text-light-100 font-bold text-sm mt-2">
					            {movie?.budget ? `$${(movie.budget / 1000000).toFixed(0)}M` : "N/A"}
				            </Text>
			            </View>

			            <View className="flex-1">
				            <Text className="text-light-200 font-semibold text-sm">
					            Revenue
				            </Text>
				            <Text className="text-light-100 font-bold text-sm mt-2">
					            {movie?.revenue ? `$${(movie.revenue / 1000000).toFixed(0)}M` : "N/A"}
				            </Text>
			            </View>
		            </View>
	            </View>
            </ScrollView>
	        <View className="px-5 mt-8 mb-4">
		        <TouchableOpacity
			        onPress={() => router.back()}
			        className="bg-secondary py-3 rounded-lg flex-row items-center justify-center gap-x-2"
		        >
			        <Image
				        source={icons.arrow}
				        className="size-5"
				        tintColor="white"
				        style={{ transform: [{ rotate: '180deg'}]}}
			        />
			        <Text className="text-white font-semibold text-base">
				        Go Back
			        </Text>
		        </TouchableOpacity>
	        </View>

        </View>
    )
}

export default MovieDetails
