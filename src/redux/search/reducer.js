import { STORE_CRITERIA } from './actionType'
const initState = {
    criteria: ''
}
const criteria = sessionStorage.getItem('criteria');

if (criteria) {
    initState.criteria = criteria;

}
const reducer = (state = initState, action) => {
    switch (action.type) {
        case STORE_CRITERIA:
            sessionStorage.setItem('criteria', action.criteria);
            console.log(action.criteria)
            return updateObject(state, { criteria: action.criteria })
        default:
            return state;
    }
}

const updateObject = (oldObject, updateProperties) => {
    return {
        ...oldObject,
        ...updateProperties
    }
}
export default reducer;