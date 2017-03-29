const fizzbuzz = require('../fizzBuzzer');

const should = require('chai').should();

describe('fizzbuzz', function () {

    it('Should throw an error if the input is not a number', function() {

        const notNumbers = [
            "this is a string",
            {some:"object"},
            {numberInObj: 4},
            "4",
            ["1", "2"],
            [1,2]
        ];

        notNumbers.forEach(function(notnumber) {
            // test to make sure every loop ran
            // console.log(notnumber);

        (function(){
            fizzbuzz(notnumber)
        }).should.throw(Error);  

        });
    });


    it('Should return `fizz buzz` when given numbers that are multiples of 15', function(){
        
        const multiplesOfFifteen = [0, 15, 30, 45, 90, 180, 360, 86744228565];

        multiplesOfFifteen.forEach (function(numberdividedbyFifteen) {
            // test each loop
            // console.log(numberdividedbyFifteen, fizzbuzz(numberdividedbyFifteen))
        let fizzbuzzOutput = fizzbuzz(numberdividedbyFifteen);
        fizzbuzzOutput.should.equal('fizz-buzz'); 

        });
    });

    it('Should return `buzz` when given numbers that are multiples of 5', function(){

        const multiplesOfFive = [5,10,20,35,110,215,9637285];

        multiplesOfFive.forEach(function(numberdividedbyFive) {
            
        // test each loop 
        // console.log(numberdividedbyFive, fizzbuzz(numberdividedbyFive));
        let buzzOutput = fizzbuzz(numberdividedbyFive);
        buzzOutput.should.equal('buzz');
        
    
        });
    });
    
    it('Should return `fizz` when given numbers that are multiples of 3', function(){

        const multiplesofThree = [3,6,9,21,24,69,207,621,1863];

        multiplesofThree.forEach(function(numberdividedbyThree) {
        
        // test all loops
        // console.log(numberdividedbyThree, fizzbuzz(numberdividedbyThree));

         let fizzOutput = fizzbuzz(numberdividedbyThree);
         fizzOutput.should.equal('fizz');   
        
        });

    });

    it('Should return a negative number in the case a negative number is the input', function(){

        let negativeNums = [-3,-9,-15,-16,-20, -481920, ];

        negativeNums.forEach(function(negativeNumber) {

            // test each loop
            console.log(negativeNumber, fizzbuzz(negativeNumber));

            let negativeOutput = fizzbuzz(negativeNumber);
            negativeOutput.should.equal(negativeNumber);
        });
    });
}); 
