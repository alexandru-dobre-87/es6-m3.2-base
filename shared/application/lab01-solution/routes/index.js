function renderResult(res, pages) {
    res.render('index', {
        title: 'Lab 01',
        err: 0,
        pages: pages
    });
}

module.exports = {
    name: 'Main',
    path: '/',
    callback: function (req, res) {
        renderResult(res, this.pages);
    }
};
