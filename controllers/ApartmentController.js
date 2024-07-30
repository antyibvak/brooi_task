const knex = require("../config/knex");

function getApartments () {
    return knex("Apartments").select("*");
}

function getApartmentbyLocation (locationId) {
    return knex("Apartments").select("*").where("location", locationId);
}

function createApartments (Apartment) {
    return knex("Apartments").insert(Apartment);
}

function deleteApartments (id) {
    return knex("Apartments").where("id", id).del();
}

function editApartments (id, Apartment) {
    return knex("Apartments").where("id", id).update(Apartment);
}

module.exports={
    getApartments,
    createApartments,
    deleteApartments,
    editApartments,
    getApartmentbyLocation
}


