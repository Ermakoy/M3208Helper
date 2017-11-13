function FolderClass(childFolders, childFiles, self) {
    this.parentFolderID = self[0]["fields"].parent_folder;
    this.childFolders = childFolders;
    this.childFiles = childFiles;
    this.self = self[0];
}

function setBackspace() {
    $('.sidebar').prepend("<div class=\"backspace\">\n" +
        "            <i class=\"backspaceIcon\"></i>\n" +
        "            <div class=\"folderName\">Вернуться назад</div>\n" +
        "        </div>")
}

function renderTemplate(name, data) {
    var template = document.getElementById(name).innerHTML;

    for (var property in data) {
        if (data.hasOwnProperty(property)) {
            var search = new RegExp('{' + property + '}', 'g');
            template = template.replace(search, data[property]);
        }
    }
    return template;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(document).ready(function () {
    var folderParam = getParameterByName('folder');
    var fileParam = getParameterByName('file');
    if (folderParam === null) {
        var url_pattern = "http://127.0.0.1:8000/api/get-root";
        $.getJSON(url_pattern, function (data) {
            currentFolder = new FolderClass(null, $.parseJSON(data.child_files), $.parseJSON(data.folder));
            url_pattern = "http://127.0.0.1:8000/api/get-folder/" + currentFolder.self.pk;
            setBackspace();
        });
        render(url_pattern);
    } else {
        if (fileParam === null) {
            url_pattern = "http://127.0.0.1:8000/api/get-folder/" + folderParam.substr(1, folderParam.length - 2);
        } else {

        }
        render(url_pattern);
    }
});

function render(url_pattern) {
    $.getJSON(url_pattern, function (data) {
        currentFolder = new FolderClass($.parseJSON(data.child_folders), $.parseJSON(data.child_files), $.parseJSON(data.folder));
        var sidebarContent = $(".sidebar__content");
        var content = $(".content");
        sidebarContent.empty();
        content.empty();
        for (var i in currentFolder.childFolders) {
            html = renderTemplate('template-folders', {
                name: currentFolder.childFolders[i]['fields'].name,
                id: currentFolder.childFolders[i].pk
            });
            sidebarContent.append(html);
        }
        for (i in currentFolder.childFiles) {
            html = renderTemplate('files', {
                name: currentFolder.childFiles[i]['fields'].name,
                link: "http://127.0.0.1:8000/media/" + currentFolder.childFiles[i]['fields'].file,
                date: currentFolder.childFiles[i]['fields'].date_creation
            });
            content.append(html);
        }
        if (currentFolder.parentFolderID === null) {
            $('.backspace').css("display", "none");
        }
        else {
            if ($('.backspace').length) {
                $('.backspace').css("display", "flex");
            } else {
                setBackspace();
            }
        }
        history.pushState(null, null, "?folder=\"" + currentFolder.self.pk + "\"");
    });
}

$('.sidebar').on('click', '.folder', function (event) {
    element = event.currentTarget;
    id = $(element)[0].dataset.id;
    render("http://127.0.0.1:8000/api/get-folder/" + id);
});
$('.sidebar').on('click', '.backspace', function () {
    render("http://127.0.0.1:8000/api/get-folder/" + currentFolder.parentFolderID);
});
$('.appendFolder').on('click', function () {
    let folderName = prompt('Укажите название папки');
    $.get({
        url: "http://127.0.0.1:8000/api/append-folder/",
        data: {
            name: folderName,
            parent_folder: currentFolder.self.pk
        },
        success: function (json) {
            console.log('1');
            render('http://127.0.0.1:8000/api/get-folder/' + currentFolder.self.pk);
        },
        error: function (xhr, errmsg, err) {
            console.log('fuck');
        }
    })
});