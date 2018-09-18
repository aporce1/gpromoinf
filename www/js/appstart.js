    function checkConnection() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.CELL] = 'Cell generic connection';
        states[Connection.NONE] = 'NoInternet';

        //alert('Connection type: ' + states[networkState]);
        return states[networkState];

}
function formatar(mascara, documento) {
    var i = documento.value.length;
    var saida = mascara.substring(0, 1);
    var texto = mascara.substring(i)

    if (texto.substring(0, 1) != saida) {
        documento.value += texto.substring(0, 1);
    }
}
    function alertDismissed() {
        navigator.app.exitApp();
    }

    $(function () {
        $("#mapa").click(function () {
            getGeoLocation();
        });
    });

    function GetCategories() {
        $.ajax({
            //SELECT DISTINCT wp_categorias.categoria FROM wp_categorias, wp_comercios WHERE wp_comercios.`id_cat` = wp_categorias.`id_categoria`
            url: 'https://gpromo.com.br/getcompanys.php?find=categories',
            type: 'GET',
            dataType: 'JSON',
            success: function (data) {
                //alert(data);  
                var panelinicio = "<ul data-role='listview'><li data-icon='carat-d'>Categorias</li>";
                for (var i = 0; i < data.length; i++) {
                    var panel = "<li><a href='#' onclick='callcategoria(" + data[i].id_categoria+")'>" + data[i].categoria + "</a></li>";
                    panelinicio += panel;
                }
                var panelcompleto = panelinicio + "</ul>";
                
                $("#nav-panel").html(panelcompleto);
                $("#nav-panel").trigger("updatelayout");
                $("#nav-panel").trigger("create");
            }
        });
    }

    function callcategoria(catego) {
        console.log('la categoria es ' + catego);
    }

//ENVIAR EL CORREO

function SendMail(dataForm) {
    var postData = $(dataForm).serialize();

    $.ajax({
        type: 'POST',
        data: postData,
        url: 'https://gpromo.com.br/sendform.php',
        dataType: 'JSON',
        beforeSend: function (data) {
            $("#ResultMail").html('<div style="width:100%;text-align:center"><img src="img/ajax-loader.gif" /></div>');
        },
        success: function (data) {
            console.log(data);
            if (data.mesajefinal != 'Error') {
                $('#ResultMail').html("Sua mensagem foi enviada. Nós entraremos em contato com você em breve");
            } else {
                $('#ResultMail').html("Ocorreu um erro, por favor, verifique sua conexão e tente novamente");
            }
        },
        error: function () {
            console.log('error' );

        }
    });

    event.preventDefault(); // avoid to execute the actual submit of the form.
};


$(function () {
    $("#Bar>a").click(function () {
        $.ajax({
            url: 'https://gpromo.com.br/getcompanys.php?find=companys&cat=2',
            //url: 'https://materiales.canela.me/json_jquery/',
            type: 'GET',
            dataType: 'JSON',
            beforeSend: function (data) {
                $("#pBar").html('<div style="width:100%;text-align:center"><img src="img/ajax-loader.gif" /></div>');
            },
            success: function (data) {
                //alert(data);
                var canciones = "";
                for (var c = 0; c < data.length; c++) {
                    var infocancion = "<div class='sEmpresa'>" + data[c].nomeemp + "</div><div class='sInfo'><a href='tel:+55" + data[c].telefone + "'>" + data[c].telefone + "</a></div>";
                    canciones += infocancion;
                    //console.log(infocancion);
                }
                canciones += "</ul>";
                $("#pBar").html(canciones);
            }
        })
    });


    $("#CorrectoresInmovel>a").click(function () {
        $.ajax({
            url: 'https://gpromo.com.br/getcompanys.php?find=companys&cat=18',
            type: 'GET',
            dataType: 'JSON',
            beforeSend: function (data) {
                $("#pCorrectoresInmovel").html('<div style="width:100%;text-align:center"><img src="img/ajax-loader.gif" /></div>');
            },
            success: function (data) {
                //alert(data);
                var canciones = "";
                for (var c = 0; c < data.length; c++) {
                    var infocancion = "<div class='sEmpresa'>" + data[c].nomeemp + "</div><div class='sInfo'><a href='tel:+55" + data[c].telefone + "'>" + data[c].telefone + "</a></div>";
                    canciones += infocancion;
                    console.log(infocancion);
                }
                canciones += "</ul>";
                $("#pCorrectoresInmovel").html(canciones);
            }
        })
    });
});