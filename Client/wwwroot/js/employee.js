//$.ajax({
//    url: "https://pokeapi.co/api/v2/pokemon/"
//}).done((result) => {
//    console.log(result.results);
//    let text = "";
//    $.each(result.results, function (key, val) {
//        text += `<tr>
//                    <td>${key + 1}</td>
//                    <td>${val.name}</td>
//                    <td><button class="btn btn-primary" onclick="detail('${val.url}')" data-bs-toggle="modal" data-bs-target="#modalPoke">Detail</button></td>
//                </tr>`;
//        //console.log(key);
//    })
//    $("#tbodyEmployee").html(text)

//});

function detail(stringUrl) {
    $.ajax({
        url: stringUrl
    }).done((result) => {
        console.log(result);
        $("h1#exampleModalLabel.modal-title").html(result.data.firstName);
    });
}

$(document).ready(function () {
    //initialisasi sekali saat HTML selesai di load
    $('#myTable').DataTable({
        dom: 'Bfrtip',
        ajax: {
            url: "https://localhost:7205/api/Employees", //=> CORS
            dataSrc: "data",
            dataType: "JSON"
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            { data: "nik" },
            {
                data: null,
                render: function (data, type, row) {
                    return data.firstName + ' ' + data.lastName;
                }
            },
            {
                data: "email",
                //render: function (data, type, row) {
                //    `<button class="btn btn-primary" onclick="detail('${data}')" data-bs-toggle="modal" data-bs-target="#modalPoke">Detail</button>`;
                //}
            },
        ],
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
});