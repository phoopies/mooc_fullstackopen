import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

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

app.post("/calculator", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {daily_exercises, target} = req.body;

  if (!daily_exercises || !target) {
    return res.send({error: "parameters missing"}).status(400);
  }

  const argsAreValid = (): boolean => typeof target === 'number'
      && Array.isArray(daily_exercises)
      && daily_exercises.every(d => !isNaN(Number(d)));
    
  const malformatted = () => res.send({
    error: "malformatted parameters",
  }).status(400);
    
  if (!argsAreValid()) {
    return malformatted();
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, target);
    return res.json(result);
  } catch (_e) {
    return malformatted();
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
