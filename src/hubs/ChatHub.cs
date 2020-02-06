using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using aspnetcoreapp.model;
using System.Linq;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }

        public async Task SendChat(string value, string groupName)
        {
            using (var db = new ChatContext())
            {
                var chatRoom = db.ChatRooms.Single(x => x.name == groupName);
                /*
                *   For now, we'll keep the UserId = 1 and TimeStamp to 2 Feb.
                *   Will be changed in the very future of course.
                *   
                */
                db.Add(new Chat { 
                    UserId = 1,
                    Content = value,
                    TimeStamp = "2 Feb",
                    ChatRoom = chatRoom
                });
                db.SaveChanges();
            }

            await Clients.Group(groupName).SendAsync("ReceiveMessageSelf", value);
        }
    }
}