var helper=function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t,n){"use strict";function r(){$(".sidebar").prepend("<div class='backspace'>\n            <div class='folderName'>Вернуться назад</div>\n        </div>")}function o(e,t){var n=document.getElementById(e).innerHTML;for(var r in t)if(Object.prototype.hasOwnProperty.call(t,r)){var o=new RegExp("{"+r+"}","g");n=n.replace(o,t[r])}return n}function i(e){var t=window.location.href,n=e.replace(/[\[\]]/g,"\\$&"),r=new RegExp("[?&]"+n+"(=([^&#]*)|&|#|$)").exec(t);return r?r[2]?decodeURIComponent(r[2].replace(/\+/g," ")):"":null}function a(e){var t=o("template-folders",{name:e.name,id:e.id});$(".sidebar__content").append(t)}function l(e){var t=e.name;-1!==t.indexOf(".")&&(t=t.substring(0,t.indexOf(".")));var n=o("files",{name:t,link:"http://127.0.0.1:8000/media/"+e.file,date:e.date_creation});$(".content").append(n)}function s(e){$.getJSON(e,function(e){d=new c(e.child_folders,e.files,{id:e.id,name:e.name,parentID:e.parent_folder});$(".sidebar__content").empty();$(".content").empty(),d.childFolders.forEach(a),d.files.forEach(l),null===d.parentFolderID?$(".backspace").css("display","none"):$(".backspace").length?$(".backspace").css("display","flex"):r(),$(".appendFiles__form").css("display","none"),$(".appendFiles").css("display","flex"),history.pushState(null,null,"?folder='"+d.self.id+"'")})}var c=n(2),d=void 0;e.exports={currentFolder:function(){return d},init:function(){var e=i("folder"),t=i("file");if(null===e){var n="http://127.0.0.1:8000/storage/api/root/";$.getJSON(n,function(e){d=new c(null,e.files,{id:e.id,name:e.name,parentID:e.parent_folder}),n="http://127.0.0.1:8000/storage/api/folder/"+d.self.id+"/",r()}),s(n)}else null===t&&s("http://127.0.0.1:8000/storage/api/folder/"+e.substr(1,e.length-2)+"/")},render:s,getCookie:function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),r=0;r<n.length;r+=1){var o=jQuery.trim(n[r]);if(o.substring(0,e.length+1)===e+"="){t=decodeURIComponent(o.substring(e.length+1));break}}return t}}},function(e,t,n){"use strict";e.exports=function(){var e=n(0),t=n(3);$(document).ready(function(){e.init(),t.init()})}()},function(e,t,n){"use strict";e.exports=function(e,t,n){this.parentFolderID=n.parentID,this.childFolders=e,this.files=t,this.self=n}},function(e,t,n){"use strict";var r=n(0),o=r.render,i=r.currentFolder,a=r.getCookie;e.exports={init:function(){$(".sidebar").on("click",".folder",function(e){var t=e.currentTarget,n=$(t)[0].dataset.id;o("http://127.0.0.1:8000/storage/api/folder/"+n+"/")}),$(".sidebar").on("click",".backspace",function(){o("http://127.0.0.1:8000/storage/api/folder/"+i().parentFolderID+"/")}),$(".appendFolder").on("click",function(){var e=prompt("Укажите название папки");if(""!==e&&null!==e){var t=a("csrftoken");$.ajaxSetup({beforeSend:function(e,n){/^(GET|HEAD|OPTIONS|TRACE)$/i.test(n.type)||e.setRequestHeader("X-CSRFToken",t)}}),$.post({url:"http://127.0.0.1:8000/storage/api/folder/create/",data:{name:e,parent_folder:i().self.id},success:function(){o("http://127.0.0.1:8000/storage/api/folder/"+i().self.id+"/")}})}}),$(".appendFiles").on("click",function(){$(".appendFiles").css("display","none"),$(".appendFiles__form").css("display","flex")}),$(".sendFiles").on("click",function(e){e.preventDefault();var t=new FormData;t.append("folder",i().self.id);var n=Array.from($(".files")[0].files),r=!0,l=!1,s=void 0;try{for(var c,d=n[Symbol.iterator]();!(r=(c=d.next()).done);r=!0){var p=c.value;t.append("files",p)}}catch(e){l=!0,s=e}finally{try{!r&&d.return&&d.return()}finally{if(l)throw s}}var f=a("csrftoken");$.ajaxSetup({beforeSend:function(e,t){/^(GET|HEAD|OPTIONS|TRACE)$/i.test(t.type)||e.setRequestHeader("X-CSRFToken",f)}}),$.ajax({url:"http://127.0.0.1:8000/storage/api/upload/",data:t,method:"POST",processData:!1,contentType:!1,success:function(){o("http://127.0.0.1:8000/storage/api/folder/"+i().self.id+"/")}})})}}}]);