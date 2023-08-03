let sendBtn = document.getElementById('send-btn')
let body = document.querySelector('body')
let chatContainer = document.querySelector('.chat-container')
let userInput = document.getElementById('chat-input')
let userText = null;
let API_KEY = config.API_KEY;
let createElement = (html, className) =>{
    let chatDiv = document.createElement('div');
    chatDiv.classList.add('chat', className)
    chatDiv.innerHTML = html
    return chatDiv;
}
const copyRes = (copybtn) => {
    let responseTextElm = copybtn.parentElement.querySelector('p');
    navigator.clipboard.writeText(responseTextElm.textContent).then(()=>{
        alert("Successfully Copied to ClipBoard")
    }).catch(() => {alert("Smt went wrong lmao")})


}

const getChatRes = async(incoming) => {
    let api_url = 'https://api.openai.com/v1/completions';
    let pElm = document.createElement('p')
    let requestOptions = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${API_KEY}`
        },
        body : JSON.stringify({
            model: "text-davinci-003",
            prompt: userText,
            max_tokens: 2048,
            temperature: 0.2,
            top_p : 1,
            n:1,
            stop : null
        })
    }

    try {
        const response = await (await fetch(api_url, requestOptions)).json();
        pElm.textContent = response.choices[0].text.trim();
        console.log(response.choices[0].text)
    }catch(error){
        console.log(error)
    }
    document.querySelector('.typing-animation').remove();
    incoming.querySelector('.chat-details').append(pElm)
}
function showTypingAni(){
    let html = `
    <div class="chat-content">
        <div class="chat-details">
            <img src="./img/Jarvis.png" alt="Jarvis" class="profileImg">
            <div class="typing-animation">
                <div class="dot dot1"></div>
                <div class="dot dot2"></div>
                <div class="dot dot3"></div>
            </div>
        </div>
        <span onclick="copyRes(this)"><i class="fa-solid fa-copy"></i></span>
        </div>
`
let incoming = createElement(html, 'incoming')
chatContainer.append(incoming)
getChatRes(incoming);

}

function createUserInput(){
     userText = userInput.value.trim()
     if(!userText){
        return
     }
    
    let html = `  
            <div class="chat-content">
                <div class="chat-details">
                    <img src="./img/User.jpeg" alt="user" class="profileImg" style="border-radius: 3em;">
                    <p></p>
                </div>
            </div>
    `
    let outgoing = createElement(html, 'outgoing');
    outgoing.querySelector('p').textContent = userText;
    chatContainer.appendChild(outgoing)
    setTimeout(showTypingAni, 500)

    

   /* let container = document.createElement('div')
    container.classList.add('chat-container');
    body.append(container)
    let outgoing = document.createElement('div')
    outgoing.classList.add('outgoing')
    outgoing.classList.add('chat')
    container.append(outgoing)
    let chatContent = document.createElement('div')
    chatContent.classList.add('chat-content')
    outgoing.append(chatContent)
    let chatDetails = document.createElement('div');
    chatDetails.classList.add('chat-details')
    chatContent.append(chatDetails)
    let userProfile = document.createElement('img')
    userProfile.src = './img/User.jpeg'
    userProfile.classList.add('profileImg')
    userProfile.style.borderRadius = '3em';
    chatContent.append(userProfile)
    let userInput = document.getElementById('chat-input')
    let userMsg = document.createElement('p')
    userMsg.innerHTML = userInput.value;
    chatContent.append(userMsg)
    */
}


sendBtn.addEventListener('click', createUserInput)