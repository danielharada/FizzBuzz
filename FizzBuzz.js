// JavaScript source code

//define namespace fizzBuzzObject
var fizzBuzzObject = {
    fizz : {
        fieldID: '#fizzNum',
        warningID: '#fizzWarning',
        checkInt: true,
        checkMax: false,
        max: 0,
        num: 3,
        validated: true
    },
    buzz : {
        fieldID: '#buzzNum',
        warningID: '#buzzWarning',
        checkInt: true,
        checkMax: false,
        max: 0,
        num: 5,
        validated: true
    },
    maxPrint : {
        fieldID: '#maxNum',
        warningID: '#maxWarning',
        checkInt: true,
        checkMax: true,
        max: 100000,
        num: 1000,
        validated: true
    },
    outputID: '#fizzOutput',
};

var fBO = fizzBuzzObject;



fBO.generateAndDisplayFizzBuzzSequence = function () {

    if (!(fBO.fizz.validated && fBO.buzz.validated && fBO.maxPrint.validated)) {
        return;
    }
    fBO.setValuesFromInput();
    fizzBuzzArray = fBO.buildFizzBuzzArray();
    fBO.printArrayToTable(fizzBuzzArray);
};



fBO.setValuesFromInput = function () {
    fBO.fizz.num = Number($(fBO.fizz.fieldID).val());
    fBO.buzz.num = Number($(fBO.buzz.fieldID).val());
    fBO.maxPrint.num = Number($(fBO.maxPrint.fieldID).val());
};

fBO.buildFizzBuzzArray = function () {
    var fizzBuzz = fBO.fizzBuzzCalculate();
    var fizzBuzzArray = [fBO.maxPrint.num];
    
    for (var i = 0; i < fBO.maxPrint.num; i++) {
        fizzBuzzArray[i] = i + 1;
    };

    if (fizzBuzz == fBO.fizz.num) {
        fizzBuzzArray = fBO.fizzMultipleOfBuzzArray(fizzBuzzArray);
    } else if (fizzBuzz == fBO.buzz.num) {
        fizzBuzzArray = fBO.buzzMultipleOfFizzArray(fizzBuzzArray);
    } else {
        fizzBuzzArray = fBO.relativePrimesArray(fizzBuzzArray, fizzBuzz);
    };
    return fizzBuzzArray;
};

fBO.printArrayToTable = function (arrayToPrint) {
    var numColumns = 3;
    var newLength = Math.ceil(arrayToPrint.length / numColumns);
    var firstCol = arrayToPrint.splice(0, newLength);
    var secondCol = arrayToPrint.splice(0, newLength);

    $('#col1').html(firstCol.join('<br />'));
    $('#col2').html(secondCol.join('<br />'));
    $('#col3').html(arrayToPrint.join('<br />'));
};



fBO.fizzBuzzCalculate = function () {
    var fizz = fBO.fizz.num;
    var buzz = fBO.buzz.num;
    var fizzBuzz = fizz*buzz;

    if (fizz < buzz) {
        if (buzz % fizz == 0) {
            fizzBuzz = buzz;
        }
    } else if (fizz % buzz == 0) {
        fizzBuzz = fizz;
    }

    return fizzBuzz;
}

fBO.fizzMultipleOfBuzzArray = function (fizzBuzzArray) {
    for (i = fBO.buzz.num; i <= fBO.maxPrint.num; i += fBO.buzz.num) {
        fizzBuzzArray[i - 1] = "Buzz";
    };

    for (i = fBO.fizz.num; i <= fBO.maxPrint.num; i += fBO.fizz.num) {
        fizzBuzzArray[i - 1] = "FizzBuzz";
    };

    return fizzBuzzArray;
};

fBO.buzzMultipleOfFizzArray = function (fizzBuzzArray) {
    for (i = fBO.fizz.num; i <= fBO.maxPrint.num; i += fBO.fizz.num) {
        fizzBuzzArray[i - 1] = "Fizz";
    };

    for (i = fBO.buzz.num; i <= fBO.maxPrint.num; i += fBO.buzz.num) {
        fizzBuzzArray[i - 1] = "FizzBuzz";
    };

    return fizzBuzzArray;
};

fBO.relativePrimesArray = function (fizzBuzzArray, fizzBuzzNum) {
    for (i = fBO.fizz.num; i <= fBO.maxPrint.num; i += fBO.fizz.num) {
        fizzBuzzArray[i - 1] = "Fizz";
    };
    for (i = fBO.buzz.num; i <= fBO.maxPrint.num; i += fBO.buzz.num) {
        fizzBuzzArray[i - 1] = "Buzz";
    };
    for (i = fizzBuzzNum; i <= fBO.maxPrint.num; i += fizzBuzzNum) {
        fizzBuzzArray[i - 1] = "FizzBuzz";
    };
    return fizzBuzzArray;
};



fBO.validate = function (objectToCheck) {
    var intOK = true;
    var maxOK = true;
    if (objectToCheck.checkInt === true) {
        intOK = fBO.isPosInteger(objectToCheck);
    };

    if (objectToCheck.checkMax === true) {
        maxOK = fBO.checkMax(objectToCheck);
    };

    if ((intOK && maxOK) === true) {
        fBO.clearText(objectToCheck.warningID);
        objectToCheck.validated = true;
        return true;
    } else {
        objectToCheck.validated = false;
        return false;
    };
};

fBO.isPosInteger = function (objectToCheck) {
    var numToCheck = Number($(objectToCheck.fieldID).val());
    if (numToCheck == "" || numToCheck % 1 !== 0 || numToCheck < 0) {
        $(objectToCheck.warningID).text("Please enter a positive integer");
        return false;
    } else {
        return true;
    };
};

fBO.checkMax = function (objectToCheck) {
    var numToCheck = Number($(objectToCheck.fieldID).val());
    if (numToCheck > objectToCheck.max) {
        $(objectToCheck.warningID).text("Please enter an integer less than or equal to" + objectToCheck.max);
        return false;
    } else {
        return true;
    };
};

//arguments for clearText method should be html tag IDs, such as '#myID'
fBO.clearText = function () {
    for (var i in arguments) {
        $(arguments[i]).text("");
    };
};



//wait for DOM ready, bind the fBO.setValues method to the submit button.  Bind validate function to blur actions for text inputs
$(function () {
    $('#submitButton').click(fBO.generateAndDisplayFizzBuzzSequence);
    $(fBO.fizz.fieldID).blur(function () {
        fBO.validate(fBO.fizz);
    });
    $(fBO.buzz.fieldID).blur(function () {
        fBO.validate(fBO.buzz);
    });
    $(fBO.maxPrint.fieldID).blur(function () {
        fBO.validate(fBO.maxPrint);
    });
});