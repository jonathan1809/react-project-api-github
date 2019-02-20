import * as actionType from './actionType';
const initState = {
    items: [],
    total_count: 0,
    error: '',
    loading: false,
    isError: false
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.REQUEST_LIST_REPOSITORIES_START:
            return updateObject(state, { loading: true, isError: false })
        case actionType.REQUEST_LIST_REPOSITORIES_SUCCESS:
            return updateObject(state, { loading: false, items: action.items, total_count: action.total_count })
        case actionType.REQUEST_LIST_REPOSITORIES_FAIL:
            return updateObject(state, { loading: false, isError: false })
        default:
            return state;
    }
}


export default reducer;

const updateObject = (oldObject, updateProperties) => {
    return {
        ...oldObject,
        ...updateProperties
    }
}