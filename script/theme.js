let themeSwitcher = document.querySelector('#darkmode-toggle');

 

themeSwitcher.addEventListener('change', function () {

    // this.checked to get the current state of the checkbox

    if (this.checked) {

        document.body.classList.add('dark-theme')

        document.body.classList.remove('light-theme')

    } else {

        document.body.classList.add('light-theme')

        document.body.classList.remove('dark-theme')

    }

})

  