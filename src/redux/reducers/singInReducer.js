import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/singInAction';


const initialState = {
    user: null,       // Representa al usuario que ha iniciado sesión 
    loading: false,   // Indica si se está realizando una operación de inicio de sesión.
    error: null,      // Almacena información sobre cualquier error que ocurra durante el inicio de sesión.
};

// Reducer para manejar las acciones de inicio de sesión
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,   // Cambia el estado de "loading" a true para indicar que se está solicitando el inicio de sesión.
                error: null,     // Limpia cualquier error anterior.
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload, // Actualiza el usuario con los datos proporcionados en el "payload".
                loading: false,       // Cambia el estado de "loading" a false para indicar que el inicio de sesión ha tenido éxito.
                error: null,          // Limpia cualquier error anterior.
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                user: null,            // Establece el usuario en null, ya que el inicio de sesión ha fallado.
                loading: false,        // Cambia el estado de "loading" a false para indicar que el inicio de sesión ha terminado.
                error: action.payload, // Almacena el error que ocurrió durante el inicio de sesión en el "payload".
            };
        default:
            return state; // Si no se reconoce la acción, devuelve el estado actual sin realizar cambios.
    }
};

export default authReducer; 
