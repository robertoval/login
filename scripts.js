$(document).ready(function () {
    const htmlResponse = "<div class='container'><div class='row justify-content-center'><div class='col-md-4'><div class='card card-body card--custom py-6 px-2'><div class='pb-5 text-center'><h1 class='font-weight-bold'>Welcome!</h1><div class='subtitle pb-5'>The last time you accessed was</div><form class='form-response'><div class='form-group digit--default'><span class='figure__block' id='ndays'></span><span class='figure__text'>days</span></div><div class='form-group digit--default'><span class='figure__block' id='nhours'></span><span class='figure__text'>hours</span></div><div class='form-group digit--default'><span class='figure__block' id='nmins'></span><span class='figure__text'>minutes</span></div><div class='form-group digit--default'><span class='figure__block' id='nsecs'></span><span class='figure__text'>seconds</span></div><div class='button__wrapper'><button id='clickLogout' type='submit' class='btn btn-primary btn--blue btn--active mt-5'>LOGOUT</button></div></form ></div ></div ></div></div>";
    let regUsers = [
        {
            email: 'antonio@akceso.com',
            password: '12345678',
            date: new Date()
        },
        {
            email: 'pedro@akceso.com',
            password: '12345678',
            date: new Date()
        },
        {
            email: 'arancha@akceso.com',
            password: '12345678',
            date: new Date()
        }];
    // Days, hours, minutes & seconds
    let days, hours, minutes, time = 0

    // First time?
    localStorage.getItem('users') ? regUsers = JSON.parse(localStorage.getItem("users")) : localStorage.setItem("users", JSON.stringify(regUsers));

    // App trigger
    $('#clickLogin').click(function (event) {
        const user = $('#email').val();
        const pass = $('#password').val();
        chkUser(user, pass);
    });
    // Set Last connection
    setResponse = function (userObj) {
        calculatePeriod(userObj)

        $('#page-container').html(htmlResponse);
        $('#ndays').text(days < 10 ? "0" + days : days);
        $('#nhours').text(hours < 10 ? "0" + hours : hours);
        $('#nmins').text(minutes < 10 ? "0" + minutes : minutes);
        $('#nsecs').text(seconds < 10 ? "0" + seconds : seconds);
    }

    // Check user within DDBB / Array
    chkUser = function (userObj, passObj) {
        const userFound = regUsers.find(user => user.email === userObj && user.password === passObj)
        if (userFound != undefined) {
            setResponse(userFound)
            saveUser(regUsers, userFound)
        } else {
            $(".error__text").addClass("d-block");
        }
    }

    // Update register in DDBB & get new Date
    saveUser = function (arr, item) {
        const i = arr.indexOf(item);
        arr.splice(i, 1);
        item.date = new Date();
        arr.push(item);
        localStorage.setItem("users", JSON.stringify(arr));
    }

    // Proccess time
    calculatePeriod = function (userObj) {
        const msegSecs = 1000;
        const msegMin = msegSecs * 60;
        const msegHour = msegMin * 60;
        const msegDay = msegHour * 24;

        const lastAccess = new Date(userObj.date)
        const today = new Date()

        time = today - lastAccess

        // Days 
        days = Math.floor(time / msegDay)
        time -= days * msegDay

        // Hours, minutes & seconds
        hours = Math.floor(time / msegHour)
        time -= hours * msegHour

        minutes = Math.floor(time / msegMin)
        time -= minutes * msegMin

        seconds = Math.floor(time / msegSecs)
        time -= msegSecs
    }
});
