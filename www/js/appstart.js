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
                var puthtmlcomp = "<div data-role='collapsible-set' data-theme='c' data-content-theme='d' class='ui-collapsible-set ui-group-theme-c ui-corner-all'>";
                for (var c = 0; c < data.length; c++) {
                    //var info = "<div data-role='collapsible' class='collapse'><h3 id='titlecat'  data-cat='" + data[c].id_categoria+"'>" + data[c].categoria + "</h3><div id='c" + data[c].categoria+"'></div >asdasdasdasd</div>";
                    var info = "<div data-role='collapsible' class='ui-collapsible ui-collapsible-inset ui-corner-all ui-collapsible-themed-content ui-first-child ui-last-child ui-collapsible-collapsed'><h3 class='ui-collapsible-heading ui-collapsible-heading-collapsed'><a href='javascript:Getlistcom(" + data[c].id_categoria + ");' class='ui-collapsible-heading-toggle ui-btn ui-btn-icon-left ui-btn-c ui-icon-plus'>" + data[c].categoria + "<span class='ui-collapsible-heading-status'> click to expand contents</span></a>";

                    info += "</h3><div class='ui-collapsible-content ui-body-inherit ui-collapsible-content-collapsed' aria-hidden='true'><p>I'm the collapsible content for section 1</p></div></div>";

                    puthtmlcomp += info;
                }
                puthtmlcomp += "</div>";                
                $("#pagEmpresasContent").html(puthtmlcomp);
//                $("#pagEmpresasContent").trigger("updatelayout");
//                $("#pagEmpresasContent").trigger("create");
            }
        });
    }

    function Getlistcom() {

        alert('listcompanys');
    }


    $("#titlecat>a").click(function () { 
        alert('ok');
    });

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
                $('#ResultMail').html("Sua mensagem foi enviada com sucesso. Entraremos em contato. Obrigado");
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