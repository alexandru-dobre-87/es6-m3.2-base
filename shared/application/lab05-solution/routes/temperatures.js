function renderResult(res, err, result) {
    res.json({data: result, err: err});
}

function* process(req, res) {

    try {

        // return the first 10 records from the aggregated results
        let result = yield this.database.temperatures.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date("2015-12-01T00:00:00Z"),
                        $lt: new Date("2016-01-01T00:00:00Z")
                    }
                }
            },
            {
                $group: {
                    "_id": "$station",
                    temperature: {$avg: "$temperature"}
                }
            },
            {
                $lookup: {
                    from: "stations",
                    localField: "_id",
                    foreignField: "_id",
                    as: "station"
                }
            },
            {
                $unwind: "$station"
            },
            {
                $project: {
                    "_id": 0,
                    "station.name": "$station.name",
                    "station.location": "$station.location",
                    "temperature": "$temperature"
                }
            },
            {
                $sort: {
                    "station.name": 1
                }
            }
        ]).toArray();
        renderResult(res, 0, result);

    } catch (e) {

        // display the error
        renderResult(res, e, []);

    }

}

module.exports = {
    name: 'Temperatures Aggregated chart',
    path: '/temperatures',
    callback: process
};
