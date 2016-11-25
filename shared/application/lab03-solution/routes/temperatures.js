function renderResult(res, pages, err, result) {
    res.render('temperatures', {
        title: 'Lab 03 - Temperatures Aggregated',
        err: err,
        pages: pages,
        temperatures: result
    });
}

function* process(req, res) {

    try {

        // return the first 10 records from the aggregated results
        let result = yield this.database.temperatures.aggregate([
            {
                $group: {
                    "_id": {
                        s: "$station",
                        y: {$year: "$date"},
                        m: {$month: "$date"}
                    },
                    t: {$avg: "$temperature"}
                }
            },
            {
                $project: {
                    "_id": 0,
                    "station": "$_id.s",
                    "year": "$_id.y",
                    "month": "$_id.m",
                    "temperature": "$t"
                }
            },
            {
                $sort: {
                    "station": 1,
                    "year": 1,
                    "month": 1,
                }
            },
            {
                $limit: 10
            }
        ]).toArray();
        renderResult(res, this.pages, 0, result);

    } catch (e) {

        // display the error
        renderResult(res, this.pages, e, []);

    }

}

module.exports = {
    name: 'Temperatures Aggregated',
    path: '/temperatures',
    callback: process
};
