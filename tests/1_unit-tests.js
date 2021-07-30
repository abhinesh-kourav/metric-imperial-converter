const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Function convertHandler.getNum(input)',()=>{
    
    test('Whole number input',(done)=>{
      let input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });

    test('Decimal number input',(done)=>{
      let input = '3.27mi';
      assert.equal(convertHandler.getNum(input),3.27);
      done();
    });

    test('Fractional input',(done)=>{
      let input = '3/4km';
      assert.equal(convertHandler.getNum(input),0.75);
      done();
    })

    test('fractional input with decimal',(done)=>{
      let input = '5/2.5lbs';
      assert.equal(convertHandler.getNum(input),2);
      done();
    });

    test('double-fraction input',(done)=>{
      let input ='3/4/3gal';
      assert.equal(convertHandler.getNum(input),'invalid number');
      done();
    });

    test('default numerical input: 1',(done)=>{
      let input = 'kg';
      assert.equal(convertHandler.getNum(input),1);
      done();
    });
  });

  suite('Function convertHandler.getUnit(input)',()=>{
    test('For each Valid unit input',(done)=>{
      let input = 
      [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG"
      ];
      let output = 
      [
        'gal',
        'L',
        'mi',
        'km',
        'lbs',
        'kg',
        'gal',
        'L',
        'mi',
        'km',
        'lbs',
        'kg'
      ]
      input.forEach((ele,index)=>{
        assert.equal(convertHandler.getUnit(ele),output[index]);
      });
      done();
    });

    test("Invalid input unit",(done)=>{
      let input = "22m";
      assert.equal(convertHandler.getUnit(input),"invalid unit");
      done();
    });

    test("Return unit for valid input unit",(done)=>{
      let input = ["km",'mi','gal','L','kg','lbs'];
      let output = ['mi','km','L','gal','lbs','kg'];
      input.forEach((ele,i)=>{
        assert.equal(convertHandler.getReturnUnit(ele),output[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.spellOutUnit(unit)",()=>{

    test("return spelled out string for each valid unit",(done)=>{
      let input = ['km','mi','kg','lbs','L','gal'];
      let output = ['kilometers','miles','kilograms','pounds','litres','gallons'];
      input.forEach((ele,i)=>{
        assert.equal(convertHandler.spellOutUnit(ele),output[i]);
      })
      done();
    })
  })

  suite("Function convertHandler.convert(num,unit)",()=>{
    test("convert gal to L",(done)=>{
      let input = [1,'gal'];
      let output = 3.78451;
      assert.approximately(convertHandler.convert(input[0],input[1]),output,0.1);
      done();
    })

    test("convert L to gal",(done)=>{
      let input = [1,'L'];
      let output = 1/3.78451;
      assert.approximately(convertHandler.convert(input[0],input[1].toLowerCase()),output,0.1);
      done();
    })

    test("convert mi to km",(done)=>{
      let input = [1,'mi'];
      let output = 1.60934;
      assert.approximately(convertHandler.convert(input[0],input[1]),output,0.1);
      done();
    })

    test("convert km to mi",(done)=>{
      let input = [1,'km'];
      let output = 1/1.60934;
      assert.approximately(convertHandler.convert(input[0],input[1]),output,0.1);
      done();
    })

    test("convert lbs to kg",(done)=>{
      let input = [1,'lbs'];
      let output = 0.453592;
      assert.approximately(convertHandler.convert(input[0],input[1]),output,0.1);
      done();
    })

    test("convert kg to lbs",(done)=>{
      let input = [1,'kg'];
      let output = 1/0.453592;
      assert.approximately(convertHandler.convert(input[0],input[1]),output,0.1);
      done();
    })
  })
});