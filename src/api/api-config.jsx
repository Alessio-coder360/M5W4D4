// API_KEY non dovrebbe essere esportata se usata solo internamente
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDUxNTc1NDkzOTdmZDAwMTRkYzI4ZmUiLCJpYXQiOjE3MTIxMjMwODUsImV4cCI6MTcxMzMzMjY4NX0.cxyXZ_xcxpigu4GJAyYJOQK8n3Fl3l5QhsHtX5KBGZk";

// Esporta solo ciò che serve effettivamente ai componenti
export const authHeaders = {
  "Authorization": `Bearer ${API_KEY}`
};

export const BASE_URL = "https://striveschool-api.herokuapp.com/api";
