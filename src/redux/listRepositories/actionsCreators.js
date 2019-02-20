import { REQUEST_LIST_REPOSITORIES_FAIL, REQUEST_LIST_REPOSITORIES_START, REQUEST_LIST_REPOSITORIES_SUCCESS } from './actionType';


export const fetchList = (criteria) => {
    return dispatch => {
        dispatch({ type: REQUEST_LIST_REPOSITORIES_START, loading: true })
        fetch(`https://api.github.com/search/repositories?q=${criteria}&sort=stars&order=desc`, { method: 'GET' })
            .then(res => res.json())
            .then(json => {
                dispatch({ type: REQUEST_LIST_REPOSITORIES_SUCCESS, items: json.items, total_count: json.total_count })
            })
            .catch(err => {
                alert('Something went wrong, try again');
                console.log(err)
                onError(err, dispatch);
            })
    }
}

const onError = (error, dispatch) => {
    Error('Something went wrong')
    dispatch({
        type: REQUEST_LIST_REPOSITORIES_FAIL,
        error: error
    })
}