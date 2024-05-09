

  export  function CheckPassword(inputtxt) {
        if (!inputtxt.match(/^\d+$/)) {
            alert('Wrong, password should include  only numbers!');
             return false;
        }
         return true;
    }
    export  function CheckEmail(inputtxt) {
        if (!inputtxt.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            alert('Wrong,  this email address ia not valid!');
             return false;
        }
         return true;
    }

