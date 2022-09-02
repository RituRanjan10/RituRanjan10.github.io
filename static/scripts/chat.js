var str = "You are the world's best professional therapist and counselor who has uplifted people from all walks of life. You have been a therapist for 30+ years, where you have provided extremely professional, situation-specific, and actionable advice that is sure to make any individual feel better about any problem they ever have. You will now be in conversation with a person. Make sure to leverage your experience and be extremely professional to help the person with any problem they have. Just as you've done in past, go to the root of the problem with thought-provoking questions and then find out the best solutions and guide the person who has come to seek your professional help. Your smart mind tries to understand the person better first and let them express themselves. Then side by side, you use your intellect to help them in the best possible way by coming to the solutions and asking them specific questions about their incident! You never repeat your dialogues. You always sound natural, and never repeat any dialogues at all. Your replies are exactly what the best therapist on the planet would say, and you always sound helpful and friendly instead of repetitive.\nYou never asked a person to seek professional help. This is because you realized that YOU are their professional help, and they came here to talk to you. You provide the best possible solutions since you are the best therapist on Planet Earth!!\n\nYou stop the completion of the request of API as soon as you generate your own text. You never try to generate the user's text. You only generate one dialogue and then stop. You never generate the user's reply. When you are aware of the user's problem, you find out the best solutions and guide the person who has come to seek your professional help. You are extremely natural in your conversations and you never repeat your sentences.\n\nIf user asks for resources, provide them with real working links of websites.\n\nAdd a '{|};' after every reply."


const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
function pull(string) {
  const reply = openai.createCompletion({
    model: "text-davinci-002",
    prompt: string,
    temperature: 0,
    max_tokens: 200,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  }).then(function(result) {
    return result["data"]["choices"][0]["text"]
  })}
// Collapsible
var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");

        var content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }

    });
}

function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
}

// Gets the first message
function firstBotMessage() {
    let firstMessage = "How's it going?"
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

    let time = getTime();

    $("#chat-timestamp").append(time);
    document.getElementById("userInput").scrollIntoView(false);
}

firstBotMessage();

// Retrieves the response
function getHardResponse(userText) {
    let botResponse = pull(userText);
    console.log(botResponse)
    let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
    $("#chatbox").append(botHtml);

    document.getElementById("chat-bar-bottom").scrollIntoView(true);

}

//Gets the text text from the input box and processes it
function getResponse() {
    let userText = $("#textInput").val();

    if (userText == "") {
        userText = "I love Code Palace!";
    }

    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    setTimeout(() => {
        getHardResponse(userText);
    }, 1000)

}

// Handles sending text via button clicks
function buttonSendText(sampleText) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    //Uncomment this if you want the bot to respond to this buttonSendText event
    // setTimeout(() => {
    //     getHardResponse(sampleText);
    // }, 1000)
}

function sendButton() {
    getResponse();
}

function heartButton() {
    buttonSendText("Heart clicked!")
}

// Press enter to send a message
$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        getResponse();
    }
});