import { STORE_CRITERIA } from './actionType'
const initState = {
    criteria: '',
    redirect: false
}
const criteria = sessionStorage.getItem('criteria');
if (criteria) {
    initState.criteria = criteria;
}
const reducer = (state = initState, action) => {
    switch (action.type) {
        case STORE_CRITERIA:
            sessionStorage.setItem('criteria', action.criteria);
            return { ...state, criteria: action.critera, redirect: true }
        default:
            return state;
    }
}

export default reducer;