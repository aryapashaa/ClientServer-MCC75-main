let editor;

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

					<button class="btn btn-danger dt-delete" onclick="delete(
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
    $("h1#modalLabelDetail.modal-title").html(firstName);
}

// Validation
function validation() {
    let txt = ` <form class="row g-3 needs-validation" novalidate>
                  <div class="col-md-4 position-relative">
                    <label for="validationTooltip01" class="form-label">First name</label>
                    <input type="text" class="form-control" id="validationTooltip01" value="Mark" required>
                    <div class="valid-tooltip">
                      Looks good!
                    </div>
                  </div>
                  <div class="col-md-4 position-relative">
                    <label for="validationTooltip02" class="form-label">Last name</label>
                    <input type="text" class="form-control" id="validationTooltip02" value="Otto" required>
                    <div class="valid-tooltip">
                      Looks good!
                    </div>
                  </div>
                  <div class="col-md-4 position-relative">
                    <label for="validationTooltipUsername" class="form-label">Username</label>
                    <div class="input-group has-validation">
                      <span class="input-group-text" id="validationTooltipUsernamePrepend">@</span>
                      <input type="text" class="form-control" id="validationTooltipUsername" aria-describedby="validationTooltipUsernamePrepend" required>
                      <div class="invalid-tooltip">
                        Please choose a unique and valid username.
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 position-relative">
                    <label for="validationTooltip03" class="form-label">City</label>
                    <input type="text" class="form-control" id="validationTooltip03" required>
                    <div class="invalid-tooltip">
                      Please provide a valid city.
                    </div>
                  </div>
                  <div class="col-md-3 position-relative">
                    <label for="validationTooltip04" class="form-label">State</label>
                    <select class="form-select" id="validationTooltip04" required>
                      <option selected disabled value="">Choose...</option>
                      <option>...</option>
                    </select>
                    <div class="invalid-tooltip">
                      Please select a valid state.
                    </div>
                  </div>
                  <div class="col-md-3 position-relative">
                    <label for="validationTooltip05" class="form-label">Zip</label>
                    <input type="text" class="form-control" id="validationTooltip05" required>
                    <div class="invalid-tooltip">
                      Please provide a valid zip.
                    </div>
                  </div>
                  <div class="col-12">
                    <button class="btn btn-primary" onclick="insert(
					)" type="submit">Submit</button>
                  </div>
                </form>
              `;

    $(".modal-body").html(txt);
}

// Insert
function insert() {
    var obj = new Object(); //sesuaikan sendiri nama objectnya dan beserta isinya
    //ini ngambil value dari tiap inputan di form nya
    obj.Nik = $("#nik").val();
    obj.FirstName = $("#firstName").val();
    obj.LastName = $("#lastName").val();
    obj.BirthDate = $("#birthDate").val();
    obj.Gender = $("#gender").val();
    obj.HiringDate = $("#hiringDate").val();
    obj.Email = $("#email").val();
    obj.Handphone = $("#phoneNumber").val();
    obj.ManagerId = $("managerId").val();

    //isi dari object kalian buat sesuai dengan bentuk object yang akan di post
    $.ajax({
        url: "https://localhost:7205/api/Employees",
        type: "POST",
        dataType: "JSON",
        data: JSON.stringify(obj) //jika terkena 415 unsupported media type (tambahkan headertype Json & JSON.Stringify();)
    }).done((result) => {
        alert('Data Insert Successfully');
    }).fail((error) => {
        alert('Data Insert Failed');
    })
}