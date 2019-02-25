// This is the seperate function to post form data to webserice...
/**
 * @param {Form Element} form 
 * @param {Form Data Object} formdata 
 * 
 * formdata is the javascript FormData object created like new FormData(HTMLElEMENTform[0])
 * To access form's fields data user can use formdata.get('key')
 * Here we are posting request based on if user has supplied formdata or not if yes then formdata will be posted else form.serialize() will be called..
 */

function post_data(form,formdata) {

    $.ajax({
        url: form.attr('action'),
        // dataType: 'text/html',
        type: form.attr('method'),
        contentType: false,
        data: formdata ? formdata : form.serialize(),
        processData: false,
        success: function (data, textStatus, jqXHR) {
            console.log('textStatus : ', textStatus);
            var parser = new DOMParser();
            var htmlDoc = parser.parseFromString(data, 'text/html');
            $('body').replaceWith(htmlDoc.getElementsByTagName('body'));
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

}