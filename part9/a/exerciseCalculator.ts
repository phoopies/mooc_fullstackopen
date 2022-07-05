type Rating = 1 | 2 | 3;

type RatingDescription = 'Bad' | 'Good' | 'Excellent';

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: RatingDescription;
  target: number;
  average: number;
}

const possibleDailyHours = (hours: number): boolean => hours >= 0 && hours <= 24;

const sum = (nums: number[]): number => nums.reduce((p, n) => p + n, 0);

const average = (nums: number[]): number => {
    if (nums.length === 0) throw new Error('Cannot calculate average of an empty array');
    return sum(nums) / nums.length;
};

const rate = (average: number, target: number): Rating => {
    const rating = Math.round(target - average + 2);
    const limitedRating = Math.max(1, Math.min(rating, 3));
    return <Rating>(limitedRating);
}

const describeRating = (rating: Rating): RatingDescription => {
    switch (rating) {
        case 1:
            return 'Bad';
        case 2:
            return 'Good';
        case 3:
            return 'Excellent';
        default:
            throw new Error('Cannot describe an invalid rating');
    }
}

const calculateExercises = (hours: number[], target: number): Result => {
        hours.forEach((hour, i) => {
            if (!possibleDailyHours(hour))
                throw new Error(`Value at index ${i} was invalid. Was ${hour}, expected between 0 and 24.`);
        })

        if (!possibleDailyHours(target)) throw new Error(`Target hour value is invalid. was ${target} expected between 0 and 24`);
        
        const avg: number = average(hours);
        const rating: Rating = rate(avg, target);

    return {
        periodLength: hours.length,
        trainingDays: hours.filter(h => h !== 0).length,
        success: avg >= target,
        rating,
        ratingDescription: describeRating(rating),
        target,
        average: avg
    }
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));