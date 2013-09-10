/*
 * jQuery pdp Progress Bar plugin
 *
 * Copyright (c) 2011 Osvath-Boros Robert
 * http://www.ready2run.ro
 * 
 * All rights reserved. Distribution only allowed as part of the '7 Elements' template and related works as granted by the License purchased on ThemeForest.
*/


(function($) {
  $.extend({
    progressBar : new function() {
      this.defaultConfig = {
        containerImage : 'progressbar_container.png',
        unitImage : 'progressbar_unit.png',
		fullImage : -1,
        width : 400,
        height : 35,
        boxWidth : 400,
        boxHeight : 35,

        marginTop : 2,
        marginLeft : 2,

        textFormat : 'fraction',
        appendText : ' Finished!',
        showText : true,

        interval : 20,
        value : 0,
        maxValue : 100,
        nrSteps : 200,
        curValue : 0,
        
        isAnimated : true,
        animfrm : 0
      };

      /* public methods */
      this.construct = function(arg1, arg2) {
        var paramValue = null;
        var paramConfig = null;

        if (arg1 != null) {
          if (!isNaN(arg1)) {
            paramValue = arg1;
            if (arg2 != null) {
              paramConfig = arg2;
            }
          } else {
            paramConfig = arg1;
          }
        }

        return this.each(function(child) {

          var pb = this;
          var config = this.config;

          if (paramValue != null && this.bar != null && this.config != null) {
            this.config.value = parseInt(paramValue);
            if (paramConfig != null)
              pb.config = $.extend(this.config, paramConfig);
            config = pb.config;
          } else {

            var $this = $(this);
            var config = $.extend({}, $.progressBar.defaultConfig, paramConfig);
            config.id = $this.attr('id') ? $this.attr('id') : Math.ceil(Math.random() * 100000);

            if (paramValue == null)
              paramValue = $this.html().replace("%", "");

            config.value = parseInt(paramValue);
            config.curValue = 0;

            var numeric = [ 'width', 'height', 'boxWidth', 'boxHeight', 'curValue', 'value' ];
            for ( var i = 0; i < numeric.length; i++)
              config[numeric[i]] = parseInt(config[numeric[i]]);

			if(config.textFormat == 'percentage') {
				
				var v1 = config.value * 100 / config.maxValue;
				
				config.value = v1;
				config.maxValue = 100;
			}
			
            $this.html('');
            var container = document.createElement('div');
            var text = document.createElement('span');
            var unit = document.createElement('div');

            $container = $(container);
            $text = $(text);
            $unit = $(unit);

            $container.attr('id', config.id + "_pdpContainer");
            $unit.attr('id', config.id + "_pdpUnit");
            $text.attr('id', config.id + "_pdpText");

            $container.css("background-image", "url(" + config.containerImage + ")");
            $container.css('width', config.boxWidth + 'px');
            $container.css('height', config.boxHeight + 'px');
            $container.css('display', 'block');

            $unit.css("background-image", "url(" + config.unitImage + ")");
            $unit.css('background-repeat', 'repeat-x');
            $unit.css('width', '10px');
            $unit.css('height', config.height + 'px');
            $unit.css('display', 'block');
            $unit.css('position', 'relative');
            $unit.css('top', config.marginTop);
            $unit.css('left', config.marginLeft);
            
            $text.css('position', 'absolute');
            $text.css('width', config.width + "px");            
            $text.css('padding-top', '8px');
            $text.css('padding-left', '8px');
            $text.css("font-size", "12px");
            $text.css("font-weight", "normal");
            $text.css("color", "#fff");
            $text.css("font-family", "Verdana");
            
            $unit.append($text);
            $container.append($unit);
            $this.append($container);
          }

          function getPercentValue(config) {
            return config.running_value * 100 / config.max;
          }

          function getText(config) {
            var val = Math.round(config.curValue * config.maxValue / config.width);
            if (config.showText) {
              if (config.textFormat == 'percentage') {
                return " " + val + "%" + config.appendText;
              } else if (config.textFormat == 'fraction') {
                return " " + val + '/' + config.maxValue + " " + config.appendText;
              }
            }
          }

          var t = setInterval(function() {
            var step = Math.round(config.width / config.nrSteps);
            var currentW = config.value * config.width / config.maxValue;

            if (config.curValue < currentW) {
              var diff = currentW - config.curValue;
              if (diff < step) {
                config.curValue += diff;
              } else {
                config.curValue += step;
              }
            }
            if (config.curValue > currentW) {
              if (diff < step) {
                config.curValue -= diff;
              } else {
                config.curValue -= step;
              }
            }
			
            if (config.curValue == currentW) {
				// hack: 100% change image
				if(config.fullImage!=-1) {
					var val = Math.round(config.curValue * config.maxValue / config.width);
					if(val == config.maxValue) {
						var $unit = $("#" + config.id + "_pdpUnit");
						var $container = $("#" + config.id + "_pdpContainer");
						//$unit.hide(); // remove me
						$container.css("background-image","url(" + config.fullImage + ")");
					}
				}
				// end of 100% hack
				
              if(!config.isAnimated) { clearInterval(t); }
            }

            var $unit = $("#" + config.id + "_pdpUnit");
            var $text = $("#" + config.id + "_pdpText");

            $unit.css('width', config.curValue + 'px');
            $text.html(getText(config));

            if(config.isAnimated) {
              config.animfrm++;
              if(config.animfrm>10000) { config.animfrm = 0; }
              $unit.css('background-position','' + config.animfrm + 'px 0px');
            }
            
            pb.config = config;
          }, config.interval);

        });
	
      };
    }
  });

  $.fn.extend({
    progressBar : $.progressBar.construct
  });
})(jQuery);

// init the components
var LaunchProgressBarControl = {			
		init:function(divId) {					
				var launchTime = new Date(MaintenanceSchedule.launchDate.month + '/' + MaintenanceSchedule.launchDate.day + '/' + MaintenanceSchedule.launchDate.year + ' ' + MaintenanceSchedule.launchDate.hour + ':' + MaintenanceSchedule.launchDate.min + ':' + MaintenanceSchedule.launchDate.sec + (MaintenanceSchedule.launchDate.utc ? ' UTC' : ''));
				var startTime = new Date(MaintenanceSchedule.startDate.month + '/' + MaintenanceSchedule.startDate.day + '/' + MaintenanceSchedule.startDate.year + ' ' + MaintenanceSchedule.startDate.hour + ':' + MaintenanceSchedule.startDate.min + ':' + MaintenanceSchedule.startDate.sec + (MaintenanceSchedule.startDate.utc ? ' UTC' : ''));				
				var nowTime = new Date();
				
				var diffSecs = Math.floor((launchTime.valueOf()-nowTime.valueOf())/1000);
				var diffStartEnd = Math.floor((launchTime.valueOf()-startTime.valueOf())/1000);
				var diffCurrent = diffStartEnd - diffSecs;
				
				$(""+divId+"").progressBar(diffCurrent, {
					containerImage : 'resources/images/progressbar_box_new.png',
					unitImage : 'resources/images/progressbar_unit_new.png',
					fullImage : 'resources/images/progressbar_box_new_full.png',
					boxWidth : 478,
					boxHeight : 33,
					width : 470,
					height : 33,
					marginLeft : 4,
					marginTop : 0,
					nrSteps : 100,
					isAnimated : false,
					textFormat : 'percentage',
					maxValue : diffStartEnd
				});
		}
};