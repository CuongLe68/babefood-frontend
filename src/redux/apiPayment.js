import axios from 'axios';

export const checkPaid = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(process.env.REACT_APP_URL_API_GOOGLESHEETPAYMENT)
            .then((response) => {
                resolve(response.data.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
