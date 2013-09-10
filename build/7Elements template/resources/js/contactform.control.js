var ContactformControl = {

    init : function() {
        // form control interaction
        $('.connect').mouseover(function() {
            $(this).addClass('hover');
            $(this).fadeTo(100, 0.7, function() {
                $(this).fadeTo(200, 1, function() {

                });
            });
        }).mouseout(function() {
            $(this).removeClass('hover');
        });

        $('#contact_form_button').click(function() {
            if (ContactformControl.validateContactformInputs()) {
                $.post('services/ContactformService.php', {
                    'name' : $('#your_name').attr('value'),
                    'email' : $('#your_email').attr('value'),
                    'message' : $('#message').attr('value')
                }, function(data) {
                    if (data == 1) {
                        $('#module_contact_form').html('<div class="newsletter_thankyou">Thank you! Your message has been sent.</div>');
                    } else {
                        $('#module_contact_form').html('<div class="newsletter_thankyou">There has been an unknown error.</div>');
                    }

                });
            }
        });
    },

    validateContactformInputs : function() {
        // Start validation:
        $.validity.start();

        // Validator methods
        $("#your_email").require().match('email');
        $("#your_name").require();
        $("#message").require();

        // End the validation session:
        var result = $.validity.end();

        // Return whether it's okay to proceed with the Ajax:
        return result.valid;
    }
};

$(ContactformControl.init);