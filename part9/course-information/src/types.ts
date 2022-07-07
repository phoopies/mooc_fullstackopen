export enum CourseType {
  Normal = 'normal',
  GroupProject = 'groupProject',
  Submission = 'submission',
  Special = 'special'
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: CourseType;
}

interface CourseDescriptionPartBase extends CoursePartBase {
  description: string;
}

export interface CourseNormalPart extends CourseDescriptionPartBase {
  type: CourseType.Normal;
}

export interface CourseProjectPart extends CoursePartBase {
  type: CourseType.GroupProject;
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CourseDescriptionPartBase {
  type: CourseType.Submission;
  exerciseSubmissionLink: string;
}

export interface CourseSpecialPart extends CourseDescriptionPartBase {
  type: CourseType.Special;
  requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;