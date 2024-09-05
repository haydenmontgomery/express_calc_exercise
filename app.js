const express = require('express');
const ExpressError = require('./expressError')

const app = express();

function handleNums(str) {
    const numArr = str.split(',').map(item => {
        let num = Number(item);
        if (isNaN(num)) {
            throw new ExpressError(`${item} is not a number.`);
        }
        return num;
    });
    return numArr;
}

app.get('/average', function(req, res, next) {
    try {
        if (!req.query.nums) {
            throw new ExpressError('nums are required');
        }
        const str = req.query.nums;
        let numArr = handleNums(str);

        const sum = numArr.reduce((acc, curr) => acc + curr, 0);
        const average = sum / numArr.length;
        return res.send({ average });
    } catch (e) {
        next(e)
    }
})

app.get('/median', function(req, res, next) {
    try {
        if (!req.query.nums) {
            throw new ExpressError('nums are required');
        }
        const str = req.query.nums;
        let numArr = handleNums(str);

        numArr.sort((a, b) => a - b);
        let median;
        const mid = Math.floor(numArr.length / 2);
        if (numArr.length % 2 === 0) {
            median = (numArr[mid - 1] + numArr[mid]) / 2;
        } else {
            median = numArr[mid];
        }
        return res.send({ median });
    } catch (e) {
        next(e)
    }
})

app.get('/mode', function(req, res, next) {
    try {
        if (!req.query.nums) {
            throw new ExpressError('nums are required');
        }
        const str = req.query.nums;
        let numArr = handleNums(str);
        const frequency = {};
        numArr.forEach(num => {
            frequency[num] = (frequency[num] || 0) + 1;
        });

        let max = 0;
        let mode = [];

        for (let num in frequency) {
            if (frequency[num] > max) {
                max = frequency[num];
                mode = [Number(num)];
            } else if (frequency[num] === max) {
                mode.push(Number(num));
            }
        }
        return res.send({ mode });
    } catch (e) {
        next(e)
    }
})

app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404);
    next(e)
  })
  
  
app.use(function (err, req, res, next) {
  let status = err.status || 500;
  let message = err.msg;

  return res.status(status).json({
    error: { message, status }
  });
});
  
app.listen(3000, () => {
console.log("Server running on port 3000")
});

module.exports = handleNums;