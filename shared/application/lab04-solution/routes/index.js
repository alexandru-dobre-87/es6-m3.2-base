function renderResult(res, pages) {
    res.render('index', {
        title: 'Lab 04',
        err: 0,
        pages: pages
    });
}

function* process(req, res) {

    renderResult(res, this.pages);

    return "done";

}

module.exports = {
    name: 'Main',
    path: '/',
    callback: process
};
