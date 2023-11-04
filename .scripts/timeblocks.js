/**
 * Get all time blocks for a given date.
 * @param {DateTime} date 
 */
function getForDate(dv, date) {
    return dv.pages('"Time Sheet"')
        .filter(timeblock => timeblock.date.hasSame(date, "day"));
}

/**
 * Get timeblocks to be shown in inbox.
 */
function getTimeblocksInbox(dv) {
    return dv.pages('"Time Sheet"')
        .filter(timeblock => {
            return (
                !(timeblock.task && dv.page(timeblock.task)) &&
                !(timeblock["Project (Overwrite)"] && dv.page(timeblock["Project (Overwrite)"]))
            )
        })
}

module.exports = {
    getForDate,
    getTimeblocksInbox,
}