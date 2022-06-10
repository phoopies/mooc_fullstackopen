import { useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch();

    const onVote = () => {
        dispatch(vote(anecdote));
        dispatch(setNotification(`You voted "${anecdote.content}"!`, 5));
    };

    return (
        <div>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={onVote}>
                    vote
                </button>
            </div>
        </div>
    );
};

export default Anecdote;
