import 'unfetch/polyfill'
import { errorNotification } from './Notification';

const checkStatus = response =>{
let statusCode = response.status,
    success = response.ok;
    response.json().then(response => {
        if(!success){
            console.log(response)
            const errorMessage = response.message;
            const errorDescription = response.error;
            errorNotification(errorMessage,errorDescription)
        }
    })
}

export const getAllStudents = () => 
fetch('api/students')
.then(checkStatus).then();

export const addNewStudent = student => fetch('api/students', {
    headers: {
        'Content-Type':'application/json'
    },
    method: 'POST',
    body: JSON.stringify(student)
})
.then(checkStatus);