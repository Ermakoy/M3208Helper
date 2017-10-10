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
        parentid = child_foldersJSON[0]['fields'].parent_folder;
        for (i in child_foldersJSON) {
            html = renderTemplate('template-folders', {
                name: child_foldersJSON[0]['fields'].name,
                id: child_foldersJSON[0].pk
            });
            $('.sidebar__content').append(html);
        }
    });
});

$('.sidebar').on('click', '.item', function (event) {
    element = event.currentTarget;
    id = $(element)[0].dataset.id;
    render("http://127.0.0.1:8000/api/get-folder/" + id);
});
$('.sidebar').on('click', '.backspace', function () {
    render("http://127.0.0.1:8000/api/get-folder/" + parentid);
});

function render(url_pattern) {
    $.getJSON(url_pattern, function (data) {
        var child_foldersJSON = $.parseJSON(data.child_folders);
        var child_filesJSON = $.parseJSON(data.child_files);
        var folder = $.parseJSON(data.folder);
        parentid = folder[0]["fields"].parent_folder;
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
        for (i in child_filesJSON) {
            link = "http://127.0.0.1:8000/api/media/" + child_filesJSON[i].pk;
            html = renderTemplate('files', {
                name: child_filesJSON[i]['fields'].name,
                link: link
            });
            content.append(html);
        }
    });
}