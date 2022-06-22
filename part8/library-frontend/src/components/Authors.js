import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import AuthorEdit from "./AuthorEdit";

const Authors = ({ show }) => {
  const authorsResult = useQuery(ALL_AUTHORS);

  if (!show) {
    return null;
  }

  console.log(authorsResult);

  return authorsResult.loading ? (
    "Loading..."
  ) : (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {[...authorsResult.data.allAuthors].sort((a,b) => b.bookCount - a.bookCount).map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorEdit authors={authorsResult.data.allAuthors} />
    </div>
  );
};

export default Authors;
