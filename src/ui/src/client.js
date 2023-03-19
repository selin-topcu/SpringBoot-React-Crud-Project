import 'unfetch/polyfill'
import { errorNotification } from './Notification';
 
const checkStatus = response =>{
    if (response.ok) {
        return response;
    } else {
        let error = new Error(response.statusText);
        response.json().then(response => {
                console.log(response)
                const errorMessage = response.message;
                const errorDescription = response.httpStatus;
                errorNotification(errorMessage,errorDescription)
        })
        return Promise.reject(error);
    }
}

export const getAllStudents = () => 
fetch('api/students')

export const addNewStudent = student => fetch('api/students', {
    headers: {
        'Content-Type':'application/json'
    },
    method: 'POST',
    body: JSON.stringify(student)
})
.then(checkStatus);