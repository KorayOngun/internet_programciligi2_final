using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using emlakPortalı.ViewModel;
using emlakPortalı.Models;
namespace emlakPortalı.Auth
{
    public class uyeService
    {
        Database1Entities2 db = new Database1Entities2();
        public login UyeOturumAc(string info)
        {
            try
            {
                    string hesap = info.Split('½')[0];
                    string mail = info.Split('½')[1];
                    string parola = info.Split('½')[2];
                    string Token = "";
                    string karakterler = "1234567890qwertyuasdfghjklmnbvcxzASDFGHJKLZXCVBNMQWERTYUP";
                    var rnd = new Random();
                    for (int i = 0; i < 50; i++)
                    {
                        Token = Token + karakterler[rnd.Next(0, 57)];
                    }
                    if (hesap == "admin")
                    {
                        if (db.Admins.Where(s => s.adminMail == mail && s.adminPassword == parola).Count() > 0)
                        {
                            login uye = db.Admins.Where(s => s.adminMail == mail && s.adminPassword == parola).Select(x => new login()
                            {
                                id = x.adminId,
                                mail = x.adminMail,
                                password = x.adminPassword,
                                token = Token,        
                                role = "admin"
                            }).SingleOrDefault();
                            db.Admins.Where(x => x.adminMail == mail && x.adminPassword == parola).FirstOrDefault().adminToken = Token;
                            db.SaveChanges();
                            return uye;
                        }
                    }
                if (hesap == "uye")
                {
                    if (db.Users.Where(s => s.userMail == mail && s.userPassword == parola).Count() > 0)
                    {
                        login uye = db.Users.Where(s => s.userMail == mail && s.userPassword == parola).Select(x => new login()
                        {
                            id = x.userId,
                            name = x.userName,
                            mail = x.userMail,
                            password = x.userPassword,
                            token = Token,
                            role = "uye"
                        }).SingleOrDefault();

                        db.Users.Where(x => x.userMail == mail && x.userPassword == parola).FirstOrDefault().token = Token;
                        db.SaveChanges();
                        return uye;
                    }
                }
                return null;
            }
            catch (Exception)
            {
                return null;
            }
        
        }
    }
}