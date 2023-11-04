/**
 * Get all notes related to the given page.
 * @param {Page} page
 */
function getQuestionsUnansweredRelated(dv, page) {
    const inlinks = page.file.inlinks;
    const outlinks = page.file.outlinks;
    const fromProject = getProjectQuestionsUnanswered(dv, page);

    return inlinks.concat(outlinks)
        .map(link => dv.page(link))
        .filter(page => page && page.file.folder == "Questions")
        .concat(fromProject);
}

/**
 * Get all unanswered questions.
 */
function getUnanswered(dv) {
    return dv.pages('"Questions"').filter(question => !question.answered)
}

/**
 * Get all questions related to the given project.
 * @param {Page} project
 */
function getProjectQuestionsUnanswered(dv, project) {
    return dv.pages('"Questions"').filter(question => {
        return (
            (question.project && dv.page(question.project)) &&
            (dv.page(question.project).file.path == project.file.path)
        )
    }).filter(question => !question.answered)
}

/**
 * Get questions to be shown in inbox.
 */
function getQuestionsInbox(dv) {
    return dv.pages('"Questions"')
        .filter(question => {
            return (
                !(question.project && dv.page(question.project))
            )
        })
}

module.exports = {
    getQuestionsUnansweredRelated,
    getUnanswered,
    getQuestionsInbox,
}