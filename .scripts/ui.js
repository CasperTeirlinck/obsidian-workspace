/**
 * Simple checkbox
 * @param {DataviewInlineApi} ctx
 * @returns 
 */
function checkbox(ctx, checked = false) {
    const checkbox = ctx.container.createEl("input", { type: "checkbox", attr: { disabled: true } });
    checkbox.checked = checked;
    return checkbox;
}

module.exports = {
    checkbox,
}