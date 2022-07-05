interface bmiArgs {
    mass?: number;
    height?: number;
    hasArgs: boolean;
}

const parseBmiArgs = (args: Array<string>): bmiArgs => {
    if (args.length !== 4) return { hasArgs: false };

    const mass = Number(args[2]);
    const height = Number(args[3]);
  
    if ( !isNaN(mass) && !isNaN(height)) {
        return {
            mass,
            height,
            hasArgs: true
        };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

const calculateBmi = (heightCm: number, massKg: number): string => {
    const validateBmiArgs = (heightCm: number, massKg: number): void => {
        if (heightCm <= 0 || heightCm > 300) throw new Error("Invalid height provided");
        if (massKg <= 0 || massKg > 999) throw new Error("Invalid weight provided");
    }

    validateBmiArgs(heightCm, massKg);
    const bmi = massKg / (heightCm / 100.0)**2;

    if (bmi < 18.5) return 'UnderWeight (unhealthy weight)';
    else if (bmi < 25) return 'Normal (healthy weight)';
    else return 'Overweight (unhealthy weight)';
};

const bmiArgs = parseBmiArgs(process.argv);
if (bmiArgs.hasArgs) console.log(calculateBmi(bmiArgs.mass, bmiArgs.height));
else console.log(calculateBmi(180, 74));