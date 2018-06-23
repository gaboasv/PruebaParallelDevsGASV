
//Smooth scroll. Tomado de: https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_eff_animate_smoothscroll
$(document).ready(function () {
    //función creada para todos los anchor
    $("a").on('click', function (event) {

        // Se valida que el Hash no venga vacío
        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            // Se utiliza el método animate() de JQuery
            // (800) es lo que va tardar la animación en milisegundos
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });
});

// DATATABLE JQUERY
$(document).ready(function () {
    // Se carga la tabla
    $('#data-table').DataTable({
        "ajax": {
            "url": 'https://data.cityofchicago.org/resource/gtem-tu7s.json',
            "dataSrc": ''
        },
        "aoColumns": [{
                "mData": "community_area_name",
                "render": function (data, type, row, meta) {
                    if (type === 'display') {
                        data = '<button type="button" class="btn btn-link" onclick="mostrarMapa(this)">' + data + '</button>';
                    } //Creación de button con evento para mostrar mapa
                    return data;
                }
            },
            {
                "mData": "below_poverty_level"
            },
            {
                "mData": "birth_rate"
            },
            {
                "mData": "breast_cancer_in_females"
            },
            {
                "mData": "cancer_all_sites"
            },
            {
                "mData": "childhood_blood_lead_level_screening",
                "defaultContent": "<i>Not set</i>"
            },
            {
                "mData": "childhood_lead_poisoning",
                "defaultContent": "<i>Not set</i>"
            },
            {
                "mData": "colorectal_cancer"
            },
            {
                "mData": "community_area"
            },
            {
                "mData": "assault_homicide"
            },
            {
                "mData": "crowded_housing"
            },
            {
                "mData": "dependency"
            },
            {
                "mData": "diabetes_related"
            },
            {
                "mData": "firearm_related"
            },
            {
                "mData": "general_fertility_rate"
            },
            {
                "mData": "gonorrhea_in_females",
                "defaultContent": "<i>Not set</i>"
            },
            {
                "mData": "gonorrhea_in_males"
            },
            {
                "mData": "infant_mortality_rate"
            },
            {
                "mData": "low_birth_weight"
            },
            {
                "mData": "lung_cancer"
            },
            {
                "mData": "no_high_school_diploma"
            },
            {
                "mData": "per_capita_income"
            },
            {
                "mData": "prenatal_care_beginning_in_first_trimester"
            },
            {
                "mData": "preterm_births"
            },
            {
                "mData": "prostate_cancer_in_males"
            },
            {
                "mData": "stroke_cerebrovascular_disease"
            },
            {
                "mData": "teen_birth_rate"
            },
            {
                "mData": "tuberculosis"
            },
            {
                "mData": "unemployment"
            },
        ]
    });
});

function mostrarMapa(value) {
    $('#mapModal').modal({
        backdrop: 'static',
        keyboard: false
    }).on('shown.bs.modal', function () {
        initMap(value);
    });
};

function initMap(value) {
    var location = $(value).text() + ', Illinois'; //se adjunta Illinois para saber el estado
    $("#map").show();
    var chicago = { //centro del mapa para inicializar
        lat: 41.863059,
        lng: -87.682562
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: chicago
    });
    var geocoder = new google.maps.Geocoder();
    geocodeAddress(geocoder, map, location); //se realiza la posición de acuerdo al nombre del lugar
}

function geocodeAddress(geocoder, resultsMap, location) { //función tomada de google maps API
    var address = location; //se trae el nombre del lugar
    geocoder.geocode({
        'address': address
    }, function (results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                animation: google.maps.Animation.DROP, //Se agrega para la animación del marcador
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}