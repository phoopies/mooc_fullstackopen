import anecdoteService from '../services/anecdotes';

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'VOTE': {
            const anecdote = action.data.anecdote;
            return state
                .map((a) =>
                    a.id === anecdote.id ? anecdote : a
                )
                .sort((a, b) => b.votes - a.votes);
        }
        case 'NEW_ANECDOTE': {
            return [...state, action.data.anecdote];
        }
        case 'SET_ANECDOTES': {
            const anecdotes = action.data.anecdotes;
            return anecdotes.sort((a,b) => b.votes - a.votes);
        }
        default:
            return state;
    }
};

export const vote = (anecdote) => {
    return async dispatch => {
        const updatedAnecdote = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 });
        dispatch({
            type: 'VOTE',
            data: { anecdote: updatedAnecdote },
        });
    };
};

export const createAnecdote = (content) => {
    return async dispatch => {
        const anecdote = await anecdoteService.create(content);
        dispatch({
            type: 'NEW_ANECDOTE',
            data: { anecdote }
        });
    };
};

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll();
        dispatch({
            type: 'SET_ANECDOTES',
            data: { anecdotes }
        });
    };
};

export default reducer;
