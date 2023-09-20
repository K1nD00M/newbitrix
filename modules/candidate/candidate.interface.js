class History { 
   constructor(stage='new', description='') {
      this.stage = stage;
      this.description = description
      this.time = Date.now()
   }
}

class Candidate {
   constructor(data, area, phone='') {
      this.data = data;
      this.area = area
      this.stage = "new";
      this.history = [new History()];
      this.phone = phone;
      this.timeCreate = Date.now();
      this.timeUpdate = Date.now();
   };
}

module.exports = {Candidate, History} 