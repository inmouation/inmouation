var telefono = '(301) 234-3408'
var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'key1ZHetmEX4XQ8SB' }).base('appMJrOiM1dP8Q6VN');

base('Lead').select({
    filterByFormula: "NOT(Telefono = '(320) 272-8562')",
    view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
    var cliente = records.filter(function (record) { return record.get('Telefono') === telefono });
    if (cliente.length === 0) {
        base('Lead').create({
            "Nombre": "Alejandra",
            "Requerimientos": "Busca Mansion",
            "Estado": "Cancelado",
            "Telefono": telefono,
            "Presupuesto": 5000000000,
            "Inmueble": [
                "Casa",
                "Lote"
            ],
            "Entrada": [
                "Metro cuadrado"
            ],
            "Fecha cerrado": "2018-12-20"
        }, function (err, record) {
            if (err) { console.error(err); return; }
            console.log('Creado correctamente')
            console.log(record.getId());
        });

        console.log('Teléfono no existe')
    } else {
        console.log('El teléfono existe')

    }
    fetchNextPage();
}, function done(err) {
    if (err) { console.error(err); return; }
});