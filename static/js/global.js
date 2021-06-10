
// displays target page
function showPage(pages, target) {
    for (let page of pages) {
        page.classList.add('hide-div');
    }

    if (target != null) {
        if (target.classList.contains('hide-div')) {
            target.classList.remove('hide-div');
        }
    }
}

export {
    showPage
}
