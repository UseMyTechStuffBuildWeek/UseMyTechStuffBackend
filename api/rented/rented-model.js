const db = require("../data/db-config")

function findBy(items_rented_id){
    return db("items_rented as i").where("items_rented_id", items_rented_id).first()
}

function findRentedItems(renter_id){
    return db("items_rented as i")
        .join("requests as r", "r.user_id", "=", "i.user_id")
        .select("i.user_id as rented_id", "r.user_id as rented_id")
        .where("i.user_id", renter_id) 
}

async function addRentedItem(rented){
    const [items_rented_id] = await db('items_rented').insert(rented, "items_rented_id")
    return findBy(items_rented_id)
}

async function deleteRentedItem(items_rented_id){
    const rented = await findBy(items_rented_id);
    await db("items_rented").where("items_rented_id", items_rented_id).del()
    return rented
}

module.exports = {
    findRentedItems, findBy, addRentedItem, deleteRentedItem
}