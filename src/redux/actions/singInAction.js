// Define el tipo de acción para iniciar sesión
export const LOGIN_REQUEST = 'LOGIN_REQUEST'; // Este es el tipo de acción para solicitar el inicio de sesión.
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'; // Este es el tipo de acción para manejar el inicio de sesión exitoso.
export const LOGIN_FAILURE = 'LOGIN_FAILURE'; // Este es el tipo de acción para manejar el fallo en el inicio de sesión.

// Acción para solicitar el inicio de sesión
export const loginRequest = () => ({
    type: LOGIN_REQUEST, // Retorna un objeto con el tipo de acción "LOGIN_REQUEST".
});

// Acción para manejar el inicio de sesión exitoso
export const loginSuccess = (userData) => ({
    type: LOGIN_SUCCESS, // Retorna un objeto con el tipo de acción "LOGIN_SUCCESS".
    payload: userData, // El "payload" contiene los datos del usuario que han iniciado sesión con éxito.
});

// Acción para manejar el fallo en el inicio de sesión
export const loginFailure = (error) => ({
    type: LOGIN_FAILURE, // Retorna un objeto con el tipo de acción "LOGIN_FAILURE".
    payload: error, // El "payload" contiene información sobre el error que ocurrió durante el inicio de sesión.
});
