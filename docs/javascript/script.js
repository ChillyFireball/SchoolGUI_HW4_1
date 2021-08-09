/*
    File: script.js
    GUIAssignment:  Creating an Interactive Dynamic Table
    Haley Santomas, UMass Lowell Computer Science, haley_santomas@student.uml.edu
    Date: 7/22/2021
    Summary: This file contains scripts to collect input parameters from the form upon clicking the submit button, then
    utilizes that input to construct a table. It also generates an error message for invalid inputs using JQuery.
*/

/*** CONSTANTS ***/
var inputMin = -50;
var inputMax = 50;
var maxInputDifferential = 100;
var inputMessageRequired = "Please enter a number between (inclusive) " + inputMin + " and " + inputMax;
var inputMessageMin = "Please enter a number above " + inputMin - 1;
var inputMessageMax = "Please enter a number below " + inputMax + 1;

/*** GLOBALS ***/

/*** VALIDATOR ***/
$().ready(function()
    {
        // Add custom rule to validate that value is less than something.
        $.validator.addMethod(
            "lessEqual",
            function(value, element, param)
            {
                var testAgainst = $(param).val();
                if (parseInt(value) <= parseInt(testAgainst))
                    return true;
                else
                    return false;
            },
            "Value is too high"
        );
        $.validator.addMethod(
            "greaterEqual",
            function(value, element, param)
            {
                var testAgainst = $(param).val();
                if (parseInt(value) >= parseInt(testAgainst))
                    return true;
                else
                    return false;
            },
            "Value is too low"
        );
        // Add custom rule to validate that value is greater than something.

        // Validate the form.
        $("#form_submission").validate(
            {
                rules:
                {
                    rowMax:
                    {
                        required: true,
                        min: inputMin,
                        max: inputMax,
                        greaterEqual: "#rowMin"
                    },
                    rowMin:
                    {
                        required: true,
                        min: inputMin,
                        max: inputMax,
                        lessEqual: "#rowMax"
                    },
                    colMax:
                    {
                        required: true,
                        min: inputMin,
                        max: inputMax,
                        greaterEqual: "#colMin"
                    },
                    colMin:
                    {
                        required: true,
                        min: inputMin,
                        max: inputMax,
                        lessEqual: "#colMax"
                    }
                },
                messages:
                {
                    rowMax:
                    {
                        required: inputMessageRequired,
                        min: inputMessageMin,
                        max: inputMessageMax,
                        greaterEqual: "Value must be greater than or equal to row min"
                    },
                    rowMin:
                    {
                        required: inputMessageRequired,
                        min: inputMessageMin,
                        max: inputMessageMax,
                        lessEqual: "Value must be less than or equal to row max"
                    },
                    colMax:
                    {
                        required: inputMessageRequired,
                        min: inputMessageMin,
                        max: inputMessageMax,
                        greaterEqual: "Value must be greater than or equal to col min"
                    },
                    colMin:
                    {
                        required: inputMessageRequired,
                        min: inputMessageMin,
                        max: inputMessageMax,
                        lessEqual: "Value must be less than or equal to col max"
                    }
                }
            }
        );
    }
);

/***** BASE FUNCTION *****/
function submitForm()
{
    // Get inputs.
    var rowMin = document.getElementById("rowMin");
    var rowMax = document.getElementById("rowMax");
    var colMin = document.getElementById("colMin");
    var colMax = document.getElementById("colMax");

    // Display table.
    if($("#form_submission").valid())
    {
        displayTable();
    }
}

/***** ERROR HANDLING *****/
function checkInputError()
{
}

/***** TABLE DISPLAY *****/
function displayTable()
{
    // Create and calculate table value arrays.
    var rowHead = new Array();
    for(let i = rowMin.valueAsNumber; i <= rowMax.valueAsNumber; i++)
    {
        rowHead.push(i);
    }

    var columnHead = new Array();
    for(let i = colMin.valueAsNumber; i <= colMax.valueAsNumber; i++)
    {
        columnHead.push(i);
    }

    var multiplicationTable = new Array();
    for(let i = 0; i < columnHead.length; i++) // For every row...
    {
        // Create an empty array for the row.
        multiplicationTable.push(new Array());

        // Fill out this row's array.
        for(let j = 0; j < rowHead.length; j++) // For every column...
        {
            // Push the product of rowHead[j] * columnHead[i]
            multiplicationTable[i].push(rowHead[j] * columnHead[i]);
        }
    }

    // Print to table.
    printTable(rowHead, columnHead, multiplicationTable);
}
function printTable(rowHead, columnHead, multiplicationTable)
{
    // Get table.
    var resultTable = document.getElementById("tableResult");

    // Delete previous table, if it exists.
    deletePreviousTable(resultTable);

    // Start with the first row, since it's unique.
    let firstRow = resultTable.insertRow(0);
    //let emptyCell = firstRow.insertCell(0);
    let emptyCell = document.createElement("th");
    emptyCell.classList.add("thTOP");
    emptyCell.style.color = "black";
    emptyCell.style.fontWeight = "bold";
    emptyCell.innerHTML = " ";
    firstRow.appendChild(emptyCell);
    
    for(let i = 0; i < rowHead.length; i++)
    {
        // Create new cell at i+1 with rowHead i.
        //let cell = firstRow.insertCell(i + 1);
        let cell = document.createElement("th");
        cell.classList.add("thTOP");
        if(i == 0 || i % 2 == 0)
            cell.classList.add("thGray");
        cell.style.fontWeight = "bold";
        cell.innerHTML = rowHead[i];
        firstRow.appendChild(cell);
    }

    // Now do the rest of the rows. For every column...
    for(let i = 0; i < columnHead.length; i++)
    {
        // Insert a new row at i+1.
        let row = resultTable.insertRow(i + 1);

        // Start by filling in the first cell with the current columnHead value.
        //let firstCell = row.insertCell(0);
        let firstCell = document.createElement("th");
        firstCell.classList.add("thSIDE");
        firstCell.style.fontWeight = "bold";
        firstCell.innerHTML = columnHead[i];
        row.appendChild(firstCell);

        // Now fill in the rest of the cells.
        for(let j = 1; j <= multiplicationTable[i].length; j++)
        {
            let cell = row.insertCell(j);
            cell.style.backgroundColor = "white";
            cell.style.color = "black";
            cell.innerHTML = multiplicationTable[i][j - 1];
        }
    }
}
function deletePreviousTable(resultTable)
{
    // Delete all contents.
    resultTable.innerHTML = "";
}