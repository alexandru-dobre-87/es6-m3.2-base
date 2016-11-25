function renderResult(res, pages, err, result) {
    res.render('temperatures', {
        title: 'Lab 01 - Temperatures',
        err: err,
        pages: pages,
        temperatures: result
    });
}

module.exports = {
    name: 'Temperatures',
    path: '/temperatures',
    callback: function (req, res) {

        try {

            // return the first 10 records from the collection
            this.database.temperatures.find({}).limit(10).toArray((err, result) => {
                renderResult(res, this.pages, err, result);
            });

        } catch (e) {

            // display the error
            renderResult(res, this.pages, e, []);

        }

    }
};
