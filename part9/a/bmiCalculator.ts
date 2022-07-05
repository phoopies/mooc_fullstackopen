interface parsedArgs {
    mass?: number;
    height?: number;
    hasArgs: boolean;
}

const parseArgs = (args: Array<string>): parsedArgs => {
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

const args = parseArgs(process.argv);
if (args.hasArgs) console.log(calculateBmi(args.mass, args.height));
else console.log(calculateBmi(180, 74));