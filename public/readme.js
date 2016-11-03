
config 中要配置socket网址
server 中要配置头像网址
jquery.main 

 1458 socket.on('chat',
 1496 handle_incoming

716 // 发送图片
            $("#sendImage").on('change', function() {
              alert("send image!!!")
             
                if (this.files.length != 0) {
                  var file = this.files[0],
                    reader = new FileReader();
                  if (!reader) {
                    this.value = '';
                    return;
                  };
                  reader.onload = function(e) {
                    alert(e.target.result);
                    var msg = e.target.result;
                    if (msg !== "") {
                  main.parent().find( "#progressbar-char" ).progressbar( "option", "value", 0 );
                  socket.emit('message', { 'user': user, 'msg': msg }, function (data) {
                    var recv = JSON.parse(data);
                    append_msg_me(msg, main, recv.date);
                    // FIXME
                    // Set dialog position
                    main.dialog( "option", "position", { my: "right bottom", at: "right top-3", of: "#user-button-"+id, collision: "flip, none" });
                  });
                }
               };
                  reader.readAsDataURL(file);
                };
              

            });

540  690

因为跨域要求 index.html 中iframe 改为http://cloudflow.cymmetrik.com:9090
搜索/images/ 前面加了路径
43-45 1276行增加路径public
438行增加：autofill();
561行增加
function autofill(){
      alert("autofill");
      var current_user=document.getElementById("cloud").contentWindow.api.auth.get_current_user();
      if (current_user.username != "guest"){

        var my_name=document.getElementById("name");
        var my_email=document.getElementById("email");
        my_name.value = current_user.fullname;
        my_email.value = current_user.email;

      }else{
        var my_name=document.getElementById("name");
        my_name.value = "请先登录cloudflow!!!";
      }
    }

1021行增加

              <div class='_box'>选择图片…</div>\
              </div>\
              <div class='none'>\
              <input id='sendImage' type='file' value='image'/>\
              </div>\
            </div>\
          </div>\
          <script type='text/javascript'>\
          jQuery(function () {\
          $('._box').click(function () {\
          $('#sendImage').click();\
          });\
          });\
          </script>"
          
style 第8行增加
._box 
{ 
width: 66px; 
height: 20px; 
background-color: #b7f1aa; 
background-image: url(images/bg.png); 
background-repeat: no-repeat; 
background-position: 0 0; 
background-attachment: scroll; 
line-height: 20px; 
text-align: center; 
color: #888b87; 
cursor: pointer; 
} 
.none 
{ 
width: 0px; 
height: 0px; 
display: none; 
} 