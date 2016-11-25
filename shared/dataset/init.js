function loc() {
    return Math.floor(Math.random() * 159) - 80;
}
function temperature() {
    return parseFloat(parseFloat(Math.floor(Math.random() * 79) - 40 + Math.random()).toFixed(2));
}
function rand(n) {
    return Math.floor(Math.random() * n) + 1;
}
function location() {
    return loc() + Math.random()
}
var bulkOwners = db.owners.initializeUnorderedBulkOp();
var bulkStations = db.stations.initializeUnorderedBulkOp();
var bulkTemperaturs = db.temperatures.initializeUnorderedBulkOp();
for (var owner = 0; owner < 100; owner++) {
    bulkOwners.insert({
        _id: "owner" + owner,
        name: "Random owner " + owner
    });
}
for (var station = 0; station < 100; station++) {
    bulkStations.insert({
        _id: "station" + station,
        name: "Global monitoring station " + station,
        owner: "owner" + rand(100),
        "location": {
            "coordinates": [location(), location()],
            "type": "Point"
        }
    });
    for (var year = 2000; year < 2016; year++) {
        for (var month = 1; month <= 12; month++) {
            for (var day = 1; day <= 31; day++) {
                var date = new Date(year, month, day, 0, 0, 0);
                bulkTemperaturs.insert({station: "station" + station, temperature: temperature(), date: date});
            }
        }
    }
}

db.dropDatabase();
printjson(bulkOwners.execute());
printjson(bulkStations.execute());
printjson(bulkTemperaturs.execute());