import { icons } from "@/constants/icons";
import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/usefetch';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";


interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-4">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-base mt-1">
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fetchMovieDetails(id as string), true);

  if (loading) {
    return (
      <SafeAreaView className="bg-primary flex-1">
        <ActivityIndicator size="large" color="#ab8bff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center items-center">
        <Text className="text-white">Error: {error.message}</Text>
      </SafeAreaView>
    );
  }

  if (!movie) return null;

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{ uri: movie.Poster }}
            className="w-full h-[450px] bg-dark-100"
            resizeMode="cover"
          />

          <TouchableOpacity className="absolute bottom-5 right-5 rounded-full size-14 bg-white flex items-center justify-center shadow-lg">
            <Image
              source={icons.play}
              className="w-6 h-7 ml-1"
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <View className="flex-col items-start justify-center mt-5 mb-2 w-full">
            <Text className="text-white font-bold text-2xl mb-1 w-full" numberOfLines={2}>
              {movie.Title}
            </Text>
            <View className="flex-row flex-wrap items-center gap-x-2 mt-2 w-full">
              <MaterialIcons name="event" size={18} color="#A8B5DB" />
              <Text className="text-light-200 text-base">{movie.Year}</Text>
              <MaterialIcons name="schedule" size={18} color="#A8B5DB" style={{ marginLeft: 8 }} />
              <Text className="text-light-200 text-base">{movie.Runtime}</Text>
              <MaterialIcons name="movie" size={18} color="#A8B5DB" style={{ marginLeft: 8 }} />
              <Text className="text-light-200 text-base">{movie.Type?.toUpperCase()}</Text>
              <MaterialIcons name="star" size={18} color="#A8B5DB" style={{ marginLeft: 8 }} />
              <Text className="text-light-200 text-base">{movie.Rated}</Text>
            </View>
          </View>

          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {movie.imdbRating}/10
            </Text>
            <Text className="text-light-200 text-sm">
              ({movie.imdbVotes} votes)
            </Text>
          </View>

          <MovieInfo label="Plot" value={movie.Plot} />
          <MovieInfo label="Genre" value={movie.Genre} />
          <MovieInfo label="Director" value={movie.Director} />
          <MovieInfo label="Writer" value={movie.Writer} />
          <MovieInfo label="Actors" value={movie.Actors} />
          <MovieInfo label="Language" value={movie.Language} />
          <MovieInfo label="Country" value={movie.Country} />
          <MovieInfo label="Awards" value={movie.Awards} />
          <MovieInfo label="Box Office" value={movie.BoxOffice} />
          <MovieInfo label="Metascore" value={movie.Metascore} />

          {movie.Ratings && movie.Ratings.length > 0 && (
            <View className="flex-col items-start justify-center mt-4">
              <Text className="text-light-200 font-normal text-sm mb-1">Ratings</Text>
              {movie.Ratings.map((r: any, idx: number) => (
                <Text key={idx} className="text-light-100 font-bold text-base">
                  {r.Source}: {r.Value}
                </Text>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;