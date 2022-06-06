export class Course {
  public id: number;
  public courseUUID: string;
  public courseName: string;
  public courseDescription: string;
  public courseOwnerId: number;
  public courseCreated: Date;
  public coursePublishedDate: Date;
  public courseUpdated: Date;
  public isPublished: boolean;
  public isPrivate: boolean;
  public courseCategory: object;
  public enrolledUsers: object;
}
