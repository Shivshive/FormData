
// This listen to all keypress and keyup events of phone number field and assign bootstrap classes is-valid and is-invalid accordingly..
// This internally also uses checkphonenumber.js to check phone number if it match the given regular expression...

phoneNumber.on('keypress || keyup', (e) => {

    if (phoneNumber.val() !== '') {

        if (checkphonenumber(phoneNumber.val())) {

            phoneNumber.addClass('is-valid');
            if (phoneNumber.hasClass('is-invalid')) {
                phoneNumber.removeClass('is-invalid');
            }

        } else {
            phoneNumber.addClass('is-invalid');
            if (phoneNumber.hasClass('is-valid')) {
                phoneNumber.removeClass('is-valid');
            }
        }

    } else {

        if ((phoneNumber.hasClass('is-valid')) || (phoneNumber.hasClass('is-invalid'))) {

            phoneNumber.removeClass('is-valid');
            phoneNumber.removeClass('is-invalid');
        }
    }
});