const knex = require("../config/knex");

function getUnit () {
    return knex("Units").select("*");
}

function getUnitsForApartment (apartmentId) {
    return knex("Units").select("*").where("apartment", apartmentId);
}

function createUnit (Unit) {
    return knex("Units").insert(Unit);
}

function deleteUnit (id) {
    return knex("Units").where("id", id).del();
}

function editUnit (id, Unit) {
    return knex("Units").where("id", id).update(Unit);
}

module.exports = {
    getUnit,
    createUnit,
    deleteUnit,
    editUnit,
    getUnitsForApartment
}