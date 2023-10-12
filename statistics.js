// A CJS library for calculating basic statistical characteristics of an array.

// Math.js for statistical operations; built-in is insufficient for this.
const mathjs = require("mathjs"); 

class Calculate {

    constructor(array, desimals) {
        this.array = array;
        this.desimals = desimals;
    }
    
    calcMean() {
        const arrayMean = mathjs.mean(this.array);
        const roundedArrayMean = mathjs.round(arrayMean, this.desimals);
        return roundedArrayMean;
    }

    calcMedian() {
        const arrayMedian = mathjs.median(this.array);
        const roundedArrayMedian = mathjs.round(arrayMedian, this.desimals);
        return roundedArrayMedian;
    }

    calcPopulationDeviation() {
        const arrayDeviation = mathjs.std(this.array, "uncorrected");
        const roundedArrayDeviation = mathjs.round(arrayDeviation, this.desimals);
        return roundedArrayDeviation;
    }

    calcPopulationVariance() {
        const arrayVariance = mathjs.variance(this.array, "uncorrected");
        const roundedArrayVariance = mathjs.round(arrayVariance, this.desimals);
        return roundedArrayVariance;
    }

    calcMin() {
        const arrayMin = mathjs.min(this.array);
        return arrayMin;
    }

    calcMax() {
        const arrayMax = mathjs.max(this.array);
        return arrayMax;
    }

    calcMode() {
        const arrayMode = mathjs.mode(this.array);
        return arrayMode;
    }
}

module.exports = {
    Calculate
}
