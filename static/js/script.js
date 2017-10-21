var parentId;
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

$('header').on('click', function () {
    var url_pattern = "http://127.0.0.1:8000/api/get-root";
    $.getJSON(url_pattern, function (data) {
        var child_foldersJSON = $.parseJSON(data.folder);
        parentId = child_foldersJSON[0]['fields'].parent_folder;
        for (i in child_foldersJSON) {
            html = renderTemplate('template-folders', {
                name: child_foldersJSON[0]['fields'].name,
                id: child_foldersJSON[0].pk
            });
            $('.sidebar__content').append(html);
        }
    });
    $('.sidebar').prepend("<div class=\"backspace\">\n" +
        "            <i class=\"backspaceIcon\"></i>\n" +
        "            <div class=\"folderName\">Вернуться назад</div>\n" +
        "        </div>")
});

$('.sidebar').on('click', '.folder', function (event) {
    element = event.currentTarget;
    id = $(element)[0].dataset.id;
    render("http://127.0.0.1:8000/api/get-folder/" + id);
});
$('.sidebar').on('click', '.backspace', function () {
    render("http://127.0.0.1:8000/api/get-folder/" + parentId);
});

function render(url_pattern) {
    $.getJSON(url_pattern, function (data) {
        var child_foldersJSON = $.parseJSON(data.child_folders);
        var child_filesJSON = $.parseJSON(data.child_files);
        var folder = $.parseJSON(data.folder);
        parentId = folder[0]["fields"].parent_folder;
        var sidebar = $(".sidebar__content");
        sidebar.empty();
        for (var i in child_foldersJSON) {
            html = renderTemplate('template-folders', {
                name: child_foldersJSON[i]['fields'].name,
                id: child_foldersJSON[i].pk
            });
            sidebar.append(html);
        }
        var content = $(".content");
        content.empty();
        console.log(child_filesJSON)
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
    });
}