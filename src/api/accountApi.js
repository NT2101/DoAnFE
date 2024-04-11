import { axiosClient } from './axiosClient'

export const accountApi = {
    getAll() {
        const url = '/accounts/All';
        var result = axiosClient.get(url);
        return result;
    },
    post(Name, Password) {
        const url = `/accounts/Login?Name=${Name}&Password=${Password}`;
        var result = axiosClient.post(url);
        return result;
    },
    add(data) {
        var newData = {
            Name: data.Name,
            Password: data.password,
            CreatedDate: '1/1/2000',
            Status: 1,
            ID: -1
        };
        const url = `/account/`;
        return axiosClient.post(url, newData);
    },
    getByID(ID) {
        const url = `/account?ID=${ID}`;
        var result = axiosClient.get(url);
        return result;
    }
}