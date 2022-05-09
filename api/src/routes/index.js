const { Router } = require("express");
const { Dog, Temperament } = require("../db");
const {getAllData, getTemperaments} = require("./data.js")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const router = Router();

//Routes//
router.get("/dogs", async (req, res) => {
  let { name } = req.query;
  let data = await getAllData();
  if (name) {
    let filterByName = data.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    data.length === 0
      ? res.status(404).json({ message: "dog not found" })
      : res.send(filterByName);
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
  let allTemp = await getTemperaments();
  res.send(allTemp);
});

router.post("/dog", async (req, res) => {
  try {
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
    arrHeight.push(minHeight, maxHeight);
    let strH = arrHeight.join(" - ");
    let strHeight = strH + " cm";

    let arrWeight = [];
    arrWeight.push(minWeight, maxWeight);
    let strW = arrWeight.join(" - ");
    let strWeight = strW + " kg";

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

     await dogCreated.addTemperaments(ListTemperaments);

    res.status(201).send("dog created successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/dogs/:idRaza", async (req, res) => {
  try {
    let { idRaza } = req.params;

    const { name, minHeight, maxHeight, minWeight, maxWeight, life_span } =
      req.body;

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

    let updateDog = await Dog.findByPk(idRaza);
    updateDog.name = name;
    updateDog.height = strHeight;
    updateDog.weight = strWeight;
    updateDog.life_span = life_span + " years";
    
    await updateDog.save();

    res.status(200).send("dog updated successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/dogs/:idRaza", async (req, res) => {
  try {
    let { idRaza } = req.params;
    await Dog.destroy({
      where: {
        id: idRaza,
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
