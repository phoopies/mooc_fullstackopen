import { CoursePart } from '../types';

const Content = ({ content }: { content: CoursePart[] }) => {
  return (
    <div>
      {content.map((c) => (
        <p key={c.name}>
          {c.name} {c.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
