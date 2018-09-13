/*
$(function () {
    $("#empresas").click(function () {
        $.ajax({
            url: 'http://dev-ipromo.pantheonsite.io/getcompanys.php?find=categories',
            type: 'GET',
            dataType: 'JSON',
            beforeSend: function (data) {
                $("#one").html('wait');
            },
            success: function (data) {
                //alert(data);
                var puthtmlcomp = "<div data-role='collapsible-set' data-theme='c' data-content-theme='d' class='ui-collapsible-set ui-group-theme-c ui-corner-all'>";
                for (var c = 0; c < data.length; c++) {

                    var info = "<div data-role='collapsible' class='ui-collapsible ui-collapsible-inset ui-corner-all ui-collapsible-themed-content ui-first-child ui-last-child ui-collapsible-collapsed'><h3 class='ui-collapsible-heading ui-collapsible-heading-collapsed'><a href='#' class='ui-collapsible-heading-toggle ui-btn ui-btn-icon-left ui-btn-c ui-icon-plus'>"+data[c].categoria+"<span class='ui-collapsible-heading-status'> click to expand contents</span></a>";

                    info += "</h3><div class='ui-collapsible-content ui-body-d ui-collapsible-content-collapsed' aria-hidden='true'><p>I'm the collapsible content for section 1</p></div></div>";
                    puthtmlcomp += info;
                    console.log(puthtmlcomp);
                }
                puthtmlcomp += "</div>";
                $("#one").html(puthtmlcomp);
            }

        })
    });
});
*/

$(function () {
    $("#mapa").click(function () {
        getGeoLocation();
    });
});
$(function () {
    $("#Bar>a").click(function () {
        $.ajax({
            url: 'https://dev-ipromo.pantheonsite.io/getcompanys.php?find=companys&cat=2',
            //url: 'https://materiales.canela.me/json_jquery/',
            type: 'GET',
            dataType: 'JSON',
            beforeSend: function(data){
                $("#pBar").html('<div style="width:100%;text-align:center"><img src="images/ajax-loader.gif" /></div>');
            },
            success: function (data) {
                //alert(data);
                var canciones = "";
                for (var c = 0; c < data.length; c++) {
                    var infocancion = "<div class='sEmpresa'>"+data[c].nomeemp+"</div><div class='sInfo'><a href='tel:+55"+data[c].telefone+"'>"+data[c].telefone+"</a></div>";
                    canciones += infocancion;
                    console.log(infocancion);
                }
                canciones += "</ul>";
                $("#pBar").html(canciones);
            }
        })
    });
    $("#CorrectoresInmovel>a").click(function () {
        $.ajax({
            url: 'https://dev-ipromo.pantheonsite.io/getcompanys.php?find=companys&cat=18',
            type: 'GET',
            dataType: 'JSON',
            beforeSend: function(data){
                $("#pCorrectoresInmovel").html('<div style="width:100%;text-align:center"><img src="images/ajax-loader.gif" /></div>');
            },
            success: function (data) {
                //alert(data);
                var canciones = "";
                for (var c = 0; c < data.length; c++) {
                    var infocancion = "<div class='sEmpresa'>"+data[c].nomeemp+"</div><div class='sInfo'><a href='tel:+55"+data[c].telefone+"'>"+data[c].telefone+"</a></div>";
                    canciones += infocancion;
                    console.log(infocancion);
                }
                canciones += "</ul>";
                $("#pCorrectoresInmovel").html(canciones);
            }
        })
    });
});
