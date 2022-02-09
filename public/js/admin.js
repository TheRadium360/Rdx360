$(document).ready(function() {
	//Only needed for the filename of export files.
	//Normally set in the title tag of your page.
	// DataTable initialisation
	$('#binance_table').DataTable(
		{
			"dom": '<"dt-buttons"Bf><"clear">lirtp',
			"paging": true,
      "autoWidth": false, 
      "columnDefs": [
        { "width": "65px", "targets": 0 },
        { "width": "65px", "targets": 1 },
        { "width": "15px", "targets": 2 },
        { "width": "15px", "targets": 3 },
        { "width": "30px", "targets": 4 },
        { "width": "70px", "targets": 5 },
        { "width": "70px", "targets": 6 }
      ],
			"buttons": [
				'colvis',
				'copyHtml5',
        'csvHtml5',
				'excelHtml5',
				'print'
			]
      , 
    "ajax": {
      "url": "http://127.0.0.1:3000/api/v1/users",
      "type": "GET"
    },
    
		}
	);
});



