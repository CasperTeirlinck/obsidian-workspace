class Notes {
    constructor() {
        this.utils = require(app.vault.adapter.basePath + "/.scripts/notes.js");
    }

    table(dv, notes) {
        const headers = ["Note", "Project"]
        dv.table(headers, notes
            .sort(note => note.file.name, "asc")
            .sort(note => note.project, "asc")
            .map(note => {
                return [
                    `:obs_note_glyph: ${note.file.link}`,
                    note.project,
                ]
            })
        )
    }

    tablePinnedNotes(dv) {
        return this.table(dv, this.utils.getPinnedNotes(dv));
    }
    tableRelatedToCurrent(dv) {
        return this.table(dv, this.utils.getNotesRelated(dv, dv.current()));
    }
}