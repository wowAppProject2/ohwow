// Create a namespace object for our app
const wowApp={};

// define an init method to:  
wowApp.init=()=>{
    // call a method that will populate dropwon Menu
    wowApp.populateDropDown(); 
    // call a method that will add an event listener to our form element
    wowApp.movieClick();
    // QuerySelect the form element
    wowApp.formSelect=document.querySelector('form');
}

// Method that populates the dropdown menu with API call

wowApp.populateDropDown=()=>{
    fetch("https://owen-wilson-wow-api.herokuapp.com/wows/movies")
    .then((response)=>{
        if (response.ok) {
            return response.json()
        } 
        // Error handling if response has no data to return
        else {
            throw new Error('Wow there is nothing here');
        }   
    })

    .then ((wowData)=>{
        // Populate dropdown menu using array returned from API call
        // select the select element
        const movieSelector=document.querySelector('#moviesDropDown');
        // Use a forEach loop to populate each option element
        wowData.forEach((movies)=>{
            // Create the option element
            const movieChoice=document.createElement('option');
            // Set the textContent equal to the item in the array
            movieChoice.textContent = movies;
            // Append each option element to the select element
            movieSelector.append(movieChoice);
        })

    })

    .catch((error)=>{
        // Alert user with error message if data does not exist
        alert(error);
    })

}

wowApp.movieClick = ()=>{

    // Add an event listner to the form element
    wowApp.formSelect=addEventListener('click', (e)=>{

    // Save the innerText of the option clicked to a property in the namespace object
    wowApp.userChoice=e.target.innerText;
    if(wowApp.userChoice==="Choose a movie")
    {
        alert("I thought you wanted to hear a wow?")
    }

    // Call the getWows function, passing the wowApp.userChoice property as an argument
    wowApp.getWows(wowApp.userChoice);

    })

}

// Function declaration for getWows method, that takes the wowApp.userChoice as a paramter
wowApp.getWows = movieWow=>{
    fetch(`https://owen-wilson-wow-api.herokuapp.com/wows/random?movie=${movieWow}`)
    .then((response)=>{
        if (response.ok) {
            return response.json()
        } 
        // Error handling if response has no data to return
        else {
            throw new Error('Wow there is nothing here');
        }   
    })

    .then ((wowData)=>{
      console.log(wowData);
      console.log(movieWow);
    })

    .catch((error)=>{
        // Alert user with error message if data does not exist
        alert(error);
    })
 
   
}

// Call the init method
wowApp.init();


