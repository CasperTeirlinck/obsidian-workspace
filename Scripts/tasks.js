class Tasks {
    constructor() {
        this.utils = require(app.vault.adapter.basePath + "/.scripts/utils.js");
        this.utilsTasks = require(app.vault.adapter.basePath + "/.scripts/tasks.js");
    }


    table(ctx, dv, tasks) {
        const { createButton } = app.plugins.plugins["buttons"];

        const headers = ["Task", "Project", "Status", "Planned", "Deadline", "Priority"]
        dv.table(headers, tasks
            .sort(task => task, "desc", (a, b) => this.utilsTasks.statusCompare(a, b))
            .sort(task => task.deadline, "desc")
            .sort(task => task, "desc", (a, b) => this.utilsTasks.priorityCompare(a, b))
            .map(task => {
                const deadlineWarning = this.utilsTasks.overdueIndicator(task) || "";
                const plannedToday = this.utilsTasks.plannedToday(dv, task) ? "📆" : "";
                const workedToday = this.utilsTasks.workedOnToday(dv, task) ? "⌚" : "";
                const datePlannedFormatted = this.utils.formatRelativeDate(task.planned);
                const dateDueFormatted = this.utils.formatRelativeDate(task.deadline);
                const devopsLink = task.devops ? ` [♾️](${task.devops})` : "";
                const btnSetPlanned = () => {
                    return createButton({
                        app,
                        el: ctx.container,
                        args: { name: "+" },
                        clickOverride: {
                            click: this.setPlannedForToday,
                            params: [dv, task.file.path]
                        }
                    })
                }
                const btnClearPlanned = () => {
                    return createButton({
                        app,
                        el: ctx.container,
                        args: { name: "-" },
                        clickOverride: {
                            click: this.clearPlanned,
                            params: [task.file.path]
                        }
                    })
                }

                return [
                    `:obs_check_in_circle: ${task.file.link}${devopsLink}`,
                    task.project,
                    `${task.status}${workedToday}`,
                    dv.el("div", [
                        !plannedToday ? btnSetPlanned() : btnClearPlanned(),
                        task.planned ? `${datePlannedFormatted} ${plannedToday}` : ""
                    ], { cls: "cell-task-planned" }),
                    task.deadline && `${dateDueFormatted} ${deadlineWarning}`,
                    task.priority,
                ]
            })
        )
    }

    tableActive(ctx, dv) {
        return this.table(ctx, dv, this.utilsTasks.getActiveTasks(dv));
    }
    tablePlannedToday(ctx, dv) {
        return this.table(ctx, dv, this.utilsTasks.getTasksPlannedToday(dv));
    }
    tableActiveCurrentProject(ctx, dv) {
        return this.table(ctx, dv, this.utilsTasks.getActiveTasks(dv).filter(task => task.project.path == dv.current().file.path));
    }
    tableRelatedToCurrent(ctx, dv) {
        return this.table(ctx, dv, this.utilsTasks.getTasksRelated(dv, dv.current()));
    }

    async setPlannedForToday(dv, filePath) {
        const { update } = app.plugins.plugins['metaedit'].api

        const key = "Planned"
        const date = dv.date("now").toFormat("yyyy-MM-dd")

        await update(key, date, filePath)
    }
    async clearPlanned(filePath) {
        const { update } = app.plugins.plugins['metaedit'].api

        const key = "Planned"
        const date = ""

        await update(key, date, filePath)
    }
}