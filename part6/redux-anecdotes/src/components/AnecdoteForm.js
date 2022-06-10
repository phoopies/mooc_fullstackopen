import { useDispatch } from 'react-redux';
import { addNewAnecdote } from '../reducers/anecdoteReducer';
import { deleteNotification, setNotification } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addAnecdote = async (event) => {
        event.preventDefault();
        const content = event.target.note.value;
        event.target.note.value = '';
        const anecdote = await anecdoteService.create(content);
        dispatch(addNewAnecdote(anecdote));
        dispatch(setNotification(`You created a new anecdote: ${content}`));
        setTimeout(() => dispatch(deleteNotification()), 5000);
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
