import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";
import Select from "react-select";
import BookTable from "./BookTable";

const Books = (props) => {
  const [genre, setGenre] = useState(undefined);
  const bookResult = useQuery(ALL_BOOKS, {
    variables: { genre: genre ? genre.value : "" },
  });

  // For genres, meh. Also doesn't update when new ones are created...
  const allBookresult = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  return bookResult.loading || allBookresult.loading ? (
    "Loading..."
  ) : (
    <div>
      <h2>books</h2>
      <Select
        value={genre}
        isClearable
        name="genres"
        onChange={(s) => setGenre(s)}
        options={[
          ...new Set(
            allBookresult.data.allBooks.reduce(
              (prev, a) => prev.concat(a.genres),
              []
            )
          ),
        ].map((g) => ({ label: g, value: g }))}
      />
      <BookTable books={bookResult.data.allBooks} />
    </div>
  );
};

export default Books;
