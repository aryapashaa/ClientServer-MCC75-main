$(document).ready(function () {
    //editor = new $.fn.datatable.editor({
    //    "ajax": "https://localhost:7205/api/employees",
    //    "table": "#mytable",
    //    "fields": [{
    //        "label": "nik:",
    //        "name": "nik"
    //    }, {
    //        "label": "nama depan:",
    //        "name": "firstname"
    //    }, {
    //        "label": "nama belakang:",
    //        "name": "lastname"
    //    }
    //, {
    //        "label": "Tanggal Lahir:",
    //        "name": "birthDate",
    //        "type": "datetime"
    //    }, {
    //        "label": "Jenis Kelamin:",
    //        "name": "gender"
    //    }, {
    //        "label": "Tanggal Masuk:",
    //        "name": "hiringDate",
    //        "type": "datetime"
    //    }, {
    //        "label": "E-Mail:",
    //        "name": "email"
    //    }, {
    //        "label": "Phone:",
    //        "name": "phoneNumber"
    //    }, {
    //        "label": "Manager Id:",
    //        "name": "managerId"
    //    }
    //    ]
    //});

    //initialisasi sekali saat HTML selesai di load
    $('#myTable').DataTable({
        //dom: '<"top"i>rt<"bottom"flp><"clear">',
        dom: 'B<"clear">lfrtip',
        buttons: [
            //{
            //    text: '<i class="fa fa-plus" aria-hidden="true"></i>',
            //    titleAttr: 'Add',
            //    className: 'btn btn-success',
            //    action: function (e, dt, node, config) {
            //        alert('Button activated');
            //    }
            //},
            { extend: 'copy', text: '<i class="fa fa-files-o"></i>', titleAttr: 'Copy', className: 'btn btn-outline-primary' },
            { extend: 'csv', text: '<i class="fa fa-file-text-o"></i>', titleAttr: 'CSV', className: 'btn btn-outline-success' },
            { extend: 'excel', text: '<i class="fa fa-file-excel-o"></i>', titleAttr: 'Excel', className: 'btn btn-outline-success' },
            { extend: 'pdf', text: '<i class="fa fa-file-pdf-o"></i>', titleAttr: 'PDF', className: 'btn btn-outline-danger' },
            { extend: 'print', text: '<i class="fa fa-print"></i>', titleAttr: 'Print', className: 'btn btn-outline-info' }
        ],
        ajax: {
            url: "https://localhost:7205/api/Employees",
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
            { data: "nik" },
            {
                data: null,
                render: function (data, type, row) {
                    return data.firstName + ' ' + data.lastName;
                }
            },
            {
                data: "",
                render: function (data, type, row) {
                    return `
					<button class="btn btn-info dt-detail" onclick="detail(
                    '${row['nik']}', 
                    '${row['firstName']}',
                    '${row['lastName']}',
                    '${row['birthDate']}', 
                    '${row['gender']}',
                    '${row['hiringDate']}',
                    '${row['email']}',
                    '${row['phoneNumber']}',
                    '${row['managerId']}'
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

					<button class="btn btn-danger dt-delete" id="hapus" onclick="remove(
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
    <i class="fas fa-plus"></i>
    <span aria-hidden="true"></span>
</button>`);
});

// Detail
function detail(nik, firstName, lastName, birthDate, gender, hiringDate, email, phoneNumber, managerId) {
    let genderName = "";
    if (gender == 0) {
        genderName = "Laki-Laki";
    } else {
        genderName = "Perempuan";
    };
    let txt = `<li>NIK              : ${nik}</li>
               <li>Nama Depan       : ${firstName}</li>
               <li>Nama Belakang    : ${lastName}</li>
               <li>Tanggal Lahir    : ${birthDate}</li>
               <li>Jenis Kelamin    : ${genderName}</li>
               <li>Tanggal Masuk    : ${hiringDate}</li>
               <li>E-Mail           : ${email}</li>
               <li>Handphone        : ${phoneNumber}</li>
               <li>Manager ID       : ${managerId}</li>
              `;

    $(".modal-body").html(txt);
    //$("h1#modalLabelDetail.modal-title").html(firstName);
}

// Insert
function create() {
    $("#modalLabelInsert").html("Create");
    $("#modalBodyInsert").html(`<form id="create" method="post">
                    <div class="form-group">
                        <label for="nik">NIK</label>
                        <input type="text" class="nik" id="nik" name="nik" placeholder="Nik">
                    </div>
                    <div class="form-group">
                        <label for="firstName">First Name</label>
                        <input type="text" class="firstName" id="firstName" name="firstName" placeholder="First Name">
                    </div>
                    <div class="form-group">
                        <label for="lastName">Last Name</label>
                        <input type="text" class="lastName" id="lastName" name="lastName" placeholder="Last Name">
                    </div>
                    <div class="form-group">
                        <label for="birthDate">Birth Date</label>
                        <input type="datetime-local" class="birthDate" id="birthDate" name="birthDate" placeholder="Birth Date">
                    </div>
                    <div class="input-group mb-3">
                      <label class="input-group-text" for="gender">Gender</label>
                      <select class="form-select" id="gender">
                        <option value="0">Laki-Laki</option>
                        <option value="1">Perempuan</option>
                      </select>
                    </div>
                    <div class="form-group">
                        <label for="hiringDate">Hiring Date</label>
                        <input type="datetime-local" class="hiringDate" id="hiringDate" name="hiringDate" placeholder="Hiring Date">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="text" class="email" id="email" name="email" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <label for="phoneNumber">Phone Number</label>
                        <input type="text" class="phoneNumber" id="phoneNumber" name="phoneNumber" placeholder="Phone Number">
                    </div>
                    <div class="form-group">
                        <label for="managerId">Manager ID</label>
                        <input type="text" class="managerId" id="managerId" name="managerId" placeholder="Manager ID">
                    </div>
					
                </form>
                `);

    $('#employee').click(function (e) {
        e.preventDefault();
        let obj = {}; //sesuaikan sendiri nama objectnya dan beserta isinya
        //ini ngambil value dari tiap inputan di form nya
        obj.nik = $("#nik").val();
        obj.firstName = $("#firstName").val();
        obj.lastName = $("#lastName").val();
        obj.birthDate = $("#birthDate").val();
        obj.gender = parseInt($("#gender").val());
        obj.hiringDate = $("#hiringDate").val();
        obj.email = $("#email").val();
        obj.phoneNumber = $("#phoneNumber").val();
        obj.managerId = $("managerId").val();

        //isi dari object kalian buat sesuai dengan bentuk object yang akan di post
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': "*",
                "crossDomain": true,
            },
            url: "https://localhost:7205/api/Employees",
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
function remove() {
    $('#hapus').click(function (e) {
        e.preventDefault();
        
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': "*",
                "crossDomain": true,
            },
            url: "https://localhost:7205/api/Employees/${'nik'}",
            type: "DELETE",
            dataType: "json",
        }).done(() => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Removed',
                showConfirmButton: false,
                timer: 1500
            });
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
};