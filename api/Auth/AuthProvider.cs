using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System.Security.Claims;
using System.Threading.Tasks;

namespace emlakPortalı.Auth
{
    public class AuthProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            //context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" }); // Farklı domainlerden istek sorunu yaşamamak için
            //Burada kendi authentication yöntemimizi belirleyebiliriz.Veritabanı bağlantısı vs...
            var uyeServis = new uyeService();
            var uye = uyeServis.UyeOturumAc(context.UserName);
            AuthenticationTicket ticket;
            if (uye != null)
            {

                if (uye.role=="admin")
                {
                        var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                        identity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
                        identity.AddClaim(new Claim(ClaimTypes.Role, "admin"));
                        identity.AddClaim(new Claim(ClaimTypes.PrimarySid, uye.id.ToString()));
                        AuthenticationProperties propert = new AuthenticationProperties(new Dictionary<string, string>
                    {
                        { "uyeId", uye.id.ToString() },
                        { "uyeAdi", uye.mail },
                         {"tokenL",uye.token },
                            {"yetki","admin" },
                          {"sonuc","true" }
                   });
                         ticket = new AuthenticationTicket(identity, propert);
                        context.Validated(ticket);
                }
                if (uye.role=="uye")
                {
                        var identity = new ClaimsIdentity(context.Options.AuthenticationType);

                        identity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
                        identity.AddClaim(new Claim(ClaimTypes.Role, "uye"));
                        identity.AddClaim(new Claim(ClaimTypes.PrimarySid, uye.id.ToString()));
                    AuthenticationProperties propert = new AuthenticationProperties(new Dictionary<string, string>
                    {
                        { "uyeId", uye.id.ToString() },
                        { "uyeAdi", uye.mail },
                            {"tokenL",uye.token },
                              {"hesapAdi",uye.name },
                              {"yetki","uye" },
                            {"sonuc","true" }
                   });
                         ticket = new AuthenticationTicket(identity, propert);
                        context.Validated(ticket);
                }
           


                
            }
            else
            {
                context.SetError("Geçersiz istek", "Hatalı kullanıcı bilgisi");
            }



        }
        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }
    }
}