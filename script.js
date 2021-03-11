"use strict";


let orderBtn = document.getElementById("submit_btn");

const patisserie = {
  bananaCaramel: {
    stock: 3,
    price: 9.99,
  },
  contessa: {
    stock: 5,
    price: 7.99,
  },
  concorde: {
    stock: 11,
    price: 22.99,
  },
  mouseCake: {
    stock: 8,
    price: 16.99,
  },
  confettiSuprise: {
    stock: 9,
    price: 14.99,
  },
};


const cake = document.getElementById("cakeSelect");
const amount = document.getElementById("cakeAmount")


 


const checkOrder = (order) => {
  
  let truthy = order.every( item => patisserie[item[0]].stock >= item[1]);
  let total = patisserie[order[0][0]].price * order[0][1];
  return new Promise ( (resolve, reject) => {
    setTimeout( ()=> {
       if(truthy){
         console.log(`You ordered ${order[0][1]} ${order[0][0]}.`);
         console.log(`All of the items are in stock. The total cost of the order is ${total}. Press "i" if it is Ok`)
          resolve([order,total])
       } else {
          reject('The order could not be completed because some items are sold out!')
       }
    },1000)
  })

  // dont forget setTimeout


};



const payment = (resolvedValue) => {
  return new Promise ( (resolve, reject) => {
    document.addEventListener("keyup", function(event){
      setTimeout( ()=> {
        if(event.key === "i"){
          console.log(`Payment process completed! You paid ${resolvedValue[1]}`);
          console.log(`to Cashier: Wait for checking stock...`)
          resolve(resolvedValue[0])
        } else {
          reject(`Your payment is cancelled!`)

        }
      }, 2000)
    })

  })
  
  // dont forget setTimeout
  
}

const checkStock = (resolvedValue) => {
  const leftStock = patisserie[resolvedValue[0][0]].stock - resolvedValue[0][1];
  return new Promise ( (resolve, reject)=> {
    setTimeout( ()=> {
      if(leftStock > 1){
        resolve(`${resolvedValue[0][0]} stock is enough!`)
      } else {
        reject (`${resolvedValue[0][0]} stock is ${leftStock} and it is critic!`)
      }

    }, 3000)

  })
  // dont forget setTimeout

  }

const add = "this is an example of GitHub upload:)";
const another = "example";


orderBtn.onclick = ()=>{
  // let order = ['contessa', 2];   // sample order template, you should take values from DOM

  const order = [[cake.value, amount.value]];

  // create promise chain
  checkOrder(order)
  .then( (res) => {return payment(res)})
  .then( (value)=> {return checkStock(value)})
  .then( (result) => console.log(result))
  .catch( (err) => console.log(err))
  

}