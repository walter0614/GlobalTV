import { Injectable } from '@angular/core';
import { UserMain } from '../models/user-main.model';

@Injectable()
export class SystemVariablesService {

  public readonly rootUrl = 'http://localhost:54023';
  public currentUser : UserMain;

  constructor() { }

}
