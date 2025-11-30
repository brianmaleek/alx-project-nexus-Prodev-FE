import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_METRICS_ID!;
const ENDPOINT_ID = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;

const client = new Client()
	.setEndpoint(ENDPOINT_ID)
	.setProject(PROJECT_ID);


const database = new Databases(client);

export const updateSearchCount = async (query: string, movies: Movie) => {
	try {
		const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
			Query.equal("searchTerm", query),
		]);

		console.log(result);

		if (result.documents.length > 0) {
			const existingMovie = result.documents[0];
			await database.updateDocument(
				DATABASE_ID,
				COLLECTION_ID,
				existingMovie.$id,
				{
					count: existingMovie.count + 1,
				}
			);
		} else {
			await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
				searchTerm: query,
				movie_id: movies.id,
				title_movie: movies.title,
				count: 1,
				poster_url: `https://image.tmdb.org/t/p/w500${movies.poster_path}`,
			});
		}
	} catch (error) {
		console.error("Error updating search count:", error);
		throw error;
	}
};

export const getTrendingMovies = async (): Promise<
	TrendingMovie[] | undefined
> => {
	try {
		const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
			Query.limit(5), //Limit the top search movies to 5 and order by count
			Query.orderDesc("count"),
		]);

		return result.documents.map(doc => ({
			$id: doc.$id,
			searchTerm: doc.searchTerm as string,
			movie_id: doc.movie_id as number,
			title: doc.title_movie as string,  // ✅ Map title_movie to title
			count: doc.count as number,
			poster_url: doc.poster_url as string | null,
		}));
	} catch (error) {
		console.error("Error fetching trending movies:", error);
		throw error;
	}
};
