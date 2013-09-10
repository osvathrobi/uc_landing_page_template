var NewsletterControl = {

    init : function() {
        $('#newsletter_text').click(function(ev) {
            $(this).removeClass('email_text_bg');
            ev.stopPropagation();
        }).mousedown(function(ev) {
            ev.stopPropagation;
            $(this).removeClass('email_text_bg');
        });
		
        $('.submit_button').mouseover(function() {
            $(this).addClass('hover');
        }).mouseout(function() {
            $(this).removeClass('hover');
        });
		
        $(function() {
        }).click(function(ev) {
            if ($('#newsletter_text').attr('value') == "") {
                $('#newsletter_text').addClass('email_text_bg');
            }
        });

        // ajax
        $('#newsletter_submit').click(function() {
            if (NewsletterControl.validateNewsletterInputs()) {
                $.ajax({
                    url : 'services/NewsletterService.php',
                    data : 'newsletter_text=' + $('#newsletter_text').attr('value'),
                    success : function(data) {
                        if (data == 1) {
                            $('#module_newsletter_form').html('<div class="newsletter_thankyou">Thank you! Your email address has been added to our mailing list.</div>');
                        } else {
                            $('#module_newsletter_form').html('<div class="newsletter_thankyou">There has been an unknown error.</div>');
                        }
                    }
                });
            }
        });
    },

    validateNewsletterInputs : function() {
        // Start validation:
        $.validity.start();

        // Validator methods
        $("#newsletter_text").require().match('email');

        // End the validation session:
        var result = $.validity.end();

        // Return whether it's okay to proceed with the Ajax:
        return result.valid;
    }

};

$(NewsletterControl.init);