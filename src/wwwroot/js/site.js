const $ = (selector) => document.querySelector(selector)

const div = () => document.createElement("div")
const spanText = () => document.createElement("span")
const img = () => document.createElement("img")
const paragraph = () => document.createElement("p")
const removeChatRoomLoading = () => {
    $(".is-loading-screen").remove()
    $(".chat-bubbles").classList.remove("has-no-overflow")
}

const snackBar = $(".is-snackBar")

const snackBarHide = () => setTimeout(() => snackBar.classList.remove("show"), 1500)

const snackShake = () => snackBar.classList.add("connected")

const snackBarShow = (text) => {
    snackBar.childNodes[1].innerHTML = text
    setTimeout(() => {
        snackBar.classList.add("show")
        hideTimeout = setTimeout(() => {
            snackBarHide()
        }, 2000)
    }, 500)
}


const createRoomCard = (rooms) => {
    let room = div()
    room.classList.add("room")
    let parahOne = paragraph()
    parahOne.innerHTML = rooms.name + "<br>"
    parahOne.classList.add("has-white-color")
    let span = spanText()
    span.innerHTML = "Last message"
    span.classList.add("has-white-color", "has-small-font", "has-lighter-font")
    let parahTwo = paragraph()
    parahTwo.innerHTML = rooms.timeStamp
    parahTwo.classList.add("is-date", "has-opacity", "has-white-color")
    room.appendChild(parahOne)
    parahOne.appendChild(span)
    room.appendChild(parahTwo)
    return room
}

const createChatBubbleSelf = (chat) => {
    let msg = div()
    msg.setAttribute("data-id", chat.chatId)
    msg.classList.add("self", "is-message")
    let messageBody = div()
    messageBody.classList.add("is-message-body")
    let parah = paragraph()
    parah.innerText = chat.content
    parah.classList.add("has-white-color", "is-actual-message", "has-white-color")
    messageBody.appendChild(parah)
    msg.appendChild(messageBody)
    return msg
}

const createChatBubbleOther = (chat) => {
    let msg = div()
    msg.setAttribute("data-id", chat.chatId)
    msg.classList.add("other", "is-message")
    let profile = img()
    profile.classList.add("is-profile")
    profile.setAttribute("src", "https://i.pravatar.cc/300")
    let messageBody = div()
    messageBody.classList.add("is-message-body")
    let parah = paragraph()
    parah.innerText = chat.content
    parah.classList.add("has-white-color", "is-actual-message", "has-white-color")
    messageBody.appendChild(parah)
    msg.appendChild(profile)
    msg.appendChild(messageBody)
    return msg
}

// const showChatRoomLoading = () => {
//     $(".is-loading-screen").remove()
//     $(".chat-bubbles").classList.remove("has-no-overflow")
// }