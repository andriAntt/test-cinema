import FilmList from "@/components/FilmList/FilmList";
import Form from "@/components/Form/Form";
import SearchBox from "@/components/SearchBox/SearchBox";
import CinemaServices from "@/services/CinemaServices";
import { Film } from "@/types/type";
import { Box, Input, Text } from "@chakra-ui/react";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ searchParams }: Props) {
  const searchP = searchParams["search-film"];

  const { getFilms } = CinemaServices();

  const filmsData: Film[] = await getFilms();

  const filtersFilmsData =
    searchP &&
    typeof searchP === "string" &&  searchP?.length !== 0?
    filmsData.filter((film) => film.name.includes(searchP)) : filmsData;

  return (
    <main className="flex max-w-[1440px] mx-auto flex-col relative">
      <Box className="md:w-1/2 w-[80%] mx-auto mt-7">
        <SearchBox />
      </Box>

      <Form/>

      <FilmList filmsData={filtersFilmsData} />
    </main>
  );
}
