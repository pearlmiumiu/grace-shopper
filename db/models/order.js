'use strict'

const {INTEGER, ARRAY, ENUM} = require('sequelize')

// define orders model
module.exports = db => db.define('orders', {
  products: {
    type: ARRAY(INTEGER),
    set: (value) => {
      let currentListOfProducts = this.getDataValue('products')
      currentListOfProducts.push(value)
      this.setDataValue('procucts', currentListOfProducts)
    }
  },
  status: ENUM('created', 'completed')
}, {
  getterMethods: {
    productWithQuantity: () => {
      let currentListOfProducts = this.getDataValue('products')
      let productWithQuantityList = {}
      for (let i = 0; i < currentListOfProducts.length; i++) {
        if (productWithQuantityList[currentListOfProducts[i]]) {
          productWithQuantityList[currentListOfProducts[i]]++
        } else {
          productWithQuantityList[currentListOfProducts[i]] = 1
        }
      }

      return productWithQuantityList
    }
  },

  instanceMethods: {
    deleteProductFromOrder: (productId) => {
      let currentListOfProducts = this.getDataValue('products')
      let productIndex = currentListOfProducts.indexOf(productId)
      this.setDataValue('products', currentListOfProducts.splice(productIndex, 1))
    }
  }
})

module.exports.associations = (Order, {User}) => {
  Order.belongsTo(User)
}