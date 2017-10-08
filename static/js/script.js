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

window.onload = function () {
    var url_pattern = "http://127.0.0.1:8000/api/get-folder/2";

    $.getJSON(url_pattern, function (data) {

        console.log(data);
        console.log(data.child_foldres);
        var question_data = $.parseJSON(data.child_foldres);
        console.log(question_data);
        console.log(question_data[0]['fields']);
        var filesJSON = $.parseJSON(data.child_files);
        for (i in filesJSON) {
            html = renderTemplate('files', {
                name: filesJSON[i]['fields'].name
            })
            $('.content').append(html);
        }
    });

};