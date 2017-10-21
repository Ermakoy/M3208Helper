var parentId, rootId;

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
    console.log(queryParam)
    if (queryParam === null) {
        var url_pattern = "http://127.0.0.1:8000/api/get-root";
        $.getJSON(url_pattern, function (data) {
            var child_foldersJSON = $.parseJSON(data.folder);
            rootId = child_foldersJSON[0].pk;
            url_pattern = "http://127.0.0.1:8000/api/get-folder" + rootId;
            parentId = child_foldersJSON[0]['fields'].parent_folder;
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
        var child_foldersJSON = $.parseJSON(data.child_folders);
        var child_filesJSON = $.parseJSON(data.child_files);
        var folder = $.parseJSON(data.folder);
        parentId = folder[0]["fields"].parent_folder;
        var sidebarContent = $(".sidebar__content");
        sidebarContent.empty();
        for (var i in child_foldersJSON) {
            html = renderTemplate('template-folders', {
                name: child_foldersJSON[i]['fields'].name,
                id: child_foldersJSON[i].pk
            });
            sidebarContent.append(html);
        }
        var content = $(".content");
        content.empty();
        for (i in child_filesJSON) {
            link = "http://127.0.0.1:8000/api/media/" + child_filesJSON[i].pk;
            date = child_filesJSON[i]['fields'].date_creation;
            html = renderTemplate('files', {
                name: child_filesJSON[i]['fields'].name,
                link: link,
                date: date
            });
            content.append(html);
        }
        if (folder[0].pk === rootId) {
            $('.backspace').css("display", "none");
        }
        else {
            if ($('.backspace').length) {
                $('.backspace').css("display", "flex");
            } else {
                setBackspace();
            }
        }
    });
}

$('.sidebar').on('click', '.folder', function (event) {
    element = event.currentTarget;
    id = $(element)[0].dataset.id;
    render("http://127.0.0.1:8000/api/get-folder/" + id);
});
$('.sidebar').on('click', '.backspace', function () {
    render("http://127.0.0.1:8000/api/get-folder/" + parentId);
});
