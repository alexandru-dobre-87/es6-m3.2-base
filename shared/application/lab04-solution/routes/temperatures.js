function renderResult(res, pages, err, result) {
    res.render('temperatures', {
        title: 'Lab 04 - Temperatures Aggregated again',
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
                        y: {$year: "$date"}
                    },
                    min: {$min: "$temperature"},
                    max: {$max: "$temperature"}
                }
            },
            {
                $lookup: {
                    from: "stations",
                    localField: "_id.s",
                    foreignField: "_id",
                    as: "station"
                }
            },
            {
                $unwind: "$station"
            },
            {
                $lookup: {
                    from: "owners",
                    localField: "station.owner",
                    foreignField: "_id",
                    as: "owner"
                }
            },
            {
                $unwind: "$owner"
            },
            {
                $project: {
                    "_id": 0,
                    "station.name": "$station.name",
                    "station.location": "$station.location",
                    "owner.name": "$owner.name",
                    "year": "$_id.y",
                    "temperature.min": "$min",
                    "temperature.max": "$max"
                }
            },
            {
                $sort: {
                    "station.name": 1,
                    "year": 1
                }
            },
            {
                $limit: 100
            }
        ]).toArray();
        renderResult(res, this.pages, 0, result);

    } catch (e) {

        // display the error
        renderResult(res, this.pages, e, []);

    }

}

module.exports = {
    name: 'Temperatures Aggregated again',
    path: '/temperatures',
    callback: process
};
