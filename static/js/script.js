var helper=function(e){function n(r){if(t[r])return t[r].exports;var l=t[r]={i:r,l:!1,exports:{}};return e[r].call(l.exports,l,l.exports,n),l.l=!0,l.exports}var t={};return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=1)}([function(e,n,t){"use strict";function r(){$(".sidebar").prepend("<div class='backspace'>\n            <div class='folderName'>Вернуться назад</div>\n        </div>")}function l(e,n){var t=document.getElementById(e).innerHTML;for(var r in n)if(n.hasOwnProperty(r)){var l=new RegExp("{"+r+"}","g");t=t.replace(l,n[r])}return t}function i(e,n){n||(n=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var t=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(n);return t?t[2]?decodeURIComponent(t[2].replace(/\+/g," ")):"":null}function o(e){$.getJSON(e,function(e){s=new a($.parseJSON(e.child_folders),$.parseJSON(e.child_files),$.parseJSON(e.folder));var n=$(".sidebar__content"),t=$(".content");n.empty(),t.empty();var i=!0,o=!1,c=void 0;try{for(var p,f=s.childFolders[Symbol.iterator]();!(i=(p=f.next()).done);i=!0){var d=p.value,u=l("template-folders",{name:d.fields.name,id:d.pk});n.append(u)}}catch(e){o=!0,c=e}finally{try{!i&&f.return&&f.return()}finally{if(o)throw c}}var v=!0,h=!1,y=void 0;try{for(var g,m=s.childFiles[Symbol.iterator]();!(v=(g=m.next()).done);v=!0){var x=g.value,k=x.fields.name;-1!==k.indexOf(".")&&(k=k.substring(0,k.indexOf(".")));var b=l("files",{name:k,link:"http://127.0.0.1:8000/media/"+x.fields.file,date:x.fields.date_creation});t.append(b)}}catch(e){h=!0,y=e}finally{try{!v&&m.return&&m.return()}finally{if(h)throw y}}null===s.parentFolderID?$(".backspace").css("display","none"):$(".backspace").length?$(".backspace").css("display","flex"):r(),$(".appendFiles__form").css("display","none"),$(".appendFiles").css("display","flex"),history.pushState(null,null,"?folder='"+s.self.pk+"'")})}var a=t(2),s=void 0;e.exports={currentFolder:function(){return s},init:function(){var e=i("folder"),n=i("file");if(null===e){var t="http://127.0.0.1:8000/api/get-root";$.getJSON(t,function(e){s=new a(null,$.parseJSON(e.child_files),$.parseJSON(e.folder)),t="http://127.0.0.1:8000/api/get-folder/"+s.self.pk,r()}),o(t)}else null===n&&o("http://127.0.0.1:8000/api/get-folder/"+e.substr(1,e.length-2))},render:o}},function(e,n,t){"use strict";e.exports=function(){var e=t(0),n=t(3);$(document).ready(function(){e.init(),n.init()})}()},function(e,n,t){"use strict";e.exports=function(e,n,t){this.parentFolderID=t[0].fields.parent_folder,this.childFolders=e,this.childFiles=n,this.self=t[0]}},function(e,n,t){"use strict";var r=t(0).render,l=t(0).currentFolder;e.exports={init:function(){$(".sidebar").on("click",".folder",function(e){var n=e.currentTarget,t=$(n)[0].dataset.id;r("http://127.0.0.1:8000/api/get-folder/"+t)}),$(".sidebar").on("click",".backspace",function(){r("http://127.0.0.1:8000/api/get-folder/"+l().parentFolderID)}),$(".appendFolder").on("click",function(){var e=prompt("Укажите название папки");""!==e&&null!==e&&$.post({url:"http://127.0.0.1:8000/api/create-folder/",data:{name:e,parent_folder:l().self.pk},success:function(){r("http://127.0.0.1:8000/api/get-folder/"+l().self.pk)}})}),$(".sendFiles").on("click",function(e){e.preventDefault();var n=$(".files")[0].files,t={};t.folder=l().self.pk,t.files=n,$.ajax({url:"http://127.0.0.1:8000",type:"POST",data:t,success:function(){console.log("success")}})}),$(".appendFiles").on("click",function(){$(".appendFiles").css("display","none"),$(".appendFiles__form").css("display","flex")}),$(".upload_files").on("click",function(e){var n=$(".files").files;if(e.stopPropagation(),e.preventDefault(),void 0!==n){var t=new FormData;$.each(n,function(e,n){t.append(e,n)}),t.append("folder",l().self.pk),$.ajax({url:"./submit.php",type:"POST",data:t,cache:!1,dataType:"json",processData:!1,contentType:!1,success:function(e,n,t){void 0===e.error?console.log("Всё прошло нормально"):console.log("КОД КРАСНЫЙ КОД КРАСНЫЙ")},error:function(e,n,t){console.log("ОШИБКА AJAX запроса: "+n,e)}})}})}}}]);