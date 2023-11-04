class Inbox {
    constructor() {
        this.utilsTasks = require(app.vault.adapter.basePath + "/.scripts/tasks.js");
        this.utilsNotes = require(app.vault.adapter.basePath + "/.scripts/notes.js");
        this.utilsMeetings = require(app.vault.adapter.basePath + "/.scripts/meetings.js");
        this.utilsQuestions = require(app.vault.adapter.basePath + "/.scripts/questions.js");
        this.utilsTimeblocks = require(app.vault.adapter.basePath + "/.scripts/timeblocks.js");

        this.folderIcons = {
            "Tasks": ":obs_check_in_circle:",
            "Questions": ":obs_help:",
            "Notes": ":obs_note_glyph:",
            "Meetings": ":luc_calendar:",
            "Time Sheet": ":obs_clock:",
        }
    }

    list(dv) {
        const tasks = this.utilsTasks.getTasksInbox(dv);
        const notes = this.utilsNotes.getNotesInbox(dv);
        const meetings = this.utilsMeetings.getMeetingsInbox(dv);
        const questions = this.utilsQuestions.getQuestionsInbox(dv);
        const timeblocks = this.utilsTimeblocks.getTimeblocksInbox(dv);

        dv.list(tasks.concat(questions).concat(notes).concat(meetings).concat(timeblocks).map(page => {
            return `${this.folderIcons[page.file.folder] || ""} ${page.file.link}`;
        }));
    }
}