using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace aspnetcoreapp.model
{
    public class ChatContext : DbContext
    {
        public DbSet<ChatRoom> ChatRooms { get; set; }

        public DbSet<Chat> Chats { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("Data Source=Chat.db");
    }

    public class ChatRoom
    {
        public long ChatRoomId { get; set; }
        public string name { get; set; }
        public string TimeStamp { get; set; }
        public List<Chat> Chats { get; set; }
    }

    public class Chat
    {
        public long ChatId { get; set; }
        public long UserId { get; set; }
        public string Content { get; set; }
        public string TimeStamp { get; set; }
        public ChatRoom ChatRoom { get; set; }
    }
}
