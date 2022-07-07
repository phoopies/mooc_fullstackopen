import Content from './components/Content';
import Header from './components/Header';
import Total from './components/Total';
import { CoursePart, CourseType } from './types';

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: CourseType.Normal
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: CourseType.Normal
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: CourseType.GroupProject
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: CourseType.Submission
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: CourseType.Special
    }
  ]

  return (
    <div>
      <Header title={courseName} />
      <Content content={courseParts} />
      <Total content={courseParts} />
    </div>
  );
};

export default App;
