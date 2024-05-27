// src/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const initializeDatabase = () => axios.get(`${API_BASE_URL}/initialize-database`);

export const getProducts = () => axios.get(`${API_BASE_URL}/products`);

export const getTransactions = (params) => axios.get(`${API_BASE_URL}/transactions`, { params });

export const getStatistics = (params) =>axios.get(`${API_BASE_URL}/statistics?month=2024-02`, { params });

export const getBarChartData = (params) => axios.get(`${API_BASE_URL}/bar-chart?month=2024-05`, { params });

export const getPieChartData = (params) =>axios.get(`${API_BASE_URL}/pie-chart?month=2024-05`, { params });

export const getCombinedData = () => axios.get(`${API_BASE_URL}/combined-data`);
