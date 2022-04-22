const { Router } = require("express");
require("dotenv").config();
const { Dog, Temperament } = require("../db");
const axios = require("axios").default;
const { YOUR_API_KEY } = process.env;
const express = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const router = Router();
console.log(YOUR_API_KEY);
//get data from API//
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
      weight: el.weight.metric + " kg",
      height: el.height.metric + " cm",
      life_span: el.life_span,
      temperaments: tempObj,
      image: el.image.url,
      apiDog: true,
      dogDbCreated: false
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
  return arrFinal;
};

//get data from DB //
let getDbData = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

//get all the information (API and DB)//
let getAllData = async () => {
  let apiData = await getApiData();
  let dbData = await getDbData();
  let allData = [...apiData, ...dbData];
  return allData;
};
//Routes//

router.get("/dogs", async (req, res) => {
  let { name } = req.query;
  let data = await getAllData();
  if (name) {
    let filterByName = data.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    data.length
      ? res.send(filterByName)
      : res.status(404).send("dog not found");
  } else {
    res.send(data);
  }
});

router.get("/dogs/:idRaza", async (req, res) => {
  let { idRaza } = req.params;
  let data = await getAllData();
  if (idRaza.length <= 3) {
    let findByIdNumber = data.find((el) => el.id === Number(idRaza));
    return res.send(findByIdNumber);
  } else {
    let findById = data.find((el) => el.id === idRaza);
    return res.send(findById);
  }
});

router.get("/temperament", async (req, res) => {
  let arrTemp = await getTemperaments();

  arrTemp.forEach((el) => {
    let t = el.trim();
    Temperament.findOrCreate({
      where: { name: t },
    });
  });

  const allTemp = await Temperament.findAll();
  res.send(allTemp);
});

router.post("/dog", async (req, res) => {
  const {
    name,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
    life_span,
    temperament,
    image,
  } = req.body;

  if (!name || !minHeight || !maxHeight || !minWeight || !maxWeight) {
    res.status(404).send("mandatory data is missing");
  }

  let arrHeight = [];
  let minH = minHeight;
  let maxH = maxHeight;
  arrHeight.push(minH, maxH);
  let strH = arrHeight.join(" - ");
  let strHeight = strH + " cm";

  let arrWeight = [];
  let minW = minWeight;
  let maxW = maxWeight;
  arrWeight.push(minW, maxW);
  let strW = arrWeight.join(" - ");
  let strWeight = strW + " kg";

  try {
    let dogCreated = await Dog.create({
      name,
      height: strHeight,
      weight: strWeight,
      life_span: life_span + " years",
      image: image
        ? image
        : "https://nupec.com/wp-content/uploads/2020/07/Captura-de-pantalla-2020-07-24-a-las-17.33.44.png",
    });

    const ListTemperaments = await Temperament.findAll({
      where: { name: temperament },
    });

    dogCreated.addTemperament(ListTemperaments);

    res.status(201).send("dog created successfully");
  } catch (error) {
    console.log(error);
  }
});

router.use(express.json());

module.exports = router;
