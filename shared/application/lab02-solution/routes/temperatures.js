function renderResult(res, pages, err, result) {
    res.render('temperatures', {
        title: 'Lab 02 - Temperatures',
        err: err,
        pages: pages,
        temperatures: result
    });
}

function* process(req, res) {

    try {

        // return the first 10 records from the collection
        let result = yield this.database.temperatures.find({}).limit(10).toArray();
        renderResult(res, this.pages, 0, result);

    } catch (e) {

        // display the error
        renderResult(res, this.pages, e, []);

    }

}

module.exports = {
    name: 'Temperatures',
    path: '/temperatures',
    callback: process
};
