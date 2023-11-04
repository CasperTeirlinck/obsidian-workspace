class Templater {
    /**
     * Return link to the currently open file.
     * Use in templater e.g.: <%* tR += customJS.CurrentFile.fromFolder(tp, "Tasks") %>
     */
    currentFileFromFolder(tp, folder = null) {
        // const tfile = tp.config.active_file;
        // const tfile_folder = tfile.path.split("/").slice(0, -1).join("/");
        const prevPath = app.workspace.getLastOpenFiles()[0];
        const tfile = app.vault.getAbstractFileByPath(prevPath);
        const tfileFolder = tfile.parent.path;

        if (folder && (tfileFolder != folder)) return null;
        return `"[[${tfile.path}|${tfile.basename}]]"`;
    }
}