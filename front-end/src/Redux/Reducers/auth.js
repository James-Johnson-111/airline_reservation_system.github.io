const initialState = {
    authenticate: false,

}

export const User = ( state = initialState, action ) => {

    switch ( action.type )
    {

        case 'USER_IS_AUTHENTICATED':
            return {
                ...state,
                authenticate: true
            }
        case 'STORE_USER_INFORMATION':
            return {
                ...state,
                // [authenticate]: action.payload
            }
        default:
            return state;

    }

}