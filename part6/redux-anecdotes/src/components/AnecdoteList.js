import { useSelector } from 'react-redux';
import Anecdote from './Anecdote';

const AnecdoteList = () => {
    const regexify = (filter) => {
        return new RegExp(`.*${filter}.*`, 'i');
    };
    const filter = useSelector(state => state.filter);
    const anecdotes = useSelector(state => state.anecdotes).filter(anecdote => regexify(filter).test(anecdote.content));

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