import axios from "axios";
import { getApiUrl } from "../context/configURL";

const url = getApiUrl();

export const obtenerDatos = async (tipo) => {
    try {
        const response = await axios.get(`${url}/api/${tipo}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};