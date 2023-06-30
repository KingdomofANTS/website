$(document).ready(function(){
    $('#subscribe-form').on('submit', function(e) {
        e.preventDefault();

        $.ajax({
            url : $(this).attr('action'),
            type: $(this).attr('method'),
            data: $(this).serialize(),
success: function(data) {
    alert(data.message);
},
error: function(jqXHR, textStatus, errorThrown) {
    alert('An error occurred. Please try again.');
}
        });
    });
});