import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/usefetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Index() {

  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: '' }))

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" resizeMode="cover" />
      <View className="flex-1 mt-5 px-5">
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        <SearchBar
          value=""
          onChangeText={() => { }}
          onPress={() => router.push('/search')}
          placeholder="Search for a movie"
        />
        <>
          {
            moviesLoading ? (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="mt-10 self-center"
              />
            ) : moviesError ? (
              <View className="flex-1 px-5 justify-center items-center">
                <Text>Error: {moviesError?.message}</Text>
              </View>
            ) : (
              <FlatList
                data={movies}
                renderItem={({ item }) => (
                  <MovieCard
                    imdbID={item.imdbID}
                    Poster={item.Poster}
                    Title={item.Title}
                    Year={item.Year}
                    Type={item.Type}
                  />
                )}
                keyExtractor={(item) => item.imdbID}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="flex-1 mt-2 pb-32"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
              />
            )
          }
        </>
      </View>
    </View>
  );
}
