//var ruta = "http://ca41e2dbd8ca.ngrok.io/api/";
//var ruta = "http://localhost/vp/public/api/";
var ruta = "http://victoriapro.mx/api/";
$(document).ready(function(){

    if(document.title != 'login')
    {
        $.ajax({
            url: ruta + 'user',
            data: 
            {
                api_token : window.localStorage.getItem('api_token')
            },
            success: function (data) {
                //console.log(JSON.stringify(data));
                $("#menu_nombre_usuario").text(data.name+' '+data.last_name1+' '+data.last_name2);
            },
            error: function (e) {
                console.log(JSON.stringify(e));
            }
        });
        
    }
});
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    loadingOn()
    if (document.title == "login")
    {
        if (window.localStorage.getItem("api_token") != null)
        {
            window.location = "index_service.html";
        }else{ loadingOff(); }
    }else{ 
        FirebasePlugin.getToken(function(fcmToken) {
            //console.log(fcmToken);
            $.ajax({
                type:'POST',
                url: ruta + 'update_fcm_token',
                data: 
                {
                    api_token : window.localStorage.getItem('api_token'),
                    fcm_token : fcmToken
                },
                success: function (data) {
                    //console.log(JSON.stringify(data));
                    
                },
                error: function (e) {
                    //console.log(JSON.stringify(e));
                }
            });
        }, function(error) {
            //console.error(error);
        });
        FirebasePlugin.onMessageReceived(function(message) {
            //console.log(JSON.stringify(message));
            if(message.messageType === "notification"){
                if(message.tap){
                    //Background
                    window.localStorage.setItem("service_id", message.service_id);
                    window.location = 'show_service.html';
                }else{
                    //Foreground
                    swal({
                        html: true,
                        title: message.title,
                        text: message.body,
                        confirmButtonText: 'Abrir',
                        showCancelButton: true,
                        cancelButtonText: 'Cancelar'
                    }, function () {
                        window.localStorage.setItem("service_id", message.service_id);
                        window.location = 'show_service.html';
                    });
                }
            }
            
        }, function(error) {
            console.error(error);
        });
        loadingOff();
    }
}
function loadingOn()
{
    $("#loading").fadeIn();
}
function loadingOff()
{
    $("#loading").fadeOut();
}
function cerrarSesion()
{
    window.localStorage.clear();
    window.location = "index.html";
}
function toastSuccess(message)
{
    window.plugins.toast.showWithOptions({
        message: message,
        duration: "short", // 2000 ms
        position: 'center',
        styling: {
          opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
          backgroundColor: '#2ECC71', // make sure you use #RRGGBB. Default #333333
          textColor: '#FDFEFE', // Ditto. Default #FFFFFF
          textSize: 20.5, // Default is approx. 13.
          cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
          horizontalPadding: 20, // iOS default 16, Android default 50
          verticalPadding: 16 // iOS default 12, Android default 30
        }
    });
}
function toastError(message)
{
    window.plugins.toast.showWithOptions({
        message: message,
        duration: "short", // 2000 ms
        position: 'center',
        styling: {
          opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
          backgroundColor: '#C0392B', // make sure you use #RRGGBB. Default #333333
          textColor: '#FDFEFE', // Ditto. Default #FFFFFF
          textSize: 20.5, // Default is approx. 13.
          cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
          horizontalPadding: 20, // iOS default 16, Android default 50
          verticalPadding: 16 // iOS default 12, Android default 30
        }
    });
}