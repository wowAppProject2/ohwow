// Create a namespace object for our app
const wowApp={};

//Namespace the api info for the movieDB api
wowApp.apiKey = `7643abd5961e73d66a384e1b206bf3ec`;

wowApp.endPoint = `https://api.themoviedb.org/3/search/movie?`;

// define an init method to:  
wowApp.init=()=>{
    // call a method that will populate dropwon Menu
    wowApp.populateDropDown(); 
    // call a method that will add an event listener to our form element
    wowApp.movieClick();
    // Add event listener to watch list
    wowApp.toggleMovieList();
      // QuerySelect the form element
    wowApp.formSelect=document.querySelector('form');
}

// Open and close the wish list menu
wowApp.toggleMovieList=()=>{

    let toggleListStatus = true;
    const toggleListButton=document.querySelector('.watchListButton');
    toggleListButton.addEventListener('click', ()=>{
    const myWatchList=document.querySelector('.myWatchList')
        
        if(toggleListStatus===false){
            myWatchList.style.width = "0";
            myWatchList.style.height = "0";
            toggleListStatus = true;
        }

        else{
            myWatchList.style.width = "100vw";
            myWatchList.style.height = "auto";
            myWatchList.style.transition = ".3s ease-in";
            toggleListStatus = false;
        }

    })


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
        wowApp.moviePosterFromOwenApi = wowData[0].poster;
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
    wowApp.wowText=document.querySelector('.cardTextContainer');

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
    wowApp.generatedVideo.setAttribute('autoplay', 'autoplay');
          
    //Append working source to video
    wowApp.generatedVideo.append(wowApp.generateSource);
  
    //Append the text to the singleCardContainer
    singleCardContainer.append(wowNumber, timeStamp, wowQuote);

    // Append the video and singleTextContainer to the videoAndTextContainer
    videoAndTextContainer.append(wowApp.generatedVideo,singleCardContainer);

    // Append the videoAndTextContainer to the MAIN CONTAINER (update name when class is changed)
    wowApp.wowText.append(videoAndTextContainer);

    //Running function to populate poster, rating, title, and description
    wowApp.getRating(wowApp.userChoice);

}

//Pass movie choice to constructor, constructor finds the movie object
wowApp.getRating = (movieChoice) => {
    const urlObject = new URL(wowApp.endPoint)
    
    urlObject.search = new URLSearchParams({
        api_key:wowApp.apiKey,
        query:movieChoice
    });
    
    fetch(urlObject)
    .then( (response) => {
        console.log(response);
        return response.json();
    })
    .then( (jsonData) => {
        console.log(jsonData);

        //Filter array by movie title to find the right title get back movie

        wowApp.movieReturned = jsonData.results.filter( function(title) {
            return title.title == movieChoice
        });
        wowApp.movieHeader();
    });
}


// Use array # to pull title, poster, rating, and description

wowApp.movieHeader = () => {

// Create main container to hold all movie info
const movieHeaderContainer=document.createElement('div');
movieHeaderContainer.classList.add('movieHeaderContainer');

const removeMovieHeader=document.querySelector('.movieHeaderContainer');

// Once a new movie selected =, remove movie poster and text from previous choice
if(removeMovieHeader!==null){
    removeMovieHeader.remove();
}

//Create div to hold movie poster
const moviePosterContainer=document.createElement('div');
moviePosterContainer.classList.add('moviePosterContainer');

//Create div to hold movie info text
const movieTextContainer = document.createElement('div');
movieTextContainer.classList.add('movieTextContainer');

// Create lements for movie description, title and rating
let movieTitle = document.createElement('p');
let movieDescription = document.createElement('p');
let movieRating = document.createElement('p');
wowApp.watchListButton = document.createElement('button');
wowApp.watchListButton.classList.add('addMovieToList');

// Set elements to respective object properties

movieTitle.textContent = wowApp.movieReturned[0].title;
movieDescription.textContent= wowApp.movieReturned[0].overview;
movieRating.textContent=wowApp.movieReturned[0].vote_average;
wowApp.watchListButton.textContent="Add to watch list";


// Append text elements to movieHeaderTextContainer
movieTextContainer.append(movieTitle, movieDescription, movieRating, wowApp.watchListButton);

// Append moviePosterContainer and movieTextHeaderContainer to movieHeaderContainer
movieHeaderContainer.append(movieTextContainer);


//Add poster img to moviePosterContainer
const moviePoster = document.createElement('img');


moviePoster.src = wowApp.moviePosterFromOwenApi;
moviePoster.alt = `Poster of ${wowApp.movieReturned[0].title}`;

moviePoster.setAttribute('src', moviePoster.src);
moviePoster.setAttribute('alt', moviePoster.alt);

movieHeaderContainer.append(moviePosterContainer);
moviePosterContainer.append(moviePoster);
wowApp.wowText.append(movieHeaderContainer);

wowApp.addMovie();
}

// Adds movie poster and removal button to the watch list
wowApp.addMovie=()=>{

    // Select the UL from myWatchList
    const myWatchList = document.querySelector('.myWatchList');
    // Query select all the lists
    wowApp.allLists=document.querySelectorAll('li');
    
    // Add event listener to watch list button
    wowApp.watchListButton.addEventListener('click', ()=>{
        // Query the lists again to ensure the movie on screemn can't be added a second time, before the user changes movie selection
        wowApp.allLists=document.querySelectorAll('li');
        // Check to see if any lists (movies have been added) to the watch list
        if(wowApp.allLists.length===0){
            // If the list is empty, proceed with the following code:

            // Create li and image and paragraph element 
            //use randomNumber generator to generate id, save the id to variable
            let randomNumber = Math.floor(Math.random() *10000)
            wowApp.listItem = document.createElement('li');
            wowApp.listItem.classList.add('listItem');
            wowApp.listItem.setAttribute('id', randomNumber)

            const posterImage = document.createElement('img');
            wowApp.listRemoveButton = document.createElement('button');
            wowApp.listRemoveButton.classList.add('removeMovieFromList');
        
             // Set image attributes to poster path and title to button
            posterImage.src = wowApp.moviePosterFromOwenApi;
            posterImage.alt=`Poster of ${wowApp.userChoice}`;
            wowApp.listRemoveButton.textContent = "Remove from this list"
        
            posterImage.setAttribute('src', posterImage.src);
            posterImage.setAttribute('alt', posterImage.alt);
        
             //Append image to li
            wowApp.listItem.append(posterImage, wowApp.listRemoveButton);
            myWatchList.append(wowApp.listItem);    
          
        }

        else{
            // If list items exist, loop through the nodeList and check the users selection against the alt text of the images already in the list
            wowApp.allLists.forEach((item)=>{
                if(item.firstChild.alt!==`Poster of ${wowApp.userChoice}`){
                    // The movie is not in the the list yet. Proceed with the foolowing code:

                    let randomNumber = Math.floor(Math.random() *100000)
                    wowApp.listItem = document.createElement('li');
                    wowApp.listItem.classList.add('listItem');
                    wowApp.listItem.setAttribute('id', randomNumber)

      
                    const posterImage = document.createElement('img');
                    wowApp.listRemoveButton = document.createElement('button');
                    wowApp.listRemoveButton.classList.add('removeMovieFromList');
        
                    // Set image attributes to poster path and title to button
                    posterImage.src = wowApp.moviePosterFromOwenApi;
                    posterImage.alt=`Poster of ${wowApp.userChoice}`;
                    wowApp.listRemoveButton.textContent = "Remove from this list"
        
                    posterImage.setAttribute('src', posterImage.src);
                    posterImage.setAttribute('alt', posterImage.alt);
        
                    //Append image to li
                    wowApp.listItem.append(posterImage, wowApp.listRemoveButton);
                    myWatchList.append(wowApp.listItem); 
                 
                }

                else{

                    // Movie has already been added, alert the user
                    const alertDiv=document.createElement('div');
                    // Add a class to the created div
                    alertDiv.setAttribute('id', 'removeDiv');
                    // Add the text to be displayed in message
                    alertDiv.textContent="Movie in List";
                    // Select the dropdown div, where the message will be displayed
                    const dropdownDiv=document.querySelector('.movieDropdownContainer');
                    // Append the created div to the dropdown div
                    dropdownDiv.append(alertDiv);

                    // Set timeout function to display div and then remove it 
                    setTimeout(function () {
                        theId = document.querySelector('#removeDiv');
                        theId.remove();
                    }, 12000);

                }
            })
        }  
        wowApp.removeMovie();
    })   
}

// Removes a movie from watch list when its button is clicked
wowApp.removeMovie = () => {

// Query for all generated buttons
    wowApp.removeMovieButton = document.querySelectorAll('.removeMovieFromList');
    

// For each button open its node list too target the ID
    wowApp.removeMovieButton.forEach(item => {
        item.addEventListener('click', function(e) {
            const parentID = e.target.parentNode.id
            wowApp.deleteListItem = document.getElementById(parentID);

// As long as the list isn't empty delete the list item
            if(wowApp.deleteListItem !==null){
                wowApp.deleteListItem.remove();
            }
        })
    })
}

// Call the init method
wowApp.init(); 
