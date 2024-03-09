export class Neuro {
    elementStatus;
    elementResult;
    callback;

    constructor(statusElement, resultElement, callback = () => {}) {
        this.elementStatus = statusElement;
        this.elementResult = resultElement;
        this.callback = callback;
    }

    setStatus(statusText) {
        this.elementStatus.innerHTML = `NeuroNet Status: ${statusText}`
    }

    setResult(result) {
        this.elementResult.prepend(result)
    }

    startNeuro(counter) {
        if (counter < datatables.length) {
            setTimeout(() => {
                this.setStatus(`Preparing to parse table ${counter + 1}...`);
                setTimeout(() => {
                    this.setStatus(`Parsing the table ${counter + 1}...`);
                    setTimeout(() => {
                        this.setStatus("Calculating results...");
                        setTimeout(() => {
                            this.setStatus("Creating a graphic...");
                            setTimeout(() => {
                                const dataArrayToDisplay = parseDataTable(datatables[counter]);
                                const currentWidth = Math.floor(datatableTotals[counter] * 100 / getMaxValueFromArray(datatableTotals));
    
                                this.setResult( createGraphic(dataArrayToDisplay, currentWidth) );
                                this.setStatus("Searching for a new table...");

                                setTimeout(() => this.startNeuro(++counter));
                            }, 1500);
                        }, 5000);
                    }, 3000);
                }, 3000);
            }, 2000);
        } else if (counter === datatables.length) {
            this.setStatus("Done!");
            this.callback();
        }
    }
}

function getTotalFromTable(datatable) {
    const rows = Array.from(datatable.querySelectorAll("tr"));
    const lastRowIndex = rows.length - 1;

    const dataCells = rows[lastRowIndex].querySelectorAll("td");
    return parseFloat(dataCells[dataCells.length - 1].innerText);
}


const datatables = document.querySelectorAll(".datatable");
const datatableTotals = Array.from(datatables).map(dt => getTotalFromTable(dt));


function getMaxValueFromArray(array) {
    let max = array[0];

    for (let i = 1; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
        }
    }

    return max;
}

function createGraphic(values, maxWidth) {
    const wrapper = document.createElement("div");
    const max = getMaxValueFromArray(values.map(v => v.value));

    wrapper.classList.add("graph");
    wrapper.setAttribute("style", `width: ${maxWidth}%;`);

    values.forEach(val => {
        const graphColumn = document.createElement("div");
        let width = Math.floor((val.value * 100) / max);
        let color = "red";

        if (width < 40) {
            color = "green";
        } else if (width < 75) {
            color = "yellow";
        }
        
        graphColumn.classList.add("graph-column");

        graphColumn.style.display = "flex";
        graphColumn.style.justifyContent = "space-between";
        graphColumn.style.marginTop = "4px";
        graphColumn.style.paddingLeft = "5px";
        graphColumn.style.paddingRight = "5px";
        graphColumn.style.minHeight = "20px";
        graphColumn.style.width = `${width}%`;
        graphColumn.style.textAlign = "left";
        graphColumn.style.backgroundColor = color;
        graphColumn.innerHTML = `<span>${val.indicator}</span><span>${val.value}</span>`;

        wrapper.prepend(graphColumn);
    });

    return wrapper
}

function parseDataTable(datatable) {
    const rows = Array.from(datatable.querySelectorAll("tr"));
    const rowsCount = rows.length;

    return rows
        .filter((el, i) => i !== 0 && i !== rowsCount - 1)
        .map(row => {
            const dataCells = row.querySelectorAll("td");
            const firstCell = dataCells[0];
            const lastCell = dataCells[dataCells.length - 1];

            return {
                indicator: firstCell.innerText,
                value: parseInt(lastCell.innerText)
            }
        });
}
