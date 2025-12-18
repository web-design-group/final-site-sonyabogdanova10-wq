$(document).ready(function() {
    // Initialize jQuery Steps wizard
    console.log("Initializing jQuery Steps...");
    console.log("jQuery version:", jQuery.fn.jquery);
    console.log("jQuery Steps available:", typeof $.fn.steps);

    // Hide success section initially
    $(".success-section").hide();

    var form = $("#wizard");
    
    // Add custom email validation rule
    $.validator.addMethod("strictEmail", function(value, element) {
        if (!value) return false;
        // Must have format: something@domain.extension (at least 2 chars for extension)
        var emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
    }, "");
    
    // Add jQuery validation
    form.validate({
        rules: {
            // Phone number validation
            phone: {
                required: true,
                minlength: 10
            },
            // Email validation
            email: {
                required: true,
                strictEmail: true
            }
        },
        messages: {
            phone: {
                required: "Пожалуйста, введите номер телефона",
                minlength: "Номер телефона должен быть не менее 10 символов"
            },
            email: {
                required: "Пожалуйста, введите адрес электронной почты",
                email: "Пожалуйста, введите корректный адрес электронной почты (например: name@example.com)"
            }
        },
        errorPlacement: function(error, element) {
            error.css('color', '#ff6b6b');
            error.css('font-size', '12px');
            error.css('margin-top', '5px');
            error.insertAfter(element);
        },
        highlight: function(element) {
            $(element).css('border-color', '#ff6b6b');
        },
        unhighlight: function(element) {
            $(element).css('border-color', 'var(--border-color)');
        }
    });
    
    form.steps({
        headerTag: "h3",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        autoFocus: true,
        enablePagination: true,
        enableAllSteps: false,
        enableKeyNavigation: true,
        suppressPaginationOnFocus: true,
        labels: {
            previous: "НАЗАД",
            next: "ДАЛЕЕ",
            finish: "ЗАВЕРШИТЬ",
            loading: "Загрузка ..."
        },
        onStepChanging: function(event, currentIndex, newIndex) {
            console.log("Step changing from " + currentIndex + " to " + newIndex);
            // Validate form when moving to next step (not when going back)
            if (newIndex > currentIndex) {
                return form.valid();
            }
            return true;
        },
        onStepChanged: function(event, currentIndex, priorIndex) {
            console.log("Step changed from " + priorIndex + " to " + currentIndex);
            // Hide all success sections first
            $(".success-section").hide();
            // Show only the last step's success section
            if (currentIndex === 3) {
                $(".success-section").show();
            }
        },
        onFinishing: function(event, currentIndex) {
            console.log("Finishing wizard");
            return true;
        },
        onFinished: function(event, currentIndex) {
            console.log("Wizard finished");
            window.location.href = 'index.html';
        }
    });

    console.log("jQuery Steps initialized successfully");

    // Cart quantity controls
    $(document).on('click', '.qty-btn.plus', function(e) {
        e.preventDefault();
        var input = $(this).siblings('.qty-input');
        input.val(parseInt(input.val()) + 1);
        updateCartTotal();
    });

    $(document).on('click', '.qty-btn.minus', function(e) {
        e.preventDefault();
        var input = $(this).siblings('.qty-input');
        var currentVal = parseInt(input.val());
        if (currentVal > 1) {
            input.val(currentVal - 1);
            updateCartTotal();
        }
    });

    // Update cart total
    function updateCartTotal() {
        var total = 0;
        
        // Calculate total from all cart items
        $('.cart-item').each(function() {
            var quantity = parseInt($(this).find('.qty-input').val());
            var priceText = $(this).find('.item-price').text();
            var price = parseInt(priceText.replace(/\D/g, ''));
            total += price * quantity;
        });

        // Format and update the total
        var formattedTotal = total.toLocaleString('ru-RU') + ' ₽';
        $('.total-amount').text(formattedTotal);
        console.log("Cart total updated: " + formattedTotal);
    }

    // Edit buttons functionality
    $(".form-btn-secondary").on("click", function(e) {
        e.preventDefault();
        console.log("Edit button clicked");
    });

    console.log("All scripts initialized successfully");
});
