import { useSelector } from 'react-redux';
import Anecdote from './Anecdote';

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state);

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map((anecdote) => (
                <Anecdote key={anecdote.id} anecdote={anecdote} />
            ))}
        </div>
    );
};

export default AnecdoteList;