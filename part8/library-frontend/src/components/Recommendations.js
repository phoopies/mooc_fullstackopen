import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";
import BookTable from "./BookTable";

const Recommendations = ({ show }) => {
  const userResult = useQuery(ME);
  console.log(userResult.loading ? "loading" : userResult.data)
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: userResult.loading ? "" : userResult.data.me.favoriteGenre },
  });

  if (!show) {
    return null;
  }

  if (result.loading) {
    return "Loading...";
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <BookTable books={result.data.allBooks} />
    </div>
  );
};

export default Recommendations;
