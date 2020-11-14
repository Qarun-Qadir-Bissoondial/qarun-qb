import { Injectable } from '@angular/core';
import { Annyang, CommandOption } from 'annyang';
const annyang: Annyang = require('node_modules/annyang/dist/annyang');

@Injectable({
  providedIn: 'root'
})
export class VoiceService {
  private annyang: Annyang = annyang;

  constructor() {}

  addCommand(command: CommandOption) {
    this.annyang.addCommands(command);
    return this;
  }

  addCommands(commands: CommandOption[]) {
    for (const comm of commands)  {
      this.addCommand(comm);
    }
    return this;
  }

  init() {
    this.annyang.debug();
    this.annyang.start();
  }

  teardown() {
    this.annyang.abort();
  }

}
