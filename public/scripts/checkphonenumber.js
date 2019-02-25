/**
 * @param {Phone Number} inputtxt
 * checkphonenumber function contain a regular expression that only check for 10 digit number
 * For more constraint regular expression given in below function can be modified..
 * Based onto the value passed function return false/true..
 *  
 */

function checkphonenumber(inputtxt) {
    var phoneno = /^\d{10}$/;
    if(inputtxt){
        if((inputtxt.match(phoneno))){
            return true;
        }
        else{
            return false;
        }
    }else{
        return false;
    }
   
}



