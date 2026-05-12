import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const User = db.define('Users', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    gender: {
        type: DataTypes.STRING
    },
    freezeTableName: true // Agar Sequelize tidak mengubah nama tabel secara otomatis

});

export default User;

(async () => {
    await db.sync();
})();