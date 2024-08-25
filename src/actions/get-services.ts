import { headers } from "@/helper/AmeliaCall";
import axios from "axios";

export const getServices = async () => {
    const ameliaURL = import.meta.env.PUBLIC_AMELIA_URL;
    try {
      const response = await axios.get(`${ameliaURL}services`, {
        headers: headers,
      });
      return response.data.data.services;
    } catch (error) {
      console.error("Erreur lors de la récupération des services:", error);
    }
  };