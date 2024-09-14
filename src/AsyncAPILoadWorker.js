// self.onmessage = function (event) {
//   // Retrieve the data from the event
//   const requestData = event.data;

//   // Perform the asynchronous API call
//   performAPICall(requestData)
//     .then((responseData) => {
//       // Send the response data back to the main thread
//       self.postMessage(responseData);
//     })
//     .catch((error) => {
//       // Handle any errors that occur during the API call
//       console.error("Error:", error);
//     });
// };

// function performAPICall() {
//   // Create a new Promise to encapsulate the asynchronous API call
//   return new Promise((resolve, reject) => {
//     // Perform the API call using fetch or any other suitable method
//     fetch("https://jsonplaceholder.typicode.com/posts/", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => {
//         if (response.ok) {
//           // Resolve the Promise with the response data
//           resolve(response.json());
//         } else {
//           // Reject the Promise with an error message
//           reject("API call failed with status: " + response.status);
//         }
//       })
//       .catch((error) => {
//         // Reject the Promise with any error that occurs during the API call
//         reject(error);
//       });
//   });
// }

function fetchCoins() {
  fetch("https://api.coingecko.com/api/v3/search/trending")
    .then((res) => res.json())
    .then((data) => {
      const coins = data.coins.map((coin) => ({
        name: coin.item.name,
        price: coin.item.price_btc,
        logo: coin.item.large,
      }));
      self.postMessage(coins);
    })
    .catch((err) => console.log(err));
}

// setInterval(fetchCoins, 5000);

let intervalInst = undefined;
self.onmessage = function (e) {
  const { data } = e;
  if (data === "start") {
    intervalInst = setInterval(fetchCoins, 5000);
  } else {
    console.log("WORKER:: ELSE");
    if (intervalInst) {
      clearInterval(intervalInst);
    }
  }
};
