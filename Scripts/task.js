class Task {
    constructor() {
        this.utils = require(app.vault.adapter.basePath + "/.scripts/utils.js");
        this.utilsTasks = require(app.vault.adapter.basePath + "/.scripts/tasks.js");
    }

    plannedToday(dv) {
        return this.utilsTasks.plannedToday(dv, dv.current()) ? "📆" : null;
    }

    overDue(dv) {
        return this.utilsTasks.overdueIndicator(dv.current());
    }

    workedOnToday(dv) {
        return this.utilsTasks.workedOnToday(dv, dv.current()) ? "⌚" : null;
    }

    timeBlocks(dv) {
        const timeblocks = this.utilsTasks.getTimeBlocks(dv, dv.current());

        const headers = ["Date", "Hours", "Notes"];
        dv.table(headers, timeblocks
            .sort(timeblock => timeblock.date, "desc")
            .map(timeblock => {
                const dateFormatted = this.utils.formatRelativeDate(timeblock.date);
                const editLink = `[[${timeblock.file.path}|:luc_pencil:]]`

                return [`[[${timeblock.file.path}|${dateFormatted}]]`, timeblock.hours, dv.paragraph(`${editLink}![[${timeblock.file.path}]]`)]
            })
        )
    }
}