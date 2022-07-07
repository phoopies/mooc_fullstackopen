import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ content }: { content: CoursePart[] }) => {
  return (
    <div>
      {content.map((c) => (
        <Part key={c.name} part={c} />
      ))}
    </div>
  );
};

export default Content;
