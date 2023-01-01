module.exports = (sequelize, DataTypes) => {
    const product = sequelize.define('Products', {
        name: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        price : {
            type: DataTypes.INTEGER(10),
            allowNull: false,
        },
        seller : {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        description: { 
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING(300),
            allowNull: true
        }
    });
    return product;
};