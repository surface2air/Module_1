// MODULE 01 - JSHINT LINTING EXERCISE
// Eric Gould - May 14, 2015

(function (gbl, $) {

  'use strict';

  gbl.dropdown = function (options) {

		var $dropdown = options.dropdown,
			$toggle = options.toggleButton,
			ns = options.namespace;
			transitionEnd = gbl.utilities.whichTransitionEvent();
    
    var transitionEnd;
    var clickAnywhereToClose;
    var controlsMegaMenu;
    

		$dropdown.addClass('gbl_dropdown').data('status', 'closed');
		$toggle.addClass('gbl_dropdown_trigger');
		$dropdown.attr('aria-expanded', 'false');
		$toggle.attr('aria-controls', $dropdown.attr('id'));
		$dropdown.wrapInner('<div class="measureHeight"></div>');

		function closeMegaMenu() {
			if (gbl.megaMenu && gbl.megaMenu.small && typeof gbl.megaMenu.small.close === 'function') {
				gbl.megaMenu.small.close();
			}
		}

		function setCloseHandler() {
			$(document).on('click.' + ns, function (e) {
				var $clicked = $(e.target);
				if (!$clicked.is($dropdown) && ($clicked.parents().filter($dropdown).length === 0)) {
					close();
				}
			});
		}

		function removeCloseHandler() {
			$(document).off('click.' + ns);
		}

		
		function setDropdownHeight() {
			$dropdown.height($dropdown.find('.measureHeight').height());
		}

		function close() {
			dateStamp = +new Date();
			setDropdownHeight();
			$dropdown.data("status", 'closed');
			$dropdown.removeClass('gbl_dropdown_active');

      setTimeout(setDropdownHeight, 1000);

			$toggle.removeClass('gbl_dropdown_active');
			$toggle.focus();
			var dateStamp;
			$dropdown.attr('aria-expanded', 'false');
			setTimeout(function () {
				$dropdown.removeClass("no_transition");
				$dropdown.css('height', 0);
			}, 50);
			removeCloseHandler();
			$(document).trigger(ns + 'Close');
		}

		function open() {
			$dropdown.removeClass('no_transition');
			$dropdown.data('status', 'open');
			$dropdown.addClass('gbl_dropdown_active');
			$dropdown.focus();
			$toggle.addClass('gbl_dropdown_active');
			$dropdown.attr('aria-expanded', 'true');
			setDropdownHeight();
			if (clickAnywhereToClose) {
				setCloseHandler();
			}
			$(document).trigger(ns + 'Open');
		}

		function toggleDropdown(e) {
			e.preventDefault();
			e.stopPropagation();
			if ($dropdown.data('status') ==='closed') {
				open();
			} else {
				close();
			}
			if (controlsMegaMenu) {
				closeMegaMenu();
      }
		}

		$dropdown.on(transitionEnd, function () {
			if ($dropdown.data('status') === "open") {
				$dropdown.addClass('no_transition');
				$dropdown.css('height', 'auto');
			}
		});

		$toggle.on('click', toggleDropdown);

	};

}(window.gbl || {}, jQuery));
