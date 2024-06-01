// A reference to MoneyCollect.js initialized with a fake API key.
var apikey = "test_pu_nFEs3mUUEmCZYLJWrX02dZwu4aPtHLJYBb5aXHsSjA0";
var privateKey= "test_pr_PNqPup5vFULLPGw2ThG5cgRY4J2rNeEtpWzaYMraw";
var moneyCollect;
// The items the customer wants to buy
var items = [{ id: "xl-tshirt" }];

initialize().then((res)=>{
    console.log("this is the response",res)
}).catch((err)=>{
    console.log("this is the error",err)
})

// Fetches a payment intent and captures the client secret
async function initialize() {

     const data =  

        {
            "amount": 1000000,
            "confirm": true,
            "confirmationMethod": "",
            "currency": "USD",
            "customerId": "cus_1431143595065380865",
            "description": "This charge for gifts",
            "fromChannel": "",
            // "ip": "14.153.236.144",
            "lineItems": [
              {
                "amount": 10000,
                "currency": "USD",
                "description": "Glasses",
                "images": [
                  "https://yourgoods.com/pic2.jpg"
                ],
                "name": "Glasses",
                "quantity": 1
              },
              {
                "amount": 990000,
                "currency": "USD",
                "description": "Diamond",
                "images": [
                  "https://yourgoods.com/pic.jpg"
                ],
                "name": "Diamond",
                "quantity": 1
              }
            ],
            "notifyUrl": "https://yourdomain.com/notify",
            "orderNo": "id_123456",
            "paymentMethod": "pm_1432225765870866433",
            "paymentMethodTypes": [
              "card"
            ],
            "preAuth": "n",
            "receiptEmail": "rutagaramaaxcel@gmail.com",
            "recurring": {
              "initial": false,
              "relationPaymentId": ""
            },
            "returnUrl": "http://yourdomain.com/return",
            "setupFutureUsage": "on",
            "shipping": {
              "address": {
                "city": "Asheville",
                "country": "US",
                "line1": "3968 Fidler Drive",
                "line2": "",
                "postalCode": "28806",
                "state": "North Carolina"
              },
              "firstName": "Mark",
              "lastName": "Merrill",
              "phone": "210-627-6464"
            },
            "statementDescriptor": "MCMYSHOP",
            "userAgent": "",
            "website": "http://yourdomain.com"
          }
     




    const response = await fetch("https://stoplight.io/mocks/mc-api/api-v1/9836699/services/v1/payment/create",
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Accept: '*/*', Authorization: `Bearer ${privateKey}`},
        body: '{"amount":1000000,"confirm":true,"confirmationMethod":"","currency":"USD","customerId":"cus_1431143595065380865","description":"This charge for gifts","fromChannel":"","ip":"14.153.236.144","lineItems":[{"amount":10000,"currency":"USD","description":"Glasses","images":["https://yourgoods.com/pic2.jpg"],"name":"Glasses","quantity":1},{"amount":990000,"currency":"USD","description":"Diamond","images":["https://yourgoods.com/pic.jpg"],"name":"Diamond","quantity":1}],"notifyUrl":"https://yourdomain.com/notify","orderNo":"id_123456","paymentMethod":"pm_1432225765870866433","paymentMethodTypes":["card"],"preAuth":"n","receiptEmail":"rutagaramaaxcel@gmail.com","recurring":{"initial":false,"relationPaymentId":""},"returnUrl":"http://yourdomain.com/return","setupFutureUsage":"on","shipping":{"address":{"city":"Asheville","country":"US","line1":"3968 Fidler Drive","line2":"","postalCode":"28806","state":"North Carolina"},"firstName":"Mark","lastName":"Merrill","phone":"210-627-6464"},"statementDescriptor":"MCMYSHOP","userAgent":"","website":"http://yourdomain.com"}'
      }
      
    )
    var paymentResponse = await response.json()
     console.log(paymentResponse)

    await setupElements();

    document.querySelector("#payment-form")
        .addEventListener("submit", function(evt) {
        evt.preventDefault();
        // Initiate payment
        handleSubmit(paymentResponse);
    });
}


async function setupElements()  {
    console.log(apikey)
     moneyCollect = await MoneycollectPay(apikey);
    
    let params = {
        formId: 'payment-form', // form id
        frameId: 'PrivateFrame', // generated IframeId
        mode: "test",
        customerId: "cus_1431153595065381865",
        needCardList: true,
        autoValidate: true,
        modelType: "normal",
        lang: 'en', // Form display and verification information language
        layout: {
            pageMode: "inner", // Style mode of the page   inner | block
            style: {
                frameMaxHeight: "50", //  The max height of iframe
                input: {
                    FontSize: "15", // Collect the size of the font
                    FontFamily: "",  // Specify a prioritized list of one or more font family names 
                    FontWeight: "600",  // Collect the weight (or boldness) of the font
                    Color: "red", // Collect the foreground color value of an element's text
                    ContainerBorder: "",  //Collect the name of the font
                    ContainerBg: "",  // Collect the weight (or boldness) of the font
                    ContainerSh: "" //Collect the color of the font
                }
            }
        }
    }
 await moneyCollect.elementInit("payment_steps", params);
//  const iframe = document.getElementById('PrivateFrame'); // Replace with your iframe's actual ID
//  const message = "your message";
//  const targetOrigin = "https://062e-105-179-8-146.ngrok-free.app"; // Your Ngrok URL
 
//  // Ensure you are using the correct origin in postMessage
//  iframe.contentWindow.postMessage(message, targetOrigin);
}





// Billing Address
let paymentMethodsData = {
    billingDetails: {
        address: {
            city: "Hong Kong",
            country: "CN",
            line1: "193 Prince Edward Road",
            line2: "",
            postalCode: "421455",
            state: "Hong Kong"
        },
        email: "rutagaramaaxcel@gmail.com",
        firstName: "su",
        lastName: "diana",
        phone: "19112454541"
    }
}
async function handleSubmit(paymentResponse) {
    setLoading(true);
    moneyCollect.confirmPayment({
        paymentMethod: paymentMethodsData,
        autoJump: false,
        payment_id: paymentResponse.id,
        clientSecret: paymentResponse.clientSecret,
        confirmDetail: {} //Confirm parameters
    }).then((result) => { 
        if(result.data.code === "success"){
            orderComplete(result.data.data);
        } else { 
            showMessage(result.data.msg);
        }
    });

    setLoading(false);
}

// Fetches the payment intent status after payment submission
async function orderComplete(paymentIntent) {
    document.querySelectorAll(".payment-view").forEach(function(view) {
        view.classList.add("hidden");
    });
    document.querySelectorAll(".completed-view").forEach(function(view) {
        view.classList.remove("hidden");
    });
    document.querySelector(".status").textContent =  paymentIntent.status ;
    var paymentIntentJson = JSON.stringify(paymentIntent, null, 2);
    document.querySelector("pre").textContent = paymentIntentJson;
}

// ------- UI helpers -------
function showMessage(messageText) {
    const messageContainer = document.querySelector("#payment-message");

    messageContainer.classList.remove("hidden");
    messageContainer.textContent = messageText;

}

// Show a spinner on payment submission
function setLoading(isLoading) {
    if (isLoading) {
        // Disable the button and show a spinner
        document.querySelector("#submit").disabled = true;
        document.querySelector("#spinner").classList.remove("hidden");
        document.querySelector("#button-text").classList.add("hidden");
    } else {
        document.querySelector("#submit").disabled = false;
        document.querySelector("#spinner").classList.add("hidden");
        document.querySelector("#button-text").classList.remove("hidden");
    }
}


// var apikey = "API Public key";
// var moneyCollect;

// // The items the customer wants to buy

// var items = [{id: "xl-tshirt"}];

// initialize()

// // Fetches a payment intent and captures the client secret

// async function initialize(){
//     const response = await fetch('/create-payment',{
//         method: 'POST',
//         headers: { "Content-Type":"application/json"},
//         body:JSON.stringify({items}),
//     });

//     var paymentResponse = await response.json();

//     setupElements();
//     document.querySelector("#payment-form")
//     .addEventListener("submit", function(evt){
//         evt.preventDefault();
//         handleSubmit(paymentResponse);
//     });
// }

// async function setupElement(){
//     moneyCollect =MoneycollectPay(apikey);
//     let params = {
//         formId: 'payment-form', // form id
//         frameId: 'PrivateFrame', // generated IframeId
//         mode: "test",
//         customerId: "",
//         needCardList: true,
//         autoValidate: true,
//         modelType: "normal",
//         lang: 'en', // Form display and verification information language
//         layout: {
//             pageMode: 'inner', // style mode of the page inner | block
//             style: {
//                 frameMaxHeight: "50", // The max height of iframe
//                 input : {
//                     FontSize: "", //Collect the size of the font
//                     FontFamily: "", // Specify a prioritized list of one or more font family names
//                     Color: "", // Collect the foreground color value of an element's text
//                     ContainerBorder: "",
//                     ContainerBg: "",
//                     ContainerSh:" "

//                 }
//             }
//         }
//     }
//     moneyCollect.elementInit("payment_steps", params);
// }

// // Billing Address

// let paymentMethodsData = {
//     billingDetails: {
//         address: {
//             city:"Hong Kong",
//             country: "CN",
//             line1: "193 Prince Edward Road",
//             line2: "",
//             postalCode: "421455",
//             state:"Hong kong"
//         },
//         email:"customer@gmail.com",
//         firstName: "su",
//         lastName: "diana",
//         phone: "19112354541"
//     }
// }

// async function handleSubmit(paymentResponse){
//     setLoading(true);
//     moneyCollect.confirmPayment({
//         paymentMethod: paymentMethodsData,
//         autoJump: false,
//         payment_id: paymentResponse.id,
//         clientSecret: paymentResponse.clientSecret,
//         confirmDetail: {} //confirm Parameters
//     }).then((result)=>{
//      if(result.data.code === 'success'){
//         orderComplete(result.data.data);
//      } else {
//         showMessage(result.data.msg);
//      }
//     });
//     setLoading(false);
// }

// // Fetches the payment intent status after payment submission
// async function orderComplete(paymentIntent) {
//     document.querySelectorAll('.payment-view').forEach(function(view){
//         view.classList.add('hidden');
//     });
//     document.querySelectorAll('.completed-view').forEach(function(view){
//         view.classList.remove("hidden");
//     });
//     document.querySelector('.status').textContent = paymentIntent.status;
//     var paymentIntentJson = JSON.stringify(paymentIntent,null, 2);
//     document.querySelector("pre").textContent = paymentIntentJson;
// }

// // -----UI helpers -------

// function showMessage(messageText){
//     const messageContainer = document.querySelector("#payment-message");
//     messageContainer.classList.remove("hidden");
//     messageContainer.textContent = messageText;
// }


// // Show a spinner on payment submission

// function setLoading(isLoading){
//     if(isLoading){
//         // Disable the button and show a spinner
//         document.querySelector("#submit").disabled = true;
//         document.querySelector("#spinner").classList.remove("hidden");
//         document.querySelector("#button-text").classList.add("hidden");
//     }else {
//         document.querySelector("#submit").disabled = false;
//         document.querySelector("#spinner").classList.add("hidden");
//         document.querySelector("#button-text").classList.remove("hidden");
//     }
// }