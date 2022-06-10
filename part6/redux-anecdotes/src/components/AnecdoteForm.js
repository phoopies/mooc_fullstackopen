import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addAnecdote = async (event) => {
        event.preventDefault();
        const content = event.target.note.value;
        event.target.note.value = '';
        dispatch(createAnecdote(content));
        dispatch(setNotification(`You created a new anecdote: ${content}`, 5));
    };

    return (
        <form onSubmit={addAnecdote}>
            <h2>create new</h2>
            <input name="note" />
            <button type="submit">add</button>
        </form>
    );
};

export default AnecdoteForm;
