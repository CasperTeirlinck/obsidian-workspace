function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Format the given date object to a relative date.
 * @param {DateTime} date 
 */
function formatRelativeDate(date) {
    return date && `${capitalize(date.toRelativeCalendar())}, ${date.toFormat("EEE dd/MM")}`;
}


module.exports = {
    formatRelativeDate,
    capitalize,
}