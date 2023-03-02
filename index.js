import { catsData } from '/data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

//To get an user which selected of radios 
emotionRadios.addEventListener('change', highlightCheckedOption)

//close meme image or gif button
memeModalCloseBtn.addEventListener('click', closeModal)

//To execute and generate a meme of image or gif
getImageBtn.addEventListener('click', renderCat)

//This handling with user selected radio's color (e.g happy , sad) and highligh to red
function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    //To clear the user previous selected radio (remove highlight(class))
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    //To (add a highlight(class)) to the parent's div of which radio're selected 
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

//Close image or gif button (if showing the image or gif , it will be display:'flex' , if set display:none that means to remove) 
function closeModal(){
    memeModal.style.display = 'none'
}

//To execute generate a meme of image or gif
function renderCat(){
    //It will handle the return of getSingleCatObject function
    const catObject = getSingleCatObject()
    //To setup the layout and print it out
    memeModalInner.innerHTML =  `
        <img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >
        `
        //To set the div display , none -> flex
    memeModal.style.display = 'flex'
}

//To return an object array're filter , if only one return directly . if more than one it will return random by the filted array.length , e.g(if have 2 meme are filted , the array.length will be 2) , so that assign the length to Math.random , it will only random 0 or 1 then return catsArray[randomNumber]  
function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    
    if(catsArray.length === 1){
        return catsArray[0]
    }
    else{
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}

//To handle with user selcted's value
function getMatchingCatsArray(){
    //if the radio're selected , execute following:     
    if(document.querySelector('input[type="radio"]:checked')){
        //assign the selcted value(name) to selectedEmotion
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        //to check is that selected the Animated GIFs only (if yes : true , if not : false)
        const isGif = gifsOnlyOption.checked
        //To check the selcted value and compare with data.js , if match assign to matchingCatsArray
        const matchingCatsArray = catsData.filter(function(cat){
            //if selcted Animated GIFs only , return match(filted array) and which condition of data.js isGif:true
            
            
            /*
            There 2 condition return is actually return back to matchingCatsArray , and then matchingCatsArray return out of the function
            */
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            //if no selcted Animated GIFs only , just return the array match the value directly 
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingCatsArray 
    }  
}

//To get an data.js object array & avoid the repeat emotionTag then assign to emotionArray[]
function getEmotionsArray(cats){
    const emotionsArray = []    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

//To generate the radios emotionTag and div layout
function renderEmotionsRadios(cats){
        
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

//To get the object array from data.js
renderEmotionsRadios(catsData)




