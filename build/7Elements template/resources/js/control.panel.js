var ControlPanel = {

    init : function() {

        // what is visible
        // $('#module_title').show();
        // $('#module_counter').show();
        // $('#module_progress_bar').show();
        // $('#module_newsletter_form').show();
        // $('#module_contact_form').show();
        // $('#module_contactus').show();

        // setup events
        $('#cb_module_title').click(function() {
            $('#module_title').toggle();
            $('.error').hide();
        });
        $('#cb_module_counter').click(function() {
            $('#module_counter').toggle();
            $('.error').hide();
        });
        $('#cb_module_progress_bar').click(function() {
            $('#module_progress_bar').toggle();
            $('.error').hide();
			try{
				LaunchProgressBarControl.init('#pb3');
			} catch(ex) {
			
			}

        });
        $('#cb_module_newsletter_form').click(function() {
            $('#module_newsletter_form').toggle();
            $('.error').hide();
        });
        $('#cb_module_contact_form').click(function() {
            $('#module_contact_form').toggle();
            $('.error').hide();			
        });
        $('#cb_module_contactus').click(function() {
            $('#module_contactus').toggle();
            $('.error').hide();
        });
        $('#cb_module_status').click(function() {
            $('#status').toggle();
            $('.error').hide();
            $('#status:visible').parent().addClass('bigshine');
            $('#status:hidden').parent().removeClass('bigshine');
        });
        $('#cb_module_connect').click(function() {
            $('#module_connect').toggle();
            $('.error').hide();
        });
        $('#cb_module_footer').click(function() {
            $('.footer').toggle();
            $('.error').hide();
        });

        $('#tb_company_name').keyup(function(key) {
            $('#company_name a').html($(this).attr('value'));
        });
        $('#tb_slogan').keyup(function(key) {
            $('#slogan').html($(this).attr('value'));
        });

        $('#sel_preset').keyup(function() {
            $(this).change();
        }).change(function() {
            switch ($(this).attr('value')) {
            case '1':
                ControlPanel.hideAll();
                // $('#cb_module_title').click();
                $('#cb_module_counter').click();
                // $('#cb_module_progress_bar').click();
                $('#cb_module_newsletter_form').click();
                // $('#cb_module_contact_form').click();
                $('#cb_module_contactus').click();
                // $('#cb_module_status').click();
                // $('#cb_module_connect').click();
                // $('#cb_module_footer').click();
                break;
            case '2':
                ControlPanel.hideAll();
                // $('#cb_module_title').click();
                // $('#cb_module_counter').click();
                // $('#cb_module_progress_bar').click();
                // $('#cb_module_newsletter_form').click();
                $('#cb_module_contact_form').click();
                // $('#cb_module_contactus').click();
                $('#cb_module_status').click();
                $('#cb_module_connect').click();
                // $('#cb_module_footer').click();
                break;
            case '3':
                ControlPanel.hideAll();
                $('#cb_module_title').click();
                // $('#cb_module_counter').click();
                // $('#cb_module_progress_bar').click();
                $('#cb_module_newsletter_form').click();
                // $('#cb_module_contact_form').click();
                $('#cb_module_contactus').click();
                $('#cb_module_status').click();
                // $('#cb_module_connect').click();
                // $('#cb_module_footer').click();
                break;
            case '4':
                ControlPanel.hideAll();
                // $('#cb_module_title').click();
                $('#cb_module_counter').click();
                $('#cb_module_progress_bar').click();
                // $('#cb_module_newsletter_form').click();
                // $('#cb_module_contact_form').click();
                $('#cb_module_contactus').click();
                // $('#cb_module_status').click();
                // $('#cb_module_connect').click();
                // $('#cb_module_footer').click();
                break;
            case '5':
                ControlPanel.hideAll();
                // $('#cb_module_title').click();
                $('#cb_module_counter').click();
                //$('#cb_module_progress_bar').click();
                $('#cb_module_newsletter_form').click();
                // $('#cb_module_contact_form').click();
                $('#cb_module_contactus').click();
                $('#cb_module_status').click();
                $('#cb_module_connect').click();
                $('#cb_module_footer').click();
                break;
            case '6':
                ControlPanel.hideAll();
                // $('#cb_module_title').click();
                // $('#cb_module_counter').click();
                // $('#cb_module_progress_bar').click();
                // $('#cb_module_newsletter_form').click();
                $('#cb_module_contact_form').click();
                // $('#cb_module_contactus').click();
                // $('#cb_module_status').click();
                // $('#cb_module_connect').click();
                // $('#cb_module_footer').click();
                break;
            case '7':
                ControlPanel.hideAll();
                //$('#cb_module_title').click();
                $('#cb_module_counter').click();
                $('#cb_module_progress_bar').click();
                //$('#cb_module_newsletter_form').click();
                // $('#cb_module_contact_form').click();
                $('#cb_module_contactus').click();
                $('#cb_module_status').click();
                $('#cb_module_connect').click();
                $('#cb_module_footer').click();
                break;
            }
        });

        $('#sel_preset').change();

        visible = true;
        $('#btn_hide').click(function() {
            visible = !visible;
            $('#controls').toggle('slow');
            if (!visible) {
                $(this).html('Show options');
            } else {
                $(this).html('Hide this window');
            }
        });
    },
    hideAll : function() {
        $('#module_title').hide();
        $('#module_counter').hide();
        $('#module_progress_bar').hide();
        $('#module_newsletter_form').hide();
        $('#module_contact_form').hide();
        $('#module_contactus').hide();

        $('#module_connect').hide();
        $('#status').hide();
        $('.footer').hide();
        $('.subcontent_area').removeClass('bigshine');

        $('#cb_module_title').attr('checked', false);
        $('#cb_module_counter').attr('checked', false);
        $('#cb_module_progress_bar').attr('checked', false);
        $('#cb_module_newsletter_form').attr('checked', false);
        $('#cb_module_contact_form').attr('checked', false);
        $('#cb_module_contactus').attr('checked', false);
        $('#cb_module_status').attr('checked', false);
        $('#cb_module_connect').attr('checked', false);
        $('#cb_module_footer').attr('checked', false);
		
        $('.error').hide();
    }

};

$(ControlPanel.init);