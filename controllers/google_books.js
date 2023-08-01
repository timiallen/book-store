const axios = require("axios");

const encodedParams = new URLSearchParams();
encodedParams.set(
  "redirectUri",
  "https://googlebooksraygorodskijv1.p.rapidapi.com/getAccessToken"
);
encodedParams.set("code", "	 9e796c8cbcf6d180c87dbc17e47515c317d892b9");

const options = {
  method: "POST",
  url: "https://googlebooksraygorodskijv1.p.rapidapi.com/getAccessToken",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Key": "7a480d61e5msh0ccffed8e1ebd6ep1d3052jsndb96b323bab6",
    "X-RapidAPI-Host": "GoogleBooksraygorodskijV1.p.rapidapi.com",
  },
  data: encodedParams,
};

try {
  const response = await axios.request(options);
  console.log(response.data);
} catch (error) {
  console.error(error);
}
