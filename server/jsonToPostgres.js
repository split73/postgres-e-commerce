const express = require('express');
const fileToRead = require('./jsonData/newParsedData1-3.json');

console.log("EE", Object.keys(fileToRead.product))

let specs = new Set()

let specsMap = new Map();

let specsValueSting = "";



for (let j = 0; j < fileToRead.product.length; j++){
    if (fileToRead.product[j].specs){
        for (let k = 0; k < fileToRead.product[j].specs.length; k++){
            let specsBodySting = "";
            for (let i = 0; i < fileToRead.product[j].specs[k].specsBody.length; i++){
                if (fileToRead.product[j].specs[k].specsBody[i] === ":"){
            
                    while (fileToRead.product[j].specs[k].specsBody[i] !== undefined){
                        i++;
                        
                        if (fileToRead.product[j].specs[k].specsBody[i] !== undefined && fileToRead.product[j].specs[k].specsBody[i] !== " "){
                            specsValueSting += fileToRead.product[j].specs[k].specsBody[i];
                        }
                        
                    }
            
                } else {
                    specsBodySting += fileToRead.product[j].specs[k].specsBody[i]
                }
            }
            if(specsMap.has(specsBodySting)){
                specsMap.set(specsBodySting, specsMap.get(specsBodySting)+1)
            } else {
                specsMap.set(specsBodySting, 1)
            }
            specs.add(specsBodySting)
        }
    }
    
}

console.log(specsMap)