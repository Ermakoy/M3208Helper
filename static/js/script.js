var parentId, rootId;

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
    var queryParam = getParameterByName('folder');
    if (queryParam === null) {
        var url_pattern = "http://127.0.0.1:8000/api/get-root";
        $.getJSON(url_pattern, function (data) {
            currentFolder = new FolderClass(null, $.parseJSON(data.child_files), $.parseJSON(data.folder));
            rootId = currentFolder.self.pk;
            url_pattern = "http://127.0.0.1:8000/api/get-folder/" + rootId;
            setBackspace();
        });
        render(url_pattern);
    } else {
        url_pattern = "http://127.0.0.1:8000/api/get-folder/" + queryParam.substr(1, queryParam.length - 2);
        render(url_pattern);
    }
});

function render(url_pattern) {
    $.getJSON(url_pattern, function (data) {
        currentFolder = new FolderClass($.parseJSON(data.child_folders), $.parseJSON(data.child_files), $.parseJSON(data.folder));
        console.log(currentFolder.childFiles);
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
                link: "http://127.0.0.1:8000/api/media/" + currentFolder.childFiles[i].pk,
                date: currentFolder.childFiles[i]['fields'].date_creation
            });
            content.append(html);
        }
        if (currentFolder.self.pk === rootId) {
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