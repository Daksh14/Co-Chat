using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using aspnetcoreapp.model;

namespace aspnetcoreapp.Pages
{
    [BindProperties]
    public class IndexModel : PageModel
    {
        public string Message { get; set; }

        private readonly ILogger<IndexModel> _logger;


        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }
        public void OnPost()
        {
            @ViewData["message"] = Message;
        }
        public IActionResult OnPostAllRooms()
        {
            using (var db = new ChatContext())
            {
                var roomsData = db.ChatRooms.Select(x => x).ToList();
                return new JsonResult(roomsData);
            }
        }
        public IActionResult OnPostAllChats(long roomId)
        {
            using (var db = new ChatContext())
            {
                var chatData = db.Chats
                .Where(x => x.ChatRoom.ChatRoomId == roomId)
                .ToList();
                return new JsonResult(chatData);
            }
        }
    }
}
