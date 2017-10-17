import axios from 'axios';
import apiUrl from './api.js';


//Exports API response through getCustomerList function


export function getCustomerList(){
    return axios.get(apiUrl).then(response => response.data);
}


//Exports function used to post data to API

export function postCustomer(customer){
    return axios.post(apiUrl, customer).then(response => response.data)
}


export function getCustomer(id){
    return axios.get(apiUrl + id).then(response => response.data);
}
export function updateCustomer(id, obj){
    return axios.patch(apiUrl + id, obj).then(response => response.data);
}
export function deleteCustomer(id){
    return axios.delete(apiUrl + id).then(response => response.data)
    
}
