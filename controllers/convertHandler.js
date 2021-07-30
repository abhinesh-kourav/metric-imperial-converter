function ConvertHandler() {

  let inputRegex = /[a-z]+|[^a-z]+/gi;
  
  this.getNum = function(input) {
    let result=input.match(inputRegex)[0];
    
    if(/\d/.test(result)===false){
      result = 1;
    }

    if(result.toString().includes('/')){
      let values = result.toString().split('/');
      if(values.length!=2){
        return 'invalid number'
      }
      values[0] = parseFloat(values[0]);
      values[1] = parseFloat(values[1]);
      result = eval(result.toString()).toFixed(5);
    }
    if(isNaN(result)){
      return 'invalid number'
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result=input.match(inputRegex)[1];
    if(!result){
      result = input.match(inputRegex)[0];
    }
    switch(result.toLowerCase()){
      case 'gal': return 'gal';
      break;
      case 'l' : return 'L';
      break;
      case 'lbs' : return 'lbs';
      break;
      case 'kg' : return 'kg';
      break;
      case 'mi' : return 'mi';
      break;
      case "km" : return 'km';
      break;
      default : return "invalid unit";
      break;
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    switch(initUnit.toLowerCase()){
      case 'gal': return 'L';
      break;
      case 'l' : return 'gal';
      break;
      case 'lbs' : return 'kg';
      break;
      case 'kg' : return 'lbs';
      break;
      case 'mi' : return 'km';
      break;
      case "km" : return 'mi';
      break;
      default : return "invalid unit";
      break;
    }
  };

  this.spellOutUnit = function(unit) {
    switch(unit){
      case 'gal': return 'gallons';
      break;
      case 'L' : return 'litres';
      break;
      case 'lbs' : return 'pounds';
      break;
      case 'kg' : return 'kilograms';
      break;
      case 'mi' : return 'miles';
      break;
      case "km" : return 'kilometers';
      break;
      default : return "invalid unit";
      break;
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    switch(initUnit.toLowerCase()){
      case 'gal': result = initNum * galToL;
      break;
      case 'l' : result = initNum / galToL;
      break;
      case 'lbs' : result = initNum * lbsToKg;
      break;
      case 'kg' : result = initNum / lbsToKg;
      break;
      case 'mi' : result = initNum * miToKm;
      break;
      case "km" : result = initNum / miToKm;
      break;
      default : return "invalid unit";
    }
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = initNum + " " + this.spellOutUnit(initUnit) +" converts to "+ returnNum + " " + this.spellOutUnit(returnUnit);
    
    return result;
  };
  
}

module.exports = ConvertHandler;
