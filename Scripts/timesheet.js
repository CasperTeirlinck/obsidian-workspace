class TimeSheet {
    constructor() {
        this.utilsTimeBlocks = require(app.vault.adapter.basePath + "/.scripts/timeblocks.js");
        this.utilsMeetings = require(app.vault.adapter.basePath + "/.scripts/meetings.js");
        this.utilsUI = require(app.vault.adapter.basePath + "/.scripts/ui.js");
    }

    table(ctx, dv, date) {
        const timeBlocks = this.utilsTimeBlocks.getForDate(dv, date);
        const meetings = this.utilsMeetings.getForDate(dv, date);

        const headers = ["Billed", "Hours", "Project", "Task/Meeting", "Status", "Notes"];
        dv.table(headers, timeBlocks.concat(meetings)
            .sort((a, b) => a.hours - b.hours)
            .map(page => {
                const folder = page.file.folder;
                const editLink = `[[${page.file.path}|:luc_pencil:]]`;

                let notes = null;
                let taskOrMeeting = null;
                let project = null;
                let status = null;

                if (folder == "Time Sheet") {
                    const projectOverwrite = page["Project (Overwrite)"];
                    const projectTask = page.task && dv.page(page.task).project;

                    project = projectOverwrite ? projectOverwrite : projectTask;
                    taskOrMeeting = page.task ? `:obs_check_in_circle: ${dv.page(page.task).file.link}` : `:luc_timer: [[${page.file.path}|---]]`;
                    status = page.task && dv.page(page.task).status;
                    notes = `${editLink}![[${page.file.path}]]`;
                }
                else if (folder == "Meetings") {
                    project = page.project;
                    taskOrMeeting = `:luc_calendar: ${page.file.link}`;
                    notes = `${editLink}![[${page.file.path}#Meeting]]`;
                }

                return [this.utilsUI.checkbox(ctx, page.billed), page.hours, project, taskOrMeeting, status, dv.paragraph(notes)];
            })
        )
    }
}