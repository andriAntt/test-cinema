"use client";
import { Box, Input, Text } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

const SearchBox = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchFilm = searchParams.get("search-film");
  const [searchValue, setSearchValue] = useState(searchFilm || '');
  
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    e.target.value.length > 0
      ? router.push(`/?search-film=${e.target.value}`)
      : router.push("/");
  };

  return (
    <Box className="w-full">
      <Input
        value={searchValue}
        onChange={(e) => handleChangeInput(e)}
        placeholder="Search film"
        className="w-full"
        _focus={{
          borderColor: "black",
          boxShadow: "none",
        }}
      />
    </Box>
  );
};

export default SearchBox;
