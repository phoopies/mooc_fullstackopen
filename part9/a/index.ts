import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res): void => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res): void => {
  const { weight, height } = req.query;
  const weightN = Number(weight);
  const heightN = Number(height);

  if (isNaN(weightN) || isNaN(heightN)) {
    res.send({ error: "malformatted parameters" });
    return;
  }

  try {
    const bmi: string = calculateBmi(Number(height), Number(weight));
    res.send({
      weight: weightN,
      height: heightN,
      bmi,
    });
  } catch (e) {
    res.send({ error: "malformatted parameters: " + e });
    console.log(e);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
