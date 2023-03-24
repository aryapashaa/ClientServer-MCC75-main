function detail(nik, firstName, lastName, birthDate, gender, hiringDate, email, phoneNumber) {
    let genderName = "";
    if (gender == 0) {
        genderName = "Laki-Laki";
    } else {
        genderName = "Perempuan";
    };
    let txt = `<li>Nik              : ${nik}</li>
               <li>Nama Depan       : ${firstName}</li>
               <li>Nama Belakang    : ${lastName}</li>
               <li>Tanggal Lahir    : ${birthDate}</li>
               <li>Jenis Kelamin    : ${genderName}</li>
               <li>Tanggal Masuk    : ${hiringDate}</li>
               <li>E-Mail           : ${email}</li>
               <li>Handphone        : ${phoneNumber}</li>
              `;

    $(".modal-body").html(txt);
    $("h1#exampleModalLabel.modal-title").html(firstName);

}

$(document).ready(function () {
    //initialisasi sekali saat HTML selesai di load
    $('#myTable').DataTable({
        //dom: '<"top"i>rt<"bottom"flp><"clear">',
        dom: 'B<"clear">lfrtip',
        buttons: [
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
                    return `<button class="btn btn-primary" onclick="detail(
                    '${row['nik']}', 
                    '${row['firstName']}',
                    '${row['lastName']}',
                    '${row['birthDate']}', 
                    '${row['gender']}',
                    '${row['hiringDate']}',
                    '${row['email']}',
                    '${row['phoneNumber']}'
                    )" data-bs-toggle="modal" data-bs-target="#modalEmployee">Detail</button>`;
                }
			},
			//{
			//	data: "",
			//	render: function (data, type, row) {
			//		return `<td>
			//	<button type="button" class="btn btn-primary btn-xs dt-edit" style="margin-right:16px;">
			//		<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
			//	</button>
			//	<button type="button" class="btn btn-danger btn-xs dt-delete">
			//		<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
			//	</button>
			//</td>`;
			//	}
			//}
        ],
    });
	//$('.dt-add').each(function () {
	//	$(this).on('click', function (evt) {
	//		//Create some data and insert it
	//		var rowData = [];
	//		var table = $('#example').DataTable();
	//		//Store next row number in array
	//		var info = table.page.info();
	//		rowData.push(info.recordsTotal + 1);
	//		//Some description
	//		rowData.push('New Order');
	//		//Random date
	//		var date1 = new Date(2016, 01, 01);
	//		var date2 = new Date(2018, 12, 31);
	//		var rndDate = new Date(+date1 + Math.random() * (date2 - date1));//.toLocaleDateString();
	//		rowData.push(rndDate.getFullYear() + '/' + (rndDate.getMonth() + 1) + '/' + rndDate.getDate());
	//		//Status column
	//		rowData.push('NEW');
	//		//Amount column
	//		rowData.push(Math.floor(Math.random() * 2000) + 1);
	//		//Inserting the buttons ???
	//		rowData.push('<button type="button" class="btn btn-primary btn-xs dt-edit" style="margin-right:16px;"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button><button type="button" class="btn btn-danger btn-xs dt-delete"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>');
	//		//Looping over columns is possible
	//		//var colCount = table.columns()[0].length;
	//		//for(var i=0; i < colCount; i++){			}

	//		//INSERT THE ROW
	//		table.row.add(rowData).draw(false);
	//		//REMOVE EDIT AND DELETE EVENTS FROM ALL BUTTONS
	//		$('.dt-edit').off('click');
	//		$('.dt-delete').off('click');
	//		//CREATE NEW CLICK EVENTS
	//		$('.dt-edit').each(function () {
	//			$(this).on('click', function (evt) {
	//				$this = $(this);
	//				var dtRow = $this.parents('tr');
	//				$('div.modal-body').innerHTML = '';
	//				$('div.modal-body').append('Row index: ' + dtRow[0].rowIndex + '<br/>');
	//				$('div.modal-body').append('Number of columns: ' + dtRow[0].cells.length + '<br/>');
	//				for (var i = 0; i < dtRow[0].cells.length; i++) {
	//					$('div.modal-body').append('Cell (column, row) ' + dtRow[0].cells[i]._DT_CellIndex.column + ', ' + dtRow[0].cells[i]._DT_CellIndex.row + ' => innerHTML : ' + dtRow[0].cells[i].innerHTML + '<br/>');
	//				}
	//				$('#myModal').modal('show');
	//			});
	//		});
	//		$('.dt-delete').each(function () {
	//			$(this).on('click', function (evt) {
	//				$this = $(this);
	//				var dtRow = $this.parents('tr');
	//				if (confirm("Are you sure to delete this row?")) {
	//					var table = $('#example').DataTable();
	//					table.row(dtRow[0].rowIndex - 1).remove().draw(false);
	//				}
	//			});
	//		});
	//	});
	//});
	////Edit row buttons
	//$('.dt-edit').each(function () {
	//	$(this).on('click', function (evt) {
	//		$this = $(this);
	//		var dtRow = $this.parents('tr');
	//		$('div.modal-body').innerHTML = '';
	//		$('div.modal-body').append('Row index: ' + dtRow[0].rowIndex + '<br/>');
	//		$('div.modal-body').append('Number of columns: ' + dtRow[0].cells.length + '<br/>');
	//		for (var i = 0; i < dtRow[0].cells.length; i++) {
	//			$('div.modal-body').append('Cell (column, row) ' + dtRow[0].cells[i]._DT_CellIndex.column + ', ' + dtRow[0].cells[i]._DT_CellIndex.row + ' => innerHTML : ' + dtRow[0].cells[i].innerHTML + '<br/>');
	//		}
	//		$('#myModal').modal('show');
	//	});
	//});
	////Delete buttons
	//$('.dt-delete').each(function () {
	//	$(this).on('click', function (evt) {
	//		$this = $(this);
	//		var dtRow = $this.parents('tr');
	//		if (confirm("Are you sure to delete this row?")) {
	//			var table = $('#example').DataTable();
	//			table.row(dtRow[0].rowIndex - 1).remove().draw(false);
	//		}
	//	});
	//});
	//$('#myModal').on('hidden.bs.modal', function (evt) {
	//	$('.modal .modal-body').empty();
	//});
});