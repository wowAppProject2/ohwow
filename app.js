// Create a namespace object for our app
const wowApp = {};

//Namespace the api info for the movieDB api
wowApp.apiKey = `7643abd5961e73d66a384e1b206bf3ec`;

wowApp.endPoint = `https://api.themoviedb.org/3/search/movie?`;

// define an init method to:  
wowApp.init = () => {
    // call a method that will populate dropwon Menu
    wowApp.populateDropDown();
    // call a method that will add an event listener to our form element
    wowApp.getMovie();
    // Add event listener to watch list
    wowApp.toggleMovieList();
    // QuerySelect the form element
    wowApp.formSelect = document.querySelector('form');
    //call a method to play the hover wow sound
    wowApp.hoverSound();
}

// Define hoverSound method
wowApp.hoverSound = () => {
    // Save sound to be played to audio variable
    const audio = new Audio("./assets/wowHoverSound.mp3")
    const audioElement = document.querySelector('audio');
    const mouthImg = document.querySelector('.mouthImgContainer');

    // Attach event listener to the image
    // On click, audio will play and iumage width will transition
    mouthImg.addEventListener('click', (audioElement) => {
        audio.play();
        mouthImg.style.width = "180px";
        mouthImg.style.transition = "width 1s ease-in-out";
    })
}

// toggleMovieList method, which will oprn and close the wish list menu
wowApp.toggleMovieList = () => {

    let toggleListStatus = true;
    const toggleListButton = document.querySelector('.watchListButton');
    toggleListButton.addEventListener('click', () => {
        const myWatchList = document.querySelector('.myWatchList')

        if (toggleListStatus === false) {
            myWatchList.style.width = "0";
            myWatchList.style.height = "0";
            myWatchList.style.border = "none";
            myWatchList.style.transition = ".3s ease-in";
            toggleListStatus = true;
        }

        else {
            myWatchList.style.width = "35vw";
            myWatchList.style.border = "2px solid black";
            myWatchList.style.borderLeft = "none";
            myWatchList.style.height = "auto";
            myWatchList.style.transition = ".3s ease-in";
            toggleListStatus = false;
        }
    })
}

// Method that populates the dropdown menu with API call to the Owen Wilson Wow API
wowApp.populateDropDown = () => {
    fetch("https://owen-wilson-wow-api.onrender.com/wows/movies")
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            // Error handling if response has no data to return
            else {
                throw new Error('Wow there is nothing here');
            }
        })
        .then((wowData) => {
            // Populate dropdown menu using array returned from API call
            // select the select element
            const movieSelector = document.querySelector('#moviesDropDown');
            // Use a forEach loop to populate each option element
            wowData.forEach((movies) => {
                // Create the option element
                const movieChoice = document.createElement('option');
                // Set the textContent equal to the item in the array
                movieChoice.textContent = movies;
                // Append each option element to the select element
                movieSelector.append(movieChoice);
            })

        })
        .catch((error) => {
            // Alert user with error message if data does not exist
            alert(error);
        })
}

// define movieClick method 
wowApp.getMovie = () => {

    // Add an event listener to the form element
    wowApp.formSelect = addEventListener('change', (e) => {

        // Select h3 message and remove from HTML
        const grettingMessage = document.querySelector('h3');

        if (grettingMessage !== null) {
            grettingMessage.remove();
        }
        // Save the innerText of the option clicked to a property in the namespace object
        wowApp.userChoice = e.target.value;

        // Call the getWows function, passing the wowApp.userChoice property as an argument
        wowApp.getWows(wowApp.userChoice);
    })
}

// Define getWows method that takes the wowApp.userChoice as a paramter and returns video/text properties from a fetch made to the Owen Wilson Wow API
wowApp.getWows = movieWow => {
    fetch(`https://owen-wilson-wow-api.onrender.com/wows/random?movie=${movieWow}`)
        .then((response) => {
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
            // Call the createCard method;pass wowData as argumnet
            wowApp.createCard(wowData);
        })
        .catch((error) => {
            // Alert user with error message if data does not exist
            alert(error);
        })
}

//Define the creatCard method that will populate the HTML with a video and information for the video displayed, which will take the object returned from the API call as a paramter
wowApp.createCard = (wowData) => {

    // Create div to hold video and text content 
    const videoAndTextContainer = document.createElement('div');
    // Add a class to the container holding the video and text content
    videoAndTextContainer.classList.add('videoTextContainer');

    // Create div to hold all text content
    const singleCardContainer = document.createElement('div');
    // Add a class to the container holding all the text content
    singleCardContainer.classList.add('singleCardContainer');

    // Select the main container which will flex each video and text container
    // NOTE: RENAME CONTAINER
    wowApp.wowText = document.querySelector('.cardTextContainer');

    // Create wow#, timestamp, full quote elements and replay button
    const wowNumber = document.createElement('p');
    const timeStamp = document.createElement('p');
    const wowQuote = document.createElement('p');
    const replayButtonEl = document.createElement('button');

    // Add a class to the paragraph holding the full quote and replay button
    wowQuote.classList.add("fullQuote");
    replayButtonEl.classList.add('replayButton');

    // Set the text content of each element to their respective properties in the object
    wowNumber.textContent = `Wow # : ${wowData[0].current_wow_in_movie}`;
    timeStamp.textContent = `Time : ${wowData[0].timestamp}`;
    wowQuote.innerHTML = `Full Line: <br>"${wowData[0].full_line}"`;
    replayButtonEl.textContent = "Replay Wow";

    //Find the video source URL and save to a varibale 
    const videoSource = wowData[0].video["1080p"];

    // Create video element element
    wowApp.generatedVideo = document.createElement('video');
    // Create the source element, which is the child of the video element
    wowApp.generateSource = document.createElement('source');

    // Set the attributes to make the video and controls appear
    wowApp.generateSource.setAttribute('src', videoSource);
    // wowApp.generatedVideo.setAttribute('controls', 'disablepictureinpicture');
    wowApp.generatedVideo.setAttribute('autoplay', 'autoplay');

    //Append working source to video
    wowApp.generatedVideo.append(wowApp.generateSource);

    //Append the text to the singleCardContainer
    singleCardContainer.append(wowNumber, timeStamp, wowQuote, replayButtonEl);

    // Append the video and singleTextContainer to the videoAndTextContainer
    videoAndTextContainer.append(wowApp.generatedVideo, singleCardContainer);

    // Append the videoAndTextContainer to the MAIN CONTAINER (update name when class is changed)
    wowApp.wowText.append(videoAndTextContainer);

    //Call the method to populate poster, rating, title, and description
    wowApp.getRating(wowApp.userChoice);

    // Define a methoid that will replay the video appended to the HTML
    wowApp.replayVideo = () => {
        let video = document.querySelector('video');
        video.play();
    }

    // Event listener which will trigger the video to be replayed
    replayButtonEl.addEventListener('click', wowApp.replayVideo)

    // Call the replayVideo method
    wowApp.replayVideo();

}

//Define getRating method which takes the users movie choice as a paramter and makes an API call to the movieD
wowApp.getRating = (movieChoice) => {
    //Pass movie choice and name spaced movieDB endpoint to constructor to build new URL
    const urlObject = new URL(wowApp.endPoint)
    urlObject.search = new URLSearchParams({
        api_key: wowApp.apiKey,
        query: movieChoice
    });
    // Make fetch call to movieDB API
    fetch(urlObject)
        .then((response) => {
          
            return response.json();
        })
        .then((jsonData) => {
            //Filter array by movie title to return the user's movie choice
            wowApp.movieReturned = jsonData.results.filter(function (title) {
                return title.title == movieChoice
            });
            // Call movieHeader method that will append object returned from API call
            wowApp.movieHeader();
        });
}

// Define movieHeader method that will create an image (movie poster) and movie information and appened to the HTML
wowApp.movieHeader = () => {

    // Create main container to hold all movie info
    const movieHeaderContainer = document.createElement('div');
    movieHeaderContainer.classList.add('movieHeaderContainer');

    // Select the movieHeaderContainer which will be used to remove it once a new choice is made
    const removeMovieHeader = document.querySelector('.movieHeaderContainer');

    // Once a new movie selected =, remove movie poster and text from previous choice
    if (removeMovieHeader !== null) {
        removeMovieHeader.remove();
        const removeVideoTextContainer = document.querySelector('.videoTextContainer');
        removeVideoTextContainer.remove();
    }

    //Create div to hold movie poster
    const moviePosterContainer = document.createElement('div');
    moviePosterContainer.classList.add('moviePosterContainer');

    //Create div to hold movie info text
    const movieTextContainer = document.createElement('div');
    movieTextContainer.classList.add('movieTextContainer');

    // Create elements for movie description, title, rating and add to watch list button
    let movieTitle = document.createElement('p');
    let movieDescription = document.createElement('p');
    let movieRating = document.createElement('p');
    wowApp.watchListButton = document.createElement('button');
    wowApp.watchListButton.classList.add('addMovieToList');
    movieTitle.classList.add('movieTitle');

    // Set elements to respective object properties
    movieTitle.textContent = wowApp.movieReturned[0].title;
    movieDescription.textContent = wowApp.movieReturned[0].overview;
    movieRating.textContent = `${wowApp.movieReturned[0].vote_average} / 10`;
    wowApp.watchListButton.textContent = "Add to watch list";


    // Append text elements to movieHeaderTextContainer
    movieTextContainer.append(movieTitle, movieDescription, movieRating, wowApp.watchListButton);

    // Append moviePosterContainer and movieTextHeaderContainer to movieHeaderContainer
    movieHeaderContainer.append(movieTextContainer);

    //Add poster img to moviePosterContainer
    const moviePoster = document.createElement('img');

    // Set the image src and alt attributes
    moviePoster.src = wowApp.moviePosterFromOwenApi;
    moviePoster.alt = `Poster of ${wowApp.movieReturned[0].title}`;

    moviePoster.setAttribute('src', moviePoster.src);
    moviePoster.setAttribute('alt', moviePoster.alt);

    // Append elements to the HTML
    movieHeaderContainer.append(moviePosterContainer);
    moviePosterContainer.append(moviePoster);
    wowApp.wowText.append(movieHeaderContainer);

    wowApp.addMovie();
}

// Define addMovie method that will add an image to the user's watch list once a button is clicked
wowApp.addMovie = () => {

    // Select the UL from myWatchList
    const myWatchList = document.querySelector('.myWatchList');
  
    // Add event listener to watch list button
    wowApp.watchListButton.addEventListener('click', () => {
         // Query select all the lists
        wowApp.allLists = document.querySelectorAll('li');

        // Use spread to create an array from the list item nodeList 
        wowApp.allListsArr = [...wowApp.allLists];
        
        // Check if wish list is populated
        if (wowApp.allLists.length >= 0) {
            
            // Filter allListsArr and return if the image alt matches the uses's choice
            const checkMovies = wowApp.allListsArr.filter((item) => {
                return item.firstChild.alt === `Poster of ${wowApp.userChoice}`;
            });

            // The movie is not in the the list yet. Proceed with the foolowing code:
            if (checkMovies.length === 0) {
              
                // Generate a random number, create list item and create a class for the list item
                let randomNumber = Math.floor(Math.random() * 100000)
                wowApp.listItem = document.createElement('li');
                wowApp.listItem.classList.add('listItem');
                // Use the random mumber as the list items ID
                wowApp.listItem.setAttribute('id', randomNumber)

                // Create imagge and button elements
                const posterImage = document.createElement('img');
                wowApp.listRemoveButton = document.createElement('button');
                wowApp.listRemoveButton.classList.add('removeMovieFromList');

                // Set image attributes to poster path and title to button
                posterImage.src = wowApp.moviePosterFromOwenApi;
                posterImage.alt = `Poster of ${wowApp.userChoice}`;
                wowApp.listRemoveButton.textContent = "Remove"

                posterImage.setAttribute('src', posterImage.src);
                posterImage.setAttribute('alt', posterImage.alt);

                //Append image to li
                wowApp.listItem.append(posterImage, wowApp.listRemoveButton);
                myWatchList.append(wowApp.listItem);

                // Display message when movie is Added:
                wowApp.alertDiv = document.createElement('div');
                // Add a id to the created div
                wowApp.alertDiv.setAttribute('id', 'removeDiv');
                // Add a class to the div
                wowApp.alertDiv.classList.add("messageAlertAdd");
                // Add the text to be displayed in message
                wowApp.alertDiv.textContent = "Movie Added";
                // Select the dropdown div, where the message will be displayed
                wowApp.dropdownDiv = document.querySelector('.movieTextContainer');
                // Append the created div to the dropdown div
                wowApp.dropdownDiv.append(wowApp.alertDiv);

                // Timer function to display then remove message to user
                setTimeout(function () {
                    const divToRemove = document.querySelector('#removeDiv');
                    divToRemove.remove();
                }, 2000);

            }

            else {
                // If filter returns an array with an item, movie already exists in user's watch list - alert user:

                wowApp.alertDiv = document.createElement('div');
                // Add an id to the created div
                wowApp.alertDiv.setAttribute('id', 'removeDiv');
                // Add a class to the div
                wowApp.alertDiv.classList.add("messageAlertRemove");
                // Add the text to be displayed in message
                wowApp.alertDiv.textContent = "Movie in List";
                // Select the dropdown div, where the message will be displayed
                wowApp.dropdownDiv = document.querySelector('.movieTextContainer');
                // Append the created div to the dropdown div
                wowApp.dropdownDiv.append(wowApp.alertDiv);

                // Set timeout function to display div and then remove it 
                setTimeout(function () {
                    const divToRemove = document.querySelector('#removeDiv');
                    divToRemove.remove();
                }, 2000);
            }
        }
        // Call method that will remove the movie from the user's wactch list
        wowApp.removeMovie();
    })
}

// Define removeMovie method that will remove a movie from watch list on button click
wowApp.removeMovie = () => {

    // Query for all generated buttons
    wowApp.removeMovieButton = document.querySelectorAll('.removeMovieFromList');

    // For each button, add an event listener
    wowApp.removeMovieButton.forEach(item => {
        item.addEventListener('click', function (e) {
            // Using the event object, find the value of the ID for it's parent node - the list item
            const parentID = e.target.parentNode.id
            //Select the list associated with that ID
            wowApp.deleteListItem = document.getElementById(parentID);

            // As long as the list isn't empty delete the list item
            if (wowApp.deleteListItem !== null) {
                wowApp.deleteListItem.remove();
            }
        })
    })
}

// Call the init method
wowApp.init(); 