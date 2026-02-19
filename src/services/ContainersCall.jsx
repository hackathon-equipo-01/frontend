import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const getAllContainers = async () => {
    const response = await axios.get(`${API_URL}/waste-types`);
    return response.data;
};

export const processWaste = async (idClassroom, idResidue, idContainer) => {
    const response = await axios.post(`${API_URL}/discarded-waste/classroom/{idClassroom}/residue/{idResidue}/container/{idContainer}`, null, {
        params: {
            idClassroom: idClassroom,
            idResidue: idResidue,
            idContainer: idContainer
        }
    });
    return response.data;
};