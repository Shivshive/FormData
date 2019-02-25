var phoneNumber = $('#whatsappcontact');
var name = $('#firstname');

$(document).ready(() => {

    $('#myform').on('submit', (e) => {

        // Preventing default form operations...
        e.preventDefault();

        // Check Phone number if acceptable then post form data to webservice...
        if (checkphonenumber(phoneNumber.val())) {
            var form = $('#myform');
            var formdata = false;
            if (window.FormData) {
                let formdata = new FormData(form[0]);
                let name = formdata.get("firstname");
                let phone = formdata.get("phonenumber");
                console.log(name+ " ||  "+phone);

                //Posting data to webservice ...
                post_data(form, formdata);
            }
        }
    });


});


