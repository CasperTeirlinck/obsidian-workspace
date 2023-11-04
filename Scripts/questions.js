class Questions {
    constructor() {
        this.utils = require(app.vault.adapter.basePath + "/.scripts/questions.js");
        this.utilsUI = require(app.vault.adapter.basePath + "/.scripts/ui.js");
    }

    table(ctx, dv, questions) {
        const headers = ["Question", "Project", "Pinned"]
        dv.table(headers, questions
            .sort(question => question.pin, "desc")
            .map(question => {
                return [
                    `:luc_help_circle: ${question.file.link}`,
                    question.project,
                    this.utilsUI.checkbox(ctx, question.pin),
                ]
            })
        )
    }

    tableUnanswered(ctx, dv) {
        return this.table(ctx, dv, this.utils.getUnanswered(dv));
    }
    tableUnansweredRelatedToCurrent(ctx, dv) {
        return this.table(ctx, dv, this.utils.getQuestionsUnansweredRelated(dv, dv.current()));
    }
}