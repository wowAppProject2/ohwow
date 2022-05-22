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
    wowApp.formSelect=addEventListener('change', (e)=>{
      
    // Save the innerText of the option clicked to a property in the namespace object
    wowApp.userChoice=e.target.value;
    console.log(wowApp.userChoice);

              // if(wowApp.userChoice==="Choose a movie")
              // {
              //     alert("I thought you wanted to hear a wow?")
              // }
          
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
          
    .then((wowData) => {
        wowApp.createCard(wowData);
    })
    .catch((error) => {
    // Alert user with error message if data does not exist
        alert(error);
    })
}
          
//A function declaration to create card elements populate the list
wowApp.createCard =(wowData)=> {

    // Create div to hold video and text content 
    const videoAndTextContainer=document.createElement('div');
    // Add a class to the container holding the video and text content
    videoAndTextContainer.classList.add('videoTextContainer');
    
    // Create div to hold all text content
    const singleCardContainer=document.createElement('div');
    // Add a class to the container holding all the text content
    singleCardContainer.classList.add('singleCardContainer');

    // Select the main container which will flex each video and text container
    // NOTE: RENAME CONTAINER
    const wowText=document.querySelector('.cardTextContainer');

    // Create wow#, timestamp and full quote elements
    const wowNumber = document.createElement('p');
    const timeStamp= document.createElement('p');
    const wowQuote = document.createElement ('p');

    // Add a class to the paragraph holding the full quote
    wowQuote.classList.add("fullQuote");

    // Set the text content of each element to their respective properties in the object
    wowNumber.textContent=`Wow # : ${wowData[0].current_wow_in_movie}`;
    timeStamp.textContent=`Time : ${wowData[0].timestamp}`;
    wowQuote.textContent=`"${wowData[0].full_line}"`;

    //Find the video source URL and save to a varibale 
    const videoSource = wowData[0].video["1080p"];
     
    // Create video element element
    wowApp.generatedVideo = document.createElement('video');
    // Create the source element, which is the child of the video element
    wowApp.generateSource = document.createElement('source');
          
    // Set the attributes to make the video and controls appear
    wowApp.generateSource.setAttribute('src', videoSource);
    wowApp.generatedVideo.setAttribute('controls', 'controls');
          
    //Append working source to video
    wowApp.generatedVideo.append(wowApp.generateSource);
  
    //Append the text to the singleCardContainer
    singleCardContainer.append(wowNumber, timeStamp, wowQuote);

    // Append the video and singleTextContainer to the videoAndTextContainer
    videoAndTextContainer.append(wowApp.generatedVideo,singleCardContainer);

    // Append the videoAndTextContainer to the MAIN CONTAINER (update name when class is changed)
    wowText.append(videoAndTextContainer);

}
          
// Call the init method
wowApp.init(); 
