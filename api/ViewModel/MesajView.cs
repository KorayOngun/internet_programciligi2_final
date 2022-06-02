using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace emlakPortalı.ViewModel
{
    public class MesajView
    {
        public int messageId { get; set; }
        public string gonderen { get; set; }
        public string alan { get; set; }
        public string mesaj { get; set; }
        public string tarih { get; set; }
    }
}