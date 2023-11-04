/**
 * Get all meetings related to the given page.
 * @param {Page} page
 */
function getMeetingsRelated(dv, page) {
    const inlinks = page.file.inlinks;
    const outlinks = page.file.outlinks;
    const fromProject = getProjectMeetings(dv, page);

    return inlinks.concat(outlinks)
        .map(link => dv.page(link))
        .filter(page => page && page.file.folder == "Meetings")
        .concat(fromProject);
}

/**
 * Get all meetings related to the given project.
 * @param {Page} project
 */
function getProjectMeetings(dv, project) {
    return dv.pages('"Meetings"').filter(meeting => {
        return (
            (meeting.project && dv.page(meeting.project)) &&
            (dv.page(meeting.project).file.path == project.file.path)
        )
    })
}

/**
 * Get all meetings for a given date.
 * @param {DateTime} date 
 */
function getForDate(dv, date) {
    return dv.pages('"Meetings"')
        .filter(meeting => meeting.date.hasSame(date, "day"));
}

/**
 * Get meetings planned for today or in the future.
 */
function getUpcomingMeetings(dv) {
    return dv.pages('"Meetings"')
        .filter(meeting => meeting.date >= dv.date("today"));
}

/**
 * Get pinned meetings.
 */
function getPinnedMeetings(dv) {
    return dv.pages('"Meetings"')
        .filter(meeting => meeting.pin);
}


/**
 * Get meetings to be shown in inbox.
 */
function getMeetingsInbox(dv) {
    return dv.pages('"Meetings"')
        .filter(meeting => {
            return (
                !meeting.date ||
                !(meeting.project && dv.page(meeting.project))
            )
        })
}

module.exports = {
    getForDate,
    getUpcomingMeetings,
    getMeetingsRelated,
    getProjectMeetings,
    getPinnedMeetings,
    getMeetingsInbox,
}