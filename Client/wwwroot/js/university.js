$(document).ready(function () {
    $('#myTable').DataTable({
        dom: 'B<"clear">lfrtip',
        buttons: [
            { extend: 'copy', text: '<i class="fa fa-files-o"></i>', titleAttr: 'Copy', className: 'btn btn-outline-primary' },
            { extend: 'csv', text: '<i class="fa fa-file-text-o"></i>', titleAttr: 'CSV', className: 'btn btn-outline-success' },
            { extend: 'excel', text: '<i class="fa fa-file-excel-o"></i>', titleAttr: 'Excel', className: 'btn btn-outline-success' },
            { extend: 'pdf', text: '<i class="fa fa-file-pdf-o"></i>', titleAttr: 'PDF', className: 'btn btn-outline-danger' },
            { extend: 'print', text: '<i class="fa fa-print"></i>', titleAttr: 'Print', className: 'btn btn-outline-info' }
        ],
        ajax: {
            url: "https://localhost:7205/api/Universities",
            type: "GET",//=> CORS
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
            { data: "name"},
            {
                data: "",
                render: function (data, type, row) {
                    return `
					<button class="btn btn-info dt-detail" onclick="detail(
                    '${row['id']}', 
                    '${row['name']}'
                    )" data-bs-toggle="modal" data-bs-target="#modalDetail">
						<a data-bs-toggle="tooltip" data-bs-placement="top" title="Detail">
							<i class="fa fa-info-circle"></i>
						</a>
					</button>

					<button class="btn btn-warning dt-edit" onclick="edit(
					)" data-bs-toggle="modal" data-bs-target="#modalEdit">
						<a data-bs-toggle="tooltip" data-bs-placement="top" title="Edit">
							<i class="fa fa-edit"></i>
						</a>
					</button>

					<button class="btn btn-danger dt-delete" id="hapus" onclick="remove('${row['id']}'
					)" data-bs-toggle="modal" data-bs-target="#modalDelete">
						<a data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
							<i class="fa fa-remove"></i>
						</a>
					</button>
					`;
                }
            },
        ],
    });
    $("#plus").html(`<button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalInsert" onclick="create()">
    <i class="fa fa-plus"></i>
    <span aria-hidden="true"></span>
</button>`);
});

// Detail
function detail(id, name) {
    let txt = `<li>ID               : ${id}</li>
               <li>Nama Universitas : ${name}</li>
              `;

    $(".modal-body").html(txt);
}

// Insert
function create() {
    $("#modalLabelInsert").html("Create");
    $("#modalBodyInsert").html(`<form id="create" method="post">
                    <div class="mb-3">
                        <label for="name" class="form-label">Nama Universitas</label>
                        <input type="text" class="form-control" id="name" name="name" placeholder="Universitas Gunadarma">
                    </div>
                </form>
                `);

    $('#university').click(function (e) {
        e.preventDefault();
        let obj = {}; //sesuaikan sendiri nama objectnya dan beserta isinya
        //ini ngambil value dari tiap inputan di form nya
        obj.id = $("#id").val();
        obj.name = $("#name").val();

        //isi dari object kalian buat sesuai dengan bentuk object yang akan di post
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': "*",
                "crossDomain": true,
            },
            url: "https://localhost:7205/api/Universities",
            type: "POST",
            dataType: "json",
            data: JSON.stringify(obj) //jika terkena 415 unsupported media type (tambahkan headertype Json & JSON.Stringify();)
        }).done(() => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            });
            $("#modalInsert").modal('hide');
            $('#myTable').DataTable().ajax.reload();
        }).fail(() => {
            //console.log(obj);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            });
            //$("#modalInsert").modal('hide');
        })
    })
}

//// Edit
//function edit() {

//};

// Remove
function remove(nik) {
    console.log(nik)
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success ml-2',
            cancelButton: 'btn btn-danger mr-2'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "DELETE",
                url: `https://localhost:7205/api/Universities?key=${nik}`,
                data: {}
            }).done((result) => {
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                ).then(function () {
                    $('#myTable').DataTable().ajax.reload();
                });
            });
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            ).then(function () {
                $('#myTable').DataTable().ajax.reload();
            });
        }
    });
}