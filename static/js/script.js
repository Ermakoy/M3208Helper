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

$("header").on('click', function () {
    var url_pattern = "http://127.0.0.1:8000/api/get-root";

    $.getJSON(url_pattern, function (data) {
        var foldersJSON = $.parseJSON(data.folder);
        for (i in foldersJSON) {
            html = renderTemplate('template-folders', {
                name: foldersJSON[0]['fields'].name,
                id: foldersJSON[0].pk
            });
            $('.sidebar').append(html);
        }
    });
});

$('.sidebar').on('click', '.item', function (event) {
    console.log(event);
    var element = event.currentTarget;
    var id = $(element)[0].dataset.id;

    var url_pattern = "http://127.0.0.1:8000/api/get-folder" + "/" + id;

    $.getJSON(url_pattern, function (data) {
        var child_foldersJSON = $.parseJSON(data.child_folders);
        var child_filesJSON = $.parseJSON(data.child_files);
        var sidebar = $(".sidebar");
        sidebar.empty();
        console.log(child_foldersJSON);

        for (var i in child_foldersJSON) {
            html = renderTemplate('template-folders', {
                name: child_foldersJSON[i]['fields'].name,
                id: child_foldersJSON[i].pk
            });
            sidebar.append(html);
        }
        var content = $(".content");
        content.empty();
            console.log(child_filesJSON);
            for (i in child_filesJSON) {
                html = renderTemplate('files', {
                    name: child_filesJSON[i]['fields'].name,
                    link: child_filesJSON[i]['fields'].file
                });
                content.append(html);
            }
    });
});