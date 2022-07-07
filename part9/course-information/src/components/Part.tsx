import { CoursePart, CourseType } from '../types';
import { assertNever } from '../utils';

const Part = ({ part }: { part: CoursePart }) => {
  const Extra = () => {
    switch (part.type) {
      case CourseType.Normal:
        return (
          <div>
            <em>{part.description}</em>
          </div>
        );
      case CourseType.GroupProject:
        return (
          <div>
            <em>project exercises {part.groupProjectCount}</em>
          </div>
        );
      case CourseType.Submission:
        return (
          <div>
            <em>{part.description}</em>
            <div>
              submit to <a href={part.exerciseSubmissionLink}>{part.exerciseSubmissionLink}</a>
            </div>
          </div>
        );
      case CourseType.Special:
        return (
          <div>
            <em>{part.description}</em>
            <div>required skills:</div>
            <ul>
              {part.requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        );
      default:
        return assertNever(part);
    }
  };
  return (
    <div style={{border: '1px solid grey', marginBottom: 5, padding: 5}}>
      <strong>
        {part.name} {part.exerciseCount}
      </strong>
      <Extra />
      <br />
    </div>
  );
};

export default Part;
