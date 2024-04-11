import { axiosClient } from './axiosClient'

export const studentApi = {
    getAll() {
        const url = '/students/All';
        var result = axiosClient.get(url);
        return result;
    },
    add(data) {
        var newData = {
            StudentID: data.StudentID,
            Name: data.Name,
            Dob: data.Dob,
            Address: data.Address,
            PhoneNumber: data.PhoneNumber,
            EmailAdress: data.EmailAdress,
            Country: data.Country,
           
        };
        const url = `/students/Create`;
        return axiosClient.post(url, newData);
    },
    getByID(ID) {
        const url = `/account?ID=${ID}`;
        var result = axiosClient.get(url);
        return result;
    }
}