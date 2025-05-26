import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import useFetch from '@/services/usefetch'
import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const showResultsHeader =
    !loading &&
    !error &&
    searchQuery.trim() &&
    Array.isArray(movies) &&
    movies.length > 0;

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover" />

      <FlatList
        className="px-5"
        data={Array.isArray(movies) ? movies : []}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.imdbID}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar
                placeholder="Search for a movie"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onPress={() => { }}
              />
            </View>
            {showResultsHeader && (
              <Text className="text-xl text-white font-bold mb-2">
                Search Results for <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          <View className='mt-10 px-5'>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}
            {/* {error && (
              <Text className="text-red-500 text-center px-5 my-3">
                Error: {error?.message}
              </Text>
            )} */}
            {!loading && (
              <Text className='text-gray-500 text-center'>
                {searchQuery.trim() ? 'No movies found' : 'Search for a movie to see results'}
              </Text>
            )}
          </View>
        }
      />
    </View>
  );
};

export default Search;