class Logbook {
    constructor() {
        this.utils = require(app.vault.adapter.basePath + "/.scripts/utils.js");
        this.utilsLogs = require(app.vault.adapter.basePath + "/.scripts/logbook.js");
    }

    table(dv, logs) {
        const headers = ["Date", "Checkin", "Checkout"]
        dv.table(headers, logs
            .sort(log => log.file.day, "desc")
            .map(log => {
                const dateFormatted = this.utils.formatRelativeDate(log.file.day);

                return [
                    `[[${log.file.path}|${dateFormatted}]]`,
                    dv.paragraph(`![[${log.file.path}#checkin 🚀]]`),
                    dv.paragraph(`![[${log.file.path}#checkout 🛬]]`),
                ]
            })
        )
    }

    tableToday(dv) {
        return this.table(dv, this.utilsLogs.getDailyLogsToday(dv));
    }
    tableTodayAndYesterday(dv) {
        return this.table(dv, this.utilsLogs.getDailyLogsTodayAndYesterday(dv));
    }
    tableAll(dv) {
        return this.table(dv, dv.pages('"Logbook"'));
    }
}