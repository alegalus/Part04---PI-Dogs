require("dotenv").config();
const { YOUR_API_KEY } = process.env;
const { Dog, Temperament } = require("../db");
const axios = require("axios").default;
console.log(YOUR_API_KEY);

let getApiData = async () => {
  let apiData = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
  );

  let apiDog = apiData.data.map((el) => {
    let temperaments = el.temperament?.toString().split(",");
    let tempObj = [];
    temperaments?.map((el) => {
      tempObj.push({ name: el.trim() });
    });

    return {
      id: el.id,
      name: el.name,
      weight: el.weight.metric.includes("NaN")
        ? "20 kg"
        : el.weight.metric + " kg",
      height: el.height.metric + " cm",
      life_span: el.life_span,
      temperaments: tempObj,
      image: el.image.url,
      apiDog: true,
      dogDbCreated: false,
    };
  });

  return apiDog;
};

let getTemperaments = async () => {
  let apiDogs = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
  );
  let temp = apiDogs.data.map((el) => el.temperament);
  let tempArr = temp.toString().split(",");
  let set = new Set(tempArr);
  let arrFinal = Array.from(set);

  arrFinal.forEach((el) => {
    let t = el.trim();
    Temperament.findOrCreate({
      where: { name: t },
    });
  });

  const allTemp = await Temperament.findAll();
  return allTemp;
};

let getDbData = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
    },
  });
};


let getAllData = async () => {
  let apiData = await getApiData();
  let dbData = await getDbData();
  let allData = [...apiData, ...dbData];
  return allData;
};

module.exports = {
  getApiData,
  getTemperaments,
  getDbData,
  getAllData,
};
