const status = {
    new: {
        label: "⚪",
        order: 1
    },
    inprogress: {
        label: "🔵",
        order: 2
    },
    onhold: {
        label: "🟣",
        order: 3
    },
    inreview: {
        label: "🟡",
        order: 4
    },
    done: {
        label: "🟢",
        order: 5
    },
    cancelled: {
        label: "🔴",
        order: 6
    },
}

const priority = {
    low: {
        label: "⚪",
        order: 1
    },
    medium: {
        label: "🟠",
        order: 2
    },
    high: {
        label: "🔴",
        order: 3
    },
}

function getStatusOrder(task) {
    const _status = Object.values(status).find(value => value.label == task.status);
    return _status ? _status.order : 0;
}
function getPriorityOrder(task) {
    const _priority = Object.values(priority).find(value => value.label == task.priority);
    return _priority ? _priority.order : 0;
}

/**
 * Get all active tasks.
 */
function getActiveTasks(dv) {
    return dv.pages('"Tasks"')
        .filter(task =>
            (task.deadline && task.deadline.diffNow("days").days >= 0) ||
            (workedOnToday(dv, task)) ||
            (
                (task.deadline && task.deadline.diffNow("days").days < 0) &&
                ![status.done.label, status.cancelled.label].includes(task.status.toLowerCase())
            ) ||
            (
                !task.deadline &&
                ![status.done.label, status.cancelled.label].includes(task.status.toLowerCase())
            )
        )
}

/**
 * Get all tasks planned for today:
 * - planned date is today
 * - deadline today or tomorrow or overdue
 * - worked on today
 */
function getTasksPlannedToday(dv) {
    return dv.pages('"Tasks"')
        .filter(task => {
            return (
                (task.planned && task.planned.hasSame(dv.date("now"), "day")) ||
                (
                    (task.deadline && task.deadline.diffNow("days").days <= 1) &&
                    ![status.done.label, status.cancelled.label].includes(task.status.toLowerCase())
                ) ||
                workedOnToday(dv, task)
            )
        })
}

/**
 * Get all tasks planned for today:
 * - planned date is today
 * - deadline today or tomorrow or overdue
 * - worked on today
 * @param {string} tag
 */
function getTasksWithTag(dv, tag) {
    return dv.pages('"Tasks"')
        .filter(task => {
            return dv.func.contains(task.tags, tag)
        })
}

/**
 * Get tasks to be shown in inbox.
 */
function getTasksInbox(dv) {
    return dv.pages('"Tasks"')
        .filter(task => {
            return (
                !(task.project && dv.page(task.project)) ||
                !task.priority ||
                !task.status
            )
        })
}

/**
 * Get all tasks related to the given page.
 * @param {Page} page
 */
function getTasksRelated(dv, page) {
    const inlinks = page.file.inlinks;
    const outlinks = page.file.outlinks;

    return inlinks.concat(outlinks)
        .map(link => dv.page(link))
        .filter(page => page && page.file.folder == "Tasks");
}

/**
 * Get all time block linked to the given task page.
 * @param {Page} task
 */
function getTimeBlocks(dv, task) {
    return dv.pages('"Time Sheet"')
        .filter(page => page.task && dv.page(page.task))
        .filter(page => dv.page(page.task).file.path == task.file.path);
}

/**
 * Determine if there has been registered a time block for the given task today.
 * @param {Page} task
 */
function workedOnToday(dv, task) {
    return getTimeBlocks(dv, task)
        .filter(timeblock => timeblock.date.hasSame(dv.date("now"), "day")).length > 0
}

/**
 * Return if the given task is planned for today.
 * @param {Page} task
 */
function plannedToday(dv, task) {
    return task.planned && task.planned.hasSame(dv.date("now"), "day");
}

/**
 * Indicate if the given task is overdue by an icon
 * @param {Page} task
 */
function overdueIndicator(task) {
    return task.deadline && (
        task.deadline.diffNow("days").days < -1 ? "❗" :
            task.deadline.diffNow("days").days <= 1 ? "⏳" : null
    );
}

/**
 * Sorting function for task priority.
 */
function priorityCompare(a, b) {
    return getPriorityOrder(a) - getPriorityOrder(b)
}

/**
 * Sorting function for task status.
 */
function statusCompare(a, b) {
    return getStatusOrder(a) - getStatusOrder(b)
}

module.exports = {
    getActiveTasks,
    getTasksPlannedToday,
    getTasksWithTag,
    getTasksRelated,
    getTasksInbox,
    getTimeBlocks,
    workedOnToday,
    plannedToday,
    overdueIndicator,
    priorityCompare,
    statusCompare
}