import anecdoteService from '../services/anecdotes';

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'VOTE': {
            const id = action.data.id;
            const anecdote = state.find((a) => a.id === id);
            return state
                .map((a) =>
                    a.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : a
                )
                .sort((a, b) => b.votes - a.votes);
        }
        case 'NEW_ANECDOTE': {
            return [...state, action.data.anecdote];
        }
        case 'SET_ANECDOTES': {
            const anecdotes = action.data.anecdotes;
            return anecdotes;
        }
        default:
            return state;
    }
};

export const vote = (id) => {
    return {
        type: 'VOTE',
        data: { id },
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
