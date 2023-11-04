/**
 * Get all notes related to the given page.
 * @param {Page} page
 */
function getNotesRelated(dv, page) {
    const inlinks = page.file.inlinks;
    const outlinks = page.file.outlinks;
    const fromProject = getProjectNotes(dv, page);

    return inlinks.concat(outlinks)
        .map(link => dv.page(link))
        .filter(page => page && page.file.folder == "Notes")
        .concat(fromProject);
}

/**
 * Get all notes related to the given project.
 * @param {Page} project
 */
function getProjectNotes(dv, project) {
    return dv.pages('"Notes"').filter(note => {
        return (
            (note.project && dv.page(note.project)) &&
            (dv.page(note.project).file.path == project.file.path)
        )
    })
}

/**
 * Get all pinned notes.
 */
function getPinnedNotes(dv) {
    return dv.pages('"Notes"').filter(note => note.pin)
}

/**
 * Get notes to be shown in inbox.
 */
function getNotesInbox(dv) {
    return dv.pages('"Notes"')
        .filter(note => {
            return (
                !(note.project && dv.page(note.project))
            )
        })
}

module.exports = {
    getNotesRelated,
    getPinnedNotes,
    getProjectNotes,
    getNotesInbox,
}