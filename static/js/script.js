var helper=function(e){function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}var t={};return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=1)}([function(e,n,t){"use strict";function r(){$(".sidebar").prepend("<div class='backspace'>\n            <div class='folderName'>Вернуться назад</div>\n        </div>")}function i(e,n){var t=document.getElementById(e).innerHTML;for(var r in n)if(n.hasOwnProperty(r)){var i=new RegExp("{"+r+"}","g");t=t.replace(i,n[r])}return t}function l(e,n){n||(n=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var t=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(n);return t?t[2]?decodeURIComponent(t[2].replace(/\+/g," ")):"":null}function a(e){$.getJSON(e,function(e){s=new o($.parseJSON(e.child_folders),$.parseJSON(e.child_files),$.parseJSON(e.folder));var n=$(".sidebar__content"),t=$(".content");n.empty(),t.empty();var l=!0,a=!1,c=void 0;try{for(var p,d=s.childFolders[Symbol.iterator]();!(l=(p=d.next()).done);l=!0){var f=p.value,u=i("template-folders",{name:f.fields.name,id:f.pk});n.append(u)}}catch(e){a=!0,c=e}finally{try{!l&&d.return&&d.return()}finally{if(a)throw c}}var v=!0,h=!1,y=void 0;try{for(var g,m=s.childFiles[Symbol.iterator]();!(v=(g=m.next()).done);v=!0){var x=g.value,b=x.fields.name;-1!==b.indexOf(".")&&(b=b.substring(0,b.indexOf(".")));var k=i("files",{name:b,link:"http://127.0.0.1:8000/media/"+x.fields.file,date:x.fields.date_creation});t.append(k)}}catch(e){h=!0,y=e}finally{try{!v&&m.return&&m.return()}finally{if(h)throw y}}null===s.parentFolderID?$(".backspace").css("display","none"):$(".backspace").length?$(".backspace").css("display","flex"):r(),$(".appendFiles__form").css("display","none"),$(".appendFiles").css("display","flex"),history.pushState(null,null,"?folder='"+s.self.pk+"'")})}var o=t(2),s=void 0;e.exports={currentFolder:function(){return s},init:function(){var e=l("folder"),n=l("file");if(null===e){var t="http://127.0.0.1:8000/api/get-root";$.getJSON(t,function(e){s=new o(null,$.parseJSON(e.child_files),$.parseJSON(e.folder)),t="http://127.0.0.1:8000/api/get-folder/"+s.self.pk,r()}),a(t)}else null===n&&a("http://127.0.0.1:8000/api/get-folder/"+e.substr(1,e.length-2))},render:a}},function(e,n,t){"use strict";e.exports=function(){var e=t(0),n=t(3);$(document).ready(function(){e.init(),n.init()})}()},function(e,n,t){"use strict";e.exports=function(e,n,t){this.parentFolderID=t[0].fields.parent_folder,this.childFolders=e,this.childFiles=n,this.self=t[0]}},function(e,n,t){"use strict";var r=t(0).render,i=t(0).currentFolder;e.exports={init:function(){$(".sidebar").on("click",".folder",function(e){var n=e.currentTarget,t=$(n)[0].dataset.id;r("http://127.0.0.1:8000/api/get-folder/"+t)}),$(".sidebar").on("click",".backspace",function(){r("http://127.0.0.1:8000/api/get-folder/"+i().parentFolderID)}),$(".appendFolder").on("click",function(){var e=prompt("Укажите название папки");""!==e&&null!==e&&$.get({url:"http://127.0.0.1:8000/api/append-folder/",data:{name:e,parent_folder:i().self.pk},success:function(){r("http://127.0.0.1:8000/api/get-folder/"+i().self.pk)}})}),$(".appendFiles").on("click",function(){$(".appendFiles").css("display","none"),$(".appendFiles__form").css("display","flex")})}}}]);