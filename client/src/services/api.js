import axios from "axios";

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  headers: {
    "Content-Type": "application/json",
    "x-cg-demo-api-key": import.meta.env.API_KEY,
  },
});

export const fetchCoins = async () => {
  try {
    const response = await api.get(`/coins/markets`, {
      params: {
        vs_currency: "zar",
        precision: "2",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const topCurrencies = async () => {
  try {
    const response = await api.get(
      "coins/markets?vs_currency=zar&order=market_cap_desc&per_page=6&page=1&sparkline=false"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
