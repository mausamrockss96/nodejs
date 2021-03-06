// we r in mongoose itself..
//model ko communication query sanga query ko communication controller sanga ,controller ko communication route sanga
const productModel = require('./../models/product.model');

//yo function lai pachi components bhitrai helper folder banayera garda sajilo

function map_product_request(product, productDetails)      
{
    console.log('tags>>>', productDetails.tags);
    console.log('check types>>>', typeof(productDetails.tags));
    if(productDetails.name)
        product.name = productDetails.name;
    if(productDetails.description)
        product.description = productDetails.description;
    if(productDetails.brand)
        product.brand = productDetails.brand;
    if(productDetails.category)
        product.category = productDetails.category;
    if(productDetails.color)
        product.color = productDetails.color;
    if(productDetails.price)
        product.price = productDetails.price;
    if(productDetails.weight)
        product.weight = productDetails.weight;
    if(productDetails.manuDate)
        product.manuDate = productDetails.manuDate;
    if(productDetails.expiryDate)
        product.expiryDate = productDetails.expiryDate;
    if(productDetails.status)
        product.status = productDetails.status;
    if(productDetails.image)
        product.image = productDetails.image;
    if(productDetails.batchNo)
        product.batchNo = productDetails.batchNo;
    if(productDetails.quantity)
        product.quantity = productDetails.quantity;
        
    if(productDetails.user)
        product.user = productDetails.user;    
   
    if(productDetails.tags)
    {
    // product.tags = Array.isArray(productDetails.tags)
    // ? productDetails.tags
    // : productDetails.tags.split(','); 

    //OR   
    product.tags = typeof(productDetails.tags) === 'string'
        ? productDetails.tags.split(',')
        : productDetails.tags
     }
    
    
    

    // if(productDetails.discountedItem)     //yo string bhayera discountedItem run bhairako cha, true huda chalcha false huda pani chalcha tara code run bhairacha
    // {
    //     product.discount = {
    //         discountedItem : productDetails.discountedItem,
    //         discountType:  productDetails.discountType,
    //         discountValue:  productDetails.discountValue,

    //     }
    // }



    //false lai check gareko ail
    if(productDetails.discountedItem)     //yo string bhayera discountedItem run bhairako cha, true huda chalcha false huda pani chalcha tara code run bhairacha
    {
        product.discount = {
            discountedItem : productDetails.discountedItem ,
            discountType : productDetails.discountedItem == 'false'? null : productDetails.discountType,
            discountValue : productDetails.discountedItem == 'false'? null : productDetails.discountValue,

            

        }
    }
    
    
    return product;
    
    
}


// after update 
function find(condition)    //find afnai query ho
{   
    
    return productModel.find(condition)
    .sort({_id: -1});
    
}




// for update we did this later after insert below
function insert(data)
{
    var newProduct = new productModel({});         //product.ctrl.js ma promise pathayo bhane promise nai aucha
    var newMappedProduct = map_product_request(newProduct, data);
    return newMappedProduct.save();      //instead of using save 
       
    
}




function update(id, data)
{
    return new Promise(function(resolve, reject)
    {
        productModel.findById(id)
        .exec(function (err, product)
        {
            if(err)
            {
                return reject(err);
            }
            if(!product)
            {
                return reject({
                    msg: 'product not found'
                })
            }
            var updatedProduct = map_product_request(product, data);
            updatedProduct.save(function (err, updated)
            {
                if(err)
                {
                    reject(err);
                }
                else{
                    resolve(updated);
                }
            });
        });
    });
}

function remove(id)
{
   return productModel.findByIdAndRemove(id);    // return promise garcha sidhai , resolve reject gari rakhnu pardaina
 //yo query le nai malai promise return garcha yelle return gareko promise maile yo method bata return gardiye 


}



module.exports = {
    find, insert, update, remove, map_product_request
}


//.find, .exec, .save mongoose ko method ho , yo method le dherai tarika le problem solve garna dincha
//callback, promise and .exec method
// aba malai mongoose le diney promisenai maile return gardiye bhane
//hamiley aja database modelling garyou ani folder wise kasari maintain garney pani padyou