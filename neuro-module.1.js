export {setYearInfo};

function getLastCenturyDateRange() {
    const currentYear = new Date().getFullYear();

    return {
        start: currentYear - 105 + Math.floor(Math.random() * 10),
        end: currentYear
    };
}

function setYearInfo() {
    const dateRange = getLastCenturyDateRange();

    document.querySelector("#report-created").innerHTML = new Date().toDateString();
    document.querySelector("#estimation-period").innerHTML = `${dateRange.start} ... ${dateRange.end}`;
}
