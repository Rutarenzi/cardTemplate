class Demo {  
    constructor() {  
      document.writeln(Demo.display() + "<br>");   
      document.writeln(this.constructor.display());   
    }  
  
    static display() {  
      return "I am here";
    }  
  }  
  
  var d = new Demo();