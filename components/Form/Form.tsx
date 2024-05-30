"use client";

import CinemaServices from "@/services/CinemaServices";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

const Form = () => {
  const [showForm, setShowForm] = useState(false);
  const { postOneFilm } = CinemaServices();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showForm]);

  async function onSubmit(values: FieldValues) {
    const trasformData = {
      id: uuidv4(),
      name: values.name,
      created: values.created,
      preview: values.preview,
      genres: values.genre.split(","),
      photo: values.photo,
      description: values.description,
    };

    try {
      const req = await postOneFilm(JSON.stringify(trasformData));

      setShowForm(false);
      router.refresh()
      
    } catch (e) {
      throw new Error();
    }

    setValue("name", '');
    setValue("created", '');
    setValue("preview", '');
    setValue("genres", '');
    setValue("photo", '');
    setValue("description", '');
  }

  return (
    <div className="flex justify-center mt-4">
      <Button mt={4} colorScheme="teal" onClick={() => setShowForm(true)}>
        Add film
      </Button>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-slate-500/[.8] transition-all duration-300 ${
          showForm ? "scale-100" : "scale-0"
        }`}
      >
        <form
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <span
            className="text-3xl mb-5 cursor-pointer"
            onClick={() => setShowForm(false)}
          >
            &times;
          </span>
          <FormControl className="mb-8 relative">
            <Input
              id="name"
              placeholder="Film name"
              {...register("name", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <Text className="absolute text-xs text-red-600 -bottom-5">
              {errors.name &&
                errors.name.message &&
                errors.name.message.toString()}
            </Text>
          </FormControl>

          <FormControl className="mb-8 relative">
            <Input
              id="created"
              placeholder="Film year created"
              {...register("created", {
                maxLength: { value: 4, message: "Max length should be 4" },
                minLength: { value: 3, message: "Minimum length should be 4" },
              })}
            />
            <Text className="absolute text-xs text-red-600 -bottom-5">
              {errors.name &&
                errors.name.message &&
                errors.name.message.toString()}
            </Text>
          </FormControl>

          <FormControl
            className="mb-8 relative"
            //  isInvalid={errors.name}
          >
            <Input
              id="genre"
              placeholder="Film genres"
              {...register("genre", {
                required: "This is required",
                minLength: { value: 1, message: "Minimum one genere" },
              })}
            />
            <Text className="text-xs">Please use {'","'} for split genres</Text>
            <Text className="absolute text-xs text-red-600 -bottom-5">
              {errors.genre &&
                errors.genre.message &&
                String(errors.genre.message)}
            </Text>
          </FormControl>

          <FormControl
            className="mb-8 relative"
            //  isInvalid={errors.name}
          >
            <Textarea
              resize={"none"}
              id="description"
              placeholder="Film description"
              {...register("description", {})}
            />
          </FormControl>

          <FormControl
            className="mb-6 relative"
            //  isInvalid={errors.name}
          >
            <Input
              id="photo"
              placeholder="Film preview"
              {...register("photo", {
                required: "This field is required",
                pattern: {
                  value:
                    /^(http|https):\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(\/\S*)?$/,
                  message: "Please enter a valid URL",
                },
              })}
            />

            <Text className="absolute text-xs text-red-600 -bottom-5">
              {errors.photo &&
                errors.photo.message &&
                String(errors.photo.message)}
            </Text>
          </FormControl>

          {/* <Box>
            {<img/>}
          </Box> */}

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Form;
