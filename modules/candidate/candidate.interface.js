class History { 
   constructor(stage='new', description='') {
      this.stage = stage;
      this.description = description
      this.time = Date.now()
   }
}

class Candidate {
   constructor(data, area, description='', phone='', bxId='') {
      this.data = data;
      this.area = area
      this.stage = "new";
      this.history = [new History('new', description)];
      this.timeCreate = Date.now();
      this.timeUpdate = Date.now();
      this.phone = phone;
      this.bxId = bxId
   };
}

module.exports = {Candidate, History} 