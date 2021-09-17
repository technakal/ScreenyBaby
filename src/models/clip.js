import { nanoid } from "nanoid";

class Clip {
  constructor(name, downloadRef) {
    this.id = nanoid();
    this.name = name;
    this.downloadRef = downloadRef;
  }
}

export default Clip;
