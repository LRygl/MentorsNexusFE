export class User {

  public id!: number;
  public userId!: string;
  public userFirstName: string;
  public userLastName: string;
  public userEmail: string;
  public logInDateDisplay!: Date;
  public userJoinDate!: Date;
  public userProfileImageUrl!: string;
  public active: boolean;
  public notLocked: boolean;
  public userRole: string;
  public userAuthorities: [];

  constructor(){
    this.userFirstName = '';
    this.userLastName = '';
    this.userEmail = '';
    this.active = false
    this.notLocked = false;
    this.userRole = '';
    this.userAuthorities = [];
  }

}
