const ExpressError = require('./expressError')
const handleNums = require('./app');

describe("convert nums string", function(){
    it("takes a string of nums and converts to array of nums", function() {
        expect(handleNums("10,32,40")).toEqual([10,32,40])
    });
    it("should err if not a num", function() {
        expect(() => {
            handleNums("10,hi,40");
        }).toThrow();
    });
})