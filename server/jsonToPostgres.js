const express = require('express');
const fileToRead = require('./jsonData/newParsedData1-3.json');
// console.log(fileToRead.product)

console.log("EE", Object.keys(fileToRead.product).length)
let arr = [];
Object.keys(fileToRead.product).forEach((e) => arr.push(Object.keys(fileToRead.product[e]).length))
console.log(arr)
let notEleven = [];
for (let i = 0; i < arr.length; i++){
    if (arr[i] < 11){
        notEleven.push(i)
    }
}

// console.log(arr, notEleven.length)

fileToRead.product.forEach((e) => {
    // console.log(e.guitarName)
})
let keys = Object.keys(fileToRead.product[0])

console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM")


notEleven.forEach((e) => {
    // console.log(fileToRead.product[e].guitarName, "\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\")
    for (let i = 0; i < keys.length; i++){
        if (fileToRead.product[e][keys[i]] === undefined){
            // console.log(keys[i])
        }
    }
})

// console.log("Q", fileToRead.product[0].fullImage.indexOf("&quot;https:") + 6);