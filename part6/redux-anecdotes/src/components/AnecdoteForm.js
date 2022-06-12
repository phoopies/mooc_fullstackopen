import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault();
        const content = event.target.note.value;
        event.target.note.value = '';
        props.createAnecdote(content);
        props.setNotification(`You created a new anecdote: ${content}`, 5);
    };

    return (
        <form onSubmit={addAnecdote}>
            <h2>create new</h2>
            <input name="note" />
            <button type="submit">add</button>
        </form>
    );
};

const mapDispatchToProps = {
    setNotification,
    createAnecdote
};

const ConnectedAnecdoteForm = connect(
    null,
    mapDispatchToProps,
)(AnecdoteForm);

export default ConnectedAnecdoteForm;
