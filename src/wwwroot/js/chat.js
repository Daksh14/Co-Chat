"use strict";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: retryContext => {
            if (retryContext.elapsedMilliseconds < 60000) {
                snackBarShow("Reconnecting..")
                return Math.random() * 10000;
            } else {
                snackBarShow("Failed to connect, please check your internet connection")
                return null;
            }
        }
    })
    .build();

connection.onreconnected((connectionId) => {
    snackBarShow("Connected!")
    snackShake()
})

// connection.on("ReceiveMessage", (message) => {
//     let chatbubbleSelf = createChatBubbleOther({
//         content: value
//     })
//     $(".chat-bubbles").appendChild(chatbubbleSelf)
// });


connection.on("ReceiveMessageSelf", (message) => {
    let chatbubbleSelf = createChatBubbleSelf({
        content: message
    })
    $(".chat-bubbles").appendChild(chatbubbleSelf)
});


connection.start().then(() => {
    fetch("/Index?handler=AllRooms", {
        method: 'POST',
        headers: new Headers({ 'MY-XSRF-TOKEN': $('input[name="__RequestVerificationToken"]').value }),
    }).then(data => data.text()).then(res => {
        $(".semi-circle-spin").remove()
        JSON.parse(res).forEach((roomsObj) => {
            let room = createRoomCard(roomsObj)
            room.addEventListener("click", () => {
                joinGroup(roomsObj.name, roomsObj.chatRoomId)
            })
            $(".room-container").appendChild(room)
        })
    })

}).catch((err) => {
    return console.error(err.toString());
});

let group;

let joinGroup = (name, id) => {
    connection.invoke("AddToGroup", name)
        .catch((err) => {
            console.error(err.toString())
        })
    group = name
    removeChatRoomLoading()
    $(".js--room-name-container").innerText = name
    let data = new FormData();
    data.append('roomId', id);
    fetch("/Index?handler=AllChats", {
        method: 'POST',
        body: data,
        headers: new Headers({ 'MY-XSRF-TOKEN': $('input[name="__RequestVerificationToken"]').value }),
    }).then(data => data.text()).then(res => {
        $(".is-chat-textbox").removeAttribute("disabled")
        JSON.parse(res).forEach((chatObj) => {
            // let userId = chat.userId
            // let timestamp = chat.timeStamp
            if (chatObj.userId === 1) {
                let chatbubbleSelf = createChatBubbleSelf(chatObj)
                $(".chat-bubbles").appendChild(chatbubbleSelf)
            } else {
                let chatbubbleOther = createChatBubbleOther(chatObj)
                $(".chat-bubbles").appendChild(chatbubbleOther)
            }
        })
    })
}

$(".is-chat-textbox").addEventListener("keyup", (e) => {
    let textarea = $(".is-chat-textbox")
    if (e.keyCode == 13 && !e.shiftKey) {
        e.preventDefault();
        const value = event.target.value
        connection.invoke("SendChat", value, group)
            .catch((err) => {
                console.error(err.toString())
            })
        
        let chatbubbleSelf = createChatBubbleSelf({
            content: value
        })
        $(".chat-bubbles").appendChild(chatbubbleSelf)
        textarea.value = ''
    }
});