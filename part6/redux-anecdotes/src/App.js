import { useEffect } from 'react';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { setAnecdotes } from './reducers/anecdoteReducer';
import anecdoteSerivce from './services/anecdotes';
import { useDispatch } from 'react-redux';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getAnecdotes = async () => {
            const anecdotes = await anecdoteSerivce.getAll();
            dispatch(setAnecdotes(anecdotes));
        };
        getAnecdotes();
    }, [dispatch]);

    return (
        <div>
            <Notification />
            <Filter />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    );
};

export default App;
