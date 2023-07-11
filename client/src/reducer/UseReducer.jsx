export const initialState = null;
// doubt is that : action type is same for both login logout but when payload value change 
// when user login then fetching api from login component when successfully logged in then it change true
// and invert when user logout then fetching api from logout component when logout then it change false 
export const reducer = (state, action) => {
    if (action.type === 'USER') {
        return action.payload; // // Update state with the new value from action.payload
    }
    // state value changed by return action.payload which is true/false
    return state; // Return the current state if the action type is not 'USER'
}