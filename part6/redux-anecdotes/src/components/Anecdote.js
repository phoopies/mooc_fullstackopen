import { useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { setNotification, deleteNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch();

    const onVote = () => {
        dispatch(vote(anecdote.id));
        dispatch(setNotification(`You voted "${anecdote.content}"!`));
        setTimeout(() => dispatch(deleteNotification()), 5000);
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
