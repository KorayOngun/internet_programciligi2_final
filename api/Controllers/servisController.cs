using emlakPortalı.Models;
using emlakPortalı.ViewModel;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;

namespace emlakPortalı.Controllers
{
    public class servisController : ApiController
    {
        Database1Entities2 db = new Database1Entities2();
        Sonuc s = new Sonuc();

        [HttpPost]
        [Route("api/userdogrulama")]
        public Sonuc UserDogrulama(UserView user)
        {
            if (db.Users.Where(x=>x.userMail==user.userMail && x.token==user.token  && x.userPassword==user.userPassword).Count() > 0)
            {
                s.sonuc = true;
            }
            else
            {
                s.sonuc = false;
            }
            return s;
        }
        [HttpPost]
        [Route("api/admindogrulama")]
        public Sonuc AdminDogrulama(AdminView admin)
        {
            if (db.Admins.Where(x => x.adminMail == admin.adminMail && x.adminToken == admin.adminToken && x.adminPassword==admin.adminPassword).Count() > 0)
            {
                s.sonuc = true;
            }
            else
            {
                s.sonuc = false;
            }
            return s;
        }
        [HttpPost]
        [Route("api/yenikayit")]
        public Sonuc YeniKayit(UserView user)
        {
            if (user.userMail.IndexOf('½')==-1 && user.userPassword.IndexOf('½') == -1 )
            {
                if (db.Users.Where(x => x.userName == user.userName || x.userMail == user.userMail).Count() < 1)
                {
                    try
                    {
                        Users u = new Users
                        {
                            userMail = user.userMail,
                            userName = user.userName,
                            userPassword = user.userPassword,
                            token = "",
                            adminIslem="true",
                            adminMessge="",
                        };
                        db.Users.Add(u);
                        db.SaveChanges();

                        s.mesaj = "islem tamam";
                        s.sonuc = true;
                    }
                    catch (Exception)
                    {
                        s.mesaj = "hatalı islem ";
                        s.sonuc = false;
                    }
                }
                else
                {
                    s.mesaj = "farklı kullanıcı adı/mail deneyin  ";
                    s.sonuc = false;
                }
                return s;
            }
            else
            {
                s.mesaj = "farklı kullanıcı adı/mail deneyin  ";
                s.sonuc = false;
            }
            return s;
        }
        [HttpPost]
        [Route("api/ilanyeni")]
        public Sonuc YeniIlan(IlanKayitView ilan)
        {
            if(db.Users.Where(x=>x.token==ilan.token && x.userMail == ilan.userMail && x.userPassword == ilan.userPassword && x.userId == ilan.userId).Count() > 0)
            {
                if (db.Users.Where(x => x.token == ilan.token && x.userMail == ilan.userMail && x.userPassword == ilan.userPassword && x.userId == ilan.userId).First().adminIslem!="true")
                {
                    s.mesaj = "ilan yetkiniz geçici süreliğine askıya alınmıştır";
                    s.sonuc = false;
                    return s;
                }
                Ilan i = new Ilan
                {
                    aciklama = ilan.aciklama,
                    baslik = ilan.baslik,
                    cepheler = ilan.cepheler,
                    ilanTipi = ilan.ilanTipi,
                    muhit = ilan.muhit,
                    ozellikler = ilan.ozellikler,
                    resimler = ilan.resimler,
                    userId = ilan.userId,
                    fiyat=ilan.fiyat,
                    esya=ilan.esya,
                    bulundugukat = ilan.bulundugukat,
                    durum = ilan.durum,
                    kat = ilan.kat,
                    sehir = ilan.sehir,
                    metrekare = ilan.metrekare,
                    katsayisi = ilan.katsayisi,
                    kredi = ilan.kredi,
                    ilandaMiAdmin = "true",
                    ilandaMiKullanici = "true",
                    userName = ilan.user
                };
                db.Ilan.Add(i);
                
                s.mesaj = "kayıt başarılı";
                s.sonuc = true;
                db.SaveChanges();
            }
            else
            {
                s.mesaj = "hata!!!";
                s.sonuc = false;
            }
            
            return s;
        }

        [HttpPost]
        [Route("api/hesapkurtarma")]
        public string HesapKurtarma(UserView u)
        {
            if (db.Users.Where(x=>x.userMail==u.userMail).Count()>0)
            {
                Random random = new Random();
                string dogrulama = "";
                for (int i = 0; i < 10; i++)
                {
                    dogrulama = dogrulama + random.Next(0, 10).ToString();
                }
                try
                {

                    MailMessage message = new MailMessage();
                    SmtpClient smtp = new SmtpClient();
                    message.From = new MailAddress("a@mail.com");//a@mail.com
                    message.To.Add(new MailAddress(u.userMail.ToString()));
                    message.Subject = "Kurtarma Kodunu başkalarıyla paylaşmayın";
                    message.Body = dogrulama;
                    db.Sifresifirla.Add(new Sifresifirla
                    {
                        mail = u.userMail,
                        yenilemeKodu = dogrulama
                    });
                    db.SaveChanges();
                    smtp.Port = 587;
                    smtp.Host = "smtp-mail.outlook.com";
                    smtp.EnableSsl = true;
                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = new NetworkCredential("a@mail.com", "a@mail.com Sifresi");
                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtp.Send(message);
                    return "tamamlandı";
                }
                catch (Exception)
                {

                    try
                    {
                        MailMessage message = new MailMessage();
                        SmtpClient smtp = new SmtpClient();
                        message.From = new MailAddress("a@mail.com");//a@mail.com
                        message.To.Add(new MailAddress(u.userMail.ToString()));
                        message.Subject = "Kurtarma Kodunu başkalarıyla paylaşmayın";
                        message.Body = dogrulama;
                        db.Sifresifirla.Add(new Sifresifirla
                        {
                            mail = u.userMail,
                            yenilemeKodu = dogrulama
                        });
                        smtp.Port = 587;
                        smtp.Host = "	smtp.live.com";
                        smtp.EnableSsl = true;
                        smtp.UseDefaultCredentials = false;
                        smtp.Credentials = new NetworkCredential("a@mail.com", "a@mail.com sifresi");
                        smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                        smtp.Send(message);
                        return "tamamlandı";
                    }
                    catch (Exception)
                    {
                        return "hata";
                    }
                }
            }
            else
            {
                return "hata";
            }
        }
        [HttpPost]
        [Route("api/sifresifirla")]
        public Sonuc SifreSifirla(YeniSifre sfre)
        {
            if (db.Sifresifirla.Where(x=>x.yenilemeKodu==sfre.dogrulama && x.mail==sfre.mail).Count()>0)
            {
                var u = db.Users.Where(x => x.userMail == sfre.mail).First();
                u.userPassword = sfre.yeniSifre;
                var eskiSifreIStek = db.Sifresifirla.Where(x => x.yenilemeKodu == sfre.dogrulama && x.mail == sfre.mail).First();
                db.Sifresifirla.Remove(eskiSifreIStek);
                db.SaveChanges();
                s.mesaj = "işlem tamam";
                s.sonuc = true;
            }
            else
            {
                s.mesaj = "hata";
                s.sonuc = false;
            }
            return s;
        }
        [HttpPost]
        [Route("api/adminekle")]
        public Sonuc NewAdmin(AdminView admin)
        {
            if (admin.adminMail.IndexOf("½") == -1 && admin.adminPassword.IndexOf("½") == -1)
            {
                try
                {
                    if (db.Admins.Where(x => x.adminId == 1 && x.adminMail == admin.adminMail && x.adminPassword == admin.adminPassword && x.adminToken == admin.adminToken).Count() > 0)
                    {
                        Admins a = new Admins
                        {
                            adminMail = admin.newadminMail,
                            adminPassword = admin.newadminPassword,
                        };
                        if (db.Admins.Where(x => x.adminMail == admin.newadminMail).Count() < 1)
                        {
                            db.Admins.Add(a);
                            s.mesaj = "işlem başarılı";
                            s.sonuc = true;
                            db.SaveChanges();
                        }
                        else
                        {
                            s.mesaj = "bu mail kullanımda";
                            s.sonuc = false;
                        }

                    }
                    else
                    {
                        s.mesaj = "işlem başarısız";
                        s.sonuc = false;
                    }
                }
                catch (Exception)
                {
                    s.mesaj = "hata!!!";
                    s.sonuc = false;
                }
                return s;
            }
            else
            {
                s.mesaj = "işlem başarısız";
                s.sonuc = false;
                return s;
            }
        }
        [HttpGet]
        [Route("api/ilankayitbyid/{id}")]
        public ilanView IlanbyId(int id)
        {
            return db.Ilan.Where(x => x.ilanId == id).Select(x => new ilanView
            {
                aciklama = x.aciklama,
                baslik = x.baslik,
                cepheler = x.cepheler,
                ilanTipi = x.ilanTipi,
                ozellikler = x.ozellikler,
                resimler = x.resimler,
                muhit = x.muhit,
                fiyat = x.fiyat,
                durum = x.durum,
                sehir = x.sehir,
                kat = x.kat,
                bulundugukat = x.bulundugukat,
                katsayisi = x.katsayisi,
                kredi = x.kredi,
                esya = x.esya,
                metrekare = x.metrekare,
                userId = x.userId,
                user=x.userName
            }).FirstOrDefault();
        }
       
        [HttpPost]
        [Route("api/ilankayitbyuserid")]
        public List<ilanView> IlanbyUserId(Users us)
        {
            if (db.Users.Where(x=>x.userId==us.userId&&x.userPassword==us.userPassword&&x.token==us.token&&x.userMail==us.userMail).Count()>0)
            {
                return db.Ilan.Where(x => x.userId == us.userId).Select(x => new ilanView
                {
                    aciklama = x.aciklama,
                    baslik = x.baslik,
                    userId = x.userId,
                    cepheler = x.cepheler,
                    ilanTipi = x.ilanTipi,
                    ozellikler = x.ozellikler,
                    resimler = x.resimler,
                    muhit = x.muhit,
                    fiyat = x.fiyat,
                    durum = x.durum,
                    sehir = x.sehir,
                    kat = x.kat,
                    ilanId=x.ilanId,
                     
                }).ToList();
            }
            return null;
        }

        [HttpPost]
        [Route("api/mesajgonder")]
        public Sonuc MesajGonder(MesajView mesaj)
        {
            try
            {
                db.Message.Add(new Message
                {
                    mesaj = mesaj.mesaj,
                    gonderen = mesaj.gonderen,
                    alan = mesaj.alan,
                    tarih = DateTime.Now.ToString()
                });
                db.SaveChanges();
                s.mesaj = "işlem tamam";
                s.sonuc = true;
                
            }
            catch (Exception)
            {
                s.mesaj = "hatalı işlem";
                s.sonuc = false;
            }
            return s;
        }
        [HttpPost]
        [Route("api/mesajcek")]
        public List<MesajView> MesajCek(Users users)
        {
            return db.Message.Where(x => x.alan == users.userName || x.gonderen == users.userName)
                .Select(x=>new MesajView
                {
                    alan = x.alan,
                    gonderen=x.gonderen
                }).ToList();
        }
        [HttpPost]
        [Route("api/sohbetgoruntule")]
        public List<MesajView> SohbetGoruntule(MesajView mesaj)
        {
            return db.Message.Where(x => x.alan == mesaj.alan && x.gonderen == mesaj.gonderen  ||  x.gonderen == mesaj.alan && x.alan == mesaj.gonderen)
                .Select(x => new MesajView
                {
                    gonderen = x.gonderen,
                    alan=x.alan,
                    mesaj=x.mesaj,
                    tarih=x.tarih,
                    messageId=x.messageId
                }).ToList();
        }
        [HttpPost]
        [Route("api/ilanduzenle")]
        public Sonuc IlanDuzenle(IlanKayitView ılanKayit)
        {
            if (db.Users.Where(x=>x.userId==ılanKayit.userId && x.userMail == ılanKayit.userMail && x.token == ılanKayit.token && x.userPassword == ılanKayit.userPassword).Count() > 0)
            {
                var ılan = db.Ilan.Where(x => x.ilanId == ılanKayit.ilanId).First();
                ılan.aciklama = ılanKayit.aciklama;
                ılan.baslik = ılanKayit.baslik;
                ılan.cepheler = ılanKayit.cepheler;
                ılan.ozellikler = ılanKayit.ozellikler;
                ılan.ilanTipi = ılanKayit.ilanTipi;
                ılan.muhit = ılanKayit.muhit;
                ılan.bulundugukat = ılanKayit.bulundugukat;
                ılan.fiyat = ılanKayit.fiyat;
                ılan.kredi = ılanKayit.kredi;
                db.SaveChanges();
                s.mesaj = "işlem Tamam";
                s.sonuc = true;
                return s;
            }
            s.mesaj = "hata!!!";
            s.sonuc = false;
            return s;
        }
        [HttpPost]
        [Route("api/ilansil")]
        public Sonuc IlanSil(IlanKayitView ılanKayit)
        {
            if (db.Users.Where(x => x.userId == ılanKayit.userId && x.userMail == ılanKayit.userMail && x.token == ılanKayit.token && x.userPassword == ılanKayit.userPassword).Count() > 0)
            {
                var ılan = db.Ilan.Where(x => x.ilanId == ılanKayit.ilanId && x.userId==ılanKayit.userId).First();
                db.Ilan.Remove(ılan);
                s.mesaj = "işlem Tamam";
                s.sonuc = true;
                db.SaveChanges();
                return s;
            }
            s.mesaj = "hata!!!";
            s.sonuc = false;
            return s;
        }
        [HttpPost]
        [Route("api/adminsil")]
        public Sonuc AdminSil(AdminView admin)
        {
          
                if (db.Admins.Where(x => x.adminId == 1 && x.adminMail == admin.adminMail && x.adminPassword == admin.adminPassword && x.adminToken == admin.adminToken).Count() > 0)
                {
                    var silinecekHesap = db.Admins.Where(x => x.adminMail == admin.newadminMail).First();
                    db.Admins.Remove(silinecekHesap);
                    db.SaveChanges();
                }
                else
                {
                    s.mesaj = "işlem başarısız";
                    s.sonuc = false;
                }
            return s;
        }
        [HttpPost]
        [Route("api/adminmesajkullanıcı")]
        public Sonuc AdminMesajKullanici(AdminUser admin)
        {
            try
            {
                if (db.Admins.Where(x => x.adminId == 1 && x.adminMail == admin.adminMail && x.adminPassword == admin.adminPassword && x.adminToken == admin.adminToken).Count() > 0)
                {
                    var kayit = db.Users.Where(x=>x.userId==admin.userId).First();
                    kayit.adminIslem = admin.adminIslem;
                    kayit.adminMessge = admin.adminMessge;
                    s.mesaj = "işlem başarılı";
                    s.sonuc = true;
                    db.SaveChanges();
                    return s;
                }
                else
                {
                    s.mesaj = "işlem başarısız";
                    s.sonuc = false;
                }
            }
            catch (Exception)
            {
                s.mesaj = "hata!!!";
                s.sonuc = false;
            }
            return s;
        }
        [HttpGet]
        [Route("api/anasayfa")]
        public List<ilanView> AnaSayfa()
        {
            return db.Ilan
                    .Select(x => new ilanView
                    {
                        ilanId = x.ilanId,
                        aciklama = x.aciklama,
                        baslik = x.baslik,
                        ilanTipi = x.ilanTipi,         
                        resimler = x.resimler,
                        fiyat = x.fiyat,
                        durum = x.durum,
                        sehir = x.sehir,
                        kat = x.kat
                    }).ToList();
        }
        [HttpPost]
        [Route("api/fotoekle")]
        public Sonuc FotoEkle(fotoModel foto)
        {
               
                string yol = System.Web.Hosting.HostingEnvironment.MapPath("~/Fotolar/");
                string data = foto.data;
                string base64 = data.Substring(data.IndexOf(',') + 1);
                base64 = base64.Trim('\0');
                byte[] imgbytes = Convert.FromBase64String(base64);
                string dosyaAdi = foto.ilanId  + foto.sira + foto.uzanti.Replace("image/", ".");
                using (var ms = new MemoryStream(imgbytes, 0, imgbytes.Length))
                {
                    Image img = Image.FromStream(ms, true);
                    img.Save(yol + dosyaAdi);
                }
                s.mesaj = "eklendi";
                s.sonuc = true;
                return s;
        }
        [HttpPost]
        [Route("api/adminliste")]
        public List<AdminView> Adminler(AdminView admin)
        {
            if (db.Admins.Where(x => x.adminId == 1 && x.adminMail == admin.adminMail && x.adminPassword == admin.adminPassword && x.adminToken == admin.adminToken).Count() > 0)
            {
                return db.Admins.Select(x => new AdminView
                {
                    adminId = x.adminId,
                    adminMail = x.adminMail,

                }).ToList();
            }
            return null;
             
        }
        [HttpPost]
        [Route("api/uyeliste")]
        public List<UserView> Uyeler(AdminView admin)
        {
            if (db.Admins.Where(x => x.adminId == admin.adminId && x.adminMail == admin.adminMail && x.adminPassword == admin.adminPassword && x.adminToken == admin.adminToken).Count() > 0)
            {
                return db.Users.Select(x => new UserView
                {
                    userMail = x.userMail,
                    userName = x.userName,
                    userId = x.userId,
                    adminIslem=x.adminIslem,
                    adminMessge = x.adminMessge,
                }).ToList();
            }
            return null;
        }

    }
}
