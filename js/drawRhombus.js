const drawCanvasDom = document.querySelector("#draw-canvas");
const rhombusDrawButtonDom = document.querySelector("#rhombus-draw-btn");

const rhombusSizeDom = document.querySelector("#size");
const offsetSizeDom = document.querySelector("#offset");

rhombusSizeDom.value = 23;
offsetSizeDom.value = 16;

rhombusDrawButtonDom.addEventListener("click", function () {
    let rhobmusText = drawRhombus(
        parseFloat(rhombusSizeDom.value),
        parseFloat(offsetSizeDom.value)
    );
    drawCanvasDom.innerHTML = rhobmusText;

    if (drawCanvasDom.classList.contains("hidden"))
        drawCanvasDom.classList.remove("hidden");
});

function drawRhombus(
    rhombusSize = 10,
    offset = 5,
    rhobmusSymbol = "*",
    offsetSymbol = "*"
) {
    let output = "";
    let leftOffset = offset;
    let rightOffset = 0;
    let currentColumn = 0;

    const totalSize = rhombusSize + offset;
    const stepSize = totalSize / offset;

    for (let currentRow = 0; currentRow < totalSize; currentRow++) {
        if (
            leftOffset > -1 &&
            Math.round(stepSize * (offset - leftOffset) + stepSize) - 1 <
                currentRow
        )
            leftOffset--;

        if (
            rightOffset < offset &&
            Math.round(stepSize * (rightOffset - offset)) * -1 + 1 >
                totalSize - currentRow
        )
            rightOffset++;

        for (currentColumn = 0; currentColumn < totalSize; currentColumn++) {
            if (
                currentColumn > leftOffset - 1 &&
                totalSize - currentColumn > rightOffset
            ) {
                output += generateRandomColoredSpanSymbol(rhobmusSymbol);
                continue;
            }
            output += offsetSymbol;
        }

        output += "<br>";
    }

    return output;
}
/*
TRIED TO BE SMART AND NOT DO THE MATH FIRST!
LOL somewhere here is an smart solution based on lot's of variables and checks instead of simple math

offset is excluded from rhombusSize. rhombusSize stands for width and height of the rhombus
*/
// function drawRhombus(
//     rhombusSize = 10,
//     offset = 5,
//     rhobmusSymbol = "*",
//     offsetSymbol = "*"
// ) {
//     let output = "";
//     let leftOffset = offset;
//     let rightOffset = 0;
//     let currentColumn = 0;

//     let leftRows = 0;
//     let leftColumns = 0;

//     const totalSize = rhombusSize + offset;
//     const lowerStepBy = Math.floor(totalSize / offset);
//     const stepLeftOvers = totalSize % offset;

//     const additionalColumnsWithStep = Math.floor(stepLeftOvers / lowerStepBy);
//     const additionalColumnHalfStep = stepLeftOvers % lowerStepBy;

//     //total per all rows and columns needed to add
//     let leftOvers = stepLeftOvers;
//     let rightOvers = stepLeftOvers;

//     //for current column needed to add
//     let leftAdjustments = additionalColumnHalfStep;
//     let rightAdjustments = additionalColumnHalfStep;

//     let addedForColumn = false;

//     console.log(
//         "stepLeftOvers: " + stepLeftOvers + "\n",
//         "totalSize: " + totalSize + "\n",
//         "offset: " + offset + "\n",
//         "additionalColumnHalfStep: " + additionalColumnHalfStep + "\n",
//         "leftOvers: " + leftOvers + "\n",
//         "lowerStepBy: " + lowerStepBy + "\n"
//     );

//     let currentColumnsUndrawnSymbols = 0;

//     for (let currentRow = 0; currentRow < totalSize; currentRow++) {
//         if (rightOffset < offset && currentRow % lowerStepBy === 1) {
//             rightOffset++;
//         }

//         leftRows = totalSize - currentRow;
//         for (currentColumn = 0; currentColumn < totalSize; currentColumn++) {
//             leftColumns = totalSize - currentColumn;
//             if (
//                 //inside draw
//                 currentColumn > leftOffset - 1 &&
//                 leftColumns > rightOffset
//             ) {
//                 currentColumnsUndrawnSymbols =
//                     (offset - leftOffset + 1) * lowerStepBy + 1;
//                 console.log(
//                     currentRow,
//                     currentColumn,
//                     currentColumnsUndrawnSymbols,
//                     leftOffset,
//                     additionalColumnsWithStep,
//                     additionalColumnsWithStep + 1 > leftOffset - 1,
//                     currentRow + currentColumn < currentColumnsUndrawnSymbols,
//                     currentColumn === leftOffset,
//                     leftAdjustments > 0
//                 );
//                 //+1 cuz there is possability for half step
//                 if (
//                     additionalColumnsWithStep > leftOffset - 1 &&
//                     currentRow + currentColumn < currentColumnsUndrawnSymbols &&
//                     currentColumn === leftOffset &&
//                     leftAdjustments > 0
//                 ) {
//                     leftAdjustments--;
//                     leftOvers--;
//                     output += offsetSymbol;
//                     console.log("zdare");
//                     continue;
//                 }
//                 output += generateRandomColoredSpanSymbol(rhobmusSymbol);
//                 continue;
//             }

//             output += offsetSymbol;
//         }

//         if (
//             leftOffset > -1 &&
//             //add step because if currentrow < lowerstepby we calc with incorrect math
//             (currentRow + lowerStepBy) % lowerStepBy ===
//                 additionalColumnsWithStep
//         ) {
//             leftOffset--;
//             if (leftAdjustments === 0 && leftOvers > 0) {
//                 leftAdjustments = lowerStepBy;
//                 console.error("kuku");
//             }
//         }
//         // addedForColumn = false;

//         output += "<br>";
//     }

//     return output;
// }

/*
offset is excluded from sidewalkSize. sidewalkSize stands for width and height of the sidewalk
*/
function drawSidewalk(
    sidewalkSize = 10,
    offset = 5,
    sidewalkSymbol = "*",
    offsetSymbol = "+"
) {
    let output = "";
    let leftOffset = offset;
    let rightOffset = 0;
    let currentColumn = 0;

    let leftColumns = 0;
    let leftRows = 0;
    const totalSize = sidewalkSize + offset;

    for (let currentRow = 0; currentRow < totalSize; currentRow++) {
        leftRows = totalSize - currentRow;

        for (currentColumn = 0; currentColumn < totalSize; currentColumn++) {
            leftColumns = totalSize - currentColumn;
            if (
                currentColumn > leftOffset - 1 &&
                leftColumns > rightOffset &&
                !(leftRows < offset + 1 && leftColumns < rightOffset)
            ) {
                output += generateRandomColoredSpanSymbol(sidewalkSymbol);
            } else {
                output += offsetSymbol;
            }
        }

        if (leftOffset > -1) leftOffset--;

        //because we adjust rightoffset only after getting string
        //I add + 2, for + 1 this condition should be at top
        if (leftRows < offset + 2) rightOffset++;

        output += "<br>";
    }

    return output;
}

function generateRandomColoredSpanSymbol(symbol = "*") {
    return `<span style="color: ${getRandomRGBColor()};">${symbol}</span>`;
}

function getRandomRGBColor() {
    return `rgb(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)})`;
}
