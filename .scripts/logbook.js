/**
 * Get todays daily log.
 */
function getDailyLogsToday(dv) {
    return dv.pages('"Logbook"')
        .filter(log => log.file.day && log.file.day.hasSame(dv.date("now"), "day"))
}

/**
 * Get today's and yesterday's daily log.
 */
function getDailyLogsTodayAndYesterday(dv) {
    return dv.pages('"Logbook"')
        .filter(log => log.file.day && (
            log.file.day.hasSame(dv.date("now"), "day") ||
            log.file.day.hasSame(dv.date("yesterday"), "day")
        ))
}

module.exports = {
    getDailyLogsToday,
    getDailyLogsTodayAndYesterday,
}
