window.onload = function () {
    var url_pattern = "http://127.0.0.1:8000/api/get-folder/2";

    $.getJSON(url_pattern, function (data) {

        console.log(data);
        console.log(data.child_foldres);
        var question_data = $.parseJSON(data.child_foldres);
        console.log(question_data);
        console.log(question_data[0]['fields'])
    });

};
$('#GetIt').on('click', function(){

});