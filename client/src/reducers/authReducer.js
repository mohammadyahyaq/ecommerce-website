import * as actionTypes from '../actions/types'

/**
 * This reducer used to prove the authentication state of our application
 * @param {this is the current state} state 
 * @param {this is the passed action} action 
 * 
 * @returns 
 * There are three possiple outputs of this function:
 *  1- null - the initial state, which is before the ajax request
 *  2- false - which means the user is not logged in
 *  3- an object of the logged in user - which means the user is logged in
 */
function authReducer(state = null, action) {
    console.log('this is the payload content: ' + action.payload);
    switch(action.type) {
        case actionTypes.FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}

export default authReducer;