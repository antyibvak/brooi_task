const knex = require("../config/knex");


function getHouses () {
    return knex("Houses").select("*");
}

function getHousebyLocation (locationId) {
    return knex("Houses").select("*").where("location", locationId);
}

function createHouses (House) {
    return knex("Houses").insert(House);
}

function deleteHouses (id) {
    return knex("Houses").where("id", id).del();
}

function editHouses (id, House) {
    return knex("Houses").where("id", id).update(House);
}

module.exports = {
    getHouses,
    createHouses,
    deleteHouses,
    editHouses,
    getHousebyLocation
}



