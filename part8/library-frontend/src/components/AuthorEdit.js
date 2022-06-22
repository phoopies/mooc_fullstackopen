import { useMutation } from "@apollo/client";
import { useState } from "react";
import Select from "react-select";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const AuthorEdit = ({ authors, showError }) => {
  const [born, setBorn] = useState("");
  const [author, setAuthor] = useState(undefined);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      showError(error.graphQLErrors[0].message, 5);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    editAuthor({ variables: { born: Number(born), name: author.value } });
  };

  return (
    <div>
      <h3>Edit author</h3>
      <form onSubmit={handleSubmit}>
        <Select
          name="user"
          isClearable={true}
          isSearchable={true}
          options={authors.map((a) => ({ value: a.name, label: a.name }))}
          onChange={s => {
            setAuthor(s);
            const existingAuthor = authors.find(a => a.name === s.value);
            setBorn(prev => existingAuthor.born ? existingAuthor.born : prev);
        }}
          value={author}
        />
        <input
          type="number"
          value={born}
          onChange={(e) => setBorn(e.target.value)}
        />
        <br />
        <button type="submit" disabled={!author || !Number(born)}>
          Edit
        </button>
      </form>
    </div>
  );
};

export default AuthorEdit;
